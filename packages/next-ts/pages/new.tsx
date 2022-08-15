import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import type { NextPage } from "next";
import { useState } from "react";
import SetJs from "set.js";
import { useAccount, useNetwork, useProvider } from "wagmi";
import TokenSelect from "../components/EthComponents/TokenSelect";
import { SetProtocolConfig } from "../config/setProtocolConfig";
import { Chef } from "../contracts/contract-types";
import transactor, { ContractTransactionType } from "../functions/transactor";
import useAppLoadContract from "../hooks/useAppLoadContract";
import { Token } from "../types/token";

const New: NextPage = () => {
  const [newSetTokenList, setNewSetTokenList] = useState<Token[]>([]);
  const [newSetTokenPercentageList, setNewSetTokenPercentageList] = useState<Number[]>([]);
  const [newSetTokenAllocationTotal, setNewSetTokenAllocationTotal] = useState<Number>(0);
  const [newSetName, setNewSetName] = useState<string>("");
  const [newSetDescription, setNewSetDescription] = useState<string>("");
  const [newSetSymbol, setNewSetSymbol] = useState<string>("");

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

  const chefContract = useAppLoadContract({
    contractName: "Chef",
  }) as Chef;

  function isTokenInList(token: Token, list: Token[]): boolean {
    return list.some((t) => t.address === token.address && t.chainId === token.chainId);
  }

  function addToken(token: Token): void {
    console.log("addToken", token);
    if (isTokenInList(token, newSetTokenList)) {
      return;
    }
    setNewSetTokenList([...newSetTokenList, token]);
    setNewSetTokenPercentageList([...newSetTokenPercentageList, 0]);
  }

  return address ? (
    <main className="flex flex-col items-center justify-center">
      <div className="m-2 mt-16">
        <h1 className="text-3xl font-bold mb-16 text-center">Create New Set</h1>
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-1">Name:</div>
          <div className="col-span-1">
            <input type="text" value={newSetName} onChange={(e): void => setNewSetName(e.target.value)} />
          </div>
          <div className="col-span-1">Description: </div>
          <div className="col-span-1">
            <input type="text" value={newSetDescription} onChange={(e): void => setNewSetDescription(e.target.value)} />
          </div>
          <div className="col-span-1">Symbol:</div>
          <div className="col-span-1">
            <input type="text" value={newSetSymbol} onChange={(e): void => setNewSetSymbol(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="m-2 mt-16">
        <TokenSelect
          onChange={(option): void => {
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
                      const newValue = Number(e.target.value);
                      const newPercentageList = newSetTokenPercentageList.map((percentage, i) =>
                        i === index ? Number(newValue) : Number(percentage)
                      );
                      setNewSetTokenPercentageList(newPercentageList);
                      setNewSetTokenAllocationTotal(newPercentageList.reduce((acc, cur) => cur + acc, 0));
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
            !(newSetTokenAllocationTotal === 100) ||
            newSetName.length < 2 ||
            newSetDescription.length < 3 ||
            newSetSymbol.length < 3 ||
            newSetSymbol.length > 5 ||
            newSetTokenList.length === 0 ||
            address === undefined
          }
          onClick={async (): Promise<void> => {
            console.log("newSetTokenList", newSetTokenList);
            if (address === undefined) {
              console.log("address is undefined");
              return;
            }
            console.log("onclick provider", provider);
            console.log("onclick provider", provider);

            const tokenSetList = newSetTokenList.map((token) => token.address);
            const prices = await SetJsInstance.utils.fetchCoinPricesAsync(tokenSetList, ["EUR"]);

            console.log("prices", prices);

            const units = tokenSetList.map((token, i) => {
              const price = prices[token.toLowerCase()];
              const perc = newSetTokenPercentageList[i];
              return parseUnits((perc.valueOf() / price["eur"]).toFixed(4), "ether");
            });

            transactor(chefContract?.createSet as ContractTransactionType, [
              tokenSetList,
              units,
              [
                setProtocolConfig["tradeModuleAddress"],
                setProtocolConfig["debtIssuanceModuleV2Address"],
                setProtocolConfig["streamingFeeModuleAddress"],
              ],
              address,
              newSetName,
              newSetSymbol,
            ])
              .then((rcpt) => {
                console.log("rcpt", rcpt);
              })
              .catch((err) => {
                console.log("err", err);
              })
              .finally(() => {
                setNewSetTokenList([]);
                setNewSetTokenPercentageList([]);
                setNewSetName("");
                setNewSetDescription("");
                setNewSetSymbol("");
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
