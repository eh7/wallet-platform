import { expect } from "chai";
import { ethers } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { Group, Identity, generateProof } from "@semaphore-protocol/core"

import { encodeBytes32String } from "ethers"

import { run } from "hardhat"

const TX_AMOUNT = "1"

const getBalance = async (address) => {
  const balance = ethers.formatEther(
    (await ethers.provider.getBalance(
      address,
    )).toString()
  );
  console.log('balance (', address, ')', balance);
}

describe("Mixer Semaphore test contract", function () {

  let accounts: any;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
  })

  async function deployContractFixture() {
    const { semaphore } = await run("deploy:semaphore", {
      logs: false
    })

    const semaphoreContract: ISemaphore = semaphore

    const baseContract = "Mixer";

    const mixer: Feedback = await run("deploy", {
      logs: false,
      semaphore: await semaphoreContract.getAddress(),
      baseContract,
    })

    const groupId = await mixer.groupId()

    return { semaphoreContract, mixer, groupId }
  }

  it.skip("Check Semaphore Contracts Deploy Okay", async function () {
    //const [owner] = await ethers.getSigners();

    const { semaphoreContract, mixer, groupId } = await loadFixture(deployContractFixture)

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
    const yourContract = await ethers.deployContract("Mixer",{
      ISemaphoreContract,
    });

    //expect(await yourContract.owner()).to.equal(owner.address);

    //const ownerBalance = await hardhatToken.balanceOf(owner.address);
    //expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
*/
  });

  describe("# joinGroup", () => {
    it("Should allow users to join the group", async () => {
      const { semaphoreContract, mixer, groupId } = await loadFixture(deployContractFixture)

      const users = [new Identity(), new Identity()]

      const group = new Group()

      for (const [i, user] of users.entries()) {
        const transaction = await mixer.joinGroup(user.commitment)
        group.addMember(user.commitment)

        await expect(transaction)
           .to.emit(semaphoreContract, "MemberAdded")
           .withArgs(groupId, i, user.commitment, group.root)
      }
    })
  });

  describe("# deposit and withdraw cycle", () => {
    it("Should allow users to send deposit anonymously", async () => {
      const { semaphoreContract, mixer, groupId } = await loadFixture(deployContractFixture)

      const users = [new Identity(), new Identity()]
      const group = new Group()

      for (const user of users) {
        await mixer.joinGroup(user.commitment)
        group.addMember(user.commitment)
      }

      const nonce = 0;
      const types = ['string', 'string', 'uint256'];
      const values = ["pay", "gavin", nonce];
      const paymentHash = ethers.keccak256(
        ethers.solidityPacked(types, values)
      )

      const proof = await generateProof(users[1], group, paymentHash, groupId)

      const identityCommitment = users[1].commitment;

      const ethAmount = "0.1"

      getBalance(mixer.target);

      const transaction = await mixer.deposit(
	identityCommitment, {
	  value: ethers.parseEther(
            TX_AMOUNT,
          )
	  //value: ethers.parseEther("0.01")
        }
      )

      //console.log(transaction);
      getBalance(mixer.target);
      getBalance(accounts[0].address);
      getBalance(accounts[1].address);

      const withdrawTransaction = await mixer.connect(accounts[1]).withdraw(
        proof.merkleTreeDepth,
        proof.merkleTreeRoot,
        proof.nullifier,
        paymentHash, 
        proof.points
      )

      //const withdrawReceipt = await withdrawTransaction.wait();

      getBalance(accounts[0].address);
      getBalance(accounts[1].address);

      //
      // make sure it will not take another payment with same nullifier
      // this should rever OR you will get test errort
      //
     // await expect(mixer.castVote(
      await expect(mixer.connect(accounts[1]).withdraw(
        proof.merkleTreeDepth,
        proof.merkleTreeRoot,
        proof.nullifier,
        paymentHash, 
        proof.points
      )).to.be.reverted

      /*
      const transaction = mixer.deposit(
        proof.merkleTreeDepth,
        proof.merkleTreeRoot,
        proof.nullifier,
        feedback,
        proof.points
      )
      */

    })
  })

});
