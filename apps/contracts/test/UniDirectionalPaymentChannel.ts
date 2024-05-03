import { expect } from "chai";
import { ethers } from "hardhat";

describe("UniDirectionalPaymentChannel contract", function () {

  it("Deployment the UniDirectionalPaymentChannel contract", async function () {
    const [owner] = await ethers.getSigners();
    const receiver = (await ethers.getSigners())[1];

    //const sendAmount = ethers.utils.parseEther("1.0");
    const amount = "1.0";
    const sendAmount = ethers.parseEther(amount);

    const uniDirectionalPaymentChannelContract = await ethers.deployContract("UniDirectionalPaymentChannel", [receiver.address], {
      value: sendAmount,
    });

    let contractBalance = ethers.formatEther(
      (await ethers.provider.getBalance(
        uniDirectionalPaymentChannelContract.target,
      )).toString()
    );

    expect(contractBalance).to.equal(amount);

    /*
    console.log(
      uniDirectionalPaymentChannelContract.target,
      contractBalance,
    );
    */
   
    const authedAmount = "0.1";
    const signAuthedAmount = ethers.parseEther(authedAmount);

    const hash = await uniDirectionalPaymentChannelContract.getHash(signAuthedAmount);
    console.log(hash);

    console.log('1',await uniDirectionalPaymentChannelContract.sender());
    console.log('2',owner.address);

    const sig = await owner.signMessage(hash)
//    const sig = await owner.signMessage(ethers.utils.arrayify(hash))
console.log(sig);

    //const verify = await uniDirectionalPaymentChannelContract.verify(signAuthedAmount, sig);
    const verify = await uniDirectionalPaymentChannelContract.verify(signAuthedAmount, sig);
    console.log(verify);

/*
    const signedMessage = await uniDirectionalPaymentChannelContract.getEthSignedHash(signAuthedAmount)
    console.log(
      'signedMessage',
      signedMessage,
    );

    const verify = await uniDirectionalPaymentChannelContract.verify(signAuthedAmount, signedMessage);

    expect(await uniDirectionalPaymentChannelContract.sender()).to.equal(owner.address);
    expect(await uniDirectionalPaymentChannelContract.receiver()).to.equal(receiver.address);
*/

//    expect(await uniDirectionalPaymentChannelContract.expiresAt()).to.equal(receiver.address);
//console.log(
//  (await uniDirectionalPaymentChannelContract.expiresAt()).toString()
//);

    //const ownerBalance = await hardhatToken.balanceOf(owner.address);
    //expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

});
