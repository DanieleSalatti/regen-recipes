// const INFURA_ID = import.meta.env.VITE_KEY_INFURA;

export type TNetworkNames =
  | "localhost"
  | "mainnet"
  | "kovan"
  | "rinkeby"
  | "ropsten"
  | "goerli"
  | "xdai"
  | "matic"
  | "mumbai"
  | "rinkebyArbitrum"
  | "arbitrum"
  | "kovanOptimism"
  | "optimism"
  | "fujiAvalanche"
  | "avalanche"
  | "testnetFantom"
  | "fantom";

export const NETWORK_NAME_TO_ID: { [key in TNetworkNames]: number } = {
  localhost: 31337,
  mainnet: 1,
  kovan: 42,
  rinkeby: 4,
  ropsten: 3,
  goerli: 5,
  xdai: 100,
  matic: 137,
  mumbai: 80001,
  rinkebyArbitrum: 421611,
  arbitrum: 42161,
  kovanOptimism: 69,
  optimism: 10,
  fujiAvalanche: 43113,
  avalanche: 43114,
  testnetFantom: 4002,
  fantom: 250,
};
