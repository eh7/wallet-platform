import { expect } from "chai";
import { ethers } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { Group, Identity, generateProof } from "@semaphore-protocol/core"

import { run } from "hardhat"

describe("YourContract Semaphore test contract", function () {

  async function deployFeedbackFixture() {
    const { semaphore } = await run("deploy:semaphore", {
      logs: false
    })

    const semaphoreContract: ISemaphore = semaphore

    const feedbackContract: Feedback = await run("deploy", {
      logs: false,
      semaphore: await semaphoreContract.getAddress()
    })

    const groupId = await feedbackContract.groupId()

    return { semaphoreContract, feedbackContract, groupId }
  }

  it("Check Semaphore Contracts Deploy Okay", async function () {
    //const [owner] = await ethers.getSigners();

    const { semaphoreContract, feedbackContract, groupId } = await loadFixture(deployFeedbackFixture)

/*
    const { semaphore } = await run("deploy:semaphore", {
      logs: false
    })

    await run("hello", {}); 
    await run("hello1", {}); 
    await run("test1", {}); 
    await run("test2", {}); 

    const ISemaphoreContract = await ethers.deployContract("ISemaphore");
    const yourContract = await ethers.deployContract("YourContract",{
      ISemaphoreContract,
    });

    //expect(await yourContract.owner()).to.equal(owner.address);

    //const ownerBalance = await hardhatToken.balanceOf(owner.address);
    //expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
*/
  });
});
