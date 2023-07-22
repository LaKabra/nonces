// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const amount = 50000000000000;

  console.log(deployer.address);

  console.log("First Deploy, start nonce:", await deployer.getNonce());

  let deployTest = await ethers.getContractFactory('testNonces');
  let deploytest = await deployTest.deploy();
  await deploytest.waitForDeployment();

  const addr = await deploytest.getAddress();
  console.log(addr);

  let a = 1;

  for (a; a < 15; a++) {
    await deploytest.add();
    console.log("Count:", a, "Counted by smart contract:", await deploytest.View(), "Real Nonce:", await deployer.getNonce());
  }

  console.log("Second Deploy");

  let deployTest2 = await ethers.getContractFactory('testNonces');
  let deploytest2 = await deployTest2.deploy();
  await deploytest2.waitForDeployment();

  const addr2 = await deploytest2.getAddress();
  console.log(addr2);

  for (a; a < 35; a++) {
    await deploytest.add();
    console.log("Count:", a, "Counted by smart contract:", await deploytest.View(), "Real Nonce:", await deployer.getNonce());
  }

  console.log("Current real nonce:", await deployer.getNonce());
  console.log("Total nonces in smart contract:", await deploytest.View() + await deploytest2.View());

  console.log("Deploy Test");

  for (let b = 0; b<50; b++) {
    console.log("Deploy & mint:", b, "nonce:", await deployer.getNonce());
    let deploymock = await ethers.getContractFactory('MockERC20');
    let deployMock_usdc = await deploymock.deploy("USDC MOCK", "USDC", 6);
    await deployMock_usdc.waitForDeployment();
  
    let deployMock_usdt = await deploymock.deploy("USDT MOCK", "USDT", 6);
    await deployMock_usdt.waitForDeployment();
  
    let deployMock_dai = await deploymock.deploy("DAI MOCK", "DAI", 6);
    await deployMock_dai.waitForDeployment();
  
    await deployMock_usdc.mint(amount, deployer.address);
    await deployMock_usdt.mint(amount, deployer.address);
    await deployMock_dai.mint(amount, deployer.address);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
