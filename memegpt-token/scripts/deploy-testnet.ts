import { ethers } from "hardhat";

function resolveOwner(deployerAddress: string): string {
  const configuredOwner = process.env.TOKEN_OWNER_ADDRESS?.trim();
  return configuredOwner && configuredOwner.length > 0
    ? configuredOwner
    : deployerAddress;
}

async function main() {
  const [deployer] = await ethers.getSigners();
  const owner = resolveOwner(deployer.address);

  console.log("Network:", (await ethers.provider.getNetwork()).name);
  console.log("Deployer:", deployer.address);
  console.log("Token owner:", owner);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer BNB balance:", ethers.formatEther(balance));

  const MEMEGPT = await ethers.getContractFactory("MEMEGPT");
  const token = await MEMEGPT.deploy(owner);
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("MEMEGPT deployed to:", address);

  const maxWallet = process.env.ANTI_WHALE_MAX_WALLET?.trim();
  const maxTx = process.env.ANTI_WHALE_MAX_TX?.trim();

  if (maxWallet && maxTx) {
    const maxWalletWei = ethers.parseUnits(maxWallet, 18);
    const maxTxWei = ethers.parseUnits(maxTx, 18);

    console.log("Enabling anti-whale limits...");
    const tx = await token.enableAntiWhale(maxWalletWei, maxTxWei);
    await tx.wait();
    console.log("Anti-whale enabled:", { maxWallet, maxTx });
  } else {
    console.log("Anti-whale not enabled (deployed without limits).");
  }

  console.log("\nNext steps:");
  console.log("1. Save CONTRACT_ADDRESS in .env");
  console.log("2. Verify: npm run verify:testnet");
  console.log("3. Renounce ownership after setup: token.renounceOwnership()");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
