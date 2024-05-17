import { expect } from "chai";
import { ethers, BigNumber } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { Group, Identity, generateProof } from "@semaphore-protocol/core"

import { encodeBytes32String } from "ethers"

import { run } from "hardhat"

describe("Vote Semaphore test contract", function () {

  let accounts: any;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
  })

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

  async function getEvent(
    contract: Contract,
    tx: TransactionResponse,
    eventName: string,
  ) {
    const receipt = await tx.wait();
    if (receipt?.logs) {
      for (const log of receipt.logs) {
        const event = contract.interface.parseLog(log);
        if (event?.name === eventName) {
          return event;
        }
      }
    }
    return null;
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

      //const transaction = await voteContract.connect(accounts[0]).castVote(
      const transaction = await voteContract.castVote(
        proof.merkleTreeDepth,
        proof.merkleTreeRoot,
        proof.nullifier,
        vote,
        proof.points
      )

      // wait for 5 seconds example - commented out not needed
      //await new Promise(res => setTimeout(() => res(null), 5000));

//      console.log(transaction.hash)

      const receipt = await transaction.wait();

//      console.log(
//        receipt,
//        receipt?.logs,
//        receipt.logs?.filter((x) => {
//          return x.event == "Voted"
//        })
//      );

      const eventVoted = (
	(
          await getEvent(
            voteContract,
            transaction,
            "Voted",
	  )
        ).args[0]
      )
      //  ethers.BigNumber.from(eventVoted).toHexString(),

      console.log(
        'Voted',
        typeof eventVoted,
        ethers.toBeHex(eventVoted),
	//eventVoted.toBeHex(),
        eventVoted,
//        (await getEvent(
//          voteContract,
//          transaction,
//          "Voted",
//	)).args[0]
      )

      expect(transaction)
        .to.emit(semaphoreContract, "Voted")
        .withArgs(
          vote, 
        )

      expect(transaction)
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
