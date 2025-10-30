import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

// Views
import HomeView from "@/views/home";
import ToolsView from "@/views/tools";
import FeatureView from "@/views/feature";
import OfferView from "@/views/offer";
import FaqView from "@/views/faq";
import CreateView from "@/views/create";
import TokenMetadata from "@/views/tokenMetadata";
import ContactView from "@/views/contact";

// shadcn/ui Components
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const Home: NextPage = (props) => {
  // State variables
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openTokenMetadata, setOpenTokenMetadata] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openAirdrop, setOpenAirdrop] = useState(false);
  const [openSendTransaction, setOpenSendTransaction] = useState(false);
  
  return (
    <>
      <Head>
        <title>ECROP 100 TOKEN CREATOR</title>
        <meta name="description" content="Build and create solana token with ECROP 100" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <HomeView setOpenCreateModal={setOpenCreateModal} />
      
        <ToolsView 
          setOpenCreateModal={setOpenCreateModal} 
          setOpenTokenMetadata={setOpenTokenMetadata}
          setOpenContact={setOpenContact}
          setOpenAirdrop={setOpenAirdrop}
          setOpenSendTransaction={setOpenSendTransaction}
        />
        
        <FeatureView
          setOpenCreateModal={setOpenCreateModal} 
          setOpenTokenMetadata={setOpenTokenMetadata}
          setOpenContact={setOpenContact}
          setOpenAirdrop={setOpenAirdrop}
          setOpenSendTransaction={setOpenSendTransaction}
        />
        
        <OfferView />
        <FaqView />
      </div>

      {/* Modal Dialogs */}
      
      {/* Create Token Modal */}
      <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-slate-900 border border-purple-500/20 backdrop-blur-md overflow-hidden">
          <CreateView setOpenCreateModal={setOpenCreateModal} />
        </DialogContent>
      </Dialog>

      {/* Token Metadata Modal */}
      <Dialog open={openTokenMetadata} onOpenChange={setOpenTokenMetadata}>
        <DialogContent className="maxw-4xl max-h-[90vh] p-0 bg-slate-900 border border-green-500/20 backdrop-blur-md overflow-hidden">
          <TokenMetadata setOpenTokenMetadata={setOpenTokenMetadata} />
        </DialogContent>
      </Dialog>

      {/* Contact Modal */}
      <Dialog open={openContact} onOpenChange={setOpenContact}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-slate-900 border border-blue-500/20 backdrop-blur-md overflow-hidden">
          <ContactView setOpenContact={setOpenContact} />
        </DialogContent>
      </Dialog>

      {/* Placeholder modals untuk fitur yang akan datang */}
      <Dialog open={openAirdrop} onOpenChange={setOpenAirdrop}>
        <DialogContent className="max-w-2xl bg-slate-900 border border-orange-500/20 backdrop-blur-md">
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Airdrop Feature</h3>
            <p className="text-gray-400">Fitur airdrop akan segera hadir!</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openSendTransaction} onOpenChange={setOpenSendTransaction}>
        <DialogContent className="max-w-2xl bg-slate-900 border border-red-500/20 backdrop-blur-md">
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Send Transaction</h3>
            <p className="text-gray-400">Fitur send transaction akan segera hadir!</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;