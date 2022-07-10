pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

// import "hardhat/console.sol";

// NOTE : vs code giving warning  on forge-std import but works on compilation ignore it.
import "forge-std/Test.sol";
// import "openzeppelin-contracts/contracts/utils/Address.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

import "./RFStorage.sol";
import { ISetToken } from "./set-protocol-v2/ISetToken.sol";
import { ISetTokenCreator } from "./set-protocol-v2/ISetTokenCreator.sol";

contract RFManager is Ownable, ISetTokenCreator {
  ISetTokenCreator public setTokenCreator;

  RFStorage public rfStorage;

  constructor(address _owner) payable {
    transferOwnership(_owner);
  }

  function create(
    address[] memory _components,
    int256[] memory _units,
    address[] memory _modules,
    address _manager,
    string memory _name,
    string memory _symbol
  ) external returns (address) {
    address newSet = setTokenCreator.create(_components, _units, _modules, _manager, _name, _symbol);

    rfStorage.addTokenSet(_manager, newSet, 2);

    return newSet;
  }

  function setRFStorage(address payable _rfStorage) public onlyOwner {
    rfStorage = RFStorage(_rfStorage);
  }

  function setSetTokenCreator(address _setTokenCreator) public onlyOwner {
    setTokenCreator = ISetTokenCreator(_setTokenCreator);
  }

  receive() external payable {}

  fallback() external payable {}
}
