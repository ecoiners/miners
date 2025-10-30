"use client";

import { useLocalStorage } from "@solana/wallet-adapter-react";
import {
  createContext,
  useContext,
  ReactNode,
} from "react";

export interface NetworkConfigurationState {
  networkConfiguration: string;
  setNetworkConfiguration: (networkConfiguration: string) => void;
}

const NetworkConfigurationContext = createContext<NetworkConfigurationState | undefined>(
  undefined
);

export function useNetworkConfiguration(): NetworkConfigurationState {
  const context = useContext(NetworkConfigurationContext);
  if (!context) {
    throw new Error("useNetworkConfiguration must be used within a NetworkConfigurationProvider");
  }
  return context;
}

export function NetworkConfigurationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [networkConfiguration, setNetworkConfiguration] = useLocalStorage("network", "devnet");

  return (
    <NetworkConfigurationContext.Provider
      value={{ networkConfiguration, setNetworkConfiguration }}
    >
      {children}
    </NetworkConfigurationContext.Provider>
  );
}