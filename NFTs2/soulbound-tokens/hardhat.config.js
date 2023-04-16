/** @type import('hardhat/config').HardhatUserConfig */
require("hardhat-deploy");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: ["3f5aea597a71307ee8c34e5cc42603973c678fbb791dc9fdacab9134944a39d8"]
    }
  }
};
