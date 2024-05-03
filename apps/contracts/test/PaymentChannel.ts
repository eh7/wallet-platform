import { expect } from "chai";
import { ethers } from "hardhat";
import keccak256 from "keccak256";

describe("PaymentChannel contract", function () {

  it("Deployment the PaymentChannel contract, and check sender, recipient, expiration, contrcat eth balance is setup okay", async function () {

    const [owner] = await ethers.getSigners();
    const receiver = (await ethers.getSigners())[1];

    const duration = 7 * 24 * 60 * 60;

    const amount = "1.0";
    const sendAmount = ethers.parseEther(amount);

    const paymentChannelContract = await ethers.deployContract("PaymentChannel", [receiver.address, duration], {
      value: sendAmount,
    });

    expect(
      await paymentChannelContract.sender()
    ).to.equal(
      owner.address
    );

    expect(
      await paymentChannelContract.recipient()
    ).to.equal(
      receiver.address
    );

    expect(
      (await paymentChannelContract.expiration()) > 0
    ).to.be.true;

    let contractBalance = ethers.formatEther(
      (await ethers.provider.getBalance(
        paymentChannelContract.target,
      )).toString()
    );
    expect(contractBalance).to.equal(amount);
  });


  it("Check varify signature", async function () {
    const [owner] = await ethers.getSigners();
    const receiver = (await ethers.getSigners())[1];
    const duration = 7 * 24 * 60 * 60;
    const amount = "1.0";
    const sendAmount = ethers.parseEther(amount);
    const paymentChannelContract = await ethers.deployContract("PaymentChannel", [receiver.address, duration], {
      value: sendAmount,
    });

    const contractAddress = paymentChannelContract.target;// '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
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
      await paymentChannelContract.recoverSigner(dataToSign, signature)
    ).to.equal(
      owner.address
    );

    console.log(
      paymentChannelContract.target + "\n",
      await paymentChannelContract.hashData(dataToSign) + "\n",
      await paymentChannelContract.hash(dataToSign),
      await paymentChannelContract.verify(dataToSign, signature),
      await paymentChannelContract.splitSignature(signature),
      await paymentChannelContract.recoverSigner(dataToSign, signature)
    );
  });

});
