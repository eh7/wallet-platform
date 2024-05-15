import { expect } from "chai";
import { ethers } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { Group, Identity, generateProof } from "@semaphore-protocol/core"

import { encodeBytes32String } from "ethers"

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

    expect(groupId).to.equal(0);

    //console.log(groupId.toString());

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

  describe("# joinGroup", () => {
    it("Should allow users to join the group", async () => {
      const { semaphoreContract, feedbackContract, groupId } = await loadFixture(deployFeedbackFixture)

      const users = [new Identity(), new Identity()]

      const group = new Group()

      for (const [i, user] of users.entries()) {
        const transaction = await feedbackContract.joinGroup(user.commitment)
        group.addMember(user.commitment)

        await expect(transaction)
           .to.emit(semaphoreContract, "MemberAdded")
           .withArgs(groupId, i, user.commitment, group.root)
      }
    })
  });

  describe("# sendFeedback", () => {
    it("Should allow users to send feedback anonymously", async () => {
      const { semaphoreContract, feedbackContract, groupId } = await loadFixture(deployFeedbackFixture)

      const users = [new Identity(), new Identity()]
      const group = new Group()

      for (const user of users) {
        await feedbackContract.joinGroup(user.commitment)
        group.addMember(user.commitment)
      }

      const feedback = encodeBytes32String("Hello World")

      const proof = await generateProof(users[1], group, feedback, groupId)

      const transaction = feedbackContract.sendFeedback(
        proof.merkleTreeDepth,
        proof.merkleTreeRoot,
        proof.nullifier,
        feedback,
        proof.points
      )

      await expect(transaction)
        .to.emit(semaphoreContract, "ProofValidated")
        .withArgs(
          groupId,
          proof.merkleTreeDepth,
          proof.merkleTreeRoot,
          proof.nullifier,
          proof.message,
          groupId,
          proof.points
        )
    })
  })
/*
*/

});
