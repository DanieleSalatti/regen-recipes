pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

import { ISetToken } from "./ISetToken.sol";
import { IManagerIssuanceHook } from "./IManagerIssuanceHook.sol";

/**
 * @title IDebtIssuanceModule
 * @author Set Protocol
 *
 * Interface for interacting with Debt Issuance module interface.
 */
interface IDebtIssuanceModule {
  function initialize(
    ISetToken _setToken,
    uint256 _maxManagerFee,
    uint256 _managerIssueFee,
    uint256 _managerRedeemFee,
    address _feeRecipient,
    IManagerIssuanceHook _managerIssuanceHook
  ) external;

  /**
   * Called by another module to register itself on debt issuance module. Any logic can be included
   * in case checks need to be made or state needs to be updated.
   */
  function registerToIssuanceModule(ISetToken _setToken) external;

  /**
   * Called by another module to unregister itself on debt issuance module. Any logic can be included
   * in case checks need to be made or state needs to be cleared.
   */
  function unregisterFromIssuanceModule(ISetToken _setToken) external;
}
