import { expect } from "chai";
import { ethers } from "hardhat";

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

    const dataToSign = ethers.parseEther("0.1");
    //const signature = '0x1f88ed57be3c174a37e7c1f012701a907984262f4354b77c5fe31c82f88cb42538233b117b4d276e46408b633047000073f2716fa1ad9f0780b576bcdc9a728f1c';
    const signature = '0x11125e14c61cf3fa1a5faae01dcdeb3306a2b379ddfa425b5cb84de8eb8ccd8b0188764ff1863b2103f03a33c513fb3a5e9cba8f9902ce6efa0ad189bbb299d21b';

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
