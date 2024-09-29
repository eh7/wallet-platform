import { expect } from "chai";
import { ethers, BigNumber } from "hardhat";

//import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
//import { Group, Identity, generateProof } from "@semaphore-protocol/core"
//
import { encodeBytes32String, Typed } from "ethers"
//
//import { run } from "hardhat"

describe("Test contract tests", function () {
  describe("# joinGroup", async () => {
    it("test to experiment with syntax", async () => {
      const Test = await ethers.getContractFactory("Test");
      const testContract = await Test.deploy({});

      expect(
        await testContract.test(
	  Typed.overrides({ }),
        )
      ).to.equal(99);

      expect(
        await testContract.test(
          Typed.uint256(3),
	  Typed.overrides({ }),
        )
      ).to.equal(3);

      expect(
        await testContract.test(
          Typed.string("33"),
	  Typed.overrides({ }),
        )
      ).to.equal("33");

      /*
      console.log(
        await testContract.test(
          Typed.string("33"),
	  Typed.overrides({ }),
        )
	(await testContract.test(
	  Typed.overrides({ }),
        )).toString(),
	(await testContract.test(
          3,
	  Typed.overrides({ }),
	)).toString()
      )
      */

    })
  })
})

