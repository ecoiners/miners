
import React, { FC, Dispatch, SetStateAction, useCallback, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { AiOutlineClose } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { notify } from "../../utils/notifications";
import Branding from "../../components/Branding";
import InputView from "../input";

interface TokenMetadataProps {
  setOpenTokenMetadata: Dispatch<SetStateAction<boolean>>;
}

const TokenMetadata: FC<TokenMetadataProps> = ({ setOpenTokenMetadata }) => {
  const { connection } = useConnection();
	const [tokenAddress, setTokenAddress] = useState("");
	const [tokenMetadata, setTokenMetadata] = useState(null);
	const [logo, setLogo] = useState(null);
	const [isLoaded, setLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	
	const getMetadata = useCallback(async (form) => {
		setIsLoading(true);
		
		try {
			const tokenMint = new PublicKey(form);
			const metadataPDA = PublicKey.findProgramAddressSync(
				[Buffer.from("metadata"), PROGRAM_ID.toBuffer(), tokenMint.toBuffer()],
				PROGRAM_ID
			)[0];
			
			const metadataAccount = await connection.getAccountInfo(metadataPDA);
			const [metadata, _] = await Metadata.deserialize(metadataAccount.data);
			
			let logoResponse = await fetch(metadata.data.uri);
			let logoJson = await logoResponse.json();
			let { image } = logoJson;
			
			setTokenMetadata({tokenMetadata, ...metadata.data});
			setLogo(image);
			setIsLoading(false);
			setLoaded(true);
			setTokenAddress("");
			
			notify({
				type: "success",
				message: "Berhasil mengambil metadata token🥳"
			});
			
		} catch (error: any) {
			notify({type: "error", message: "Gagal mengambil metadata token😭"});
			setIsLoading(false);
		}
		
	}, [tokenAddress]);
	
	
	  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl p-8 mx-4 max-w-sm w-full border border-slate-700">
            <div className="flex flex-col items-center">
              <ClipLoader size={40} color="#10b981" />
              <p className="mt-4 text-white font-semibold">Mengambil metadata...</p>
              <p className="text-gray-400 text-sm mt-2 text-center">
                Sedang mencari informasi token
              </p>
            </div>
          </div>
        </div>
      )}
			
			{isLoaded ? (
				<section className="flex w-full items-center py-6 px-4 lg:p-10 lg:h-screen">
          <div className="container mx-auto max-w-5xl bg-slate-800/50 backdrop-blur-2xl rounded-2xl overflow-hidden">
            <div className="grid gap-10 lg:grid-cols-2">

              <div className="flex flex-col p-8 lg:p-10">
                <h4 className="mb-4 text-2xl font-bold text-white">
                  ECROP 100 - Token Metadata 
                </h4>
                <p className="text-gray-300 mb-8 text-sm">
                 Dapatkan metadata lengkap dari token anda di jaringan solana.
                </p>

                <InputView
                  name="Alamat Token"
                  placeholder="Masukan alamat token..."
                  clickHandle={(e) => setTokenAddress(e.target.value)}
                />

                <div className="mt-6">
                  <button
                    onClick={() => getMetadata(tokenAddress)}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-2 rounded-lg hover:opacity-90 transition-all"
                  >
                    Get Metadata
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setOpenTokenMetadata(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition"
                  >
                    <AiOutlineClose className="text-white text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
				
			) : (
				<section className="flex w-full items-center py-6 px-4 lg:h-screen lg:p-10 ">
          
            <div className="container bg-slate-800/50 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl shadow-2xl">
              <div className="grid gap-10 lg:grid-cols-2">
                {/* === BRANDING === */}
                <Branding
                  image="/assets/branding.png"
                  title="Token Metadata Berhasil Diambil 🎉"
                  message="Berikut detail metadata token anda di jaringan solana."
                />
        
                {/* === KONTEN HASIL === */}
                <div className="flex flex-col justify-center p-8 lg:p-10 text-center">
                  
                  {/* Gambar token */}
                  <div className="flex items-center justify-center mb-6">
                    <img
                      src={logo}
                      alt="token logo"
                      className="h-32 w-32 rounded-full border-1 border-green-500 shadow-lg object-cover"
                    />
                  </div>
									
									<div className="bg-slate-900/60 rounded-lg p-3 mb-4">
                    <p className="text-green-400 font-mono text-xs sm:text-sm break-all">
                      {tokenMetadata?.name || "Nama token tidak diketahui!"}
                    </p>
                  </div>
									
									<div className="bg-slate-900/60 rounded-lg p-3 mb-4">
                    <p className="text-green-400 font-mono text-xs sm:text-sm break-all">
                      {tokenMetadata?.symbol || "Symbol token tidak diketahui!"}
                    </p>
                  </div>
									
									<div className="bg-slate-900/60 rounded-lg p-3 mb-4">
                    <p className="text-green-400 font-mono text-xs sm:text-sm break-all">
											{tokenMetadata?.uri || "URI token tidak diketahui!"}
                    </p>
                  </div>
									
                  {/* Tombol uri link */}
                  <a
                    href={tokenMetadata?.uri}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition px-6 py-2 rounded-lg text-white font-semibold w-full inline-flex justify-center items-center"
                  >
                    Buka URI
                  </a>
        
                  {/* Tombol Tutup */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setOpenTokenMetadata(false)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition"
                    >
                      <AiOutlineClose className="text-white text-xl" />
                    </button>
                  </div>
									
                </div>
              </div>
            </div>
          
        </section>
			)}
    </>
  );
};

export default TokenMetadata;
