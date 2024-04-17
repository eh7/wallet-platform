const Web3 = require("web3");
// OR import Web3 from 'web3';

// HTTP version
(async () => {
  const web3 = new Web3('https://rpc.ankr.com/optimism_testnet/db621a0f80a4f68bb5c4014ae55cef44ba3e685e02a5a7c707c7a76abbb1a94f');
  const version = await web3.eth.getNodeInfo();
  console.log(version);
})();
