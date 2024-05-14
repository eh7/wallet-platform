import { expect } from "chai";
import { ethers } from "hardhat";


describe("YourContract Semaphore test contract", function () {
  it("Deployment should be owned by the send that created the contract", async function () {
    //const [owner] = await ethers.getSigners();

    const ISemaphoreContract = await ethers.deployContract("ISemaphore");
    const yourContract = await ethers.deployContract("YourContract",{
      ISemaphoreContract,
    });

    //expect(await yourContract.owner()).to.equal(owner.address);

    //const ownerBalance = await hardhatToken.balanceOf(owner.address);
    //expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
