import hre from "hardhat";

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS?.trim();
  if (!contractAddress) {
    throw new Error("CONTRACT_ADDRESS is required in .env");
  }

  const [deployer] = await hre.ethers.getSigners();
  const configuredOwner = process.env.TOKEN_OWNER_ADDRESS?.trim();
  const owner =
    configuredOwner && configuredOwner.length > 0
      ? configuredOwner
      : deployer.address;

  console.log("Verifying MEMEGPT at:", contractAddress);
  console.log("Constructor arg (owner):", owner);

  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [owner],
  });

  console.log("Verification submitted successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
