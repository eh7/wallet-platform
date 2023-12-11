const ethers = require("ethers")

//import ethers from 'ethers';

const run = async () => {
  const provider = new ethers.JsonRpcProvider("https://optimism-goerli.infura.io/v3/9fd41f52198f4bff8e0b5fdf296fd4d3")
  const blockNum = await provider.getBlockNumber()
  console.log('blockNum:', blockNum)
}

run()


/*
provider = ethers.getDefaultProvider("https//rpc.ankr.com/optimism_testnet/db621a0f80a4f68bb5c4014ae55cef44ba3e685e02a5a7c707c7a76abbb1a94f");

//console.log(new ethers.JsonRpcProvider('https://rpc.ankr.com/optimism_testnet/db621a0f80a4f68bb5c4014ae55cef44ba3e685e02a5a7c707c7a76abbb1a94f'))
*/

/*
// OR import ethers from 'ethers';

// HTTP version
(async () => {
  //const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/optimism_testnet/db621a0f80a4f68bb5c4014ae55cef44ba3e685e02a5a7c707c7a76abbb1a94f');
  const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/optimism_testnet/db621a0f80a4f68bb5c4014ae55cef44ba3e685e02a5a7c707c7a76abbb1a94f');
  const version = await provider.send('web3_clientVersion');
  console.log(version);
})();


// WebSocket version
(async () => {
  //const provider = new ethers.providers.WebSocketProvider('wss://rpc.ankr.com/optimism_testnet/ws/db621a0f80a4f68bb5c4014ae55cef44ba3e685e02a5a7c707c7a76abbb1a94f');
  const provider = new ethers.WebSocketProvider('wss://rpc.ankr.com/optimism_testnet/ws/db621a0f80a4f68bb5c4014ae55cef44ba3e685e02a5a7c707c7a76abbb1a94f');
  const version = await provider.send('web3_clientVersion');
  console.log(version);
})();
*/
