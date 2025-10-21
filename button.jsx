import { ConnectButton, darkTheme } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { inAppWallet, createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "....",
});

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "telegram", "x", "tiktok"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("me.rainbow"),
  createWallet("io.zerion.wallet"),
  createWallet("com.brave.wallet"),
  createWallet("com.broearn"),
  createWallet("com.mtpelerin"),
  createWallet("com.opera"),
  createWallet("com.coinbase.wallet"),
  createWallet("com.okex.wallet"),
  createWallet("com.binance.wallet"),
  createWallet("com.bitget.web3"),
  createWallet("com.trustwallet.app"),
  createWallet("io.rabby"),
  createWallet("com.bitcoin"),
  createWallet("com.bybit"),
  createWallet("org.uniswap"),
  createWallet("com.ledger"),
];

function Example() {
  return (
    <ConnectButton
      client={client}
      connectModal={{
        showThirdwebBranding: false,
        size: "compact",
        title: "LOGIN",
      }}
      theme={darkTheme({
        colors: {
          primaryText: "hsl(119, 91%, 38%)",
          accentText: "hsl(119, 91%, 38%)",
        },
      })}
      wallets={wallets}
    />
  );
}
