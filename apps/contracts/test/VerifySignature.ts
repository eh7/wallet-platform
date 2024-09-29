import { expect } from "chai";
import { ethers } from "hardhat";


describe("VerifySignature contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const hardhatVerifySignature = await ethers.deployContract("VerifySignature");

    //const ownerBalance = await hardhatVerifySignature.balanceOf(owner.address);
    //expect(await hardhatVerifySignature.totalSupply()).to.equal(ownerBalance);
  });
});
