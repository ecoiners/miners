import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import ConnectionProvider from "../context/ContextProvider";
import AppBar from "../components/AppBar";
import Footer from "../components/Footer";
import NotificationList from "../components/Notification";
import Particles from "../components/Particles"; // Import particles

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="min-h-screen relative">
      {/* Background dengan gradient + particles */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-900" />
      <Particles />
      
      {/* Overlay untuk depth */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-emerald-900/80" />

      <Head>
        <title>Solana Token Creator</title>
      </Head>

      <ConnectionProvider>
        <NotificationList />
        <AppBar />
        <Component {...pageProps} />
        <Footer />
      </ConnectionProvider>

      {/* SCRIPTS */}
      <script src="/assets/libs/preline/preline.js"></script>
      <script src="/assets/libs/swiper/swiper-bundle.min.js"></script>
      <script src="/assets/libs/lucide/umd/lucide.min.js"></script>
      <script src="/assets/libs/gumshoejs/gumshoejs.polyfills.min.js"></script>
      <script src="/assets/libs/aos/aos.js"></script>
      <script src="/assets/libs/js/swiper.js"></script>
      <script src="/assets/libs/js/theme.js"></script>
    </div>
  );
};

export default App;