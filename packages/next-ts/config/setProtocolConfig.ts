export const SetProtocolConfig = (networkName: string) => {
  const config = {
    mainnet: {},
    optimism: {
      setTokenCreatorAddress: "0x0bc84D31f11D90156c30B4f19509Ede969A0B840",
      controllerAddress: "0x84D5657347cC2beD0A4D6a82c0A6f3bE1a021cc6",
      integrationRegistryAddress: "0xBc587E41ad8F218E49874D5ca62E5debDE59aaB5",
      protocolViewerAddress: "0x4E05073560B9377E5561B559c9cADBbe7112e38f",

      basicIssuanceModuleAddress: "0xe1B7e8D3B385A19173ECd7dEAeDD1368f8706263",
      streamingFeeModuleAddress: "0x6a7aE5124677314dc32C5ba3004CbFC9c7Febff0",
      tradeModuleAddress: "0x7215f38011C3e4058Ca3cF7d2b99033016EeFBD8",
      debtIssuanceModuleV2Address: "0xda6D2Da01b7141Ba3232025DC45F192eAE5569DA",

      exchangeIssuanceZeroExAddress: "0x01ecc782531ADCfB8C5a58A2C7FD544Ada946b81",
    },
    polygon: {},
    kovan: {},
  };
  return config[networkName];
};
