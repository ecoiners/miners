import React, { FC, Dispatch, SetStateAction, useCallback, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { notify } from "../../utils/notifications";
import Branding from "../../components/Branding";

interface TokenMetadataProps {
  setOpenTokenMetadata: Dispatch<SetStateAction<boolean>>;
}

const TokenMetadata: FC<TokenMetadataProps> = ({ setOpenTokenMetadata }) => {
  const { connection } = useConnection();
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenMetadata, setTokenMetadata] = useState<any>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [isLoaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const getMetadata = useCallback(async (address: string) => {
    if (!address) {
      notify({ type: "error", message: "Masukkan alamat token terlebih dahulu" });
      return;
    }

    setIsLoading(true);
    
    try {
      const tokenMint = new PublicKey(address);
      const metadataPDA = PublicKey.findProgramAddressSync(
        [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), tokenMint.toBuffer()],
        PROGRAM_ID
      )[0];
      
      const metadataAccount = await connection.getAccountInfo(metadataPDA);
      
      if (!metadataAccount) {
        throw new Error("Metadata tidak ditemukan untuk token ini");
      }
      
      const [metadata] = await Metadata.deserialize(metadataAccount.data);
      
      // Fetch logo dari URI metadata
      if (metadata.data.uri) {
        try {
          const logoResponse = await fetch(metadata.data.uri);
          const logoJson = await logoResponse.json();
          setLogo(logoJson.image || null);
        } catch (error) {
          console.warn("Gagal mengambil logo:", error);
          setLogo(null);
        }
      }
      
      setTokenMetadata(metadata.data);
      setLoaded(true);
      setTokenAddress("");
      
      notify({
        type: "success",
        message: "Berhasil mengambil metadata token 🎉"
      });
      
    } catch (error: any) {
      console.error("Metadata fetch error:", error);
      notify({
        type: "error", 
        message: error.message || "Gagal mengambil metadata token. Pastikan alamat valid 😭"
      });
    } finally {
      setIsLoading(false);
    }
  }, [connection]);

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

      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="flex flex-col lg:flex-row h-full">
            
            {/* Branding Section */}
            <div className="lg:w-1/2 bg-gradient-to-br from-emerald-900/20 to-slate-800 p-8">
              <Branding
                image="/assets/branding.png"
                title="Explorasi Metadata Token"
                message="Temukan semua detail token Anda dengan mudah dan cepat di platform ECROP 100"
              />
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {isLoaded ? "Metadata Ditemukan!" : "Cari Metadata Token"}
                  </h2>
                  <p className="text-gray-400 mt-1">
                    {isLoaded 
                      ? "Berikut detail lengkap token Anda" 
                      : "Masukkan alamat token untuk melihat metadata lengkap"
                    }
                  </p>
                </div>
                <button
                  onClick={() => setOpenTokenMetadata(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <AiOutlineClose className="text-white text-xl" />
                </button>
              </div>

              {!isLoaded ? (
                // Search Form
                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={tokenAddress}
                      onChange={(e) => setTokenAddress(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && getMetadata(tokenAddress)}
                      placeholder="Masukkan alamat token (contoh: 7xKX...)"
                      className="w-full px-4 py-3 pl-12 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  </div>

                  <button
                    onClick={() => getMetadata(tokenAddress)}
                    disabled={!tokenAddress}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                  >
                    <AiOutlineSearch className="text-xl" />
                    <span>Cari Metadata</span>
                  </button>

                  {/* Tips */}
                  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <h4 className="text-emerald-400 font-semibold mb-2 flex items-center">
                      💡 Tips
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Pastikan alamat token valid dan sudah terdeploy di jaringan Solana
                    </p>
                  </div>
                </div>
              ) : (
                // Results View
                <div className="space-y-6">
                  {/* Token Logo */}
                  {logo && (
                    <div className="flex justify-center">
                      <img
                        src={logo}
                        alt="Token Logo"
                        className="w-20 h-20 rounded-2xl border-2 border-emerald-400/30 shadow-lg"
                      />
                    </div>
                  )}

                  {/* Metadata Details */}
                  <div className="space-y-4">
                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <label className="text-gray-400 text-sm font-medium">Nama Token</label>
                      <p className="text-white font-semibold mt-1">
                        {tokenMetadata?.name || "Tidak tersedia"}
                      </p>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <label className="text-gray-400 text-sm font-medium">Symbol</label>
                      <p className="text-white font-semibold mt-1">
                        {tokenMetadata?.symbol || "Tidak tersedia"}
                      </p>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                      <label className="text-gray-400 text-sm font-medium">URI Metadata</label>
                      <p className="text-white text-sm font-mono break-all mt-1">
                        {tokenMetadata?.uri || "Tidak tersedia"}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {tokenMetadata?.uri && (
                      <a
                        href={tokenMetadata.uri}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                      >
                        <span>Buka URI Metadata</span>
                      </a>
                    )}

                    <button
                      onClick={() => {
                        setLoaded(false);
                        setTokenMetadata(null);
                        setLogo(null);
                        setTokenAddress("");
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                      Cari Token Lain
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenMetadata;