const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  const owners = [accounts[0].address, accounts[1].address];
  const noOfConfirmation = 1;
  const MultiSigWalletContract = await hre.ethers.getContractFactory(
    "MultiSigWallet"
  );
  const MultiSigWallet = await MultiSigWalletContract.deploy(
    owners,
    noOfConfirmation
  );

  await MultiSigWallet.deployed();

  console.log(`Deployed at ${MultiSigWallet.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
