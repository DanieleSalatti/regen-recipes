pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

// import "hardhat/console.sol";

// NOTE : vs code giving warning  on forge-std import but works on compilation ignore it.
import "forge-std/Test.sol";
// import "openzeppelin-contracts/contracts/utils/Address.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

//custom errors
error INVALID_OWNER();
error INVALID_TOKEN_SET();

contract RFStorage is Ownable {
  event AddTokenSet(address manager, address tokenSet);

  mapping(address => address[]) public managerToTokenSets;
  mapping(address => address) public tokenSetToManager;

  constructor(address _owner) payable {
    transferOwnership(_owner);
  }

  function addTokenSet(address _manager, address _tokenSet) public {
    if (_manager == address(0)) {
      revert INVALID_OWNER();
    }

    if (_tokenSet == address(0) || tokenSetToManager[_tokenSet] != address(0)) {
      revert INVALID_TOKEN_SET();
    }

    managerToTokenSets[_manager].push(_tokenSet);
    tokenSetToManager[_tokenSet] = _manager;

    emit AddTokenSet(_manager, _tokenSet);
  }

  function getTokenSetsByManager(address _manager) public view returns (address[] memory) {
    return managerToTokenSets[_manager];
  }

  receive() external payable {}

  fallback() external payable {}
}
