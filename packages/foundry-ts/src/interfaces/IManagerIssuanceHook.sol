pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

import { ISetToken } from "./ISetToken.sol";

interface IManagerIssuanceHook {
  function invokePreIssueHook(
    ISetToken _setToken,
    uint256 _issueQuantity,
    address _sender,
    address _to
  ) external;

  function invokePreRedeemHook(
    ISetToken _setToken,
    uint256 _redeemQuantity,
    address _sender,
    address _to
  ) external;
}
