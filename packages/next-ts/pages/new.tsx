import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useBalance, useProvider, useSigner, useNetwork } from "wagmi";
import Select from "react-select";
import SetJs from "set.js";
import { chain } from "wagmi";
import useAppLoadContract from "../hooks/useAppLoadContract";
import { SetProtocolConfig } from "../config/setProtocolConfig";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import transactor, { ContractTransactionType } from "../functions/transactor";
import { Token } from "../types/token";
import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import TokenSelect from "../components/EthComponents/TokenSelect";

const New: NextPage = () => {
  const [newSetTokenList, setNewSetTokenList] = useState<Token[]>([]);
  const [newSetTokenPercentageList, setNewSetTokenPercentageList] = useState<BigNumber[]>([]);
  const [newSetTokenAllocationTotal, setNewSetTokenAllocationTotal] = useState<BigNumber>(BigNumber.from(0));
  const [newSetName, setNewSetName] = useState<string>("");
  const [newSetDescription, setNewSetDescription] = useState<string>("");
  const [newSetSymbol, setNewSetSymbol] = useState<string>("");
  const [newSetAddress, setNewSetAddress] = useState<string>("");

  const { address: address, isConnecting } = useAccount();
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

  const RFStorage = useAppLoadContract({
    contractName: "RFStorage",
  });

  console.log("RFStorage", RFStorage);

  const storeNewSet = async (): Promise<any> => {
    if (!address) {
      return;
    }
    const rcpt = await transactor(RFStorage?.addTokenSet as ContractTransactionType, [address, newSetAddress, 2]);
    console.log("rcpt: ", rcpt);
  };

  useEffect(() => {
    if (newSetAddress !== "") {
      void storeNewSet();
    }
  }, [newSetAddress]);

  function isTokenInList(token: Token, list: Token[]): boolean {
    return list.some((t) => t.address === token.address && t.chainId === token.chainId);
  }

  function addToken(token: Token): void {
    console.log("addToken", token);
    if (isTokenInList(token, newSetTokenList)) {
      return;
    }
    setNewSetTokenList([...newSetTokenList, token]);
    setNewSetTokenPercentageList([...newSetTokenPercentageList, BigNumber.from(0)]);
  }

  return address ? (
    <main className="flex flex-col items-center justify-center">
      <div className="m-2 mt-16">
        <h1 className="text-3xl font-bold mb-16 text-center">Create New Set</h1>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
            Name: <input type="text" value={newSetName} onChange={(e): void => setNewSetName(e.target.value)} />
          </div>
          <div className="col-span-1">
            Description:{" "}
            <input type="text" value={newSetDescription} onChange={(e): void => setNewSetDescription(e.target.value)} />
          </div>
          <div className="col-span-1">
            Symbol: <input type="text" value={newSetSymbol} onChange={(e): void => setNewSetSymbol(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="m-2 mt-16">
        <TokenSelect
          onChange={(option): void => {
            console.log("DASA DASA Selected option:", option);
            addToken(option);
          }}
          chainId={network.chain?.id}
          localProvider={provider}></TokenSelect>
      </div>
      <div className="m-2">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Token</th>
              <th className="px-4 py-2">Percentage</th>
              <th className="px-4 py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {newSetTokenList.map((token, index) => (
              <tr key={token.address}>
                <td className="px-4 py-2">
                  <img src={token.logoURI} alt={token.name} />
                  {token.symbol} - {token.name}
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={Number(newSetTokenPercentageList[index]) ?? 0}
                    onChange={(e): void => {
                      const newValue = BigNumber.from(e.target.value);
                      const newPercentageList = newSetTokenPercentageList.map((percentage, i) =>
                        i === index ? newValue : percentage
                      );
                      setNewSetTokenPercentageList(newPercentageList);
                      setNewSetTokenAllocationTotal(
                        newPercentageList.reduce((acc, cur) => cur.add(acc), BigNumber.from(0))
                      );
                    }}
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={(): void => {
                      const newTokenList = newSetTokenList.filter((_, i) => i !== index);
                      const newTokenPercentageList = newSetTokenPercentageList.filter((_, i) => i !== index);
                      setNewSetTokenList(newTokenList);
                      setNewSetTokenPercentageList(newTokenPercentageList);
                    }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-4 py-2">Total</td>
              <td className="px-4 py-2">{newSetTokenAllocationTotal.toString()}%</td>
              <td className="px-4 py-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="m-2 mt-16">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          disabled={
            !newSetTokenAllocationTotal.eq(100) ||
            newSetName.length < 2 ||
            newSetDescription.length < 3 ||
            newSetSymbol.length < 3 ||
            newSetSymbol.length > 5 ||
            newSetTokenList.length === 0 ||
            address === undefined
          }
          onClick={(): void => {
            // eslint-disable-next-line @typescript-eslint/require-await
            void (async (): Promise<void> => {
              console.log(newSetTokenList);
              console.log(newSetTokenPercentageList);
              if (address === undefined) {
                return;
              }
              console.log("onclick provider", provider);
              console.log("onclick provider", provider);

              const tokenSetList = newSetTokenList.map((token) => token.address);

              console.log("tokenSetList", tokenSetList);
              console.log("newSetTokenPercentageList", newSetTokenPercentageList);
              console.log("network.chain?.name", network.chain?.name.toLowerCase());
              console.log("config", setProtocolConfig);
              console.log("modules", setProtocolConfig["exchangeIssuanceZeroExAddress"]);
              console.log("address", address);
              console.log("newSetName", newSetName);
              console.log("newSetSymbol", newSetSymbol);

              SetJsInstance.setToken
                .createAsync(
                  tokenSetList,
                  newSetTokenPercentageList,
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  [setProtocolConfig["exchangeIssuanceZeroExAddress"]],
                  address,
                  newSetName,
                  newSetSymbol
                )
                .then(async (result) => {
                  const eventSignature = "SetTokenCreated(address,address,string,string)";
                  const rcpt = await result.wait();

                  // Implementing my own logic because the one from set.js doesn't seem to work
                  // TODO: contribute better logic to set.js
                  rcpt.events?.forEach((event) => {
                    if (
                      event.eventSignature === eventSignature &&
                      event.transactionHash === result.hash &&
                      event.address === setProtocolConfig["setTokenCreatorAddress"] &&
                      event.args &&
                      event.args[1] === address
                    ) {
                      setNewSetAddress(event.args[0] as string);
                    }
                  });
                })
                .catch((error) => {
                  console.log("ERROR", error);
                })
                .finally(() => {
                  setNewSetTokenList([]);
                  setNewSetTokenPercentageList([]);
                  setNewSetName("");
                  setNewSetDescription("");
                  setNewSetSymbol("");
                });
            });
          }}>
          Create Set
        </button>
      </div>
    </main>
  ) : (
    <main className="flex flex-col items-center justify-center">
      <div className="m-2 mt-16">
        <h1 className="text-3xl font-bold mb-16 text-center">Connect your wallet to create a new set</h1>
      </div>
    </main>
  );
};

export default New;
