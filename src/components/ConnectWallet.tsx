import { ConnectButton, darkTheme } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { client } from "../client";

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "telegram", "tiktok", "facebook"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("com.brave.wallet"),
  createWallet("com.abra"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),
  createWallet("com.binance.wallet"),
  createWallet("com.bitget.web3"),
  createWallet("com.safepal"),
  createWallet("pro.tokenpocket"),
  createWallet("com.bestwallet"),
  createWallet("org.uniswap"),
  createWallet("com.bybit"),
  createWallet("com.ledger"),
  createWallet("com.elrond.maiar.wallet"),
  createWallet("com.fireblocks"),
  createWallet("com.bifrostwallet"),
  createWallet("com.bitcoin"),
  createWallet("com.crypto.wallet"),
  createWallet("io.1inch.wallet"),
  createWallet("com.blockchain.login"),
  createWallet("im.token"),
  createWallet("com.kucoin"),
  createWallet("org.hot-labs.app"),
  createWallet("cc.avacus"),
  createWallet("com.dcentwallet"),
];

function ConnectWallet() {
  return (
    <ConnectButton
      client={client}
      connectButton={{ label: "Connect" }}
      connectModal={{
        privacyPolicyUrl: "Https",
        showThirdwebBranding: false,
        size: "compact",
        termsOfServiceUrl: "https",
        title: "ECROP 100",
        titleIcon:
          "https://gateway.pinata.cloud/ipfs/bafybeibqbay4tbzr2azii4y27xlltvdqbqp6kwhseioiqbtmtzbiji6sfm",
      }}
      theme={darkTheme({
        colors: {
          accentText: "hsl(328, 100%, 60%)",
          primaryText: "hsl(328, 100%, 60%)",
          primaryButtonBg: "hsl(328, 100%, 60%)",
          primaryButtonText: "hsl(230, 40%, 94%)",
        },
      })}
      wallets={wallets}
    />
  );
};

export default ConnectWallet;


