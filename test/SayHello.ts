import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SayHello", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const str = "Hello!";

    // Contracts are deployed using the first signer/account by default
    // 数组这样写可以起笔名，牛逼牛逼学习了
    const [owner, otherAccount] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("SayHello");
    const contract = await Contract.deploy(str);

    return { contract, str, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("默认设置str正确", async function () {
      const { contract, str } = await loadFixture(deployOneYearLockFixture);
      expect(await contract.str()).to.equal(str);
    });

    it("拥有人正确", async function () {
      const { contract, owner } = await loadFixture(deployOneYearLockFixture);
      expect(await contract.owner()).to.equal(owner.address);
    });
  });

  describe("sayHello", function () {
    it("验证其他用户运行sayHello", async function () {
      const { contract, str, otherAccount } = await loadFixture(deployOneYearLockFixture);
      await expect(await contract.connect(otherAccount).sayHello()).to.equal(
        str
      );
    });

    it("验证owner用户运行sayHello", async function () {
      const { contract, owner } = await loadFixture(deployOneYearLockFixture);
      await expect(await contract.connect(owner).sayHello()).to.equal('Hello owner!');
    });
  });
  describe("resetStr", function () {
    it("验证其他用户运行resetStr", async function () {
      const { contract, str, otherAccount } = await loadFixture(deployOneYearLockFixture);
      await expect(contract.connect(otherAccount).resetStr('你好兄弟')).to.be.revertedWith(
        'Only ower can do that!'
      );
    });

    it("验证owner用户运行resetStr", async function () {
      const { contract, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);
      const str = '你好兄弟'
      await contract.connect(owner).resetStr(str)
      const newStr=await contract.connect(otherAccount).sayHello()
      await expect(newStr).to.equal(str);
    });
  });
});
