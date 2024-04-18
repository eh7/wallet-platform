import { expect } from "chai";
import { ethers } from "hardhat";


describe("UniDirectionalPaymentChannel contract", function () {

  it("Deployment the UniDirectionalPaymentChannel contract", async function () {
    const [owner] = await ethers.getSigners();

    const uniDirectionalPaymentChannelContract = await ethers.deployContract("UniDirectionalPaymentChannel", [owner.address]);

//     expect(await uniDirectionalPaymentChannelContract.owner()).to.equal(owner.address);

    //const ownerBalance = await hardhatToken.balanceOf(owner.address);
    //expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

});
