export const SetProtocolConfig = (networkName: string) => {
  const config = {
    mainnet: {},
    optimism: {
      setTokenCreatorAddress: "0x0bc84D31f11D90156c30B4f19509Ede969A0B840",
      controllerAddress: "0x84D5657347cC2beD0A4D6a82c0A6f3bE1a021cc6",
      integrationRegistryAddress: "0xBc587E41ad8F218E49874D5ca62E5debDE59aaB5",

      basicIssuanceModuleAddress: "0xe1B7e8D3B385A19173ECd7dEAeDD1368f8706263",
      streamingFeeModuleAddress: "0x6a7aE5124677314dc32C5ba3004CbFC9c7Febff0",
      tradeModuleAddress: "0x7215f38011C3e4058Ca3cF7d2b99033016EeFBD8",
    },
    polygon: {},
    kovan: {
      setTokenCreatorAddress: "0xB24F7367ee8efcB5EAbe4491B42fA222EC68d411",
      controllerAddress: "0x9048278cA7e874F9338e4898C436Ab07AA454701",
      protocolViewerAddress: "0xbbC86C6099B148383941e8E592847fDC61a03283",

      basicIssuanceModuleAddress: "0x8a070235a4B9b477655Bf4Eb65a1dB81051B3cC1",
      streamingFeeModuleAddress: "0xE038E59DEEC8657d105B6a3Fb5040b3a6189Dd51",
      navIssuanceModuleAddress: "0x5dB52450a8C0eb5e0B777D4e08d7A93dA5a9c848",
      tradeModuleAddress: "0xC93c8CDE0eDf4963ea1eea156099B285A945210a",
    },
  };
  return config[networkName];
};
