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

  const [tokenUri, setTokenUri] = useState("");
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
      notify({ type: "error", message: "Gagal upload metadata ke IPFS 😭" });
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
      notify({ type: "error", message: "Upload gambar gagal 😭" });
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
        message: error.message || "Gagal membuat token 😭" 
      });
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, connection, sendTransaction]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl p-8 mx-4 max-w-sm w-full border border-slate-700">
            <div className="flex flex-col items-center">
              <ClipLoader size={40} color="#10b981" />
              <p className="mt-4 text-white font-semibold">Membuat token...</p>
              <p className="text-gray-400 text-sm mt-2 text-center">
                Mohon tunggu dan jangan tutup halaman
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="flex flex-col lg:flex-row h-full">
            
            {/* Branding Section - TAMPIL DI SEMUA DEVICE */}
            <div className="lg:w-1/2 bg-gradient-to-br from-purple-900/20 to-slate-800 p-8">
              <Branding
                image="/assets/branding.png"
                title="Buat Token Impian Anda"
                message="Lengkapi form untuk membuat token kustom dengan fitur lengkap dan metadata terintegrasi"
              />
            </div>

            {/* Form Section */}
            <div className="lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Detail Token</h2>
                  <p className="text-gray-400 mt-1">Isi informasi token Anda</p>
                </div>
                <button
                  onClick={() => setOpenCreateModal(false)}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <AiOutlineClose className="text-white text-xl" />
                </button>
              </div>

              {!tokenMintAddress ? (
                <div className="space-y-4">
                  {/* Nama Token */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Nama Token *
                    </label>
                    <input
                      type="text"
                      value={token.name}
                      onChange={(e) => handleFormFieldChange("name", e)}
                      placeholder="Contoh: Joni Strong"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* Symbol */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Symbol *
                    </label>
                    <input
                      type="text"
                      value={token.symbol}
                      onChange={(e) => handleFormFieldChange("symbol", e)}
                      placeholder="Contoh: JOS"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Decimals */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Decimals *
                      </label>
                      <input
                        type="number"
                        value={token.decimals}
                        onChange={(e) => handleFormFieldChange("decimals", e)}
                        placeholder="9"
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    {/* Total Supply */}
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Total Supply *
                      </label>
                      <input
                        type="number"
                        value={token.amount}
                        onChange={(e) => handleFormFieldChange("amount", e)}
                        placeholder="1000000"
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Deskripsi
                    </label>
                    <input
                      type="text"
                      value={token.description}
                      onChange={(e) => handleFormFieldChange("description", e)}
                      placeholder="Deskripsi singkat tentang token Anda"
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Gambar Token
                    </label>
                    <label 
                      htmlFor="token-image"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-purple-500 transition-colors"
                    >
                      <AiOutlineUpload className="text-gray-400 text-2xl mb-2" />
                      <p className="text-gray-400 text-sm">
                        {token.image ? "Ganti gambar" : "Klik untuk upload gambar"}
                      </p>
                      {token.image && (
                        <p className="text-green-400 text-sm mt-1 flex items-center">
                          <AiOutlineCheck className="mr-1" />
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
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors mt-6"
                  >
                    {publicKey ? "Buat Token Sekarang" : "Hubungkan Wallet"}
                  </button>

                  {!publicKey && (
                    <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 text-center">
                      <p className="text-amber-300 text-sm">
                        Silakan hubungkan wallet Anda untuk membuat token
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                // Success View
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl">✓</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Sukses!
                    </h2>
                    <p className="text-gray-300">
                      Token Anda telah berhasil dibuat di jaringan Solana
                    </p>
                  </div>

                  {/* Token Preview */}
                  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={token.image || "/assets/logo.png"}
                        alt="Token"
                        className="w-12 h-12 rounded-xl"
                      />
                      <div className="text-left">
                        <h3 className="text-white font-bold">{token.name}</h3>
                        <p className="text-gray-400">{token.symbol}</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-700 rounded-lg p-4">
                      <label className="text-gray-400 text-sm font-medium block mb-2">
                        Alamat Token
                      </label>
                      <p className="text-green-400 font-mono text-sm break-all">
                        {tokenMintAddress}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => navigator.clipboard.writeText(tokenMintAddress)}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                      Salin Alamat Token
                    </button>

                    <a
                      href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors block"
                    >
                      Lihat di Explorer
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
                      className="w-full bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                      Buat Token Lain
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