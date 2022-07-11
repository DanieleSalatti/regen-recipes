pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

// import "hardhat/console.sol";

// NOTE : vs code giving warning  on forge-std import but works on compilation ignore it.
import "forge-std/Test.sol";
// import "openzeppelin-contracts/contracts/utils/Address.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract RFStorage is Ownable {
  event AddTokenSet(address manager, address tokenSet, uint256 version);

  mapping(address => address[]) public managerToTokenSets;
  mapping(address => address) public tokenSetToManager;

  constructor(address _owner) payable {
    transferOwnership(_owner);
  }

  function addTokenSet(
    address _manager,
    address _tokenSet,
    uint256 _version
  ) public {
    require(_manager != address(0), "owner cannot be 0");
    require(_tokenSet != address(0), "tokenSet cannot be 0");
    require(_version != 0, "version cannot be 0");
    require(tokenSetToManager[_tokenSet] == address(0), "TokenSet already exists");

    managerToTokenSets[_manager].push(_tokenSet);
    tokenSetToManager[_tokenSet] = _manager;

    emit AddTokenSet(_manager, _tokenSet, _version);
  }

  function getTokenSetsByManager(address _manager) public view returns (address[] memory) {
    return managerToTokenSets[_manager];
  }

  receive() external payable {}

  fallback() external payable {}
}
