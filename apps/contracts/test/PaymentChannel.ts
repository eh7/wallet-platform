import { expect } from "chai";
import { ethers } from "hardhat";

describe("PaymentChannel contract", function () {

  it("Deployment the PaymentChannel contract", async function () {
    const [owner] = await ethers.getSigners();
    const receiver = (await ethers.getSigners())[1];

    const duration = 7 * 24 * 60 * 60;

    //const sendAmount = ethers.utils.parseEther("1.0");
    const amount = "1.0";
    const sendAmount = ethers.parseEther(amount);

    const paymentChannel = await ethers.deployContract("PaymentChannel", [receiver.address, duration], {
      value: sendAmount,
    });
/*
    const uniDirectionalPaymentChannelContract = await ethers.deployContract("PaymentChannel", [receiver.address], {
      value: sendAmount,
    });

    let contractBalance = ethers.formatEther(
      (await ethers.provider.getBalance(
        uniDirectionalPaymentChannelContract.target,
      )).toString()
    );

    expect(contractBalance).to.equal(amount);
*/
/*
    console.log(
      uniDirectionalPaymentChannelContract.target,
      contractBalance,
    );
*/
/*  
    const authedAmount = "0.1";
    const signAuthedAmount = ethers.parseEther(authedAmount);

    const hash = await uniDirectionalPaymentChannelContract.getHash(signAuthedAmount);
    console.log(hash);

    console.log('1',await uniDirectionalPaymentChannelContract.sender());
    console.log('2',owner.address);

    const sig = await owner.signMessage(hash)
//    const sig = await owner.signMessage(ethers.utils.arrayify(hash))
console.log(sig);

    const verify = await uniDirectionalPaymentChannelContract.verify(signAuthedAmount, sig);
    console.log(verify);
*/
  });

});
