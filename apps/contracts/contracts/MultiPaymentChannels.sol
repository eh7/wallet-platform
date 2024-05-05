// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./ECDSA.sol";

contract MultiPaymentChannels {

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

  function hashData(uint256 amount) external view returns (bytes memory){
    return abi.encodePacked(address(this), amount);
  }

  function hash(uint256 amount) external view returns (bytes32){
    return keccak256(abi.encodePacked(address(this), amount));
  }

  function verify(uint256 amount, bytes memory signature) external view returns (bool){
    return isValidSignature(amount, signature);
  }

  // check that the signature is from the payment sender
  function isValidSignature(uint256 amount, bytes memory signature) internal view returns (bool){
    //bytes32 message = prefixed(keccak256(abi.encodePacked(this, amount)));
    //return recoverSigner(message, signature) == sender;
    bytes32 message = keccak256(abi.encodePacked(address(this), amount));
    return message.toEthSignedMessageHash().recover(signature) == sender;
  }

  // the recipient can claim amount authorised by the sender
  // at any time by presenting a signature and amount
  function claim(uint256 amount, bytes memory signature) public {
    require(msg.sender == recipient);
    require(isValidSignature(amount, signature));
    require(address(this).balance >= amount);
    recipient.transfer(amount);
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

  function getEthSignedMessageHash(bytes32 _messageHash)
    public
    pure
    returns (bytes32)
  {
    /*
    Signature is produced by signing a keccak256 hash with the following format:
    "\x19Ethereum Signed Message\n" + len(msg) + msg
    */
    return keccak256(
      abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
    );
  }

  function recoverSigner(
    //bytes32 _ethSignedMessageHash,
    uint256 _amount,
    bytes memory _signature
  ) public view returns (address) {
    (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
    bytes32 messageHash = keccak256(abi.encodePacked(address(this), _amount));
    bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);
     
    return ecrecover(ethSignedMessageHash, v, r, s);
  }

  function splitSignature(bytes memory sig)
    public
    pure
    returns (bytes32 r, bytes32 s, uint8 v)
  {
    require(sig.length == 65, "invalid signature length");

    assembly {
      /*
      First 32 bytes stores the length of the signature

      add(sig, 32) = pointer of sig + 32
      effectively, skips first 32 bytes of signature

      mload(p) loads next 32 bytes starting at the memory address p into memory
      */

      // first 32 bytes, after the length prefix
      r := mload(add(sig, 32))
      // second 32 bytes
      s := mload(add(sig, 64))
      // final byte (first byte of the next 32 bytes)
      v := byte(0, mload(add(sig, 96)))
    }

    // implicitly return (r, s, v)
  }
}
