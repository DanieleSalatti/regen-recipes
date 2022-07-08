pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

// import "hardhat/console.sol";

// NOTE : vs code giving warning  on forge-std import but works on compilation ignore it.
import "forge-std/Test.sol";
// import "openzeppelin-contracts/contracts/utils/Address.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

// import { ISetToken } from "@setprotocol/set-protocol-v2/contracts/interfaces/ISetToken.sol";

contract RFManager is Ownable {
  address public SetTokenCreator;
  address public Controller;
  address public IntegrationRegistry;
  address public PriceOracle;
  address public SetValuer;
  address public ProtocolViewer;

  constructor(
    address _SetTokenCreator,
    address _Controller,
    address _IntegrationRegistry,
    address _PriceOracle,
    address _SetValuer,
    address _ProtocolViewer
  ) public payable {
    SetTokenCreator = _SetTokenCreator;
    Controller = _Controller;
    IntegrationRegistry = _IntegrationRegistry;
    PriceOracle = _PriceOracle;
    SetValuer = _SetValuer;
    ProtocolViewer = _ProtocolViewer;
  }

  function setSetTokenCreator(address _SetTokenCreator) public onlyOwner {
    SetTokenCreator = _SetTokenCreator;
  }

  function setController(address _Controller) public onlyOwner {
    Controller = _Controller;
  }

  function setIntegrationRegistry(address _IntegrationRegistry) public onlyOwner {
    IntegrationRegistry = _IntegrationRegistry;
  }

  function setPriceOracle(address _PriceOracle) public onlyOwner {
    PriceOracle = _PriceOracle;
  }

  function setSetValuer(address _SetValuer) public onlyOwner {
    SetValuer = _SetValuer;
  }

  receive() external payable {}

  fallback() external payable {}
}
