import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.deployContract("Groth16VerifierSquare", {
  });

  await contract.waitForDeployment();

  console.log(
    `Groth16VerifierSquare Contract deployed to ${contract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
