pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

interface ISetTokenCreator {
  function create(
    address[] memory _components,
    int256[] memory _units,
    address[] memory _modules,
    address _manager,
    string memory _name,
    string memory _symbol
  ) external returns (address);
}
