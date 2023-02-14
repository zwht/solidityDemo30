import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

// npx hardhat test test/Lottery10Users
describe("Lottery10Users", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {

    // Contracts are deployed using the first signer/account by default
    // 数组这样写可以起笔名，牛逼牛逼学习了
    const users = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("Lottery10Users");
    const contract = await Contract.deploy();

    return { contract, users };
  }

  describe("Deployment", function () {
    it("测试测试：", async function () {
      const { contract, users } = await loadFixture(deployContract);


      for (let i = 0; i < 10; i++) {
        await contract.connect(users[i]).join({
          value: 100000000000000000n
        })
      }
      console.log(await contract.winK())
      for (let i = 0; i < 10; i++) {
        let user = users[i]
        console.log(await user.getBalance())
      }

    });

  });

});
