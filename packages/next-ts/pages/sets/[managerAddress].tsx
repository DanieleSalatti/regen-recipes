import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useProvider,
  useSigner,
  useNetwork,
  useContractWrite,
  useContractRead,
  useContract,
  erc20ABI,
  useFeeData,
} from "wagmi";
import { SetProtocolConfig } from "../../config/setProtocolConfig";
import SetJs from "set.js";
import useAppLoadContract from "../../hooks/useAppLoadContract";
import { BigNumber, ethers } from "ethers";
import { Token } from "../../types/token";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import EtherInput from "../../components/EthComponents/EtherInput";
import Modal from "react-modal";

import { ExchangeIssuanceZeroExABI } from "../../contracts/ExchangeIssuanceZeroEx.abi";
import { SwapOrderPairs } from "set.js/dist/types/src/types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#__next");

export default function Sets() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const [tokens, setTokens] = useState<Token[]>([]);
  const [sets, setSets] = useState<string[]>([]);
  const [setsDetails, setSetsDetails] = useState<any[]>([]);

  const [currentTokenAddress, setCurrentTokenAddress] = useState<string>("");
  const [currentTokenQuantity, setCurrentTokenQuantity] = useState<number>();
  const [currentTokenBalance, setCurrentTokenBalance] = useState<BigNumber>();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsSell, setModalIsSell] = useState(false);

  const router = useRouter();
  const provider = useProvider();
  const network = useNetwork();

  const { address: address, isConnecting } = useAccount();

  const setProtocolConfig = SetProtocolConfig(network.chain?.name.toLowerCase() ?? "mainnet");

  const tempProvider = new ethers.providers.Web3Provider(window.ethereum);

  const SetJsConfig = {
    ethersProvider: tempProvider,
    ...setProtocolConfig,
  };

  const SetJsInstance = new SetJs(SetJsConfig);

  const RFStorage = useAppLoadContract({
    contractName: "RFStorage",
  });

  async function getSets() {
    const sets = await RFStorage?.getTokenSetsByManager(router.query.managerAddress as string);
    setSets(sets || []);
  }

  const mainnetGasPrice = useFeeData({
    formatUnits: "gwei",
    chainId: 1,
    watch: true,
  });

  useEffect(() => {
    fetch(`/tokens.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTokens(data.tokens[provider.network.name === "homestead" ? "mainnet" : provider.network.name]);
      });
  }, [provider.network.name]);

  useEffect(() => {
    if (RFStorage === undefined || RFStorage.signer === null || RFStorage.signer.getAddress === undefined) {
      return;
    }
    console.log("RFStorage", RFStorage);
    void getSets();
  }, [RFStorage]);

  useEffect(() => {
    if (RFStorage === undefined) {
      return;
    }
    void getSets();
  }, [router.query.managerAddress]);

  async function getBalance() {
    const contract = new ethers.Contract(currentTokenAddress, erc20ABI, provider);
    const balance = (await contract.balanceOf(address)).toString();
    console.log("balance", balance);
    setCurrentTokenBalance(balance);
  }

  useEffect(() => {
    if (currentTokenAddress === "" || address === undefined) {
      return;
    }
    void getBalance();
  }, [currentTokenAddress]);

  async function getSetDetailsBatch() {
    if (sets.length === 0) {
      return;
    }
    const setsDetails = await SetJsInstance.setToken.batchFetchSetDetailsAsync(sets, [
      setProtocolConfig["basicIssuanceModuleAddress"],
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

  const EIZEissueExactSetFromETH = useContractWrite({
    addressOrName: SetJsConfig["exchangeIssuanceZeroExAddress"],
    contractInterface: ExchangeIssuanceZeroExABI,
    functionName: "issueExactSetFromETH",
    args: [],
  });

  const EIZEredeemExactSetForETH = useContractWrite({
    addressOrName: SetJsConfig["exchangeIssuanceZeroExAddress"],
    contractInterface: ExchangeIssuanceZeroExABI,
    functionName: "redeemExactSetForETH",
    args: [],
  });

  const EIZEInstance = useContract({
    addressOrName: SetJsConfig["exchangeIssuanceZeroExAddress"],
    contractInterface: ExchangeIssuanceZeroExABI,
    signerOrProvider: tempProvider,
  });

  async function buyToken() {
    if (address === undefined || currentTokenAddress === undefined || currentTokenQuantity === undefined) {
      console.log(
        "missing address or currentTokenAddress or currentTokenQuantity",
        address,
        currentTokenAddress,
        currentTokenQuantity
      );
      return;
    }
    console.log(
      "buyToken",
      ethers.utils.getAddress(currentTokenAddress),
      ethers.utils.parseUnits(currentTokenQuantity.toString(), "ether").toString(),
      ethers.utils.getAddress(address)
    );

    const modules = await SetJsInstance.setToken.getModulesAsync(ethers.utils.getAddress(currentTokenAddress));

    console.log("modules", modules);
    const debtIssuanceModuleV2Address = modules.find(
      (module) => module === setProtocolConfig["debtIssuanceModuleV2Address"]
    );
    console.log("debtIssuanceModuleV2Address", debtIssuanceModuleV2Address);
    if (debtIssuanceModuleV2Address === undefined) {
      return;
    }

    console.log("EIZEInstance", EIZEInstance);

    const result = await EIZEInstance.getRequiredIssuanceComponents(
      debtIssuanceModuleV2Address,
      true, // isDebtIssuance
      ethers.utils.getAddress(currentTokenAddress),
      ethers.utils.parseUnits(currentTokenQuantity.toString(), "ether")
    );
    console.log("result", result);

    const WETHAddress = await EIZEInstance.WETH();

    const orderPairs: SwapOrderPairs[] = result.components.map((component, index) => {
      return {
        fromToken: WETHAddress,
        toToken: component,
        rawAmount: result.positions[index].toString(),
        ignore: false,
      };
    });

    console.log("orderPairs", orderPairs);

    const chainGasPrice = await SetJsInstance.utils.fetchGasPriceAsync("fast");

    const gasPrice = /*
      network.chain?.id === 10
        ? chainGasPrice + parseFloat(mainnetGasPrice.data?.formatted.gasPrice as string)
        :*/ chainGasPrice;

    console.log("gasPrice", gasPrice);

    const swapQuotes = await SetJsInstance.utils.batchFetchSwapQuoteAsync(
      orderPairs,
      true, // useBuyAmount
      currentTokenAddress,
      SetJsInstance.setToken,
      gasPrice
    );

    console.log("swapQuote", swapQuotes);

    let totalCostInEth = swapQuotes.reduce((a, b) => a.add(BigNumber.from(b.fromTokenAmount)), BigNumber.from(0));
    //.add(ethers.utils.parseUnits("0.01", "ether"));

    totalCostInEth = totalCostInEth.add(totalCostInEth.div(BigNumber.from(100)).mul(BigNumber.from(5)));

    console.log("totalCostInEth", totalCostInEth.toString());

    //const totalGas = swapQuotes.reduce((a, b) => a + parseInt(b.gas), 0);
    //console.log("totalGas", totalGas);

    const gasLimit = network.chain?.id === 10 ? 1000000 : 21000;

    const txRes = await EIZEissueExactSetFromETH.writeAsync({
      args: [
        ethers.utils.getAddress(currentTokenAddress),
        ethers.utils.parseUnits(currentTokenQuantity.toString(), "ether"),
        swapQuotes.map((swapQuote) => swapQuote.calldata),
        debtIssuanceModuleV2Address,
        true, // isDebtIssuance
      ],
      overrides: {
        from: ethers.utils.getAddress(address),
        value: ethers.utils.parseUnits(totalCostInEth.toString(), "wei"),
        gasPrice: ethers.utils.parseUnits(gasPrice.toFixed(4).toString(), "gwei"),
        gasLimit: gasLimit,
      },
    });

    getSetDetailsBatch();
    setModalIsOpen(false);
  }

  async function sellToken() {
    if (address === undefined || currentTokenAddress === undefined || currentTokenQuantity === undefined) {
      console.log(
        "missing address or currentTokenAddress or currentTokenQuantity",
        address,
        currentTokenAddress,
        currentTokenQuantity
      );
      return;
    }
    console.log(
      "sellToken",
      ethers.utils.getAddress(currentTokenAddress),
      ethers.utils.parseUnits(currentTokenQuantity.toString(), "ether").toString(),
      ethers.utils.getAddress(address)
    );

    const modules = await SetJsInstance.setToken.getModulesAsync(ethers.utils.getAddress(currentTokenAddress));

    console.log("modules", modules);

    const debtIssuanceModuleV2Address = modules.find(
      (module) => module === setProtocolConfig["debtIssuanceModuleV2Address"]
    );

    console.log("debtIssuanceModuleV2Address", debtIssuanceModuleV2Address);

    if (debtIssuanceModuleV2Address === undefined) {
      return;
    }

    console.log("EIZEInstance", EIZEInstance);

    const result = await EIZEInstance.getRequiredRedemptionComponents(
      debtIssuanceModuleV2Address,
      true, // isDebtIssuance
      ethers.utils.getAddress(currentTokenAddress),
      ethers.utils.parseUnits(currentTokenQuantity.toString(), "ether")
    );
    console.log("result", result);

    const WETHAddress = await EIZEInstance.WETH();

    const orderPairs: SwapOrderPairs[] = result.components.map((component, index) => {
      console.log("component", component);
      console.log("positions[index]", result.positions[index].toString());
      return {
        fromToken: component,
        toToken: WETHAddress,
        rawAmount: result.positions[index].toString(),
        ignore: false,
      };
    });

    console.log("orderPairs", orderPairs);

    const chainGasPrice = await SetJsInstance.utils.fetchGasPriceAsync("fast");

    const gasPrice = /*
      network.chain?.id === 10
        ? chainGasPrice + parseFloat(mainnetGasPrice.data?.formatted.gasPrice as string)
        :*/ chainGasPrice;

    const gasLimit = network.chain?.id === 10 ? 1000000 : 21000;

    console.log("gasPrice", gasPrice);
    console.log(
      "ethers.utils.parseUnits(gasPrice.toString(), gwei)",
      ethers.utils.parseUnits(gasPrice.toFixed(4).toString(), "gwei")
    );

    const swapQuotes = await SetJsInstance.utils.batchFetchSwapQuoteAsync(
      orderPairs,
      false, // useBuyAmount
      currentTokenAddress,
      SetJsInstance.setToken,
      gasPrice
    );

    console.log("swapQuote", swapQuotes);

    let totalCostInEth = swapQuotes.reduce((a, b) => a.add(BigNumber.from(b.toTokenAmount)), BigNumber.from(0));

    totalCostInEth = totalCostInEth.sub(totalCostInEth.div(BigNumber.from(100)).mul(BigNumber.from(5)));

    console.log("totalCostInEth", totalCostInEth.toString());

    // const totalGas = swapQuotes.reduce((a, b) => a + parseInt(b.gas), 0);
    const token = new ethers.Contract(currentTokenAddress, erc20ABI, tempProvider.getSigner());

    const txApprove = await token.approve(
      setProtocolConfig["exchangeIssuanceZeroExAddress"],
      ethers.utils.parseUnits(currentTokenQuantity.toString(), "ether")
    );

    const txRes = await EIZEredeemExactSetForETH.writeAsync({
      args: [
        ethers.utils.getAddress(currentTokenAddress),
        ethers.utils.parseUnits(currentTokenQuantity.toString(), "ether"),
        totalCostInEth, // How much ETH we want back at minimum
        swapQuotes.map((swapQuote) => swapQuote.calldata),
        debtIssuanceModuleV2Address,
        true, // isDebtIssuance
      ],
      overrides: {
        from: ethers.utils.getAddress(address),
        gasPrice: ethers.utils.parseUnits(gasPrice.toFixed(4).toString(), "gwei"),
        gasLimit: gasLimit,
      },
    });

    // Reload the page - in the future redirect to "my sets"
    getSetDetailsBatch();
    setModalIsOpen(false);
  }

  useEffect(() => {
    void getSetDetailsBatch();
  }, [sets]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 2.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={COLORS[index % COLORS.length]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="m-2 mt-16">
        <h1 className="text-3xl font-bold mb-16 text-center">Sets</h1>
        {setsDetails &&
          setsDetails
            .sort((a, b) => b.totalSupply - a.totalSupply)
            .map((setDetails, index) => (
              <div className="flex flex-col items-center justify-center mb-32" key={index}>
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-2xl font-bold mb-2 text-center">{setDetails.name}</h2>
                  <div className="flex flex-col items-center justify-center">
                    <div className="grid grid-cols-3 gap-8">
                      <div className="col-span-1">Symbol: {setDetails.symbol}</div>
                      <div className="col-span-1">
                        Total Supply: {parseFloat(ethers.utils.formatEther(setDetails.totalSupply.toString()))}
                      </div>
                      <div className="col-span-1">Positions: {setDetails.positions.length}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="col-span-1">
                        <table className="table-auto w-full">
                          <thead>
                            <tr>
                              <th className="px-4 py-2">Token</th>
                              <th className="px-4 py-2">Value</th>
                              <th className="px-4 py-2">Price (EUR)</th>
                              <th className="px-4 py-2">Price (USD)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {setDetails.allocationData.map((allocation, index) => (
                              <tr key={index}>
                                <td className="border px-4 py-2">{allocation.name}</td>
                                <td className="border px-4 py-2">{allocation.value}%</td>
                                <td className="border px-4 py-2">{allocation.priceEUR}</td>
                                <td className="border px-4 py-2">{allocation.priceUSD}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="col-span-1">
                        <ResponsiveContainer width="100%" height="100%" minHeight={275} minWidth={400}>
                          <PieChart width={400} height={275}>
                            <Pie
                              data={setDetails.allocationData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              label={renderCustomizedLabel}
                              innerRadius={70}
                              outerRadius={90}
                              fill="#82ca9d">
                              {setDetails.allocationData.map((entry, i) => {
                                return <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />;
                              })}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-1">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setCurrentTokenAddress(setDetails.address);
                          setModalIsSell(false);
                          setModalIsOpen(true);
                        }}>
                        Buy
                      </button>
                    </div>
                    <div className="col-span-1">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setCurrentTokenAddress(setDetails.address);
                          setModalIsSell(true);
                          setModalIsOpen(true);
                        }}>
                        Sell
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="flex flex-col items-center justify-center">
          Your current balance: {parseFloat(ethers.utils.formatEther(currentTokenBalance || 0)).toFixed(4)}
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-1">
              <input
                type="number"
                value={currentTokenQuantity || 0}
                onChange={(e) => {
                  setCurrentTokenQuantity(parseFloat(e.target.value));
                }}
              />
            </div>
            <div className="col-span-1">
              <button
                className="btn btn-primary"
                disabled={!currentTokenQuantity || currentTokenQuantity === 0}
                onClick={() => {
                  if (!currentTokenQuantity || currentTokenQuantity === 0) {
                    return;
                  }
                  if (modalIsSell) {
                    sellToken();
                  } else {
                    buyToken();
                  }
                }}>
                {modalIsSell ? "Sell" : "Buy"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
