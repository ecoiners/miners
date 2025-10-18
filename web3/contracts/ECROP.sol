// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ECROP {
  uint256 private constant SUPPLY = 400_000_000;
  
  constructor() ERC20 ("ECROP100", "E100") {
    _mint(msg.sender, SUPPLY * (10**decimals()));
  }
}

