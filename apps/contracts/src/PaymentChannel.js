const ethers = require("ethers");
const keccak256 = require("keccak256")

/*
const provider = new ethers.providers.Web3Provider(YOUR_PROVIDER_HERE)
const signer = provider.getSigner()
*/

require('dotenv').config()

const run = async () => {
  //const dataToSign = "0.1"
  //const dataToSign = ethers.parseEther("0.1").toString();

  const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

  const types = ['address', 'uint256'];
  const values= [contractAddress, ethers.parseEther("0.1")];
  const dataToSign = keccak256(
    ethers.solidityPacked(types, values)
  );

  console.log(
    dataToSign
  );
  console.log(
    ethers.solidityPacked(types, values),
    '\n0xe7f1725e7734ce288f8367e1bb143e90bb3f0512000000000000000000000000000000000000000000000000016345785d8a0000',
  );
  console.log(
    keccak256(ethers.solidityPacked(types, values)).toString('hex')
  );

  const your_private_key_string = process.env.PRIVATE_KEY_DEV_EVM_HH;

  const signer = new ethers.Wallet(your_private_key_string);

  const signature = await signer.signMessage(
    dataToSign
  );

  console.log('signature', signature);

  const signerAddress = ethers.verifyMessage(dataToSign, signature)

  console.log(signerAddress);
  console.log(signer.address);
}

run();
