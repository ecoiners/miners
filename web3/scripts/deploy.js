import { ethers } from "hardhat";
import dotenv from "dotenv";

dotenv.config();

async function main() {
	const [deployer] = await ethers.getSigner();
	
	console.log("🟡 deploying contract with the account: ", deployer.address);
	console.log("🟡 deploying balance: ", (await deployer.getBalance()).toString());
	
	const network = await ethers.provider.getNetwork();
	console.log("🟡 network: ", network.name);
	
	// deploying contract token
	console.log("\n🟡 DEPLOYING CONTRACT TOKEN...");
	const Token = await ethers.getContractFactory("ECROP");
	const token = await Token.deploy();
	
	await token.deployed();
	console.log("✅ deploying contract token success: ", token.address);
	console.log("✅ owner address token: ", deployer.address);
	
	// deploying contract ico
	console.log("\n🟡 DEPLOING CONTRACT ICO...");
	const TokenIco = await ethers.getContractFactory("ECROPICO");
	const tokenIco = await TokenIco.deploy();
	
	await tokenIco.deployed();
	console.log("✅ deployiny contract ico success: ", tokenIco.address);
	consope.log("✅ owner address ico: ", deployer.address);
	
}

main().then(() => process.exit(0)).catch((error) => {
	console.log(error);
	process.exit(1);
});