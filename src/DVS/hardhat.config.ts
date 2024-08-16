import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "istanbul"
    }
  },
  networks: {
    sepolia: {
      url: 'https://api-sepolia.etherscan.io' || '',
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: `8M8RRZGRAJWXTUPVHK7YPZCUCG9K81C6ZM`,
    },
  },
};

export default config;
