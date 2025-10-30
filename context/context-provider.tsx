"use client";

import {
  WalletAdapterNetwork,
  WalletError,
} from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  BraveWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo, useCallback, ReactNode } from "react";

import { AutoConnectProvider, useAutoConnect } from "./auto-connect-provider";
import { notify } from "@/lib/notifications";
import {
  NetworkConfigurationProvider,
  useNetworkConfiguration,
} from "./network-configuration-provider";

// =============================
// WALLET CONTEXT PROVIDER
// =============================
function WalletContextProvider({ children }: { children: ReactNode }) {
  const { autoConnect } = useAutoConnect();
  const { networkConfiguration } = useNetworkConfiguration();

  const network = networkConfiguration as WalletAdapterNetwork;
  const originEndpoint = useMemo(() => clusterApiUrl(network), [network]);

  const endpoint =
    network === "mainnet-beta"
      ? "https://solana-mainnet.g.alchemy.com/v2/EGRd66pcOSpwu3HVIiBFu"
      : network === "devnet"
      ? "https://solana-devnet.g.alchemy.com/v2/EGRd66pcOSpwu3HVIiBFu"
      : originEndpoint;

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new BraveWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletExtensionWalletAdapter(),
      new SolletWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  const onError = useCallback((error: WalletError) => {
    notify({
      type: "error",
      message: error.message
        ? `${error.name}: ${error.message}`
        : error.name,
    });
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

// =============================
// ROOT APP PROVIDER WRAPPER
// =============================
export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <NetworkConfigurationProvider>
      <AutoConnectProvider>
        <WalletContextProvider>{children}</WalletContextProvider>
      </AutoConnectProvider>
    </NetworkConfigurationProvider>
  );
}