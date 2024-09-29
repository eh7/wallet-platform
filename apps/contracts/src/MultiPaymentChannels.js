const ethers = require("ethers");
const keccak256 = require("keccak256")

require('dotenv').config()

const run = async () => {
  const amount = "0.1";
  const sendAmount = ethers.parseEther(amount);

  //const sender = "0x92dAf44EE49DCdAA21e9dcb90ceb6bd50f20AC1A";
  const sender = "0x7574b8D4C0C2566b671C530d710821EB6694bE0C";
  const receiver = "0xd03b9c07703bC73ccd1586E202C9DdF5af45e81C";

  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const chainId = "31337";
  const channel_hash = keccak256(
    contractAddress,
    sender,
    receiver,
    chainId,
  );
  console.log('channel_hash:', channel_hash.toString('hex'));
}

run();

/*
    const amount = "1.0";
    const sendAmount = ethers.parseEther(amount);

    const sender = (await ethers.getSigners())[0];
    const receiver = (await ethers.getSigners())[1];

    console.log('sender', sender.address);   
    console.log('receiver', receiver.address);   

    const amount = "1.0";
    const sendAmount = ethers.parseEther(amount);
    const contractAddress = multiPaymentChannelsContract.target;
    const chainId = hardhat.network.config.chainId;
    const channel_hash = keccak256(
      contractAddress,
      sender.address,
      receiver.address,
      chainId,
    );

    let authAmount = "0.1";
    const authSendAmount = ethers.parseEther(authAmount);
    let nonce = await multiPaymentChannelsContract.nonce(),
    const payment_hash = keccak256(
      channel_hash,
      authSendAmount,
      nonce,
    );
    console.log('payment_hash', payment_hash.toString('hex'));

    const types = ['address', 'uint256', 'bytes32'];
    const values= [contractAddress, authSendAmount, channel_hash];
    const data = keccak256(
      ethers.solidityPacked(types, values)
    );
    const signature = await sender.signMessage(
      data
    );
    console.log('signature', signature);
    const recoveredSignerAddress = ethers.verifyMessage(data, signature)
    console.log('recoveredSignerAddress', recoveredSignerAddress);
    console.log('sender', sender.address);

*/
