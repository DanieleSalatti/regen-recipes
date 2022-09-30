import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SetJs from "set.js";
import { useContract, useFeeData, useNetwork, useProvider } from "wagmi";
import { SetProtocolConfig } from "../../config/setProtocolConfig";
import useAppLoadContract from "../../hooks/useAppLoadContract";
import { Token } from "../../types/token";

import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { ExchangeIssuanceZeroExABI } from "../../contracts/ExchangeIssuanceZeroEx.abi";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import Set from "../../components/EthComponents/Set";
import { Chef, RFStorage } from "../../contracts/contract-types";

export default function Sets(): JSX.Element {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [sets, setSets] = useState<string[]>([]);
  const [setsDetails, setSetsDetails] = useState<any[]>([]);

  const router = useRouter();
  const provider = useProvider();
  const network = useNetwork();

  const setProtocolConfig = SetProtocolConfig(network.chain?.name.toLowerCase() ?? "mainnet");

  const tempProvider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider | JsonRpcFetchFunc);

  const SetJsConfig = {
    ethersProvider: tempProvider,
    ...setProtocolConfig,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const SetJsInstance = new SetJs(SetJsConfig);

  const rfStorageContract = useAppLoadContract({
    contractName: "RFStorage",
  }) as RFStorage;

  // Switch to useContractWrite and usePrepareContractWrite when possible
  const chefContract = useAppLoadContract({
    contractName: "Chef",
  }) as Chef;

  async function getSets(): Promise<void> {
    const sets = await rfStorageContract?.getTokenSetsByManager(router.query.managerAddress as string);
    setSets(sets || []);
  }

  const mainnetGasPrice = useFeeData({
    formatUnits: "gwei",
    chainId: 1,
    watch: true,
  });

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/DanieleSalatti/ReFi-Tokens/main/refi.tokenlist.json")
      .then((response) => response.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setTokens(data.tokens.filter((i) => i.chainId === network.chain?.id));
      })
      .catch((error) => console.log(error));
  }, [provider.network.name]);

  useEffect(() => {
    if (
      rfStorageContract === undefined ||
      rfStorageContract.signer === null ||
      rfStorageContract.signer.getAddress === undefined
    ) {
      return;
    }
    console.log("RFStorage", rfStorageContract);
    void getSets();
  }, [rfStorageContract]);

  useEffect(() => {
    if (rfStorageContract === undefined) {
      return;
    }
    void getSets();
  }, [router.query.managerAddress]);

  async function getSetDetailsBatch(): Promise<void> {
    if (sets.length === 0) {
      return;
    }
    const setsDetails = await SetJsInstance.setToken.batchFetchSetDetailsAsync(sets, [
      setProtocolConfig["basicIssuanceModuleAddress"] as string,
    ]);

    const enrichedSetDetails = await Promise.all(
      setsDetails.map(async (setDetails, index) => {
        // This uses coingecko. A better way would be to call the Oracle API from Set.js.
        const prices = await SetJsInstance.utils.fetchCoinPricesAsync(
          setDetails.positions.map((position) => position.component),
          ["eur", "usd"]
        );
        const allocationMonetaryValues = setDetails.positions.map((position) => {
          return prices[position.component.toLowerCase()] &&
            tokens.filter((token) => token.address.toLowerCase() === position.component.toLowerCase())[0]
            ? {
                totalValue:
                  prices[position.component.toLowerCase()]["usd"] * parseFloat(ethers.utils.formatEther(position.unit)),
                tokenSymbol: tokens.filter(
                  (token) => token.address.toLowerCase() === position.component.toLowerCase()
                )[0].symbol,
                priceEUR: prices[position.component.toLowerCase()]["eur"],
                priceUSD: prices[position.component.toLowerCase()]["usd"],
              }
            : {
                totalValue: 0,
                tokenSymbol: "???",
                priceEUR: 0,
                priceUSD: 0,
              };
        });
        const totalAllocationMonetaryValue = allocationMonetaryValues.reduce((a, b) => a + b.totalValue, 0);

        const allocationData = allocationMonetaryValues
          .map((allocation) => {
            return {
              name: allocation.tokenSymbol,
              value: (allocation.totalValue / totalAllocationMonetaryValue) * 100,
              priceEUR: allocation.priceEUR,
              priceUSD: allocation.priceUSD,
            };
          })
          .sort((a, b) => b.value - a.value);

        return {
          ...setDetails,
          allocationData,
          prices,
          address: sets[index],
        };
      })
    );

    setSetsDetails(enrichedSetDetails);
  }

  const EIZEInstance = useContract({
    addressOrName: setProtocolConfig["exchangeIssuanceZeroExAddress"],
    contractInterface: ExchangeIssuanceZeroExABI,
    signerOrProvider: tempProvider,
  });

  useEffect(() => {
    void getSetDetailsBatch();
  }, [sets]);

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="m-2 mt-16">
        <h1 className="text-3xl font-bold mb-16 text-center">Sets</h1>
        {setsDetails &&
          setsDetails
            .sort((a, b) => b.totalSupply - a.totalSupply)
            .map((setDetails, index) => <Set key={index} setDetails={setDetails} />)}
      </div>
    </main>
  );
}
