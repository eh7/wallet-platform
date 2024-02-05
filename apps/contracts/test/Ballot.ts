import { expect } from "chai";
import { ethers } from "hardhat";


describe("Ballot contract", function () {
  it("Deployment should be owned by the send that created the contract", async function () {
    const [owner] = await ethers.getSigners();

    const ballotContract = await ethers.deployContract("Ballot");

    expect(await ballotContract.owner()).to.equal(owner.address);

    //const ownerBalance = await hardhatToken.balanceOf(owner.address);
    //expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
