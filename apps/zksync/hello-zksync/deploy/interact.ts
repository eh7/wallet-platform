import * as hre from "hardhat";
import { getWallet } from "./utils";
import { ethers } from "ethers";

// Address of the contract to interact with
const CONTRACT_ADDRESS = "0xB99F63f01BeFDD2bdf0CCCE4241B6caaB7De0A2e";
if (!CONTRACT_ADDRESS) throw "⛔️ Provide address of the contract to interact with!";

// An example of a script to interact with the contract
export default async function () {
  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`);

  // Load compiled contract info
  const contractArtifact = await hre.artifacts.readArtifact("Greeter");

  // Initialize contract instance for interaction
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    getWallet() // Interact with the contract on behalf of this wallet
  );

  // Run contract read function
  const response = await contract.greet();
  console.log(`Current message is: ${response}`);

  // Run contract write function
  const high = 9999;
  const low = 10;
  const rand = Math.random() * (high - low) + low;
  const transaction = await contract.setGreeting("Hello people! (" + rand + ")");
  console.log(`Transaction hash of setting new message: ${transaction.hash}`);

  // Wait until transaction is processed
  await transaction.wait();

  // Read message after transaction
  console.log(`The message now is: ${await contract.greet()}`);
}
