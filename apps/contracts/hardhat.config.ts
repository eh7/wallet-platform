import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config({ path: __dirname+'/.env' });

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


const config: HardhatUserConfig = {
  solidity: "0.8.19",
  //defaultNetwork: "yourtestnetname",
  networks: {
  //  hardhat:{},
    goerli:{
      url: 'https://goerli.infura.io/v3/' + INFURA_API_KEY,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  sourcify: {
    enabled: true
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, 
  },
};

export default config;

