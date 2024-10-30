const hre = require("hardhat");

async function estimateDeploymentCost() {
  try {
    const TaskContract = await hre.ethers.getContractFactory("TaskContract");
    const [deployer] = await hre.ethers.getSigners();

    // Get current fee data
    const feeData = await deployer.provider.getFeeData();
    const gasPrice = feeData.gasPrice;

    // Get deployment transaction
    const factory = await hre.ethers.getContractFactory("TaskContract");
    const deployTx = await factory.getDeployTransaction();

    // Estimate gas
    const gasLimit = await deployer.provider.estimateGas({
      from: deployer.address,
      data: deployTx.data
    });

    const estimatedCost = gasPrice * gasLimit;

    console.log("\nDeployment Cost Estimation:");
    console.log("---------------------------");
    console.log("Gas Price:", hre.ethers.formatUnits(gasPrice, "gwei"), "gwei");
    console.log("Estimated Gas Limit:", gasLimit.toString());
    console.log("Estimated Cost:", hre.ethers.formatEther(estimatedCost), "ETH");

    return estimatedCost;
  } catch (error) {
    console.error("Error estimating deployment cost:", error);
    throw error;
  }
}

async function main() {
  try {
    const [deployer] = await hre.ethers.getSigners();

    // Get deployer's address and balance
    const balance = await deployer.provider.getBalance(deployer.address);

    console.log("\nDeployment Information:");
    console.log("----------------------");
    console.log("Deploying with account:", deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

    // Estimate deployment cost
    const estimatedCost = await estimateDeploymentCost();

    // Check if we have enough balance
    if (balance < estimatedCost) {
      throw new Error(`Insufficient balance. Need at least ${hre.ethers.formatEther(estimatedCost)} ETH for deployment`);
    }

    console.log("\nStarting Deployment...");
    console.log("--------------------");

    // Deploy the contract
    const TaskContract = await hre.ethers.getContractFactory("TaskContract");
    const taskContract = await TaskContract.deploy();

    console.log("Deployment transaction sent. Waiting for confirmation...");

    await taskContract.waitForDeployment();
    const taskContractAddress = await taskContract.getAddress();

    console.log("\nDeployment Successful!");
    console.log("---------------------");
    console.log("Contract deployed to:", taskContractAddress);

    // Wait for a few blocks for better network confirmation
    console.log("\nWaiting for additional block confirmations...");
    const deploymentReceipt = await taskContract.deploymentTransaction().wait(5);

    console.log("Block confirmations received.");

    // Verify the contract if we're on a network that supports it
    if (process.env.ETHERSCAN_API_KEY) {
      console.log("\nStarting contract verification...");
      console.log("Waiting 30 seconds before verification to ensure network indexing...");
      await new Promise(resolve => setTimeout(resolve, 30000)); // 30 seconds wait

      await hre.run("verify:verify", {
        address: taskContractAddress,
        constructorArguments: []
      });

      console.log("Contract verified successfully!");
    }

    console.log("\nDeployment Summary:");
    console.log("-----------------");
    console.log("Contract Address:", taskContractAddress);
    console.log("Transaction Hash:", deploymentReceipt.hash);
    console.log("Block Number:", deploymentReceipt.blockNumber);
    console.log("Gas Used:", deploymentReceipt.gasUsed.toString());

  } catch (error) {
    console.error("\nError during deployment:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });