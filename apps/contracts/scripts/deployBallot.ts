import { ethers } from "hardhat";

async function main() {
  const ballotContract = await ethers.deployContract("Ballot", {
  });

  await ballotContract.waitForDeployment();

  console.log(
    `ballot Contract deployed to ${ballotContract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
