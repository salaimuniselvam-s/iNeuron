require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";

const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const GOERLI_API_KEY = process.env.GOERLI_API_KEY || "";

module.exports = {
  defaultNetwork: "hardhat",
  settings: {
    optimizer: {
      enabled: true,
      runs: 20,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.8",
      },
      {
        version: "0.8.16",
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    goerli: {
      url: GOERLI_API_KEY,
      accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
      chainId: 5,
      gas: 2100000,
      gasPrice: 20000000000,
      saveDeployments: true,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: "INR",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};
