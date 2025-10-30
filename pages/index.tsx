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
import { ScrollArea } from "@/components/ui/scroll-area";

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
      </Head>
      
      <div className="flex flex-col">
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

      {/* Modal Dialogs dengan shadcn/ui */}
      
      <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-slate-900 border border-green-500/20 backdrop-blur-md">
          <ScrollArea className="h-full max-h-[80vh]">
            <CreateView setOpenCreateModal={setOpenCreateModal} />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={openTokenMetadata} onOpenChange={setOpenTokenMetadata}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-slate-900 border border-green-500/20 backdrop-blur-md">
          <ScrollArea className="h-full max-h-[80vh]">
            <TokenMetadata setOpenTokenMetadata={setOpenTokenMetadata} />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={openContact} onOpenChange={setOpenContact}>
        <DialogContent className="max-w-2xl max-h-[90vh] bg-slate-900 border border-green-500/20 backdrop-blur-md">
          <ScrollArea className="h-full max-h-[80vh]">
            <ContactView setOpenContact={setOpenContact} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Home;