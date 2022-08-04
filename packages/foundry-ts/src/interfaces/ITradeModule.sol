pragma solidity >=0.8.0 <0.9.0;
pragma experimental "ABIEncoderV2";

//SPDX-License-Identifier: MIT

import { ISetToken } from "./ISetToken.sol";

interface ITradeModule {
  function initialize(ISetToken _setToken) external;

  function trade(
    ISetToken _setToken,
    string memory _exchangeName,
    address _sendToken,
    uint256 _sendQuantity,
    address _receiveToken,
    uint256 _minReceiveQuantity,
    bytes memory _data
  ) external;
}
