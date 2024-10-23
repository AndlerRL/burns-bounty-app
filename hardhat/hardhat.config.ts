import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import type { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const INFURA_PROJECT_ID = process.env.INFURA_API_KEY;
const BASE_TESTNET_RPC_URL = process.env.BASE_TESTNET_RPC_URL;
const BASE_MAINNET_RPC_URL = process.env.BASE_MAINNET_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const MAINNET_PRIVATE_KEY = process.env.MAINNET_PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  sourcify: {
    enabled: false,
  },
  networks: {
    // Red de desarrollo local
    hardhat: {
      chainId: 31337,
    },
    // Testnet Sepolia
    sepolia: {
      url: `${BASE_TESTNET_RPC_URL}/${INFURA_PROJECT_ID}`,
      accounts: [PRIVATE_KEY],
      // chainId: 11155111,
      chainId: 84532,
    },
    // Mainnet Ethereum
    mainnet: {
      url: `${BASE_MAINNET_RPC_URL}/${INFURA_PROJECT_ID}`,
      accounts: [MAINNET_PRIVATE_KEY],
      chainId: 1,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
