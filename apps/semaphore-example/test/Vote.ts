import { expect } from "chai";
import { ethers } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { Group, Identity, generateProof } from "@semaphore-protocol/core"

import { encodeBytes32String } from "ethers"

import { run } from "hardhat"

describe("Vote Semaphore test contract", function () {

  async function deployContractFixture() {
    const { semaphore } = await run("deploy:semaphore", {
      logs: false
    })

    const semaphoreContract: ISemaphore = semaphore

    const baseContract = "Vote";

    const voteContract: Feedback = await run("deploy", {
      logs: false,
      semaphore: await semaphoreContract.getAddress(),
      baseContract,
    })

    const groupId = await voteContract.groupId()

    return { semaphoreContract, voteContract, groupId }
  }

  describe("# joinGroup", () => {
    it("Should allow users to join the group", async () => {
      const { semaphoreContract, voteContract, groupId } = await loadFixture(deployContractFixture)

      const users = [new Identity(), new Identity()]

      const group = new Group()

      for (const [i, user] of users.entries()) {
        const transaction = await voteContract.joinGroup(user.commitment)
        group.addMember(user.commitment)

        await expect(transaction)
           .to.emit(semaphoreContract, "MemberAdded")
           .withArgs(groupId, i, user.commitment, group.root)
      }
    })
  });

  describe("# castVote", () => {
    it("Should allow users to send voteContract anonymously", async () => {
      const { semaphoreContract, voteContract, groupId } = await loadFixture(deployContractFixture)

      const users = [new Identity(), new Identity()]
      const group = new Group()

      for (const user of users) {
        await voteContract.joinGroup(user.commitment)
        group.addMember(user.commitment)
      }

      //const voteContract = encodeBytes32String("Hello World")
      const types = ['string', 'string'];
      const values = ["best colour", "green"];
      const vote = ethers.keccak256(
        ethers.solidityPacked(types, values)
      )
      //console.log('hashed vote:', vote);
      const hashVoteContract = await voteContract.hashVote(
        "best colour",
        "green",
      );
      //console.log('hashed vote:', hashVoteContract);
      expect(vote).to.equal(hashVoteContract);

      const proof = await generateProof(users[1], group, vote, groupId)

      const transaction = voteContract.castVote(
        proof.merkleTreeDepth,
        proof.merkleTreeRoot,
        proof.nullifier,
        vote,
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
  describe("# deposit", () => {
    it.skip("Should allow users to send deposit anonymously", async () => {
      const { semaphoreContract, vote, groupId } = await loadFixture(deployContractFixture)

      const users = [new Identity(), new Identity()]
      const group = new Group()

      for (const user of users) {
        await vote.joinGroup(user.commitment)
        group.addMember(user.commitment)
      }

      const identityCommitment = users[0].commitment;

      const ethAmount = "0.1"

      //const vote = encodeBytes32String("Hello World")

      const transaction = vote.deposit(
	identityCommitment, {
          value: ethers.parseEther("0.1")
        }
      )

    })
  })
  */

});
