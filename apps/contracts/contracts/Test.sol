// SPDX-License-Identifier: UNLICENSED

// Solidity program to show  
// bytecode 
pragma solidity ^0.8.0; 
  
contract Test { 
  function test () public pure returns (string memory) { 
    assembly{
      // assembly language statements
    }
    return 'test'; 
  } 
}
