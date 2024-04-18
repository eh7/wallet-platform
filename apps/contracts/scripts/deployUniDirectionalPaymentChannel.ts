import { ethers } from "hardhat";

async function main() {
  let contract_owner = await ethers.getSigner(network.config.from);
  console.log('contract_owner', contract_owner);

  const thisContract = await ethers.deployContract("UniDirectionalPaymentChannel", contract_owner, {
  });

  await thisContract.waitForDeployment();

  console.log(
    `UniDirectionalPaymentChannel Contract deployed to ${thisContract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
