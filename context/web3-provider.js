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

// Konfigurasi environment variables
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

// Provider fallback jika provider utama tidak tersedia
const fallbackProvider = new ethers.providers.JsonRpcProvider(rpcUrl);

export const Web3Provider = ({ children }) => {
	const { notification } = useToast();

	const { address, isConnected } = useAccount();
	const chainId = useChainId();
	const { data: balance } = useBalance({ address });
	const { connect, connectors } = useConnect();
	const [reCall, setRecall] = useState(0);
	const [globalLoad, setGlobalLoad] = useState(false);

	const provider = useEthersProvider();
	const signer = useEthersSigner();

	const [contract, setContract] = useState(null);
	const [account, setAccount] = useState(null);

	const [isConnecting, setIsConnecting] = useState(false);

	// State untuk menyimpan informasi kontrak ICO
	const [contractInfo, setContractInfo] = useState({
		ecropAddress: null,
		ecropBalance: "0",
		ethPrice: "0",
		totalSold: "0",
	});

	// State untuk menyimpan balance token user
	const [tokenBalance, setTokenBalance] = useState({
		userEcropBalance: "0",
		contractEthBalance: null,
		totalSupply: null,
		userEthBalance: null,
		ethPrice: "0",
		ecropBalance: "0"
	});

	const [error, setError] = useState(null);

	// ==================== EFFECT HOOKS ====================

	/**
	 * Inisialisasi contrak ICO ketika provider dan signer tersedia
	 * Fungsi ini membuat instance kontrak yang terhubung dengan wallet user
	 */
	useEffect(() => {
		const initContract = () => {
			if (provider && signer) {
				try {
					const contractInstance = new ethers.Contract(
						icoContractAddress,
						tokenIcoAbi,
						signer
					);

					setContract(contractInstance);

				} catch (error) {
					console.error("Error initializing contract: ", error);
					setError("Failed to initialize contract");
				}
			}
		};

		initContract();
	}, [provider, signer]);

	/**
	 * Fetch informasi kontrak dan balance token secara berkala
	 * Dipanggil ketika contract, address, provider, atau reCall berubah
	 */
	useEffect(() => {
		const fetchContractInfo = async () => {
			setGlobalLoad(true);

			try {
				const currentProvider = provider || fallbackProvider;

				// Membuat kontrak read-only untuk membaca data
				const readOnlyContract = new ethers.Contract(
					icoContractAddress,
					tokenIcoAbi,
					currentProvider
				);

				// Memanggil fungsi getContractInfo dari kontrak ICO
				const info = await readOnlyContract.getContractInfo();

				const tokenDecimals = parseInt(info.tokenDecimals) || 18;

				// Update state dengan informasi kontrak
				setContractInfo({
					ecropAddress: info.tokenAddress,
					ecropBalance: ethers.utils.formatUnits(info.tokenBalance, tokenDecimals),
					ethPrice: ethers.utils.formatUnits(info.ethPrice, 18),
					totalSold: ethers.utils.formatUnits(info.totalSold, tokenDecimals)
				});

				// Jika user terhubung, fetch balance token dan ETH
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

					setTokenBalance(prev => ({
						...prev,
						userEcropBalance: ethers.utils.formatUnits(userTokenBalance, tokenDecimals),
						contractEthBalance: ethers.utils.formatUnits(contractEthBalance, 18),
						totalSupply: ethers.utils.formatUnits(totalSupply, tokenDecimals),
						userEthBalance: ethers.utils.formatUnits(userEthBalance, 18),
						ethPrice: ethers.utils.formatUnits(info.ethPrice, 18),
						ecropBalance: ethers.utils.formatUnits(info.tokenBalance, tokenDecimals)
					}));
				}

				setGlobalLoad(false);
			} catch (error) {
				setGlobalLoad(false);
				console.error("Error fetching contract info: ", error);
			}
		};

		fetchContractInfo();
	}, [contract, address, provider, signer, reCall]);

	// ==================== FUNGSI UTAMA ====================

	/**
	 * Fungsi untuk membeli token dengan ETH
	 * @param {string} ethAmount - Jumlah ETH yang akan ditukar (dalam string)
	 * @returns {Object|null} - Receipt transaksi atau null jika gagal
	 */
	const buyToken = async (ethAmount) => {
		if (!contract || !address) return null;

		const toastId = notification.start(`Membeli ${tokenSymbol} dengan ${currency}...`);

		try {
			const ethValue = ethers.utils.parseEther(ethAmount);
			const tx = await contract.buyToken({ value: ethValue });

			notification.update(toastId, "Processing", "Menunggu konfirmasi...");
			const receipt = await tx.wait();

			if (receipt.status === 1) {
				const tokenPrice = perTokenUsdPrice;
				const tokensReceived = parseFloat(ethAmount) / tokenPrice;

				// Simpan transaksi ke localStorage
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
				setRecall((prev) => prev + 1);

				notification.complete(toastId, `Berhasil membeli token ${tokenSymbol} ✅`);

				return receipt;
			}

		} catch (error) {
			const {message: errorMessage, code: errorCode} = handleTransactionError(error, "membeli token");

			if (errorCode == "ACTION_REJECTED") {
				notification.reject(toastId, "Transaksi ditolak oleh user");
				return null;
			}

			console.error(errorMessage);
			notification.failed(toastId, "Transaksi gagal, silakan coba lagi dengan gas yang cukup");

			return null;
		}
	};

	/**
	 * Fungsi untuk update harga token (hanya owner)
	 * @param {string} newPrice - Harga baru dalam ETH
	 * @returns {Object|null} - Receipt transaksi atau null jika gagal
	 */
	const updateTokenPrice = async (newPrice) => {
		if (!contract || !address) return null;

		const toastId = notification.start(`Memperbarui harga token...`);

		try {
			const parsedPrice = ethers.utils.parseEther(newPrice);
			const tx = await contract.updateTokenPrice(parsedPrice);

			notification.update(toastId, "Processing", "Mengonfirmasi update harga...");
			const receipt = await tx.wait();

			if (receipt.status === 1) {
				setRecall((prev) => prev + 1);
				notification.complete(toastId, `Harga token diperbarui menjadi ${newPrice} ${currency}`);

				return receipt;
			}

		} catch (error) {
			const {message: errorMessage, code: errorCode} = handleTransactionError(error, "memperbarui harga token");

			if (errorCode == "ACTION_REJECTED") {
				notification.reject(toastId, "Transaksi ditolak oleh user");
				return null;
			}

			console.error(errorMessage);
			notification.failed(toastId, "Update harga gagal, silakan cek permissions");

			return null;
		}
	};

	/**
	 * Fungsi untuk set token yang dijual di ICO (hanya owner)
	 * @param {string} tokenAddress - Alamat kontrak token
	 * @returns {Object|null} - Receipt transaksi atau null jika gagal
	 */
	const setSaleToken = async (tokenAddress) => {
		if (!contract || !address) return null;

		const toastId = notification.start(`Mengatur token penjualan...`);

		try {
			const tx = await contract.setSaleToken(tokenAddress);

			notification.update(toastId, "Processing", "Mengonfirmasi update token...");
			const receipt = await tx.wait();

			if (receipt.status === 1) {
				setRecall((prev) => prev + 1);
				notification.complete(toastId, `Token penjualan berhasil diupdate ✅`);

				return receipt;
			}

		} catch (error) {
			const {message: errorMessage, code: errorCode} = handleTransactionError(error, "mengatur token penjualan");

			if (errorCode == "ACTION_REJECTED") {
				notification.reject(toastId, "Transaksi ditolak oleh user");
				return null;
			}

			console.error(errorMessage);
			notification.failed(toastId, "Gagal mengatur token penjualan, silakan cek alamat");

			return null;
		}
	};

	/**
	 * Fungsi untuk withdraw semua token dari kontrak ICO (hanya owner)
	 * @returns {Object|null} - Receipt transaksi atau null jika gagal
	 */
	const withdrawAllTokens = async () => {
		if (!contract || !address) return null;

		const toastId = notification.start(`Withdraw token...`);

		try {
			const tx = await contract.withdrawAllTokens();

			notification.update(toastId, "Processing", "Mengonfirmasi withdraw...");
			const receipt = await tx.wait();

			if (receipt.status === 1) {
				setRecall((prev) => prev + 1);
				notification.complete(toastId, `Berhasil withdraw semua token ✅`);

				return receipt;
			}

		} catch (error) {
			const {message: errorMessage, code: errorCode} = handleTransactionError(error, "withdraw token");

			if (errorCode == "ACTION_REJECTED") {
				notification.reject(toastId, "Transaksi ditolak oleh user");
				return null;
			}

			console.error(errorMessage);
			notification.failed(toastId, "Withdraw token gagal, silakan coba lagi");

			return null;
		}
	};

	/**
	 * Fungsi untuk rescue token yang terkirim secara tidak sengaja (hanya owner)
	 * @param {string} tokenAddress - Alamat token yang akan direscue
	 * @returns {Object|null} - Receipt transaksi atau null jika gagal
	 */
	const rescueTokens = async (tokenAddress) => {
		if (!contract || !address) return null;

		const toastId = notification.start(`Menyelamatkan token...`);

		try {
			const tx = await contract.rescueTokens(tokenAddress);

			notification.update(toastId, "Processing", "Operasi penyelamatan...");
			const receipt = await tx.wait();

			if (receipt.status === 1) {
				setRecall((prev) => prev + 1);
				notification.complete(toastId, `Token berhasil diselamatkan ✅`);

				return receipt;
			}

		} catch (error) {
			const {message: errorMessage, code: errorCode} = handleTransactionError(error, "menyelamatkan token");

			if (errorCode == "ACTION_REJECTED") {
				notification.reject(toastId, "Transaksi ditolak oleh user");
				return null;
			}

			console.error(errorMessage);
			notification.failed(toastId, "Gagal menyelamatkan token, silakan coba lagi / cek alamat");

			return null;
		}
	};

	// ==================== FUNGSI HELPER ====================

	/**
	 * Menyimpan transaksi ke localStorage untuk riwayat
	 * @param {Object} txData - Data transaksi yang akan disimpan
	 */
	const saveTransactionToLocalStorage = (txData) => {
		try {
			const existingTransaction = JSON.parse(localStorage.getItem("tokenTransactions")) || [];

			existingTransaction.push(txData);
			localStorage.setItem("tokenTransactions", JSON.stringify(existingTransaction));

			console.log("Transaksi disimpan ke localStorage: ", txData);

		} catch (error) {
			console.error("Gagal menyimpan transaksi ke localStorage: ", error);
		}
	};

	/**
	 * Memformat alamat wallet menjadi format pendek
	 * @param {string} address - Alamat wallet lengkap
	 * @returns {string} - Alamat yang diformat (0x1234...5678)
	 */
	const formatAddress = (address) => {
		if (!address) return "";

		return `${address.substring(0, 6)}....${address.substring(address.length - 4)}`;
	};

	/**
	 * Memformat amount token dari wei ke unit yang readable
	 * @param {string} amount - Amount dalam wei/unit terkecil
	 * @param {number} decimals - Decimal token (default: 18)
	 * @returns {string} - Amount yang sudah diformat
	 */
	const formatTokenAmount = (amount, decimals = 18) => {
		if (!amount) return "0";

		return ethers.utils.formatUnits(amount, decimals);
	};

	/**
	 * Mengecek apakah user saat ini adalah owner kontrak
	 * @returns {boolean} - True jika user adalah owner
	 */
	const isOwner = async () => {
		if (!contract || !address) return false;

		try {
			const ownerAddress = await contract.owner();

			return ownerAddress.toLowerCase() === address.toLowerCase();

		} catch (error) {
			const errorMessage = handleTransactionError(error, " Mengecek owner");
			console.log(errorMessage);
			return false;
		}
	};

	/**
	 * Menambahkan token ke MetaMask wallet user
	 */
	const addTokenToMetamask = async () => {
		const toastId = notification.start(`Menambahkan ${tokenSymbol} Token ke MetaMask`);

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
				notification.complete(toastId, "Berhasil menambahkan token ✅");
			} else {
				notification.complete(toastId, "Gagal menambahkan token ❌");
			}

		} catch (error) {
			console.error(error);
			const {error: errorMessage, code: errorCode} = handleTransactionError(error, "Error penambahan token");

			notification.failed(toastId, `Transaksi gagal: ${errorMessage.message === "undefined" ? "Tidak Didukung 😭" : errorMessage.message}`);
		}
	};

	// ==================== VALUE CONTEXT ====================

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
		</web3Context.Provider>
	);
};

export const useWeb3 = () => {
	const context = useContext(web3Context);

	if (!context) throw new Error("useWeb3 must be used within a Web3Provider");

	return context;
};

export default web3Context;