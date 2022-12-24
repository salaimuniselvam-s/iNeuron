require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
require("dotenv").config();

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
  },
};
