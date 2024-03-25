import { ethers } from "hardhat";

async function main() {
  const etherWalletContract = await ethers.deployContract("EtherWallet", {
  });

  await etherWalletContract.waitForDeployment();

  console.log(
    `etherWallet Contract deployed to ${etherWalletContract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
