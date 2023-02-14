import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BasicRandom", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {

    // Contracts are deployed using the first signer/account by default
    // 数组这样写可以起笔名，牛逼牛逼学习了
    const [owner, otherAccount] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("BasicRandom");
    const contract = await Contract.deploy();

    return { contract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("默认设置str正确", async function () {
      const { contract } = await loadFixture(deployContract);
      let ad = await contract.getRandomNumber()
      let bb = ad.toString()
      console.log('-------', bb)
      expect(ad).to.gt(1);
    });


  });

});
