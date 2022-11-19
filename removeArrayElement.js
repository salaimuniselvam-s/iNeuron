const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  // Connecting to the contract Instance
  let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const contractAddress = "0x6a671762C91ebe158999AE37F675A0AAC53aDDc5";
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
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  //
  await contract.addElementToArray([1, 2, 3, 4, 5]);
  const dynArray = await contract.getDynArray();
  console.log(dynArray.map((data) => parseInt(data)));

  await contract.RemoveElementsFromDynArray(2);

  const updatedDynArray = await contract.getDynArray();
  console.log(updatedDynArray.map((data) => parseInt(data)));

  // try {
  //   await contract.callStatic.RemoveElementsFromDynArray(100);
  // } catch (error) {
  //   console.log(error);
  // }
  // const abiError = [
  //   "function Remove_Index_Out_Of_Array_Length(uint256 arrayLength, uint256 givenIndex)",
  // ];

  // const interface = new ethers.utils.Interface(abiError);
  // const error_data = error.tx.data;

  // const decoded = interface.decodeFunctionData(
  //   interface.functions["Remove_Index_Out_Of_Array_Length(uint256,uint256)"],
  //   error_data
  // );

  // console.log(
  //   "Error is  " +
  //     `Needed ${decoded.arrayLength.toString()} but only ` +
  //     `${decoded.givenIndex.toString()} available.`
  // );
  // console.log(error.tx.data, "error.data");
  // }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
