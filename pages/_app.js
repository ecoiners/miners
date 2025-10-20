// internal import
import "@/styles/globals.css";
import { config } from "@/provider/wagmi-config";
import { Web3Provider } from "@/context/web3-provider";
import { ToastProvider } from "@/context/toast-context";

// external import 
import {
	RainbowKitProvider,
	darkTheme
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";
import {
	QueryClientProvider,
	QueryClient
} from "@tanstack/react-query";


const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
		<WagmiProvider config={config}>
		  <QueryClientProvider client={queryClient}>
			  <RainbowKitProvider theme={darkTheme({
					accentColor: "#D345EF",
					accentColorForeground: "white",
					borderRadius: "small",
					fontStack: "system",
					overlayBlur: "small"
				})}>
				  <ToastProvider>
					  <Web3Provider>
						  <Component {...pageProps}/>
					  </Web3Provider>
					</ToastProvider>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
