import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

// npx hardhat test test/BalanceAddressChecker
describe("BalanceAddressChecker", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {

    // Contracts are deployed using the first signer/account by default
    // 数组这样写可以起笔名，牛逼牛逼学习了
    const [owner, otherAccount] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("BalanceAddressChecker");
    const contract = await Contract.deploy();

    return { contract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("测试测试：", async function () {
      const { contract } = await loadFixture(deployContract);


      let getContractAddress = await contract.getContractAddress()
      console.log("getContractAddress", getContractAddress)
      
      let getOwerAddress = await contract.getOwerAddress()
      console.log("getOwerAddress", getOwerAddress)

      let getSenderAddress = await contract.getSenderAddress()
      console.log("getSenderAddress", getSenderAddress)

      let getContractBalance = await contract.getContractBalance()
      console.log("getContractBalance", getContractBalance)

      let getOwnerBalance = await contract.getOwnerBalance()
      console.log("getOwnerBalance", getOwnerBalance)

      let getSenderBalance = await contract.getSenderBalance()
      console.log("getSenderBalance", getSenderBalance)

    });

  });

});
