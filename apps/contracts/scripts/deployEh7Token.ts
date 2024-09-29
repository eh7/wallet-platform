import { ethers } from "hardhat";

async function main() {
  const eh7Token = await ethers.deployContract("Eh7Token", {
  });

  await eh7Token.waitForDeployment();

  console.log(
    `Eh7Token deployed to ${eh7Token.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
