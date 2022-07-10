export const SetProtocolConfig = (networkName: string) => {
  const config = {
    mainnet: {},
    optimism: {},
    polygon: {},
    kovan: {
      SetTokenCreator: "0xB24F7367ee8efcB5EAbe4491B42fA222EC68d411",
      Controller: "0x9048278cA7e874F9338e4898C436Ab07AA454701",
      IntegrationRegistry: "0x28A87DCca3322F90B3A4CE80cee499869EFdBf11",
      PriceOracle: "0xDFEA02F2824Ee177733d6f108005E95C85D1D4bE",
      SetValuer: "0xA37f4c5A7Ad72EEa9034195B75e7498C7ed1d4E3",
      ProtocolViewer: "0xbbC86C6099B148383941e8E592847fDC61a03283",

      BasicIssuanceModule: "0x8a070235a4B9b477655Bf4Eb65a1dB81051B3cC1",
      StreamingFeeModule: "0xE038E59DEEC8657d105B6a3Fb5040b3a6189Dd51",
      NavIssuanceModule: "0x5dB52450a8C0eb5e0B777D4e08d7A93dA5a9c848",
      TradeModule: "0xC93c8CDE0eDf4963ea1eea156099B285A945210a",
      WrapModule: "0x6BD69bf1FE2B1464a3017Da50fe4ca7c1779F8f6",
      GovernanceModule: "0x936Ffda1C892a7c65777b14C1D71fD2C79222099",
      CompoundLeverageModule: "0x676C7B527c706801e64AD2108aA1F0Ddc83807D0",
      DebtIssuanceModule: "0xe34031E7F4D8Ba4eFab190ce5f4D8451eD1B6A82",
    },
  };
  return config[networkName];
};
