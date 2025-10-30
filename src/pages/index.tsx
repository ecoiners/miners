import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

// views 
import HomeView from "../views/home";
import ToolsView from "../views/tools";
import FeatureView from "../views/feature";
import OfferView from "../views/offer";
import FaqView from "../views/faq";
import CreateView from "../views/create";
import TokenMetadata from "../views/tokenMetadata";
import ContactView from "../views/contact";
import AirdropView from "../views/airdrop";
import SendTokenView from "../views/sendToken";
import TokenExplorerView from "../views/tokenExplorer";
import TokenManagerView from "../views/tokenManager";
import EditMetadataView from "../views/editMetadata";

const Home: NextPage = (props) => {
	
	// state variable
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [openTokenMetadata, setOpenTokenMetadata] = useState(false);
	const [openContact, setOpenContact] = useState(false);
	const [openAirdrop, setOpenAirdrop] = useState(false);
	const [openSendTransaction, setOpenSendTransaction] = useState(false);
	const [openSendToken, setOpenSendToken] = useState(false);
  const [openTokenExplorer, setOpenTokenExplorer] = useState(false);
  const [openTokenManager, setOpenTokenManager] = useState(false);
  const [openEditMetadata, setOpenEditMetadata] = useState(false);
	
	return (
		<>
		  <Head>
			  <title>ECROP 100 TOKEN CREATOR</title>
				<meta name="ecrop 100 token creator solana" content="build and create solana token"/>
			</Head>
			
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
			
			{/* dynamic component */}
			
			{openCreateModal && (
				<div className="new_loader relative h-full bg-slate-900/40">
				  <CreateView setOpenCreateModal={setOpenCreateModal} />
				</div>
			)}
			
			{openTokenMetadata && (
				<div className="new_loader relative h-full bg-slate-900/40">
				  <TokenMetadata setOpenTokenMetadata={setOpenTokenMetadata} />
				</div>
			)}
			
			
			{openContact && (
				<div className="new_loader relative h-full bg-slate-900/40">
				  <ContactView setOpenContact={setOpenContact} />
				</div>
			)}
			
			{openAirdrop && (
        <div className="new_loader relative h-full bg-slate-900/40">
          <AirdropView setOpenAirdrop={setOpenAirdrop} />
        </div>
      )}

      {openSendToken && (
        <div className="new_loader relative h-full bg-slate-900/40">
          <SendTokenView setOpenSendToken={setOpenSendToken} />
        </div>
      )}

      {openTokenExplorer && (
        <div className="new_loader relative h-full bg-slate-900/40">
          <TokenExplorerView setOpenTokenExplorer={setOpenTokenExplorer} />
        </div>
      )}

      {openTokenManager && (
        <div className="new_loader relative h-full bg-slate-900/40">
          <TokenManagerView setOpenTokenManager={setOpenTokenManager} />
        </div>
      )}

      {openEditMetadata && (
        <div className="new_loader relative h-full bg-slate-900/40">
          <EditMetadataView setOpenEditMetadata={setOpenEditMetadata} />
        </div>
      )}
			
			{/*
			{openAirdrop && (
				<div className="new_loader relative h-full bg-slate-900/40">
				  <AirdropView setOpenAirdrop={setOpenAirdrop} />
				</div>
			)}
			
			{openSendTransaction && (
				<div className="new_loader relative h-full bg-slate-900/40">
				  <DonateView setOpenSendTransaction={setOpenSendTransaction} />
				</div>
			)} */}
			
		</>
	);
};

export default Home;