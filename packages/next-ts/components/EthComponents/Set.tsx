import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Modal from "react-modal";
import SetJs from "set.js";
import { SwapOrderPairs } from "set.js/dist/types/src/types";
import { erc20ABI, useAccount, useContract, useNetwork, useProvider } from "wagmi";
import { SetProtocolConfig } from "../../config/setProtocolConfig";
import { ExchangeIssuanceZeroExABI } from "../../contracts/ExchangeIssuanceZeroEx.abi";
import useAppLoadContract from "../../hooks/useAppLoadContract";

import { Chef } from "../../contracts/contract-types";

interface ISet {
  setDetails: any;
}

Modal.setAppElement("#__next");

const Set = ({ setDetails }: ISet): any => {
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

  const [currentTokenAddress, setCurrentTokenAddress] = useState<string>("");
  const [currentTokenBalance, setCurrentTokenBalance] = useState<BigNumber>();
  const [currentTokenQuantity, setCurrentTokenQuantity] = useState<number>();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsSell, setModalIsSell] = useState(false);

  const { address: address, isConnecting } = useAccount();

  const router = useRouter();
  const provider = useProvider();
  const network = useNetwork();

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;

  const setProtocolConfig = SetProtocolConfig(network.chain?.name.toLowerCase() ?? "mainnet");

  const tempProvider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider | JsonRpcFetchFunc);

  const SetJsConfig = {
    ethersProvider: tempProvider,
    ...setProtocolConfig,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const SetJsInstance = new SetJs(SetJsConfig);

  // Switch to useContractWrite and usePrepareContractWrite when possible
  const chefContract = useAppLoadContract({
    contractName: "Chef",
  }) as Chef;

  type PieChartData = {
    labels: string[];
    datasets: [
      {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
      }
    ];
  };

  async function getBalance(): Promise<void> {
    const contract = new ethers.Contract(currentTokenAddress, erc20ABI, provider);
    const balance = (await contract.balanceOf(address)).toString();
    console.log("balance", balance);
    setCurrentTokenBalance(balance as BigNumber);
  }

  console.log("DASA setProtocolConfig", setProtocolConfig);

  const EIZEInstance = useContract({
    addressOrName: setProtocolConfig["exchangeIssuanceZeroExAddress"],
    contractInterface: ExchangeIssuanceZeroExABI,
    signerOrProvider: tempProvider,
  });

  useEffect(() => {
    if (currentTokenAddress === "" || address === undefined) {
      return;
    }
    void getBalance();
  }, [currentTokenAddress]);

  async function buyToken(): Promise<void> {
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

    const result = await chefContract.getRequiredIssuanceComponents(
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

    const gasLimit = network.chain?.id === 10 ? 2000000 : 21000;

    await chefContract.issueExactSetFromETH(
      ethers.utils.getAddress(currentTokenAddress),
      ethers.utils.parseUnits(currentTokenQuantity.toString(), "ether"),
      swapQuotes.map((swapQuote) => swapQuote.calldata),
      debtIssuanceModuleV2Address,
      true, // isDebtIssuance
      {
        // overrides
        from: ethers.utils.getAddress(address),
        value: ethers.utils.parseUnits(totalCostInEth.toString(), "wei"),
        gasPrice: ethers.utils.parseUnits(gasPrice.toFixed(4).toString(), "gwei"),
        gasLimit: gasLimit,
      }
    );
    // TODO: need to trigger a reload of all tokens - add callback?
    // await getSetDetailsBatch();
    setModalIsOpen(false);
  }

  async function sellToken(): Promise<void> {
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

    const result = await chefContract.getRequiredRedemptionComponents(
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

    const gasLimit = network.chain?.id === 10 ? 2000000 : 21000;

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
      // setProtocolConfig["exchangeIssuanceZeroExAddress"],
      chefContract.address,
      ethers.utils.parseUnits(currentTokenQuantity.toString(), "ether")
    );

    await chefContract.redeemExactSetForETH(
      ethers.utils.getAddress(currentTokenAddress),
      ethers.utils.parseUnits(currentTokenQuantity.toString(), "ether"),
      totalCostInEth, // How much ETH we want back at minimum
      swapQuotes.map((swapQuote) => swapQuote.calldata),
      debtIssuanceModuleV2Address,
      true, // isDebtIssuance
      {
        // overrides
        from: ethers.utils.getAddress(address),
        gasPrice: ethers.utils.parseUnits(gasPrice.toFixed(4).toString(), "gwei"),
        gasLimit: gasLimit,
      }
    );
    // Reload the page - in the future redirect to "my sets"
    // await getSetDetailsBatch();
    setModalIsOpen(false);
  }

  function createGraphData(allocations: any): PieChartData {
    const labels: string[] = [];
    const values: number[] = [];

    allocations.forEach((token, index) => {
      labels.push(token.name as string);
      values.push(token.value as number);
    });

    console.log("DASA", {
      labels,
      datasets: [
        {
          label: "Allocations",
          data: values,
          backgroundColor: COLORS,
          borderColor: COLORS,
          borderWidth: 1,
        },
      ],
    });

    return {
      labels,
      datasets: [
        {
          label: "Allocations",
          data: values,
          backgroundColor: COLORS,
          borderColor: COLORS,
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <div className="flex flex-col items-center justify-center mb-32" key={setDetails.symbol}>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-2 text-center">{setDetails.name}</h2>
        <h3 className="text-xl font-semibold mb-2 text-center">{setDetails.address}</h3>
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1">Symbol: {setDetails.symbol}</div>
            <div className="col-span-1">
              Total Supply: {parseFloat(ethers.utils.formatEther(setDetails.totalSupply.toString() as BigNumberish))}
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
            <div className="col-span-1 w-64 h-64">
              <Doughnut data={createGraphData(setDetails.allocationData)} id={setDetails.symbol} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-1">
            <button
              className="btn btn-primary"
              onClick={(): void => {
                setCurrentTokenAddress(setDetails.address as string);
                setModalIsSell(false);
                setModalIsOpen(true);
              }}>
              Buy
            </button>
          </div>
          <div className="col-span-1">
            <button
              className="btn btn-primary"
              onClick={(): void => {
                setCurrentTokenAddress(setDetails.address as string);
                setModalIsSell(true);
                setModalIsOpen(true);
              }}>
              Sell
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={(): void => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="flex flex-col items-center justify-center">
          Your current balance: {parseFloat(ethers.utils.formatEther(currentTokenBalance || 0)).toFixed(4)}
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-1">
              <input
                type="number"
                value={currentTokenQuantity || 0}
                onChange={(e): void => {
                  setCurrentTokenQuantity(parseFloat(e.target.value));
                }}
              />
            </div>
            <div className="col-span-1">
              <button
                className="btn btn-primary"
                disabled={!currentTokenQuantity || currentTokenQuantity === 0}
                onClick={(): void => {
                  if (!currentTokenQuantity || currentTokenQuantity === 0) {
                    return;
                  }
                  if (modalIsSell) {
                    void sellToken();
                  } else {
                    void buyToken();
                  }
                }}>
                {modalIsSell ? "Sell" : "Buy"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Set;
