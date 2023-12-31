require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async(taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "shimmer",
    networks: {
        hardhat: {
            blockGasLimit: 90000000
        },
        ganache: {
            url: "http://127.0.0.1:7545"
        },
        shimmer: {
            url: "https://json-rpc.evm.testnet.shimmer.network",
            chainId: 1072,
            accounts: [process.env.PRIVATEKEY]
        }
    },
    solidity: {
        compilers: [{
            version: "0.8.21",
            settings: {
                viaIR: true,
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
            },
        }
    ]}
};