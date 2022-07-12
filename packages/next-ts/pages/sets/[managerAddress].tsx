import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useBalance, useProvider, useSigner, useNetwork } from "wagmi";
import { SetProtocolConfig } from "../../config/setProtocolConfig";
import SetJs from "set.js";
import useAppLoadContract from "../../hooks/useAppLoadContract";
import { BigNumber, ethers } from "ethers";
import { Token } from "../../types/token";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

export default function Sets() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const [tokens, setTokens] = useState<Token[]>([]);
  const [sets, setSets] = useState<string[]>([]);
  const [setsDetails, setSetsDetails] = useState<any[]>([]);
  const router = useRouter();
  const provider = useProvider();
  const network = useNetwork();

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
    const sets = await RFStorage?.getTokenSetsByManager(router.query.managerAddress);
    setSets(sets);
  }

  useEffect(() => {
    fetch(`/tokens.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTokens(data.tokens[provider.network.name === "homestead" ? "mainnet" : provider.network.name]);
      });
  }, [provider.network.name]);

  useEffect(() => {
    if (RFStorage === undefined || RFStorage.signer === null) {
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
              value: parseFloat(((allocation.totalValue / totalAllocationMonetaryValue) * 100).toFixed(0)),
              priceEUR: allocation.priceEUR,
              priceUSD: allocation.priceUSD,
            };
          })
          .sort((a, b) => b.value - a.value);

        return {
          ...setDetails,
          allocationData,
          prices,
        };
      })
    );

    console.log("enrichedSetDetails", enrichedSetDetails);

    setSetsDetails(enrichedSetDetails);
  }

  useEffect(() => {
    void getSetDetailsBatch();
  }, [sets]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 2.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    console.log("renderCustomizedLabel", { cx, cy, midAngle, innerRadius, outerRadius, percent, index, name });

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
          setsDetails.map((setDetails, index) => (
            <div className="flex flex-col items-center justify-center" key={index}>
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
                      <ResponsiveContainer width="100%" height="100%" minHeight={400} minWidth={400}>
                        <PieChart width={400} height={400}>
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
                              console.log("setDetails.allocationData", setDetails.allocationData);
                              return <Cell key={`cell-${i}`} fill={COLORS[(i + index) % COLORS.length]} />;
                            })}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
