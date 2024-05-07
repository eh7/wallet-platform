import { expect } from "chai";
import hardhat, { ethers } from "hardhat";
import keccak256 from "keccak256";

const getBalance = async (ethers, address) => {
  const balance = ethers.formatEther(
    (await ethers.provider.getBalance(
      address,
    )).toString()
  );
  console.log('balance (', address, ')', balance);
}

const formatBalance = async (ethers, amount, tag) => {
  const balance = ethers.formatEther(
    amount.toString()
  );
  console.log('contract balance (', tag, '): ', balance);
}


describe("MultiPaymentChannels contract", function () {

  it.skip("Deployment the MultiPaymentChannels contract, and check sender, recipient, expiration, contrcat eth balance is setup okay", async function () {

    const [owner] = await ethers.getSigners();
    const receiver = (await ethers.getSigners())[1];

    const duration = 7 * 24 * 60 * 60;

    const amount = "1.0";
    const sendAmount = ethers.parseEther(amount);

    const multiPaymentChannelsContract = await ethers.deployContract("MultiPaymentChannels", [receiver.address, duration], {
      value: sendAmount,
    });

    expect(
      await multiPaymentChannelsContract.sender()
    ).to.equal(
      owner.address
    );

    expect(
      await multiPaymentChannelsContract.recipient()
    ).to.equal(
      receiver.address
    );

    expect(
      (await multiPaymentChannelsContract.expiration()) > 0
    ).to.be.true;

    let contractBalance = ethers.formatEther(
      (await ethers.provider.getBalance(
        multiPaymentChannelsContract.target,
      )).toString()
    );
    expect(contractBalance).to.equal(amount);
  });


  it.skip("Check varify signature", async function () {
    const [owner] = await ethers.getSigners();
    const receiver = (await ethers.getSigners())[1];

    console.log('sender', owner.address);   
    console.log('receiver', receiver.address);   

    const duration = 7 * 24 * 60 * 60;
    const amount = "1.0";
    const sendAmount = ethers.parseEther(amount);
    const multiPaymentChannelsContract = await ethers.deployContract("MultiPaymentChannels", [receiver.address, duration], {
      value: sendAmount,
    });

    const contractAddress = multiPaymentChannelsContract.target;// '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
    const dataToSign = ethers.parseEther("0.1");
    //const signature = '0x11125e14c61cf3fa1a5faae01dcdeb3306a2b379ddfa425b5cb84de8eb8ccd8b0188764ff1863b2103f03a33c513fb3a5e9cba8f9902ce6efa0ad189bbb299d21b';

    const types = ['address', 'uint256'];
    const values= [contractAddress, dataToSign];
    const data = keccak256(
      ethers.solidityPacked(types, values)
    );
    const signature = await owner.signMessage(
      data
    );

    expect(
      await multiPaymentChannelsContract.recoverSigner(dataToSign, signature)
    ).to.equal(
      owner.address
    );

    getBalance(ethers, multiPaymentChannelsContract.target);
    getBalance(ethers, owner.address);
    getBalance(ethers, receiver.address);

    await multiPaymentChannelsContract.connect(
      receiver
    ).claim(
      dataToSign,
      signature,
    );

    getBalance(ethers, multiPaymentChannelsContract.target);
    getBalance(ethers, owner.address);
    getBalance(ethers, receiver.address);

    /*
    console.log(
      multiPaymentChannelsContract.target + "\n",
      await multiPaymentChannelsContract.hashData(dataToSign) + "\n",
      await multiPaymentChannelsContract.hash(dataToSign),
      await multiPaymentChannelsContract.verify(dataToSign, signature),
      await multiPaymentChannelsContract.splitSignature(signature),
      await multiPaymentChannelsContract.recoverSigner(dataToSign, signature)
    );
    */
  });

  it("Check create, send recieve and close based on signature", async function () {
    /*

    channel hash (
      constrcatAddress,
      sender,
      receiver,
      chaninId,
    )

    payment hash (
      channel hash,
      amount,
      nonce,
    )

    transaction hash (
      channel hash,
      payment hash,
      signature
    )

    */

    const sender = (await ethers.getSigners())[0];
    const receiver = (await ethers.getSigners())[1];

    console.log('sender', sender.address);   
    console.log('receiver', receiver.address);   

    const multiPaymentChannelsContract = await ethers.deployContract("MultiPaymentChannels", [], {
    });

    //const duration = 7 * 24 * 60 * 60;
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

    await multiPaymentChannelsContract.createPaymentChannel(
      channel_hash,
      {
        value: sendAmount,
      }
    );

    getBalance(ethers, multiPaymentChannelsContract.target);
    getBalance(ethers, sender.address);
    getBalance(ethers, receiver.address);

    formatBalance(
      ethers,
      await multiPaymentChannelsContract.balance(sender.address),
      sender.address
    );

    await multiPaymentChannelsContract.creditSenderBalance({
      value: sendAmount,
    });

    //
    // WIP :: test signature creation/verification off chain
    //
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

    const signature_data_address = await multiPaymentChannelsContract.connect(receiver).addressOfChannelHashSignature(
      channel_hash,
      authSendAmount,
      signature,
    );
    console.log('signature_data_address', signature_data_address);
    //console.log(signature_data_address);
    //console.log(ethers.solidityPacked(types, values));
    //console.log(channel_hash.toString('hex'));

    /*
    const isValid = await multiPaymentChannelsContract.connect(receiver).isValidChannelHashSignature(
      channel_hash,
      authSendAmount,
      signature,
    );
    console.log(isValid);
    */

    console.log('before .claimChannelHashSignature');
    getBalance(ethers, sender.address);
    getBalance(ethers, receiver.address);
    await multiPaymentChannelsContract.connect(receiver).claimChannelHashSignature(
      channel_hash,
      authSendAmount,
      signature,
    );
    console.log('after .claimChannelHashSignature');
    getBalance(ethers, sender.address);
    getBalance(ethers, receiver.address);


    // END WIP

    formatBalance(
      ethers,
      await multiPaymentChannelsContract.balance(sender.address),
      sender.address
    );
    getBalance(ethers, multiPaymentChannelsContract.target);

    getBalance(ethers, sender.address);
    await multiPaymentChannelsContract.withdrawBalance();

    formatBalance(
      ethers,
      await multiPaymentChannelsContract.balance(sender.address),
      sender.address
    );
    getBalance(ethers, multiPaymentChannelsContract.target);
    getBalance(ethers, sender.address);



    //await multiPaymentChannelsContract.createPaymentChannel(
    //  channel_hash,
    //  {
    //    value: sendAmount,
    //  }
    //);
  });

});
