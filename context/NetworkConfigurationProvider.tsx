import { useLocalStorage } from "@solana/wallet-adapter-react";
import {
	FC,
	ReactNode,
	useContext,
	createContext
} from "react";

export interface NetworkConfigurationState {
	networkConfiguration: string;
	setNetworkConfiguration(networkConfiguration: string): void;
};

export const NetworkConfigurationContext = createContext<NetworkConfigurationState>(
	{} as NetworkConfigurationState
);

// Return type harus NetworkConfigurationState
export function useNetworkConfiguration(): NetworkConfigurationState {
	return useContext(NetworkConfigurationContext);
};

export const NetworkConfigurationProvider: FC<{children: ReactNode}> = ({children}) => {
	const [networkConfiguration, setNetworkConfiguration] = useLocalStorage("network", "devnet");
	
	return (
		<NetworkConfigurationContext.Provider value={{networkConfiguration, setNetworkConfiguration}}>
		  {children}
		</NetworkConfigurationContext.Provider>
	);
};