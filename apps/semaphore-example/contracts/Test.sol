// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.23;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract Test {

  uint256 constant public UINT_1 = 99;

  function test(uint256 _int_in)
    external pure
    returns(uint256)
  {
    return _int_in;
  }

  function test()
    external pure
    returns(uint256)
  {
    return UINT_1;
  }

  function test(string memory int_string)
    external pure
    returns(string memory)
  {
    return int_string;
  }
}
