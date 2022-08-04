//DEFINE YOUR HERE CONTRACTS TO DEPLOY

export const DEPLOY_CONTRACTS = [
  /*{
    contractName: "RFStorage",
    args: {
      10: ["0x523d007855B3543797E0d3D462CB44B601274819"], // owner
    },
  },*/
  {
    contractName: "Chef",
    args: {
      10: [
        "0x523d007855B3543797E0d3D462CB44B601274819", // owner

        "0x01ecc782531ADCfB8C5a58A2C7FD544Ada946b81", // exchangeIssuanceZeroExAddress
        "0x0bc84D31f11D90156c30B4f19509Ede969A0B840", // setTokenCreatorAddress
        "0xda6D2Da01b7141Ba3232025DC45F192eAE5569DA", // debtIssuanceModuleV2Address
        "0x7215f38011C3e4058Ca3cF7d2b99033016EeFBD8", // tradeModuleAddress
        "0x6a7aE5124677314dc32C5ba3004CbFC9c7Febff0", // streamingFeeModuleAddress

        "100000000000000000", // maxManagerFee
        "2500000000000000", // managerIssueFee
        "2500000000000000", // managerRedeemFee
        "400000000000000000", // maxStreamingFeePercentage
        "10000000000000000", // streamingFeePercentage

        "0x523d007855B3543797E0d3D462CB44B601274819", // feeRecipient
      ],
    },
  },
];
