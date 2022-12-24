const hre = require("hardhat");
const chai = require("chai");
const { solidity } = require("ethereum-waffle");
const { ethers } = require("hardhat");
chai.use(solidity);
const { expect } = chai;

describe("Multi Signature Wallet", function () {
  let MultiSigWallet;
  let owners;
  let noOfConfirmation;
  let ContractDeposit = ethers.utils.parseEther("7");
  const TEST_ADDRESS = "0x5e58859507b21763B7173D1EA3dbEA22a6cA4809";
  const TRANSACTION_AMOUNT = ethers.utils.parseEther("1");
  const BYTES_DATA = "0x73616c61696d756e6973656c76616d";
  let SIGNERS;
  let EXECUTING_ADDRESS;
  before(async () => {
    const accounts = await hre.ethers.getSigners();
    SIGNERS = [accounts[0], accounts[1]];
    owners = [accounts[0].address, accounts[1].address];
    EXECUTING_ADDRESS = accounts[0].address;
    noOfConfirmation = 1;
    const MultiSigWalletContract = await hre.ethers.getContractFactory(
      "MultiSigWallet"
    );
    MultiSigWallet = await MultiSigWalletContract.deploy(
      owners,
      noOfConfirmation
    );
    await MultiSigWallet.deployed();
  });

  describe("Validating Contract Deployment", () => {
    it("Validating Owners", async () => {
      const Owners = await MultiSigWallet.getOwners();
      expect(Owners).to.eql(owners);
    });
    it("Validating No of Confirmations", async () => {
      const noConf = await MultiSigWallet.numConfirmationsRequired();
      expect(noConf).to.equal(noOfConfirmation);
    });
    it("Validating Transaction Count", async () => {
      const transactionCount = await MultiSigWallet.getTransactionCount();
      expect(transactionCount).to.equal(0);
    });
  });

  describe("Depositing Balance", () => {
    it("Validating Deposit Event Emit", async () => {
      await expect(MultiSigWallet.DepositETH({ value: ContractDeposit }))
        .to.emit(MultiSigWallet, "Deposit")
        .withArgs(EXECUTING_ADDRESS, ContractDeposit, ContractDeposit);
    });
    it("Deposit Validation", async () => {
      const contractBalance = await ethers.provider.getBalance(
        MultiSigWallet.address
      );
      expect(contractBalance).to.equal(ContractDeposit);
    });
  });
  describe("Submitting Transaction", () => {
    it("Validating Submitting Transaction Event Emit", async () => {
      await expect(
        MultiSigWallet.submitTransaction(
          TEST_ADDRESS,
          TRANSACTION_AMOUNT,
          BYTES_DATA
        )
      )
        .to.emit(MultiSigWallet, "SubmitTransaction")
        .withArgs(
          EXECUTING_ADDRESS,
          0,
          TEST_ADDRESS,
          TRANSACTION_AMOUNT,
          BYTES_DATA
        );
    });
    it("Validating Transaction Count", async () => {
      expect(await MultiSigWallet.getTransactionCount()).to.equal(1);
    });
    it("To Throw Error While Accessing Invalid Transaction", async () => {
      await expect(MultiSigWallet.getTransaction(1)).to.be.reverted;
    });
    it("Validating Transaction Details", async () => {
      const transaction = await MultiSigWallet.getTransaction(0);
      // Just checked only the to address
      // if needed we can also check all the other fields
      expect(transaction[0]).to.equal(TEST_ADDRESS);
    });
  });

  describe("Confirming Transaction", () => {
    it("Validating Confirming Transaction Event", async () => {
      await expect(MultiSigWallet.confirmTransaction(0))
        .to.emit(MultiSigWallet, "ConfirmTransaction")
        .withArgs(EXECUTING_ADDRESS, 0);
    });
    it("Validating -> address can't able to confirm twice", async () => {
      await expect(MultiSigWallet.confirmTransaction(0)).to.be.revertedWith(
        "tx already confirmed"
      );
    });
    it("Validation confirmed count increased or not", async () => {
      expect(await MultiSigWallet.isConfirmed(0, EXECUTING_ADDRESS)).to.be.true;
      expect(await MultiSigWallet.isConfirmed(0, owners[1])).to.be.false;
    });
  });
  describe("Revoke Confirmations", () => {
    it("Validating Revoke", async () => {
      await MultiSigWallet.connect(SIGNERS[1]).confirmTransaction(0);
      expect(await MultiSigWallet.isConfirmed(0, owners[1])).to.be.true;
      await MultiSigWallet.connect(SIGNERS[1]).revokeConfirmation(0);
      expect(await MultiSigWallet.isConfirmed(0, owners[1])).to.be.false;
    });
  });
  describe("Executing Confirmations", () => {
    it("Validating Submitting Transaction Event Emit", async () => {
      await expect(MultiSigWallet.executeTransaction(0))
        .to.emit(MultiSigWallet, "ExecuteTransaction")
        .withArgs(EXECUTING_ADDRESS, 0);
    });
  });
  describe("Validating MultiSignature Contract After Executing Tx", () => {
    it("Validating Contract Balance", async () => {
      const contractBalance = await ethers.provider.getBalance(
        MultiSigWallet.address
      );
      expect(contractBalance).to.equal(ethers.utils.parseEther("6"));
    });
    it("Validating the transaction amount send to the address", async () => {
      const contractBalance = await ethers.provider.getBalance(TEST_ADDRESS);
      expect(contractBalance).to.equal(TRANSACTION_AMOUNT);
    });
    it("checking the executed state of the transaction", async () => {
      const [, , , executed] = await MultiSigWallet.getTransaction(0);
      // Just checked only the to address
      // if needed we can also check all the other fields
      expect(executed).to.true;
    });
    it("Can't able to revoke or confirm the executed transaction", async () => {
      await expect(MultiSigWallet.confirmTransaction(0)).to.be.revertedWith(
        "tx already excuted"
      );
      await expect(MultiSigWallet.executeTransaction(0)).to.be.revertedWith(
        "tx already excuted"
      );
    });
  });
});
