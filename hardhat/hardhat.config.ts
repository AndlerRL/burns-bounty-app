require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x00";  // Use a dummy key if not set

module.exports = {
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    mainnet: {
      url: process.env.ETHEREUM_RPC_URL,
      accounts: [PRIVATE_KEY]
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};