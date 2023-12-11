/*
 * require('dotenv').config()

const optimismGoerliUrl =
   process.env.ALCHEMY_API_KEY ?
      `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` :
      process.env.OPTIMISM_GOERLI_URL

console.log('sssssssssssssssssssss:', optimismGoerliUrl)
*/

const ethers = require("ethers");
//const ABI = require("./abi.json");
const ABI = require("./contracts/Greeter.abi.json");
require("dotenv").config();

const run = async () => {
  const provider = new ethers.JsonRpcProvider("https://optimism-goerli.infura.io/v3/9fd41f52198f4bff8e0b5fdf296fd4d3")
  //const blockNum = await provider.getBlockNumber()
  //console.log('blockNum:', blockNum)

  const wallet = new ethers.Wallet(process.env.PKEY, provider)
  console.log(wallet.address)
  
  const contract = new ethers.Contract(process.env.greeterAddr, ABI, wallet)
  console.log(await contract.greet.call())
  console.log(await contract.setGreeting('string memory _greeting'))
	
  //console.log(
  //  wallet
  //)
  //contract.setGreeting.call("string memory _greeting")
}
run()

async function getTransfer(){
  let signer = null
  let provider
  //let url = 'https://goerli.optimism.io'
  let url = 'https://rpc.ankr.com/optimism_testnet/db621a0f80a4f68bb5c4014ae55cef44ba3e685e02a5a7c707c7a76abbb1a94f'
  provider = new ethers.JsonRpcProvider(url)
  console.log(provider)
  //signer = await provider.getSigner()

/*
    const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; ///USDC Contract
    const provider = new ethers.providers.WebSocketProvider(
        `wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
    );
    const contract = new ethers.Contract(usdcAddress, ABI, provider);
    contract.on("Transfer", (from, to, value, event)=>{
        let transferEvent ={
            from: from,
            to: to,
            value: value,
            eventData: event,
        }
        console.log(JSON.stringify(transferEvent, null, 4))
    })
*/
}
//getTransfer()
/*
*/
