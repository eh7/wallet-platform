import { expect } from "chai";
import { ethers } from "hardhat";


describe("UniDirectionalPaymentChannel contract", function () {

  it("Deployment the UniDirectionalPaymentChannel contract", async function () {
    const [owner] = await ethers.getSigners();
    const receiver = (await ethers.getSigners())[1];

    //const uniDirectionalPaymentChannelContract = await ethers.deployContract("UniDirectionalPaymentChannel", [owner.address]);
    const uniDirectionalPaymentChannelContract = await ethers.deployContract("UniDirectionalPaymentChannel", [receiver.address]);

    //console.log((await ethers.getSigners())[1].address);

    expect(await uniDirectionalPaymentChannelContract.sender()).to.equal(owner.address);
    expect(await uniDirectionalPaymentChannelContract.receiver()).to.equal(receiver.address);

    //const ownerBalance = await hardhatToken.balanceOf(owner.address);
    //expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

});
