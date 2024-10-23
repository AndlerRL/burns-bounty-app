const hre = require("hardhat");

async function main() {
  try {
    // Get the contract factory
    const TaskContract = await hre.ethers.getContractFactory("TaskContract");

    // Deploy the contract
    console.log("Deploying TaskContract...");
    const taskContract = await TaskContract.deploy();

    // Wait for deployment to finish
    await taskContract.deployed();

    console.log(`TaskContract deployed to: ${taskContract.address}`);

    // Wait for a few block confirmations
    console.log("Waiting for block confirmations...");
    await taskContract.deployTransaction.wait(6);

    // Verify the contract
    console.log("Verifying contract...");
    await hre.run("verify:verify", {
      address: taskContract.address,
      constructorArguments: [],
    });

    console.log("Contract verified successfully");
  } catch (error) {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});