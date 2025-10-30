import React, { FC, useCallback, useState, Dispatch, SetStateAction } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import {
  PROGRAM_ID,
  createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import { notify } from "../../utils/notifications";
import { ClipLoader } from "react-spinners";
import { useNetworkConfiguration } from "../../context/NetworkConfigurationProvider";
import { AiOutlineClose, AiOutlineUpload, AiOutlineCheck } from "react-icons/ai";
import Branding from "../../components/Branding";

interface CreateViewProps {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
}

const CreateView: FC<CreateViewProps> = ({ setOpenCreateModal }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState({
    name: "",
    symbol: "",
    decimals: "9",
    amount: "",
    image: "",
    description: "",
  });

  const handleFormFieldChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setToken({ ...token, [fieldName]: e.target.value });
  };

  // Upload metadata ke Pinata
  const uploadMetadata = async (token: any): Promise<string> => {
    const { name, symbol, description, image } = token;
    
    setIsLoading(true);
    try {
      const data = JSON.stringify({ 
        name, 
        symbol, 
        description, 
        image,
        attributes: []
      });
      
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
          headers: {
            'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY || '',
            'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || '',
            "Content-Type": "application/json",
          },
        }
      );
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      notify({ type: "error", message: "Gagal upload metadata ke IPFS" });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImagePinata = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY || '',
            'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || '',
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      notify({ type: "error", message: "Upload gambar gagal" });
      throw error;
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      const imgUrl = await uploadImagePinata(file);
      if (imgUrl) setToken({ ...token, image: imgUrl });
    } catch (error) {
      console.error("Upload image error:", error);
    }
  };

  // Fungsi utama buat token
  const createToken = useCallback(async (token: any) => {
    if (!publicKey) {
      notify({ type: "error", message: "Hubungkan wallet Anda!" });
      return;
    }

    if (!token.name || !token.symbol || !token.decimals || !token.amount) {
      notify({ type: "error", message: "Lengkapi semua field yang wajib diisi!" });
      return;
    }

    setIsLoading(true);
    
    try {
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeypair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(mintKeypair.publicKey, publicKey);

      // Upload metadata dulu
      const metadataUrl = await uploadMetadata(token);
      
      const metadataPDA = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          PROGRAM_ID.toBuffer(),
          mintKeypair.publicKey.toBuffer(),
        ],
        PROGRAM_ID
      )[0];

      const createMetadataIx = createCreateMetadataAccountV3Instruction(
        {
          metadata: metadataPDA,
          mint: mintKeypair.publicKey,
          mintAuthority: publicKey,
          payer: publicKey,
          updateAuthority: publicKey,
        },
        {
          createMetadataAccountArgsV3: {
            data: {
              name: token.name,
              symbol: token.symbol,
              uri: metadataUrl,
              creators: null,
              sellerFeeBasisPoints: 0,
              uses: null,
              collection: null,
            },
            isMutable: false,
            collectionDetails: null,
          },
        }
      );

      const tx = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: mintKeypair.publicKey,
          space: MINT_SIZE,
          lamports,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mintKeypair.publicKey,
          Number(token.decimals),
          publicKey,
          publicKey
        ),
        createAssociatedTokenAccountInstruction(
          publicKey,
          tokenATA,
          publicKey,
          mintKeypair.publicKey
        ),
        createMintToInstruction(
          mintKeypair.publicKey,
          tokenATA,
          publicKey,
          Number(token.amount) * Math.pow(10, Number(token.decimals))
        ),
        createMetadataIx
      );

      const signature = await sendTransaction(tx, connection, { 
        signers: [mintKeypair] 
      });
      
      setTokenMintAddress(mintKeypair.publicKey.toString());

      notify({
        type: "success",
        message: "Token berhasil dibuat 🎉",
        txid: signature,
      });
      
    } catch (error: any) {
      console.error("Create token error:", error);
      notify({ 
        type: "error", 
        message: error.message || "Gagal membuat token" 
      });
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, connection, sendTransaction]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl p-8 mx-4 max-w-sm w-full border border-slate-700 shadow-2xl">
            <div className="flex flex-col items-center">
              <ClipLoader size={50} color="#10b981" />
              <p className="mt-4 text-white font-bold text-lg">Membuat Token</p>
              <p className="text-gray-400 text-sm mt-2 text-center">
                Mohon tunggu dan jangan tutup halaman
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
                title="Buat Token Impian Anda"
                message="Lengkapi form untuk membuat token kustom dengan fitur lengkap dan metadata terintegrasi"
              />
            </div>

            {/* Form Section */}
            <div className="lg:w-1/2 p-8 overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Detail Token</h2>
                  <p className="text-gray-400 text-lg">Isi informasi token Anda</p>
                </div>
                <button
                  onClick={() => setOpenCreateModal(false)}
                  className="p-3 hover:bg-slate-800 rounded-xl transition-colors duration-200"
                >
                  <AiOutlineClose className="text-white text-2xl" />
                </button>
              </div>

              {!tokenMintAddress ? (
                <div className="space-y-6">
                  {/* Nama Token */}
                  <div>
                    <label className="block text-white font-semibold text-lg mb-3">
                      Nama Token *
                    </label>
                    <input
                      type="text"
                      value={token.name}
                      onChange={(e) => handleFormFieldChange("name", e)}
                      placeholder="Contoh: Joni Strong"
                      className="w-full px-4 py-4 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg transition-all duration-200"
                    />
                  </div>

                  {/* Symbol */}
                  <div>
                    <label className="block text-white font-semibold text-lg mb-3">
                      Symbol *
                    </label>
                    <input
                      type="text"
                      value={token.symbol}
                      onChange={(e) => handleFormFieldChange("symbol", e)}
                      placeholder="Contoh: JOS"
                      className="w-full px-4 py-4 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg transition-all duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* Decimals */}
                    <div>
                      <label className="block text-white font-semibold text-lg mb-3">
                        Decimals *
                      </label>
                      <input
                        type="number"
                        value={token.decimals}
                        onChange={(e) => handleFormFieldChange("decimals", e)}
                        placeholder="9"
                        className="w-full px-4 py-4 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg transition-all duration-200"
                      />
                    </div>

                    {/* Total Supply */}
                    <div>
                      <label className="block text-white font-semibold text-lg mb-3">
                        Total Supply *
                      </label>
                      <input
                        type="number"
                        value={token.amount}
                        onChange={(e) => handleFormFieldChange("amount", e)}
                        placeholder="1000000"
                        className="w-full px-4 py-4 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-white font-semibold text-lg mb-3">
                      Deskripsi
                    </label>
                    <input
                      type="text"
                      value={token.description}
                      onChange={(e) => handleFormFieldChange("description", e)}
                      placeholder="Deskripsi singkat tentang token Anda"
                      className="w-full px-4 py-4 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg transition-all duration-200"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-white font-semibold text-lg mb-3">
                      Gambar Token
                    </label>
                    <label 
                      htmlFor="token-image"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-600 rounded-2xl cursor-pointer hover:border-purple-500 transition-all duration-200 bg-slate-800/50 hover:bg-slate-800/70"
                    >
                      <AiOutlineUpload className="text-gray-400 text-3xl mb-3" />
                      <p className="text-gray-400 text-base">
                        {token.image ? "Ganti gambar" : "Klik untuk upload gambar"}
                      </p>
                      {token.image && (
                        <p className="text-green-400 text-base mt-2 flex items-center">
                          <AiOutlineCheck className="mr-2 text-lg" />
                          Gambar terpasang
                        </p>
                      )}
                    </label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                      id="token-image"
                      accept="image/*"
                    />
                  </div>

                  {/* Create Button */}
                  <button
                    onClick={() => createToken(token)}
                    disabled={!publicKey || !token.name || !token.symbol || !token.decimals || !token.amount}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-5 rounded-2xl transition-all duration-200 text-xl shadow-lg hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  >
                    {publicKey ? "🚀 Buat Token Sekarang" : "🔗 Hubungkan Wallet"}
                  </button>

                  {!publicKey && (
                    <div className="bg-amber-500/20 border border-amber-500/30 rounded-2xl p-5 text-center">
                      <p className="text-amber-300 text-base font-medium">
                        Silakan hubungkan wallet Anda untuk membuat token
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // Success View
                <div className="text-center space-y-8">
                  {/* Success Icon */}
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-3xl">✓</span>
                    </div>
                  </div>

                  {/* Success Message */}
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-3">
                      Sukses!
                    </h2>
                    <p className="text-gray-300 text-lg">
                      Token Anda telah berhasil dibuat di jaringan Solana
                    </p>
                  </div>

                  {/* Token Preview */}
                  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg">
                    <div className="flex items-center space-x-4 mb-5">
                      <img
                        src={token.image || "/assets/logo.png"}
                        alt="Token"
                        className="w-16 h-16 rounded-2xl border-2 border-purple-400/30"
                      />
                      <div className="text-left">
                        <h3 className="text-white font-bold text-xl">{token.name}</h3>
                        <p className="text-gray-400 text-lg">{token.symbol}</p>
                      </div>
                    </div>
                    
                    {/* Token Address */}
                    <div className="bg-slate-700 rounded-xl p-4">
                      <label className="text-gray-400 text-sm font-medium block mb-2 uppercase tracking-wide">
                        Alamat Token
                      </label>
                      <p className="text-green-400 font-mono text-sm break-all">
                        {tokenMintAddress}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={() => navigator.clipboard.writeText(tokenMintAddress)}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl"
                    >
                      📋 Salin Alamat Token
                    </button>

                    <a
                      href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl block text-center"
                    >
                      🔍 Lihat di Explorer
                    </a>

                    <button
                      onClick={() => {
                        setTokenMintAddress("");
                        setToken({
                          name: "",
                          symbol: "",
                          decimals: "9",
                          amount: "",
                          image: "",
                          description: ""
                        });
                      }}
                      className="w-full bg-slate-600 hover:bg-slate-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 text-lg shadow-lg hover:shadow-xl"
                    >
                      ➕ Buat Token Lain
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

export default CreateView;
