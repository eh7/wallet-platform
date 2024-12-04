import { ethers } from "hardhat";

async function main() {
  const myGovernorContract = await ethers.deployContract("MyGovernor", {
  });

  await myGovernorContract.waitForDeployment();

  console.log(
    `myGovernor Contract deployed to ${ballotContract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
