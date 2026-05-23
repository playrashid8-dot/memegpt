import { expect } from "chai";
import { ethers } from "hardhat";
import { MEMEGPT } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

const TOTAL_SUPPLY = 1_000_000_000n * 10n ** 18n;

describe("MEMEGPT", function () {
  let token: MEMEGPT;
  let owner: HardhatEthersSigner;
  let alice: HardhatEthersSigner;
  let bob: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, alice, bob] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("MEMEGPT");
    token = await factory.deploy(owner.address);
    await token.waitForDeployment();
  });

  describe("metadata", function () {
    it("has correct name, symbol, decimals, and supply", async function () {
      expect(await token.name()).to.equal("MEMEGPT");
      expect(await token.symbol()).to.equal("MGPT");
      expect(await token.decimals()).to.equal(18);
      expect(await token.totalSupply()).to.equal(TOTAL_SUPPLY);
      expect(await token.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY);
    });

    it("rejects zero address owner in constructor", async function () {
      const factory = await ethers.getContractFactory("MEMEGPT");
      await expect(factory.deploy(ethers.ZeroAddress)).to.be.reverted;
    });
  });

  describe("transfers", function () {
    it("supports wallet-to-wallet transfers with no tax", async function () {
      const amount = ethers.parseUnits("1000", 18);
      await token.transfer(alice.address, amount);

      expect(await token.balanceOf(alice.address)).to.equal(amount);
      expect(await token.balanceOf(owner.address)).to.equal(TOTAL_SUPPLY - amount);
    });

    it("allows standard ERC20 approvals", async function () {
      const amount = ethers.parseUnits("500", 18);
      await token.connect(alice).approve(bob.address, amount);
      expect(await token.allowance(alice.address, bob.address)).to.equal(amount);
    });
  });

  describe("burn", function () {
    it("allows holders to burn their own tokens", async function () {
      const amount = ethers.parseUnits("1000000", 18);
      await token.transfer(alice.address, amount);
      await token.connect(alice).burn(amount);

      expect(await token.balanceOf(alice.address)).to.equal(0);
      expect(await token.totalSupply()).to.equal(TOTAL_SUPPLY - amount);
    });
  });

  describe("ownership", function () {
    it("supports renouncing ownership", async function () {
      await token.renounceOwnership();
      expect(await token.owner()).to.equal(ethers.ZeroAddress);
    });
  });

  describe("anti-whale", function () {
    const maxWallet = ethers.parseUnits("1000000", 18);
    const maxTx = ethers.parseUnits("500000", 18);

    beforeEach(async function () {
      await token.enableAntiWhale(maxWallet, maxTx);
    });

    it("enforces max transaction for non-owner wallets", async function () {
      await token.transfer(alice.address, maxWallet);

      await expect(
        token.connect(alice).transfer(bob.address, maxTx + 1n)
      ).to.be.revertedWith("MEMEGPT: exceeds max tx");
    });

    it("enforces max wallet for non-owner wallets", async function () {
      await token.transfer(alice.address, maxWallet);
      await expect(
        token.connect(bob).transfer(alice.address, 1n)
      ).to.be.revertedWith("MEMEGPT: exceeds max wallet");
    });

    it("exempts owner from anti-whale checks", async function () {
      await expect(token.transfer(alice.address, maxWallet + 1n)).to.not.be
        .reverted;
    });

    it("can be permanently disabled", async function () {
      await token.disableAntiWhalePermanently();

      expect(await token.antiWhaleActive()).to.equal(false);
      expect(await token.antiWhalePermanentlyDisabled()).to.equal(true);

      await token.transfer(alice.address, maxWallet + 1n);
      await token.connect(alice).transfer(bob.address, maxWallet + 1n);

      await expect(
        token.enableAntiWhale(maxWallet, maxTx)
      ).to.be.revertedWith("MEMEGPT: anti-whale disabled");
    });
  });
});
