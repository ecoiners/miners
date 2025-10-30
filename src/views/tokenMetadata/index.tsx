import React, { FC, Dispatch, SetStateAction, useCallback, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { AiOutlineClose, AiOutlineSearch, AiOutlineCopy } from "react-icons/ai";
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
      let imageUrl = null;
      if (metadata.data.uri) {
        try {
          const logoResponse = await fetch(metadata.data.uri);
          const logoJson = await logoResponse.json();
          imageUrl = logoJson.image || null;
        } catch (error) {
          console.warn("Gagal mengambil logo:", error);
          imageUrl = null;
        }
      }
      
      setTokenMetadata(metadata.data);
      setLogo(imageUrl);
      setLoaded(true);
      
      notify({
        type: "success",
        message: "Berhasil mengambil metadata token 🎉"
      });
      
    } catch (error: any) {
      console.error("Metadata fetch error:", error);
      notify({
        type: "error", 
        message: error.message || "Gagal mengambil metadata token. Pastikan alamat valid"
      });
    } finally {
      setIsLoading(false);
    }
  }, [connection]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    notify({ type: "success", message: "Berhasil disalin!" });
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl p-8 mx-4 max-w-sm w-full border border-slate-700 shadow-2xl">
            <div className="flex flex-col items-center">
              <ClipLoader size={50} color="#10b981" />
              <p className="mt-4 text-white font-bold text-lg">Mengambil Metadata</p>
              <p className="text-gray-400 text-sm mt-2 text-center">
                Sedang mencari informasi token
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
          <div className="flex flex-col lg:flex-row h-full">
            
            {/* Branding Section */}
            <div className="lg:w-1/2">
              <Branding
                image="/assets/branding.png"
                title="Explorasi Metadata Token"
                message="Temukan semua detail token Anda dengan mudah dan cepat di platform ECROP 100"
              />
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-8 overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {isLoaded ? "Metadata Ditemukan!" : "Cari Metadata Token"}
                  </h2>
                  <p className="text-gray-400 text-lg">
                    {isLoaded 
                      ? "Berikut detail lengkap token Anda" 
                      : "Masukkan alamat token untuk melihat metadata lengkap"
                    }
                  </p>
                </div>
                <button
                  onClick={() => setOpenTokenMetadata(false)}
                  className="p-3 hover:bg-slate-800 rounded-xl transition-colors duration-200"
                >
                  <AiOutlineClose className="text-white text-2xl" />
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
                      placeholder="Masukkan alamat token (contoh: 7xKXg2e...)"
                      className="w-full px-5 py-4 pl-14 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg transition-all duration-200"
                    />
                    <AiOutlineSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl" />
                  </div>

                  <button
                    onClick={() => getMetadata(tokenAddress)}
                    disabled={!tokenAddress}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 rounded-xl transition-all duration-200 text-xl shadow-lg hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  >
                    🔍 Cari Metadata
                  </button>

                  {/* Tips */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
                    <div className="flex items-start space-x-4">
                      <span className="text-blue-400 text-2xl">💡</span>
                      <div>
                        <p className="text-blue-300 font-bold text-lg mb-2">Tips</p>
                        <p className="text-blue-200 text-base">
                          Pastikan alamat token valid dan sudah terdeploy di jaringan Solana
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Results View
                <div className="space-y-8">
                  {/* Token Logo */}
                  {logo && (
                    <div className="flex justify-center">
                      <div className="relative">
                        <img
                          src={logo}
                          alt="Token Logo"
                          className="w-24 h-24 rounded-2xl border-4 border-emerald-400/30 shadow-2xl object-cover"
                        />
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900">
                          <span className="text-white text-lg font-bold">✓</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Metadata Details */}
                  <div className="grid gap-5">
                    <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-lg">
                      <label className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-3">
                        Nama Token
                      </label>
                      <p className="text-white font-bold text-2xl">
                        {tokenMetadata?.name || "Tidak tersedia"}
                      </p>
                    </div>

                    <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-lg">
                      <label className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-3">
                        Symbol
                      </label>
                      <p className="text-white font-bold text-2xl">
                        {tokenMetadata?.symbol || "Tidak tersedia"}
                      </p>
                    </div>

                    <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-lg">
                      <label className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-3">
                        URI Metadata
                      </label>
                      <div className="flex items-start gap-3">
                        <p className="text-gray-300 text-sm font-mono break-all flex-1">
                          {tokenMetadata?.uri || "Tidak tersedia"}
                        </p>
                        <button
                          onClick={() => copyToClipboard(tokenMetadata?.uri)}
                          className="flex-shrink-0 p-3 hover:bg-slate-700 rounded-xl transition-colors duration-200"
                          title="Salin URI"
                        >
                          <AiOutlineCopy className="text-gray-400 hover:text-white text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid gap-4">
                    {tokenMetadata?.uri && (
                      <a
                        href={tokenMetadata.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl text-center"
                      >
                        🌐 Buka URI Metadata
                      </a>
                    )}

                    <button
                      onClick={() => {
                        setLoaded(false);
                        setTokenMetadata(null);
                        setLogo(null);
                        setTokenAddress("");
                      }}
                      className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-4 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      🔄 Cari Token Lain
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
