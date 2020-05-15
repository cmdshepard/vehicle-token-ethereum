/* eslint-disable */
const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  compilers: {
    solc: {
      version: "^0.6.0"
    }
  },
  networks: {
    develop: { // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: "127.0.0.1",
      port: 8545, // set to Ganache, change to 7545 for Truffle CLI
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(
        fs.readFileSync("/home/maz/udacity/key").toString().trim(),
        `https://rinkeby.infura.io/v3/${fs.readFileSync("/home/maz/udacity/infura_key").toString().trim()}`
      ),
      network_id: 4,
      gas: 5500000,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  }
};
