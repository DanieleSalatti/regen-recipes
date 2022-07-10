pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

// import "hardhat/console.sol";

// NOTE : vs code giving warning  on forge-std import but works on compilation ignore it.
import "forge-std/Test.sol";
// import "openzeppelin-contracts/contracts/utils/Address.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract RFStorage is Ownable {
  event AddTokenSet(address manager, address tokenSet, uint256 version);

  address public managerContract;

  struct TokenSet {
    address tokenSet;
    uint256 version;
  }

  mapping(address => TokenSet[]) public tokenSets;
  mapping(address => address) public tokenSetManagers;

  constructor(address _owner) payable {
    transferOwnership(_owner);
  }

  function setManagerContract(address _managerContract) public onlyOwner {
    managerContract = _managerContract;
  }

  function addTokenSet(
    address _manager,
    address _tokenSet,
    uint256 _version
  ) public onlyManagerContract {
    require(_manager != address(0), "owner cannot be 0");
    require(_tokenSet != address(0), "tokenSet cannot be 0");
    require(_version != 0, "version cannot be 0");
    require(tokenSetManagers[_tokenSet] == address(0), "TokenSet already exists");

    TokenSet memory newTokenSet = TokenSet({ tokenSet: _tokenSet, version: _version });

    tokenSets[_manager].push(newTokenSet);
    tokenSetManagers[_tokenSet] = _manager;

    emit AddTokenSet(_manager, _tokenSet, _version);
  }

  receive() external payable {}

  fallback() external payable {}

  modifier onlyManagerContract() {
    require(msg.sender == managerContract, "Only manager contract can call this function");
    _;
  }
}
