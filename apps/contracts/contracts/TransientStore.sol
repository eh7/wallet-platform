//SPDX-License-Identifier: UNLICENSED

// This support was introduced with Solidity 0.8.24
pragma solidity ^0.8.24;

contract TransientStoragePage {
  function tstore(uint location, uint value) public {
    assembly {
      tstore(location, value)
    }
  }

  function tload(uint location) view public returns (uint value) {
    assembly {
      value := tload(location)
    }
  }
}
