import { holesky } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  braveWallet,
  metaMaskWallet,
  trustWallet,
  rainbowWallet,
  coinbaseWallet,
  walletConnectWallet,
  injectedWallet
} from '@rainbow-me/rainbowkit/wallets';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const config = getDefaultConfig({
  appName: "ECROP 100",
  projectId: projectId,
  chains: [holesky],
  ssr: true,
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [
        injectedWallet, // Support semua browser wallets (Brave, MetaMask, dll)
        braveWallet,
        metaMaskWallet,
        walletConnectWallet,
        trustWallet,
        coinbaseWallet,
        rainbowWallet,
      ],
    },
  ],
});



/* only metamask
import { holesky } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const config = getDefaultConfig({
	appName: "ECROP 100",
	projectId: projectId,
	chains: [holesky],
	ssr: true
});

*/