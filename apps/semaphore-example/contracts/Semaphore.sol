pragma solidity ^0.8.23;

import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract YourContract {
    ISemaphore public semaphore;

    uint256 public groupId;

    constructor(ISemaphore _semaphore) {
        semaphore = _semaphore;

        groupId = semaphore.createGroup();
    }
}
