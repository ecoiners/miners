import { AppProps } from "next/app";
import Head from "next/head";
import { FC, useEffect } from "react";
import ConnectionProvider from "../context/ContextProvider";
import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";
import NotificationList from "@/components/Notification";
import Particles from "@/components/Particles";

require("@solana/wallet-adapter-react-ui/styles.css");
require("@/styles/globals.css");

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Initialize any client-side functionality here if needed
    // Remove all external script dependencies
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Background dengan gradient + particles */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-900" />
      <Particles />
      
      {/* Overlay untuk depth */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-emerald-900/80" />

      <Head>
        <title>Solana Token Creator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ConnectionProvider>
        <div className="flex flex-col min-h-screen">
          <NotificationList />
          <AppBar />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </ConnectionProvider>
    </div>
  );
};

export default App;