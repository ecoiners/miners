const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
		const [deployer] = await ethers.getSigners();

		console.log("🟡 Deploying contract with the account: ", deployer.address);
		console.log("🟡 Account balance: ", (await deployer.getBalance()).toString());

		const network = await ethers.provider.getNetwork();
		console.log("🟡 Network: ", network.name);

		// Deploying contract token
	//	console.log("\n🟡 DEPLOYING CONTRACT TOKEN...");
	//	const Token = await ethers.getContractFactory("ECROP");
		//const token = await Token.deploy();

	//	await token.deployed();
	//	console.log("✅ Token contract deployed successfully: ", token.address);
	//	console.log("✅ Token owner address: ", deployer.address);

		// Deploying contract ICO
		console.log("\n🟡 DEPLOYING CONTRACT ICO...");
		const TokenIco = await ethers.getContractFactory("ECROPICO");
		const tokenIco = await TokenIco.deploy(); // Perhatikan parameter ini

		await tokenIco.deployed();
		console.log("✅ ICO contract deployed successfully: ", tokenIco.address);
		console.log("✅ ICO owner address: ", deployer.address);
}

main().then(() => process.exit(0)).catch((error) => {
		console.log(error);
		process.exit(1);
});