const ethers = require("ethers");

/*
const provider = new ethers.providers.Web3Provider(YOUR_PROVIDER_HERE)
const signer = provider.getSigner()
*/

require('dotenv').config()

const run = async () => {
  const dataToSign = "0.1"

  const your_private_key_string = process.env.PRIVATE_KEY_DEV_EVM;

  const signer = new ethers.Wallet(your_private_key_string);

  const signature = await signer.signMessage(dataToSign)

  console.log(signature);

  //const signerAddress = ethers.utils.verifyMessage(dataToSign, signature)
  const signerAddress = ethers.verifyMessage(dataToSign, signature)

  console.log(signerAddress);
  console.log(signer.address);
}

run();
