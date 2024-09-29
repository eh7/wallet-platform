
const ethers = require("ethers");
const ABI = require("./contracts/Greeter.abi.json");
require("dotenv").config();

const run = async () => {
  const provider = new ethers.JsonRpcProvider(
    process.env.OP_GOERLI_RPC
  )
  //const provider = new ethers.JsonRpcProvider(
  //  process.env.GOERLI_RPC
  //)

  //const blockNum = await provider.getBlockNumber()
  //console.log('blockNum:', blockNum)

  const wallet = new ethers.Wallet(process.env.PKEY, provider)
  console.log(wallet.address)

  provider.getBalance(wallet.address).then((balance) => {
    // convert a currency unit from wei to ether
    const balanceInEth = ethers.formatEther(balance)
    console.log(`balance: ${balanceInEth} ETH`)
  })
  
  const contract = new ethers.Contract(process.env.greeterAddr, ABI, wallet)
  //console.log(await contract.setGreeting('this is test greeting, hello'))
  console.log(await contract.greet.call())
	
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
}
