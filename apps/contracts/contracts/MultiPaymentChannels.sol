// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./ECDSA.sol";

contract MultiPaymentChannels {

  using ECDSA for bytes32;

  //address payable public sender;   // the account sending payments
  //address payable public recipient;  // the account receiving the payments
  //uint256 public expiration;     // timeout in case the recipient never closes the channel

  // new variables to hold values for authorised payments
  // in the multi payment channel
  uint256 public nonce = 0;
  mapping(address => bytes32) root;
  mapping(address => uint256) public balance;
  mapping(bytes32 => bool) channel;
  mapping(bytes32 => address) channelSender;
  mapping(bytes32 => bool) payed;

  /*
    // channel, payment and transaction hash deffinitions
    // to be used in multi payment channel setupand operation

    channel hash (
      constrcatAddress,
      sender,
      receiver,
      chaninId,
    )

    payment hash (
      channel hash,
      amount,
      //nonce,
    )

    transaction hash (
      channel hash,
      payment hash,
      nonce,
      signature
    )

  */

  // in the constructor pass in the recipient address and the duration of the payment channel
  constructor () {
  }
  /*
  constructor (address payable _recipient, uint256 duration) payable {
    sender = payable(msg.sender);
    recipient = _recipient;
    expiration = block.timestamp + duration;
  }
  */

  // WIP: function create or add balance to a payment channel 
  function createPaymentChannel(bytes32 hash) external payable returns (bytes memory){
    require(!channel[hash]);
    channel[hash] = true;
    channelSender[hash] = msg.sender;
    balance[msg.sender] += msg.value;
    //sender = payable(msg.sender);
    //recipient = _recipient;
    //expiration = block.timestamp + duration;
  }

  // WIP
  function creditSenderBalance() external payable {
    balance[msg.sender] += msg.value;
  }

  // WIP
  //function withdrawBalance() external payable {
  function withdrawBalance() external {
    uint256 amount = balance[msg.sender];
    require(
      balance[msg.sender] >= amount,
      "amount greater than contract balance[msg.sender]"
    );
    require(
      address(this).balance >= amount,
      "balance greater than contract balance"
    );

    balance[msg.sender] = 0;

    (bool success,) = msg.sender.call{value: amount}("");
    //(bool success,) = payable(msg.sender).transfer(amount);
    require(success, "Failed to send Ether");
  }

  // WIP
  function isValidChannelHashSignature(
    bytes32 channel_hash,
    uint256 amount,
    bytes memory signature
  ) internal view returns (bool){
  //) external view returns (bytes memory){
    //return abi.encodePacked(address(this), amount, channel_hash);

    bytes32 message = keccak256(abi.encodePacked(address(this), amount, channel_hash));
    return message.toEthSignedMessageHash().recover(signature) == channelSender[channel_hash];
  }

  // WIP
  function claimChannelHashSignature(
    bytes32 channel_hash,
    uint256 amount,
    bytes memory signature
  ) external returns (bool){
    //require(isValidSignature(amount, signature));
    require(isValidChannelHashSignature(
      channel_hash,
      amount,
      signature
    ));
    require(address(this).balance >= amount);
    require(
      balance[
        channelSender[channel_hash]
      ] >= amount
    );
    balance[
      channelSender[channel_hash]
    ] -= amount;
    payable(msg.sender).transfer(amount);
  }

  // WIP
  function addressOfChannelHashSignature(
    bytes32 channel_hash,
    uint256 amount,
    bytes memory signature
  ) external view returns (address){
  //) external view returns (bytes memory){
    //return abi.encodePacked(address(this), amount, channel_hash);

    bytes32 message = keccak256(abi.encodePacked(address(this), amount, channel_hash));
    return message.toEthSignedMessageHash().recover(signature);
  }

/*
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
*/

/*
  function getEthSignedMessageHash(bytes32 _messageHash)
    public
    pure
    returns (bytes32)
  {
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
      // first 32 bytes, after the length prefix
      r := mload(add(sig, 32))
      // second 32 bytes
      s := mload(add(sig, 64))
      // final byte (first byte of the next 32 bytes)
      v := byte(0, mload(add(sig, 96)))
    }

    // implicitly return (r, s, v)
  }
*/
}
