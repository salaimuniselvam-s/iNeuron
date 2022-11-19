const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  );
  wallet = wallet.connect(provider);
  const abi = fs.readFileSync(
    "./RemoveElementsFromArray_sol_RemoveElementsFromArray.abi",
    "utf8"
  );
  const binary = fs.readFileSync(
    "./RemoveElementsFromArray_sol_RemoveElementsFromArray.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log(`Contract deployed to ${contract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
