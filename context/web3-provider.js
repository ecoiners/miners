import React, {
	createContext,
	useContext,
	useState,
	useEffect
} from "react";
import { ethers } from "ethers";
import {
	useAccount,
	useChainId,
	useConnect,
	useBalance
} from "wagmi";

// internal import
import { useToast } from "./toast-context";
import IcoAbi from "./abi-ico.json";
import {
	useEthersSigner,
	useEthersProvider
} from "@/provider/hooks";
import { config } from "@/provider/wagmi-config";
import {
	handleTransactionError,
	erc20ABI,
	generateId
} from "./utility";

const ecropAddress = process.env.NEXT_PUBLIC_ECROP_ADDRESS;
const currency = process.env.NEXT_PUBLIC_CURRENCY;
const tokenSymbol = process.env.NEXT_PUBLIC_TOKEN_SYMBOL;
const tokenDecimal = process.env.NEXT_PUBLIC_TOKEN_DECIMAL || 18;
const tokenLogo = process.env.NEXT_PUBLIC_TOKEN_LOGO;
const domainUrl = process.env.NEXT_PUBLIC_NEXT_DOMAIN_URL;
const perTokenUsdPrice = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE;
const tokenIcoAbi = IcoAbi.abi;

const web3Context = createContext();

const icoContractAddress = process.env.NEXT_PUBLIC_TOKEN_ICO_ADDRESS;
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

const fallbackProvider = new ethers.providers.JsonRpcProvider(rpcUrl);

export const Web3Provider = ({ children }) => {
	const { notification } = useToast();
	
	const { address, isConnected } = useAccount();
	const chainId = useChainId();
	const { balance } = useBalance({ config });
	const { connect, connectors } = useConnect();
	const [recall, setRecall] = useState(0);
	const [globalLoad, setGlobalLoad] = useState(false);
	
	const provider = useEthersProvider();
	const signer = useEthersSigner();
	const fallbackProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
	
	const [contract, setContract] = useState(null);
	const [account, setAccount] = useState(null);
	
	const [isConnecting, setIsConnecting] = useState(false);
	const [contractInfo, setContractInfo] = useState({
		ecropAddress: null,
		ecropBalance: "0",
		ethPrice: "0",
		totalSold: "0",
	});
	
	const [tokenBalance, setTokenBalance] = useState({
		userEcropBalance: "0",
		contractEthBalance: null,
		totalSupply: null,
		userEthBalance: null,
		ethPrice: "0",
		ecropBalance: "0"
	});
	
	const [error, setError] = useState(null);
	
	useEffect(() => {
		const initContract = () => {
			if (provider && signer) {
				try {
					const contractInstance = new ethers.Contract({
						icoContractAddress,
						tokenIcoAbi,
						signer
					});
					
					setContract(contractInstance);
					
				} catch (error) {
					console.error("Error initializing contract: ", error);
					setError("Failed to initialize contract");
				}
			}
		};
		
		initContract();
	}, [provider, signer]);
	
	useEffect(() => {
		const fetchContractInfo = async () => {
			setGlobalLoad(true);
			
			try {
				const currentProvider = provider || fallbackProvider;
				
				const readOnlyContract = new ethers.Contract({
					icoContractAddress,
					tokenIcoAbi,
					currentProvider
				});
				
				const info = await readOnlyContract.getContractInfo();
				
				const tokenDecimals = parseInt(info.tokenDecimals) || 18;
				
				setContractInfo({
					ecropAddress: info.tokenAddress,
					ecropBalance: ethers.utils.formatUnits(info.tokenBalance, tokenDecimals),
					ethPrice: ethers.utils.formatUnits(info.ethPrice, 18),
					totalSold: ethers.utils.formatUnits(info.totalSold, tokenDecimals)
				});
				
				if (address && info.tokenAddress) {
					const tokenContract = new ethers.Contract(
						info.tokenAddress,
						erc20ABI,
						currentProvider
					);
					
					const [
						userTokenBalance,
						userEthBalance,
						contractEthBalance,
						totalSupply
					] = await Promise.all([
						tokenContract.balanceOf(address),
						currentProvider.getBalance(address),
						currentProvider.getBalance(icoContractAddress),
						tokenContract.totalSupply()
					]);
					
					setTokenBalance({
						...prev,
						userEcropBalance: ethers.utils.formatUnits(userTokenBalance, tokenDecimals),
						contractEthBalance: ethers.utils.formatUnits(userEthBalance),
						totalSupply: ethers.utils.formatUnits(totalSupply, tokenDecimals),
						userEthBalance: ethers.utils.formatUnits(userEthBalance),
						ethPrice: ethers.utils.formatUnits(info.ethPrice, 18),
						ecropBalance: ethers.utils.formatUnits(info.tokenBalance, tokenDecimals)
					});
				}
				
				setGlobalLoad(false);
			} catch (error) {
				setGlobalLoad(false);
				console.error("Error fetching contract info: ", error);
			}
		};
		
		fetchContractInfo();
	}, [contract, address, provider, signer, reCall]);
	
	// create buy token functions
	const buyToken = async (ethAmount) => {
		if (!contract || !address) return null;
		
		const toastId = notification.start(`Buying ${tokenSymbol} with ${currency}...`);
		
		try {
			const ethValue = ethers.utils.parseEther(ethAmount);
			const tx = await contract.buyToken({ value: ethValue });
			
			notification.update(toastId, "Processing", "Waiting for confirmation");
			const receipt = await tx.wait();
			
			if (receipt.status === 1) {
				const tokenPrice = perTokenUsdPrice;
				const tokensReceived = parseFloat(ethAmount) / tokenPrice;
				
				const txDetails = {
					timestamp: Date.now(),
					user: address,
					tokenIn: currency,
					tokenOut: tokenSymbol,
					amountIn: ethAmount,
					amountOut: tokensReceived.toString(),
					transactionType: "BUY",
					hash: receipt.transactionHash
				};
				
				saveTransactionToLocalStorage(txDetails);
				setRecall((prev) => prev +1);
				
				notification.complete(toastId, `Successfully purchased ${tokenSymbol} tokens`);
				
				return receipt;
			}
			
		} catch (error) {
			const {message: errorMessage, code: errorCode} = handleTransactionError(error, "buying tokens");
			
			if (erroCode == "ACTION_REJECTED") {
				notification.reject(toastId, "Transaction rejected by user");
				return null;
			}
			
			console.error(errorMessage);
			notification.failed(toastId, "Transaction failed, Please try agains with sufficient gas");
			
			return null;
		}
		
	};
	
	const saveTransactionToLocalStorage = (txData) => {
	  
		try {
		  const existingTransaction = JSON.parse(localStorage.getItem("tokenTransactions")) || [];
		  
		  existingTransaction.push(txData);
		  localStorate.setItem("tokenTransactions", JSON.stringify(existingTransaction));
		  
		  console.log("Transaction saved to localStorage: ", txData);
		
		} catch (error) {
			console.error("Failed to transaction saved to localStorage: ", error);
		}
	};
	
	// create update token price functions
	const updateTokenPrice = async (newPrice) => {
		if (!contract || !address) return null;
		
		const toastId = notification.start(`Updating token price...`);
		
		try {
			const parsedPrice = ethers.utils.parseEther(newPrice);
			const tx = await contract.updateTokenPrice(parsedPrice);
			
			notification.update(toastId, "Processing", "Confirming price update...");
			const receipt = await tx.wait();
			
			if (receipt.status === 1) {
				setRecall((prev) => prev + 1);
				notification.complete(toastId, `Token price update to ${newPrice} ${currency}`);
				
				return receipt;
			}
			
		} catch (error) {
			const {message: errorMessage, code: errorCode} = handleTransactionError(error, "updating token price");
			
			if (erroCode == "ACTION_REJECTED") {
				notification.reject(toastId, "Transaction rejected by user");
				return null;
			}
			
			console.error(errorMessage);
			notification.failed(toastId, "Price update failed, Please check premissions");
			
			return null;
		}
		
	};
	
	// create set sale token functions
	const setSaleToken = async (tokenAddress) => {
		if (!contract || !address) return null;
		
		const toastId = notification.start(`Setting sale token...`);
		
		try {
			const tx = await contract.setSaleToken(tokenAddress);
			
			notification.update(toastId, "Processing", "Confirming token update...");
			const receipt = await tx.wait();
			
			if (receipt.status === 1) {
				setRecall((prev) => prev + 1);
				notification.complete(toastId, `Sale token updated successfully✅`);
				
				return receipt;
			}
			
		} catch (error) {
			const {message: errorMessage, code: errorCode} = handleTransactionError(error, "Setting sale token");
			
			if (erroCode == "ACTION_REJECTED") {
				notification.reject(toastId, "Transaction rejected by user");
				return null;
			}
			
			console.error(errorMessage);
			notification.failed(toastId, "Failed to set sale token, Please check address");
			
			return null;
		}
		
	};
	
	// create withdraw all tokens functions
	const withdrawAllTokens = async () => {
		if (!contract || !address) return null;
		
		const toastId = notification.start(`Withdraw tokens...`);
		
		try {
			const tx = await contract.withdrawAllTokens();
			
			notification.update(toastId, "Processing", "Confirming withdraw...");
			const receipt = await tx.wait();
			
			if (receipt.status === 1) {
				setRecall((prev) => prev + 1);
				notification.complete(toastId, `Withdrawals all tokens successfully✅`);
				
				return receipt;
			}
			
		} catch (error) {
			const {message: errorMessage, code: errorCode} = handleTransactionError(error, "Withdraw tokens");
			
			if (erroCode == "ACTION_REJECTED") {
				notification.reject(toastId, "Transaction rejected by user");
				return null;
			}
			
			console.error(errorMessage);
			notification.failed(toastId, "Withdrawals tokens failed, Please try agains");
			
			return null;
		}
		
	};
	
	// create rescue tokens functions
	const rescueTokens = async (tokenAddress) => {
		if (!contract || !address) return null;
		
		const toastId = notification.start(`Rescuing token...`);
		
		try {
			const tx = await contract.rescueTokens(tokenAddress);
			
			notification.update(toastId, "Processing", "Rescue operation...");
			const receipt = await tx.wait();
			
			if (receipt.status === 1) {
				setRecall((prev) => prev + 1);
				notification.complete(toastId, `Tokens rescued successfully✅`);
				
				return receipt;
			}
			
		} catch (error) {
			const {message: errorMessage, code: errorCode} = handleTransactionError(error, "Rescue tokens");
			
			if (erroCode == "ACTION_REJECTED") {
				notification.reject(toastId, "Transaction rejected by user");
				return null;
			}
			
			console.error(errorMessage);
			notification.failed(toastId, "Failed to rescued tokens, Please try agains / check address");
			
			return null;
		}
		
	};
	
	const formatAddress = (address) => {
		if (!address) return "";
		
		return `${address.substring(0, 6)}....${address.substring(address.length - 4)}`;
	};
	
	const formatTokenAmount = (amount, decimals=18) => {
		if (!amount) return "0";
		
		return ethers.utils.formatUnits(amount, decimals);
	};
	
	const isOwner = async () => {
		if (!contract || !address) return false;
		
		try {
			const ownerAddress = await contract.owner();
			
			return ownerAddress.toLowerCase() === address.toLowerCase();
			
		} catch (error) {
			const errorMessage = handleTransactionError(error, " Withdraw tokens");
			console.log(errorMessage);
			return false;
		}
	};
	
	const addTokenToMetamask = async () => {
		const toastId = notification.start(`Adding ${tokenSymbol} Token to metamask`);
		
		try {
			const added = await window.ethereum.request({
				method: "wallet_watchAsset",
				params: {
					type: "ERC20",
					options: {
						address: ecropAddress,
						symbol: tokenSymbol,
						decimals: tokenDecimal,
						image: tokenLogo
					},
				},
			});
			
			if (added) {
				notification.complete(toastId, "Successfullt added token✅");
			} else {
				notification.complete(toastId, "Failed added token❌");
			}
			
		} catch (error) {
			console.error(error);
			const {error: errorMessage, code: errorCode} = handleTransactionError(error, "Token additin error");
			
			notification.failed(toastId, `Transaction failed: ${errorMessage.message === "undefined" ? "Not Supported😭": errorMessage.message}`);
		}
	};
	
	const value = {
		provider,
		signer,
		contract,
		account: address,
		chainId,
		isConnected: !!address && !!contract,
		isConnecting,
		contractInfo,
		tokenBalance,
		error,
		reCall,
		globalLoad,
		buyToken,
		updateTokenPrice,
		setSaleToken,
		withdrawAllTokens,
		rescueTokens,
		formatAddress,
		formatTokenAmount,
		isOwner,
		setRecall,
		addTokenToMetamask
	};
	
	return (
		<web3Context.Provider value={value}>
		  {children}
		</web3Context.Provider >
	);
};

export const useWeb3 = () => {
	const context = useContext(web3Context);
	
	if (!context) throw new Error("useWeb3 must be used within a web3Provider");
	
	return context;
};

export default web3Context;
