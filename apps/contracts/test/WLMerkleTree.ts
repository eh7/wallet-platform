import { expect } from "chai";
import { ethers } from "hardhat";


describe("WLMerkelTree contract", function () {

  const root = '0x56876072cd9e687f94e1ba9559798c470eeda664e14b79cc1bb6fe8a65b2371a';

  it("Deployment the WLMerkelTree contract", async function () {
    const [owner] = await ethers.getSigners();
    console.log(owner.address);

    const wLMerkleTree = await ethers.deployContract("WLMerkleTree");

    //console.log(
    //  'merkleTree root:',
    //  await wLMerkleTree.root()
    //);
    expect(await wLMerkleTree.root()).to.equal(root);

    const proof = [
      '0x4addfe5ff6ca815f868add5394c717f8bf512ca917b200c707046ddd5ce3bf14',
      '0xb4377193a6c766534a5b88beada0267478671c56ca93ce011466cb6622f5d0bd'
    ];

    console.log(
      'checkValidity for:',
      owner.address,
      await wLMerkleTree.checkValidity(proof)
    );

  });

});
