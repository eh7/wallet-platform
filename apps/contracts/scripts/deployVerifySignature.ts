import { ethers } from "hardhat";

async function main() {
  const verifySignature = await ethers.deployContract("VerifySignature", {
  });

  await verifySignature.waitForDeployment();

  console.log(
    `VerifySignature deployed to ${verifySignature.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
