import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { Chain, chain, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { SafeConnector } from "@gnosis.pm/safe-apps-wagmi";
import { Chef__factory, RFStorage__factory } from "../../contracts/contract-types";
import foundryContracts from "../../contracts/foundry_contracts.json";

export type contractNameType = keyof typeof ContractsConfig;

/** ----------------------
 * define your contracts like   YourContract: { factory: YourContract__factory, json: foundryContracts }
 * inside ContractsConfig
 * ---------------------*/
export const ContractsConfig = {
  RFStorage: { factory: RFStorage__factory, json: foundryContracts },
  Chef: { factory: Chef__factory, json: foundryContracts },
} as const;

/** ----------------------
 * add targeted chain names
 * ---------------------*/
const TARGATED_CHAINS = ["optimism", "mainnet"];
// define your target names in root .env file inside NEXT_PUBLIC_TARGET_NETWORKS variable
// const TARGATED_CHAINS = [...(process.env.NEXT_PUBLIC_TARGET_NETWORKS as string).split(",")];

export const targetNetowrks = (requiredChains: string[]): Chain[] => {
  const targetedChains: Chain[] = [];
  //   type chainNameType = keyof typeof chain;

  Object.keys(chain).forEach((chainName: string) => {
    if (requiredChains.includes(chainName)) {
      targetedChains.push(chain[chainName] as Chain);
    }
  });
  return targetedChains;
};

/** ----------------------
 * RAINBOW KIT COFIGS
 * ---------------------*/
export const targedChains = targetNetowrks([...TARGATED_CHAINS]);

export const { chains, provider } = configureChains(
  [...targedChains],
  [
    // alchemyProvider({ alchemyId: process.env.ALCHEMY_ID })
    // TODO: inifura id from env
    jsonRpcProvider({
      rpc: (chain: Chain) => {
        if (chain.id === 42) {
          // Kovan
          return {
            http: "https://kovan.infura.io/v3/e23ef6f1da494103bf900b3734e228f7",
            webSocket: "wss://kovan.infura.io/ws/v3/e23ef6f1da494103bf900b3734e228f7",
          };
        }
        if (chain.id === 10) {
          // Optimism
          return {
            http: "https://mainnet.optimism.io",
            webSocket: "wss://ws-mainnet.optimism.io",
          };
        }
        return {
          http: "https://mainnet.infura.io/v3/e23ef6f1da494103bf900b3734e228f7",
          webSocket: "wss://mainnet.infura.io/ws/v3/e23ef6f1da494103bf900b3734e228f7",
        };
      },
    }),
    /*publicProvider(),*/
  ]
); // <---- configure your custom chain

const { connectors } = getDefaultWallets({
  appName: "Regen Recipies",
  chains,
});

const connectorsWithSafe = connectors();
connectorsWithSafe.push(new SafeConnector({ chains }));

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectorsWithSafe,
  provider,
});
