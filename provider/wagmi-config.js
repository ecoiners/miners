import { holesky } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  braveWallet,
  metaMaskWallet,
  trustWallet,
  rainbowWallet,
  coinbaseWallet,
  walletConnectWallet,
  injectedWallet,
  argentWallet,
  ledgerWallet,
  omniWallet,
  safeWallet
} from '@rainbow-me/rainbowkit/wallets';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const config = getDefaultConfig({
  appName: "ECROP 100",
  projectId: projectId,
  chains: [holesky],
  ssr: true,
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        injectedWallet, // Auto-detect browser wallets
        braveWallet,
        metaMaskWallet,
        walletConnectWallet,
      ],
    },
    {
      groupName: 'Mobile',
      wallets: [
        trustWallet,
        coinbaseWallet,
        rainbowWallet,
        argentWallet,
      ],
    },
    {
      groupName: 'More',
      wallets: [
        ledgerWallet,
        omniWallet,
        safeWallet,
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