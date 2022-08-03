pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

// import "hardhat/console.sol";

// NOTE : vs code giving warning  on forge-std import but works on compilation ignore it.
import "forge-std/Test.sol";

// import "openzeppelin-contracts/contracts/utils/Address.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

import "set-protocol-v2/contracts/interfaces/ISetTokenCreator.sol";
import "set-protocol-v2/contracts/interfaces/IDebtIssuanceModule.sol";
import "set-protocol-v2/contracts/interfaces/ITradeModule.sol";
import "set-protocol-v2/contracts/interfaces/IStreamingFeeModule.sol";

import "./interfaces/IExchangeIssuanceZeroEx.sol";

contract Chef is Ownable {
  RFStorage public rfStorage;
  IExchangeIssuanceZeroEx public exchangeIssuanceZeroEx;

  ISetTokenCreator public setTokenCreator;
  IDebtIssuanceModule public debtIssuanceModuleV2;
  ITradeModule public tradeModule;
  IStreamingFeeModule public streamingFeeModule;

  event ExchangeIssue(
    address indexed _recipient, // The recipient address of the issued SetTokens
    ISetToken indexed _setToken, // The issued SetToken
    IERC20 indexed _inputToken, // The address of the input asset(ERC20/ETH) used to issue the SetTokens
    uint256 _amountInputToken, // The amount of input tokens used for issuance
    uint256 _amountSetIssued // The amount of SetTokens received by the recipient
  );

  event ExchangeRedeem(
    address indexed _recipient, // The recipient adress of the output tokens obtained for redemption
    ISetToken indexed _setToken, // The redeemed SetToken
    IERC20 indexed _outputToken, // The address of output asset(ERC20/ETH) received by the recipient
    uint256 _amountSetRedeemed, // The amount of SetTokens redeemed for output tokens
    uint256 _amountOutputToken // The amount of output tokens received by the recipient
  );

  constructor(address _owner) payable {
    transferOwnership(_owner);
  }

  function SetRFStorage(address _rfStorage) public onlyOwner {
    rfStorage = RFStorage(_rfStorage);
  }

  function setSetTokenCreator(address _setTokenCreator) public onlyOwner {
    setTokenCreator = ISetTokenCreator(_setTokenCreator);
  }

  function SetExchangeIssuanceZeroEx(address _exchangeIssuanceZeroEx) public onlyOwner {
    exchangeIssuanceZeroEx = IExchangeIssuanceZeroEx(_exchangeIssuanceZeroEx);
  }

  function SetDebtIssuanceModuleV2(address _debtIssuanceModuleV2) public onlyOwner {
    debtIssuanceModuleV2 = IDebtIssuanceModule(_debtIssuanceModuleV2);
  }

  function SetTradeModule(address _tradeModule) public onlyOwner {
    tradeModule = ITradeModule(_tradeModule);
  }

  function SetStreamingFeeModule(address _streamingFeeModule) public onlyOwner {
    streamingFeeModule = IStreamingFeeModule(_streamingFeeModule);
  }

  function createSet(
    address[] memory _components,
    int256[] memory _units,
    address[] memory _modules,
    address _manager,
    string memory _name,
    string memory _symbol
  ) external returns (address) {
    require(_manager != address(0), "owner cannot be 0");
    require(_components.length > 0, "components cannot be empty");
    require(_units.length > 0, "units cannot be empty");
    require(_modules.length > 0, "modules cannot be empty");
    require(_name.length > 0, "name cannot be empty");
    require(_symbol.length > 0, "symbol cannot be empty");
    require(_components.length == _units.length, "components and units must be the same length");

    address tokenSet = setTokenCreator.createSet(_components, _units, _modules, _name, _symbol);

    // Initialize all the modules
    // The initialization uses a single manager address. It should be possible to use a delegate
    // manager contract and multiple operators to manage the token set. To be investigated.
    tradeModule.initialize(tokenSet);

    debtIssuanceModuleV2.initialize(
      tokenSet,
      100000000000000000, // 1%
      2500000000000000, // 0.25%
      2500000000000000, // 0.25%
      _manager,
      0x0000000000000000000000000000000000000000
    );

    IStreamingFeeModule.FeeState feeState = IStreamingFeeModule.FeeState(
      _manager,
      400000000000000000, // Max streaming fee maanager commits to using (1% = 1e16, 100% = 1e18)
      10000000000000000, // Percent of Set accruing to manager annually (1% = 1e16, 100% = 1e18)
      0 // Timestamp last streaming fee was accrued
    );

    streamingFeeModule.initialize(tokenSet);

    // Add tok storage
    rfStorage.addTokenSet(_manager, tokenSet);

    return tokenSet;
  }

  function issueExactSetFromETH(
    ISetToken _setToken,
    uint256 _amountSetToken,
    bytes[] memory _componentQuotes,
    address _issuanceModule,
    bool _isDebtIssuance
  ) external payable returns (uint256) {
    uint256 ret = exchangeIssuanceZeroEx.issueExactSetFromETH(
      _setToken,
      _amountSetToken,
      _componentQuotes,
      _issuanceModule,
      _isDebtIssuance
    );

    emit ExchangeIssue(msg.sender, _setToken, address(0), 0, ret);

    return ret;
  }

  function redeemExactSetForETH(
    ISetToken _setToken,
    uint256 _amountSetToken,
    uint256 _minEthReceive,
    bytes[] memory _componentQuotes,
    address _issuanceModule,
    bool _isDebtIssuance
  ) external returns (uint256) {
    uint256 ret = exchangeIssuanceZeroEx.redeemExactSetForETH(
      _setToken,
      _amountSetToken,
      _minEthReceive,
      _componentQuotes,
      _issuanceModule,
      _isDebtIssuance
    );

    emit ExchangeRedeem(msg.sender, _setToken, address(0), 0, ret);

    return ret;
  }
}
