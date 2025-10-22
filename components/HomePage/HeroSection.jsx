import React, {
	useState,
	useMemo,
	useEffect,
	useRef
} from "react";
import { FaEthereum } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsFillInfoCircleFill, BsCurrencyDollar } from "react-icons/bs";
import { RiUsdCircle } from "react-icons/ri";
import { CustomConnectButton } from "../index";
import { useWeb3 } from "@/context/web3-provider";
import { ethers } from "ethers";

const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME;
const tokenSymbol = process.env.NEXT_PUBLIC_TOKEN_SYMBOL;
const tokenSupply = process.env.NEXT_PUBLIC_TOKEN_SUPPLY;
const perTokenUsdPrice = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE;
const nextPerTokenUsdPrice = process.env.NEXT_PUBLIC_NEXT_PER_TOKEN_USD_PRICE;
const currency = process.env.NEXT_PUBLIC_CURRENCY;
const blockchain = process.env.NEXT_PUBLIC_BLOCKCHAIN;

const HeroSection = ({isDarkMode, setIsReffelPopupOpeb}) => {
    
		const {
		account,
		isConnected,
		contractInfo,
		tokenBalance,
		buyToken,
		addTokenToMetamask
	} = useWeb3();
	
	const [selectedToken, setSelectedToken] = useState("ETH");
	const [inputAmount, setInputAmount] = useState("0");
	const [tokenAmount, setTokenAmount] = useState("0");
	const [hasSufficientBalance, setHasSufficientBalance] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [hasAttemptedRegistration, setHasAttemptedRegistration] = useState(false);
	
	const canvasRef = useRef(null);
	const particlesRef = useRef(null);
	const animationRef = useState(null);
	
	const calculateProgressPercentage = () => {
		if (!contractInfo?.totalSold || !contractInfo?.ecropBalance) return 0;
		
		const totalSold = parseFloat(contractInfo.totalSold);
		const ecropBalance = parseFloat(contractInfo.ecropBalance);
		
		const totalSupply = totalSold + ecropBalance;
		
		const percentage = (totalSold / totalSupply) * 100;
		
		return isNaN(percentage) ? 0 : Math.min(parseFloat(percentage.toFixed(2)), 100);
	};
	
	const prices = useMemo(() => {
		const defaultEthPrice = contractInfo?.ethPrice;
		
		let ethPrice;
		
		try {
			
			if (contractInfo?.ethPrice) {
				if (typeof contractInfo.ethPrice === "object" && contractInfo.ethPrice._isBigNumber) {
					ethPrice = contractInfo.ethPrice;
				} else {
					ethPrice = ethers.utils.parseEther(contractInfo.ethPrice.toString());
				}
			} else {
				ethPrice = ethers.utils.parseEther(defaultEthPrice);
			}
			
		} catch (error) {
			console.error(error);
			ethPrice = ethers.utils.parseEther(defaultEthPrice);
		}
		
		return { ethPrice }
	}, [contractInfo]);
	
	// start loading useEffect
	useEffect(() => {
		
		setIsLoading(true);
		
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);
		
		return () => clearTimeout(timer);
		
	}, []);
	
	useEffect(() => {
		
		if (!isConnected || !tokenBalance) {
			setHasSufficientBalance(false);
			return;
		}
		
		// check is FSX balance is below treeshold
		const lowTokenSupply = parseFloat(tokenBalance?.ecropBalance || "0") < 20;
		
		if (lowTokenSupply) {
			setHasSufficientBalance(false);
			return;
		}
		
		const inputAmountFloat = parseFloat(inputAmount) || 0;
		let hasBalance = false;
		
		switch (selectedToken) {
			case "ETH":
				const ethBalance = parseFloat(tokenBalance?.userEthBalance || "0");
				hasBalance = ethBalance >= inputAmountFloat && inputAmountFloat > 0;
				break;
			
			default:
				hasBalance = false;
		}
		
		setHasSufficientBalance(hasBalance);
		
	}, [isConnected, inputAmount, selectedToken, tokenBalance]);
	
	// calculate token amount based on input amount and selected token
	const calculateTokenAmount = (amount, token) => {
		
		if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) return "0";
		
		let calculatedAmount;
		
		try {
			
			switch (token) {
				case "ETH":
				  
					const amountInWei = ethers.utils.parseEther(amount);
					const tokenPerEth = ethers.utils.formatEther(prices.ethPrice);
					calculatedAmount = parseFloat(amount) / parseFloat(tokenPerEth);
					break;
					
				default:
					calculatedAmount = 0;
			}
			
		} catch (error) {
			console.error(error);
			calculatedAmount = 0;
		}
		
		return calculatedAmount.toFixed(2);
		
	};
	
	// handle input changes
	const handleInputChange = (value) => {
		setInputAmount(value);
		setTokenAmount(calculateTokenAmount(value, selectedToken));
	};
	
	// handle token selection
	const handleTokenSelection = (token) => {
		setSelectedToken(token);
		setTokenAmount(inputAmount, token);
	};
	
	// execute purchase based on selectedToken 
	const executePurchase = async () => {
		
		if (!isConnected) {
			alert("Please connected your wallet first.");
			return;
		}
		
		if (parseFloat(inputAmount) <= 0) {
			alert("Amount must be greater than 0");
			return;
		}
		
		if (!hasSufficientBalance) {
			
			if (parseFloat(tokenBalance?.ecropBalance || "0") <= 20) { // fsxBalance or ecropBalance or userEthBalance
				alert("Insufficient token supply, Please try agains.");
			} else {
				alert(`Insufficient ${selectedToken} balance`);
			}
			
			return;
		}
		
		try {
			let tx;
			console.log(`Buying with ${inputAmount} ${selectedToken}`);
			
			switch (selectedToken) {
				case "ETH":
					tx = await buyToken(inputAmount);
					break;
				
				default:
					alert("Please select a token to purchase with");
					return;
			}
			
			console.log(tx);
			console.log(`Successfully purchased ${tokenAmount} ${tokenSymbol} tokens.`);
			
			// reset amount
			setInputAmount("0");
			setTokenAmount("0");
			
		} catch (error) {
			console.error(error);
			alert("Transaction failed, please try agains😭😭");
		}
	};
	
	// get current balance based on selected token
	const getCurrentBalance = () => {
		if (!tokenBalance) return "0";
		
		switch (selectedToken) {
			case "ETH":
				return tokenBalance?.userEthBalance || "0";
				
			default:
				return "0";
		}
		
	};
	
	const getButtonMessage = () => {
		
		if (inputAmount === "0" || inputAmount === "") return "ENTER AMOUNT😟";
		
		if (parseFloat(tokenBalance?.ecropBalance || "0") <= 20) return "INSUFFICIENT TOKEN SUPPLY";
		
		return hasSufficientBalance ? `BUY ${tokenSymbol}` : `INSUFFICIENT ${selectedToken} BALANCE`;
		
	};
	
	const getTokenIcon = (token) => {
		
		switch (token) {
			case "ETH":
				return <img src="/ethereum.png" alt="eth" className="h-5 w-5"/>
		  
			default:
				return null;
	  }
		
	};
	
	//theme variable
	const bgColor = isDarkMode ? "bg-[#0E0B12]" : "bg-[#F5F7FA]";
	const textColor = isDarkMode ? "text-white" : "text-gray-800";
	const secondaryTextColor = isDarkMode ? " text-gray-40" : "text-gray-600";
	const cardBg = isDarkMode ? "bg-[#13101A]" : "bg-white/95";
	const cardBorder = isDarkMode ? "border-gray-800/30" : "border-gray-100";
	const inputBg = isDarkMode ? "bg-gray-900/60 border-gray-800/50" : "bg-gray-100 border-gray-200/70";
	const primaryGradient = "from-fuchsia-500 to-purple-600";
	const primaryGradientHover= "hover:from-fuchsia-600 hover:to-purple-700";
	const accentColor = "text-[#7765F3]";
	
	const getTokenButtonStyle = (token) => {
		const isSelected = selectedToken === token;
		const baseClasses = "flex-1 flex items-center justify-center rounded-lg py-2.5 transition-all duration-300";
		
		if (isSelected) {
			let selectedColorClass;
			
			switch (token) {
				case "ETH":
					selectedColorClass = "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white";
					break;
				
				default:
					selectedColorClass = "";
			}
			
			return `${baseClasses} ${selectedColorClass} text-white shadow-lg`;
		}
		
		return `${baseClasses} ${isDarkMode ? "bg-gray-800/40 hover:bg-gray-800/60 text-gray-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`;
	};
	
	useEffect(() => {
		
		const canvas = canvasRef.current;
		
		if (!canvas) return;
		
		const ctx = canvas.getContext("2d");
		const particlesCount = 70;
		const baseColor = {r: 189, g: 38, b: 211}; // #BD26D3
		
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = canvas.parrentElement.offsetHeight;
		};
		
		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);
		
		let mouseX = 0;
		let mouseY = 0;
		const handleMouseMove = (e) => {
			const rect = canvas.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		};
		
		handleMouseMove();
		window.addEventListener("mousemove", handleMouseMove);
		
		const perspective = 400;
		const focalLength = 300;
		
		particlesRef.current = Array(particlesCount).fill().map(() => ({
			x: Math.random() * canvas.width - canvas.width / 2,
			y: Math.random() * canvas.height - canvas.height / 2,
			z: Math.random() * 1000,
			size: Math.random() * 4 + 2,
			baseSize: Math.random() * 4 + 2,
			speedX: Math.random() * 0.5 - 0.25,
			speedY: Math.random() * 0.5 - 0.25,
			speedZ: Math.random() * 2 + 1,
			opacity: Math.random() * 0.5 + 0.3
		}));
		
		const animate = () => {
			ctx.clearRect(0,0, canvas.width, canvas.height);
			
			const sortedParticles = [...particlesRef.current].sort((a,b) => a.z - b.z);
			
			sortedParticles.forEach((particle) => {
				
				const mouseInfluanceX = (mouseX - canvas.width / 2 - particle.x) * 0.0001;
				const mouseInfluanceY = (mouseY - canvas.height / 2 - particle.y) * 0.0001;
				
				particle.x += particle.speedX + mouseInfluanceX;
				particle.y += particle.speedY + mouseInfluanceY;
				particle.z -= particle.speedZ;
				
				if (particle.z < -focalLength) {
					particle.z = Math.random() * 1000;
					particle.x = Math.random() * canvas.width - canvas.width / 2;
					particle.y = Math.random() * canvas.height - canvas.height / 2;
				}
				
				const scale = focalLength / (focalLength + particle.z);
				const x2d = particle.x * scale + canvas.width / 2;
				const y2d = particle.y * scale + canvas.height / 2;
				const scaledSize = particle.baseSize * scale;
				
				
				const distance = 1 - Math.min(particle.z / 1000, 1);
				const opacity = particle.opacity * distance;
				
				const colorVariation = Math.max(0.6, distance);
				const r = Math.floor(baseColor.r * colorVariation);
				const g = Math.floor(baseColor.g * colorVariation);
				const b = Math.floor(baseColor.b * colorVariation);
				
				ctx.beginPath();
				ctx.arc(x2d, y2d, scaledSize, 0, Math.PI * 2);
				ctx.fillStyle(`rgba(${r}, ${g}, ${b}, ${opacity})`);
				ctx.fill();
				
				if (distance > 0.8) {
					ctx.beginPath();
					ctx.arc(x2d, y2d, scaledSize * 1.5, 0, Math.PI * 2);
					ctx.fillStyle(`rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`);
					ctx.fill();
				}
				
			});
			
			animationRef.current = requestAnimationFrame(animate);
		};
		
		animate();
		
		return () => {
			cancelAnimationFrame(animationRef.current);
			window.removeEventListener("resize", resizeCanvas);
			window.removeEventListener("mousemove", handleMouseMove);
		};
		
	}, [isDarkMode]);
	
	return (
		<div className={`relative mt-12 w-full overflow-hidden ${bgColor}`}>
		  <div className={`absolute inset-0 z-0`}>
			  
				<div className={`absolute inset-0 ${
					isDarkMode ? "bg-gradient-to-b from-[#0E0B12]/80 via-transparent to-[#0E0B12]/80": 
					"bg-gradient-to-b from-[#f3f3f7]/80 via-transparent to-[#f3f3f7]/80"
				}`}></div>
				
				<canvas
				  ref={canvasRef}
					className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
					style={{
						zIndex: 1
					}}
				/>
				
				<div className="absolute inset-0 grid-pattern"></div>
				
				<div className="absolute inset-0 light-rays">
				  <div className="light-ray ray1"></div>
					<div className="light-ray ray2"></div>
					<div className="light-ray ray3"></div>
				</div>
			
			</div>
			
			{/* main content */}
			<div className="container mx-auto px-4 py-28 md:py-32 relative z-10">
			  <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
				  <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
					 
					  <div className="inline-block p-2 px-4 rounded-full mb-6 bg-gradient-to-r from-green-400/10 to-indigo-500/10">
						  <p className="text-sm font-medium bg-clip-text transparent bg-gradient-to-r from-fuchsia-500 to-purple-600 animate-gradient-x">
							  Presale Live Now
							</p>
						</div>
						
						<h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-4 ${textColor}`}>
						  <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600 animate-gradient-x">
							  {tokenName}
							</span>
						</h1>
						
						<h2 className="text-2xl md:text-3xl font-bold mb-6">
						  <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600 animate-gradient-x">
							  Token
							</span>
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 animate-gradient-x">
							  {" "}
								Sale
							</span>
							<span className={textColor}> Stage 1</span>
						</h2>
						
						<p className={`${secondaryTextColor} text-base md-text-lg max-w-md mb-8 leading-relaxed`}>
						  Revolutionizing intelligence through decentralized innovation.
							Join E100 the future of blockchains technology today.
						</p>
						
						<div className="flex flex-wrap gap-4 mb-8">
						  <div className={`px-4 py-2 rounded-full ${isDarkMode ? "bg-green-500/10" : "bg-green-100"} ${isDarkMode ? "text-fuchsia-500" : "text-green-700"} text-sm font-medium flex items-center`}>
							  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
								Limited Presale
							</div>
							
							<div className={`px-4 py-2 rounded-full ${isDarkMode ? "bg-indigo-500/10 text-indigo-300": "bg-indigo-100 text-indigo-700"} text-sm font-medium flex items-center`}>
							  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
								Exclusive Benefites
							</div>
						</div>
						
						<div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl -z-10 bg-gradient-to-r from-green-400/10 to-indigo-500/10"></div>
					</div>
					
					<div className="w-full md:w-1/2 max-w-md mx-auto relative">
					  {isLoading && (
							<div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-xl">
							  <div className="flex flex-col items-center">
								  <div className="w-12 h-12 border-4 border-fuchsia-500 mb-4 animate-spin rounded-full border-t-transparent"></div>
								</div>
							</div>
						)}
						
						{/* main/card */}
						<div className={`${cardBg} ${cardBorder} backdrop-blur-sm rounded-xl border shadow-xl overflow-hidden transform transition duration-500 hover:shadow-2xl`}>
						  <div className="p-6 md:p-8">
							  
								{(!tokenBalance?.userEcropBalance || Number(tokenBalance.userEcropBalance === 0) && (
									<div className={`text-center text-xs ${secondaryTextColor} mb-4 px-4 py-2 rounded-lg bg-gradient-to-r from-green-400/5 to-indigo-500/5`}>
									  Can't find tokens in your wallet?
									</div>
								))}
								
								<div className="text-center">
								  <div className="inline-block p-1.5 px-3 rounded-full mb-2 bg-gradient-to-r from-green-400/10 to-indigo-500/10">
									  <p className="text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600 animate-gradient-x">
										  Limited Time Offer
										</p>
									</div>
									
									<h3 className="text-xl font-bold mb-1 text-center bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600 animate-gradient-x">
									  Stage 1 - Buy {tokenName} Now
									</h3>
									
									<div className={`text-center text-sm mb-4 ${secondaryTextColor}`}>
									  Until price increase
									</div>
								</div>
								
								<div className="flex items-center justify-between px-1 mb-3 text-sm">
								  <div className={`flex flex-col ${secondaryTextColor}`}>
									  <span className="text-xs mb-1">Current Price</span>
										<span className={`${textColor} font-medium`}>
										  {perTokenUsdPrice} {currency}
										</span>
									</div>
									
									<div className="h-10 w-px bg-gradient-to-b from-transparent via-gray-500/20 to-transparent"></div>
									
									<div className={`flex flex-col text-right ${secondaryTextColor}`}>
									  <span className="text-xs mb-1">Next Stage Price</span>
										<span className={`${textColor} font-medium`}>
										  {nextPerTokenUsdPrice} {currency}
										</span>
									</div>
								</div>
								
								{/* progress bar */}
								<div className={`w-full h-4 rounded-full mb-3 overflow-hidden ${isDarkMode ? "bg-gray-800/70" : "bg-gray-200/70"}`}>
								  <div 
									  className={`h-full rounded-full bg-gradient-to-r ${primaryGradient} animated-progress relative`}
										style={{
											width: `${Math.max(0.5, calculateProgressPercentage())}%`
										}}
										key={`progress-${calculateProgressPercentage()}`}
									>
									  <div className="absolute top-0 left-0 w-full h-full bg-white/10 shimmer-effect"></div>
									</div>
								</div>
								
								{/* progress stat */}
								<div className="flex mb-6 px-1 text-xs justify-between">
								  <div className={secondaryTextColor}>
									  Total Raised: {" "}
										<span className={`${textColor} font-medium`}>
										  {" "}
											{parseFloat(contractInfo?.totalSold || 0) * parseFloat(perTokenUsdPrice || 0) > 0 ? (parseFloat(contractInfo?.totalSold || 0) * parseFloat(perTokenUsdPrice || 0)).toFixed(2) : "0"}
											{" "}
											ETH
										</span>
									</div>
									
									<div className={`${secondaryTextColor} font-medium`}>
									  <span className="text-fuchsia-500 font-semibold">
										  {calculateProgressPercentage()}%
										</span>
										{" "}
										Complete
									</div>
								</div>
								
								{/* divider */}
								<div className={`border-t my-5 ${isDarkMode ? "border-gray-800/50" : "border-gray-200/50"}`}>
								</div>
								
								{/* token price */}
								<div className="flex items-center justify-center space-x-3 mb-6">
								  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-purple-600/20 flex items-center justify-center">
									  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600">
										  1
										</span>
									</div>
									
									<span className={`text-lg font-medium ${textColor}`}>
									  {tokenSymbol} ={" "}
									</span>
									
									<div className="px-3 py-1 rounded-lg bg-gradient-to-r from-green-400/10 to-indigo-500/10">
									  <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600">
										  {perTokenUsdPrice} &nbsp; {currency}
										</span>
									</div>
								</div>
								
								{/* token selection */}
								<div className="flex space-x-2 mb-4">
								  <button 
									  onClick={() => handleTokenSelection("ETH")}
										className={getTokenButtonStyle("ETH")}
									>
									  <img 
										  className={`mr-2 w-4 h-4 ${selectedToken === "ETH" ? "filter brightness-200" : ""}`}
											src="/ethereum.png"
											alt="eth"
										/>
										Pay With {currency}
									</button>
								</div>
								
								{/* balance display */}
								<div className={`text-sm py-2 mb-6 px-4 rounded-lg text-center ${secondaryTextColor} ${isDarkMode ? "bg-gray-800/30": "bg-gray-100/70"}`}>
								  <span className="mr-2">{selectedToken} Balance:</span>
									<span className={`font-medium ${textColor}`}>
									  {getCurrentBalance()}
									</span>
									<span className="ml-1">{selectedToken}</span>
								</div>
								
								{/* amount inputs */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
								  <div>
									  <label className={`block text-xs font-medium mb-1 ${secondaryTextColor}`}>
										  Pay With {selectedToken}
										</label>
										
									  <div className="relative">
										  <input 
											  type="text"
												value={inputAmount}
												onChange={(e) => handleInputChange(e.target.value)}
												className={`${inputBg} w-full rounded-lg border px-4 py-3 focus:ring-1 focus:ring-green-400 focus:border-green-400 transition-all duration-200 ${textColor}`}
											/>
											<div className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2`}>
											  <span className={`text-xs ${secondaryTextColor}`}>
												  {selectedToken}
												</span>
												
												<div className="flex items-center justify-center rounded-full h-6 w-6">
												  {getTokenIcon(selectedToken)}
												</div>
											</div>
										</div>
									</div>
								  
									<div>
										<label className={`block text-xs font-medium mb-1 ${secondaryTextColor}`}>
										  Receive {tokenSymbol}
										</label>
										
										<div className="relative">
										  <input 
											  type="text"
												value={tokenAmount}
												readOnly
												className={`${inputBg} ${textColor} w-full px-4 py-3 rounded-lg border`}
											/>
											
											<div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
											  <span className={`text-xs ${secondaryTextColor}`}>
												  {tokenSymbol}
												</span>
												
												<div className="h-6 w-6 flex items-center justify-center">
												  <img src={"/logo.png"} alt={tokenSymbol} className="h-5 w-5" />
												</div>
											</div>
										</div>
								  </div>
								</div>
								
								{/* action button */}
								{isConnected ? (
									<>
									  <button 
										  onClick={executePurchase}
											disabled={!hasSufficientBalance}
											className={`w-full ${hasSufficientBalance ? "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700" : isDarkMode ? "bg-gray-700/70 cursor-not-allowed" : "bg-gray-300 cursor-not-allowed"} text-white rounded-lg py-4 mb-4 flex items-center justify-center transition-all duration-300 font-medium shadow-lg ${hasSufficientBalance ? "hover:shadow-purple-500/20 hover:scale-[1.01]" : ""}`}
										>
										  {getButtonMessage()}
											
										</button>
										
										<button 
										  onClick={() => addTokenToMetamask()}
											className="w-full hidden lg:flex bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 rounded-lg py-4 mb-4 flex items-centet justify-center transition-all duration-300 font-medium shadow-lg"
										>
										  <img src="/logo.png" alt={tokenSymbol} className={"h-5 w-5"} />{" "}
											&nbsp;
											<span>Add Token To MetaMask</span>
										</button>
									</>
								) : (
									<CustomConnectButton childStyle="w-full mb-4 py-4 rounded-lg gap-2 font-medium flex items-center justify-center" />
								)}
								
								{/* help links */}
								<div className="flex flex-col space-y-2 text-xs">
								  <div className={`p-3 mb-1 rounded-lg ${isDarkMode ? "bg-gray-800/30": "bg-gray-100/700"}`}>
									
									  <div className="flex items-center space-x-3 mb-2">
										  <AiOutlineQuestionCircle className="text-lg text-[#7765F3]" />
											<h4 className={`font-medium ${textColor}`}>Need Help?</h4>
										</div>
										
										<div className="grid grid-cols-2 gap-2">
										  <a 
											  href="/dashboard"
												className={`${secondaryTextColor} hover:${textColor} flex items-center text-xs transition-colors duration-200 px-2 py-1 rounded hover:bg-gray-700/20`}
											>
											  <span className="mr-1">•</span>
												How To Buy 
											</a>
											
											<a 
											  href="/dashboard"
												className={`${secondaryTextColor} hover:${textColor} flex items-center text-xs transition-colors duration-200 px-2 py-1 rounded hover:bg-gray-700/20`}
											>
											  <span className="mr-1">•</span>
												Wallet Connection
											</a>
											
											<a 
											  href="#tokenInfo"
												className={`${secondaryTextColor} hover:${textColor} flex items-center text-xs transition-colors duration-200 px-2 py-1 rounded hover:bg-gray-700/20`}
											>
											  <span className="mr-1">•</span>
												Token Info
											</a>
											
											<a 
											  href="#faq"
												className={`${secondaryTextColor} hover:${textColor} flex items-center text-xs transition-colors duration-200 px-2 py-1 rounded hover:bg-gray-700/20`}
											>
											  <span className="mr-1">•</span>
												Faq
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	{/* end main content */}
			
			{/* scroll to top button */}
			<div className="fixed bottom-6 right-6 z-50">
			  <button 
				  aria-label="scroll to top"
				  onClick={() => window.scrollTo({ top: 0, behavior: "smooth"})}
					className="h-10 w-10 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 animate-gradient-x text-white shadow-lg shadow-indigo-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
				>
				  <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
				</button>
			</div>
			
			{/* css for animation */}
			<style jsx>
			  {`
				  @keyframes pulse-slow {
						0%,
						100% {
							opacity: 0.8;
							transform scale(1);
						}
						50% {
							opacity: 1;
							transform: scale(1.02);
						}
					}
					
					.animate-pulse-slow {
						animation: pulse-slow 3s infinite;
					}
					
					.animated-progress {
						animation: progress 1.5s ease-out!
					}
					
					@keyframes progress {
						0% {
							width: 0;
						}
						
						100% {
							width: ${Math.max(0.5, calculateProgressPercentage())}%;
							
						}
					}
					
					.grid-pattern {
						background-image: ${
							isDarkMode ? "linear-gradient(rgba(56, 189, 248, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.06) 1px, transparent 1px)" :
							"linear-gradient(rgba(78, 70, 229, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.08) 1px, transparent 1px)"
						};
						background-size: 35px 35px;
						animation: pulse-grid ease-in-out infinite alternate;
					}
					
					@keyframes pulse-grid {
						0% {
							opacity: 0.7;
							background-size: 35px 35px;
						}
						100% {
							opacity: 1;
							background-size: 36px 36px;
						}
					}
					
					.light-rays {
						overflow: hidden;
						opacity: ${isDarkMode ? "0.4" : "0.3"};
					}
					
					light-ray {
						position: absolute;
						width: 200%;
						height: 100;
						background: linear-gradient(
							90deg,
							transparent 0%,
							${isDarkMode ? "rgba(119, 101, 243, 0.05) 45%, rgba(146, 101, 243, 0.1) 50%, rgba(119, 101, 243, 0.05) 55%"
								: "rgba(119, 101, 243, 0.03) 45%, rgba(146, 101, 243, 0.07) 50%, rgba(119, 101, 243, 0.03) 55%"
							},
							transparent 100%
						);
						transform: rotate(45deg);
						top: -50%;
						left: -50%;
					}
					
					.ray1 {
						animation: moveRay 15s linear infinite;
					}
					
					.ray2 {
						animation: moveRay 20s linear 5s infinite;
					}
					
					.ray3 {
						animation: 25s linear 10s infinite;
					}
					
					@keyframes moveRay {
						0% {
							transform: rotate(45deg) translateX(-100%);
						}
						100% {
							transform: rotate(45deg) translateX(100%);
						}
					}
					
					.shimmer-effect {
						animation: shimmer 2s infinite linear;
						background: linear-gradient(
							to right,
							rgba(255, 255, 255, 0) 0%,
							rgba(255, 255, 255, 0.2) 50%,
							rgba(255, 255, 255, 0) 100%
						);
						background-size: 200% 100%;
					}
					
					@keyframes shimmer {
						0% {
							background-position: -200% 0;
						}
						100% {
							backgrounr-position: 200% 0;
						}
					}
				`}
			</style>
		</div>
	);
	
};

export default HeroSection;