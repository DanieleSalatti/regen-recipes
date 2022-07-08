pragma solidity >=0.8.0 <0.9.0;

//SPDX-License-Identifier: MIT

// import "hardhat/console.sol";

// NOTE : vs code giving warning  on forge-std import but works on compilation ignore it.
import "forge-std/Test.sol";
// import "openzeppelin-contracts/contracts/utils/Address.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract RFStorage is Ownable {
  event AddTokenSet(address owner, address tokenSet, uint256 version);

  address public managerContract;

  struct TokenSet {
    address tokenSet;
    uint256 version;
  }

  mapping(address => TokenSet[]) tokenSets;
  mapping(address => address) tokenSetOwners;

  constructor(address _managerContract) payable {
    managerContract = _managerContract;
  }

  function setManagerContract(address _managerContract) public onlyOwner {
    managerContract = _managerContract;
  }

  function addTokenSet(
    address _owner,
    address _tokenSet,
    uint256 _version
  ) public {
    require(_owner != address(0), "owner cannot be 0");
    require(_tokenSet != address(0), "tokenSet cannot be 0");
    require(_version != 0, "version cannot be 0");
    require(tokenSetOwners[_tokenSet] == address(0), "TokenSet already exists");

    TokenSet memory newTokenSet = TokenSet({ tokenSet: _tokenSet, version: _version });

    tokenSets[_owner].push(newTokenSet);
    tokenSetOwners[_tokenSet] = _owner;

    emit AddTokenSet(_owner, _tokenSet, _version);
  }

  receive() external payable {}

  fallback() external payable {}
}
