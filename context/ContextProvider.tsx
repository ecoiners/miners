import {
	WalletAdapterNetwork,
	WalletError
} from "@solana/wallet-adapter-base";
import {
	ConnectionProvider,
	WalletProvider
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
	PhantomWalletAdapter,
	BraveWalletAdapter,
	SolflareWalletAdapter,
	SolletExtensionWalletAdapter,
	SolletWalletAdapter,
	TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { Cluster, clusterApiUrl } from "@solana/web3.js";
import {
	FC,
	ReactNode,
	useMemo,
	useCallback
} from "react";

import { AutoConnectProvider, useAutoConnect } from "./AutoConnectProvider";
import { notify } from "@/utils/notifications";
import {
	NetworkConfigurationProvider,
	useNetworkConfiguration
} from "./NetworkConfigurationProvider";

const WalletContextProvider: FC<{children: ReactNode}> = ({children}) => {
	const { autoConnect } = useAutoConnect();
	const { networkConfiguration } = useNetworkConfiguration();
	
	const network = networkConfiguration as WalletAdapterNetwork;
	
	const originEndPoint = useMemo(() => clusterApiUrl(network), [network]);
	
	let endpoint;
	
	if (network == "mainnet-beta") {
		endpoint = "https://solana-mainnet.g.alchemy.com/v2/EGRd66pcOSpwu3HVIiBFu";
	} else if (network == "devnet") {
		endpoint = "https://solana-devnet.g.alchemy.com/v2/EGRd66pcOSpwu3HVIiBFu";
	} else {
		endpoint = originEndPoint;
	}
	
	const wallets = useMemo(() => [
		new PhantomWalletAdapter(),
		new BraveWalletAdapter(),
		new SolflareWalletAdapter(),
		new SolletExtensionWalletAdapter(),
		new SolletWalletAdapter(),
		new TorusWalletAdapter()
		
	], [network]);
	
	const onError = useCallback((error: WalletError) => {
		notify({
			type: "error",
			message: error.message ? `${error.name} : ${error.message}` : error.name
		});
		
		console.error(error);
	}, []);
	
	return (
		<ConnectionProvider endpoint={endpoint}>
		  <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
			  <WalletModalProvider>
				  {children}
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
	
}; 

const AppProvider: FC<{children: ReactNode}> = ({children}) => {
	
	return (
		<>
		  <NetworkConfigurationProvider>
			  <AutoConnectProvider>
				  <WalletContextProvider>
					  {children}
					</WalletContextProvider>
				</AutoConnectProvider>
			</NetworkConfigurationProvider>
		</>
	);
};

export default AppProvider;

 
