import { expect } from "chai";
import { ethers } from "hardhat";


describe("MerkelProof contract", function () {

  it("Deployment the MerkelProof contract", async function () {
    const [owner] = await ethers.getSigners();
    const receiver = (await ethers.getSigners())[1];

    const uniDirectionalPaymentChannelContract = await ethers.deployContract("MerkelProof", [receiver.address]);

    expect(await uniDirectionalPaymentChannelContract.sender()).to.equal(owner.address);
    expect(await uniDirectionalPaymentChannelContract.receiver()).to.equal(receiver.address);
//    expect(await uniDirectionalPaymentChannelContract.expiresAt()).to.equal(receiver.address);
console.log(
  (await uniDirectionalPaymentChannelContract.expiresAt()).toString()
);

    //const ownerBalance = await hardhatToken.balanceOf(owner.address);
    //expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

});
