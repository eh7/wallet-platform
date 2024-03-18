import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config({ path: __dirname+'/.env' });

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY_DEV_EVM = process.env.PRIVATE_KEY_DEV_EVM;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  //defaultNetwork: "yourtestnetname",
  networks: {
  //  hardhat:{},
    devEvmNode:{
      url: 'http://127.0.0.1:8545/',
      accounts: [`0x${PRIVATE_KEY_DEV_EVM}`]
    },
    goerli:{
      url: 'https://goerli.infura.io/v3/' + INFURA_API_KEY,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    sepolia:{
      url: 'https://sepolia.infura.io/v3/' + INFURA_API_KEY,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    op_sepolia:{
      url: 'https://optimism-sepolia.infura.io/v3/' + INFURA_API_KEY,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
  sourcify: {
    enabled: false
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      op_mainnet: process.env.ETHERSCAN_OP_API_KEY, 
      op_goerli: process.env.ETHERSCAN_OP_API_KEY, 
      op_sepolia: process.env.ETHERSCAN_OP_API_KEY, 
    },
    customChains: [
      {
        network: "op_sepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://api-sepolia-optimistic.etherscan.io/api",
          browserURL: "https://sepolia-optimistic.etherscan.io"
        }
      }
    ]
  },
};

export default config;

