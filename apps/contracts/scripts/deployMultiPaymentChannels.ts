import { ethers } from "hardhat";

async function main() {
  const multiPaymentChannelsContract = await ethers.deployContract("MultiPaymentChannels", {
  });

  await multiPaymentChannelsContract.waitForDeployment();

  console.log(
    `ballot Contract deployed to ${multiPaymentChannelsContract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
