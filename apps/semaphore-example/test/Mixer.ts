import { expect } from "chai";
import { ethers } from "hardhat";

import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import {
  Group,
  Identity,
  generateProof,
  verifyProof,
} from "@semaphore-protocol/core"

import { encodeBytes32String, Typed } from "ethers"

import { run } from "hardhat"

const TX_AMOUNT = "0.01"

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
console.log(proof)

      console.log('xxxxxxxxxxxxxxxxxxxxx', await mixer.connect(accounts[1]).verify(
        proof.merkleTreeDepth,
        proof.merkleTreeRoot,
        proof.nullifier,
        paymentHash, 
        proof.points
      ))

      const identityCommitment = users[1].commitment;

      const ethAmount = "0.01"

      getBalance(mixer.target);

      const transaction = await mixer.deposit(
        //paymentHash,
        {
	  value: ethers.parseEther(
            TX_AMOUNT,
          )
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

      //
      // send next payment auth
      const nonce_1 = 1;
      const types_1 = ['string', 'string', 'uint256'];
      const values_1 = ["pay", "gavin", nonce];
      const paymentHash_1 = ethers.keccak256(
        ethers.solidityPacked(types, values)
      )
      const proof_1 = await generateProof(users[1], group, paymentHash_1, groupId)
console.log(proof_1)
//      console.log(proof_1);

      console.log('xxxxxxxxxxxxxxxxxxxxx', await mixer.connect(accounts[1]).verify(
        proof_1.merkleTreeDepth,
        proof_1.merkleTreeRoot,
        proof_1.nullifier,
        paymentHash_1, 
        proof_1.points
      ))

      await expect(
        mixer.connect(accounts[1]).withdraw(
          proof_1.merkleTreeDepth,
          proof_1.merkleTreeRoot,
          proof_1.nullifier,
          paymentHash, 
          proof_1.points
        )
      ).to.be.reverted;
      //).to.be.revertedWith("withdraw amount greater than contract balance");

      const tx_deposit = await mixer.deposit(
        //paymentHash,
        {
	  value: ethers.parseEther(
            TX_AMOUNT,
          )
        }
      )

      console.log('xxxxxxxxxxxxxxxxxxxxx', await mixer.connect(accounts[1]).verify(
        proof_1.merkleTreeDepth,
        proof_1.merkleTreeRoot,
        proof_1.nullifier,
        paymentHash_1, 
        proof_1.points
      ))

/*
      const tx_1 = await mixer.connect(accounts[1]).withdraw(
        proof_1.merkleTreeDepth,
        proof_1.merkleTreeRoot,
        proof_1.nullifier,
        paymentHash_1, 
        proof_1.points
      )

      await mixer.connect(accounts[1]).withdraw(
        proof_1.merkleTreeDepth,
        proof_1.merkleTreeRoot,
        proof_1.nullifier,
        paymentHash_1, 
        proof_1.points
      )
//console.log(proof_1)

      console.log(tx_1)
*/

      //await getEvent(
      //  mixer,
      //  transaction,
      //  "Voted",
      //)


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

  describe("# joinGroup further tests", () => {
    it("Should allow users to join the group", async () => {
      const { semaphoreContract, mixer, groupId } = await loadFixture(deployContractFixture)

      const users = [new Identity(), new Identity(), new Identity()]
      //users[2]._secretScalar = 1;

      /*
      const bn = BigInt(users[0]._secretScalar);
      const hex = bn.toString(16);
      console.log(hex)
      console.log(BigInt('0x38ffea047696d3eb2618bdcfd244a1c2e4f2f9541b169bda478503752fab6b3').toString(2));
      console.log(new Identity("secret-value"))
      console.log(new Identity("secret-value"))

console.log(
  users[0]._secretScalar,
  "\n" + users[1]._secretScalar,
  "\n" + users[2]._secretScalar,
  "\n" + BigInt(users[0]._secretScalar).toString(),
);
process.exit()
      */

      const group = new Group()

      for (const [i, user] of users.entries()) {
        const transaction = await mixer.joinGroup(user.commitment)
        group.addMember(user.commitment)

        await expect(transaction)
           .to.emit(semaphoreContract, "MemberAdded")
           .withArgs(groupId, i, user.commitment, group.root)
      }

      //console.log(users[0]._secretScalar);
      //console.log(users[1]._secretScalar);
      //console.log(users[2]._secretScalar);

      // setup payment hashes
      const types = ['string', 'string', 'uint256'];

      // paymentHash
      const nonce = 0;
      const values = ["pay", "gavin", nonce];
      const paymentHash = ethers.keccak256(
        ethers.solidityPacked(types, values)
      )

      // paymentHash1
      const nonce1 = 1;
      const values1 = ["pay", "gavin", nonce1];
      const paymentHash1 = ethers.keccak256(
        ethers.solidityPacked(types, values)
      )

      const proof = await generateProof(users[1], group, paymentHash, groupId)
      const proof1 = await generateProof(users[1], group, paymentHash1, String(nonce1))

      console.log(await verifyProof(proof));
      console.log(await verifyProof(proof1));

      console.log(users[1])
      console.log(proof.nullifier);
      console.log(proof1.nullifier);

      console.log('groupId:', groupId);
      console.log('group.root:', group.root);

      console.log('xxxxxxxxxxxxxxxxxxxxx', await mixer.connect(accounts[1]).validate(
        proof.merkleTreeDepth,
        proof.merkleTreeRoot,
        proof.nullifier,
        paymentHash, 
        proof.points
      ))
/*
      //console.log('xxxxxxxxxxxxxxxxxxxxx', await mixer.connect(accounts[1]).verify(
      console.log('xxxxxxxxxxxxxxxxxxxxx', await mixer.connect(accounts[1]).validate(
        proof.merkleTreeDepth,
        proof.merkleTreeRoot,
        proof.nullifier,
        paymentHash, 
        proof.points
      ))
*/
      console.log('xxxxxxxxxxxxxxxxxxxxx hash1', await mixer.connect(accounts[1]).validate(
        proof1.merkleTreeDepth,
        proof1.merkleTreeRoot,
        proof1.nullifier,
        paymentHash1, 
        proof1.points
      ))
    })
  })

});
