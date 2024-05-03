// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./ECDSA.sol";

contract PaymentChannel {

  using ECDSA for bytes32;

  address payable public sender;   // the account sending payments
  address payable public recipient;  // the account receiving the payments
  uint256 public expiration;     // timeout in case the recipient never closes the channel

  // in the constructor pass in the recipient address and the duration of the payment channel
  constructor (address payable _recipient, uint256 duration) payable {
    sender = payable(msg.sender);
    recipient = _recipient;
    expiration = block.timestamp + duration;
  }

  // check that the signature is from the payment sender
  function isValidSignature(uint256 amount, bytes memory signature) internal view returns (bool){
    //bytes32 message = prefixed(keccak256(abi.encodePacked(this, amount)));
    //return recoverSigner(message, signature) == sender;
    bytes32 message = keccak256(abi.encodePacked(address(this), amount));
    return message.toEthSignedMessageHash().recover(signature) == sender;
  }

  // the recipient can close the channel at any time by presenting a
  // signed amount from the sender. the recipient will be sent that amount,
  // and the remainder will go back to the sender
  function close(uint256 amount, bytes memory signature) public {
    require(msg.sender == recipient);
    require(isValidSignature(amount, signature));
    recipient.transfer(amount);
    selfdestruct(sender);
  }

  // the sender can extend the expiration of the contract at any time
  function extend(uint256 newExpiration) public {
    require(msg.sender == sender);
    require(newExpiration > expiration);
    expiration = newExpiration;
  }

  // if the timeout is reached without the recipient closing the channel,
  // then the Ether is released back to the sender.
  function claimTimeout() public {
    require(block.timestamp >= expiration);
    //sender.transfer(amount);
    selfdestruct(sender);
  }
}
