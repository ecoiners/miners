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
import { notify } from "@/utils/notifications";
import { useNetworkConfiguration } from "@/context/NetworkConfigurationProvider";
import Branding from "@/components/Branding";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { 
  Loader2, 
  Upload, 
  Check, 
  Copy, 
  ExternalLink,
  Wallet,
  Image as ImageIcon
} from "lucide-react";

interface CreateViewProps {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
}

interface TokenData {
  name: string;
  symbol: string;
  decimals: string;
  amount: string;
  image: string;
  description: string;
}

const CreateView: FC<CreateViewProps> = ({ setOpenCreateModal }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const [tokenMintAddress, setTokenMintAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [token, setToken] = useState<TokenData>({
    name: "",
    symbol: "",
    decimals: "9",
    amount: "",
    image: "",
    description: "",
  });

  const handleFormFieldChange = (fieldName: keyof TokenData, value: string) => {
    setToken(prev => ({ ...prev, [fieldName]: value }));
  };

  // Upload metadata ke Pinata
  const uploadMetadata = async (token: TokenData): Promise<string> => {
    setIsLoading(true);
    try {
      const { name, symbol, description, image } = token;
      
      const metadata = { 
        name, 
        symbol, 
        description, 
        image,
        attributes: [],
        external_url: "",
        seller_fee_basis_points: 0,
        properties: {
          files: [{ uri: image, type: "image/png" }],
          category: "token"
        }
      };
      
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
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

  const uploadImagePinata = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      // Validasi file
      if (file.size > 5 * 1024 * 1024) { // 5MB
        throw new Error("Ukuran file maksimal 5MB");
      }

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
    } catch (error: any) {
      notify({ 
        type: "error", 
        message: error.message || "Upload gambar gagal" 
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      const imgUrl = await uploadImagePinata(file);
      handleFormFieldChange("image", imgUrl);
    } catch (error) {
      console.error("Upload image error:", error);
    }
  };

  // Fungsi utama buat token
  const createToken = useCallback(async () => {
    if (!publicKey) {
      notify({ type: "error", message: "Hubungkan wallet Anda!" });
      return;
    }

    // Validasi form
    if (!token.name.trim() || !token.symbol.trim() || !token.decimals || !token.amount) {
      notify({ type: "error", message: "Lengkapi semua field yang wajib diisi!" });
      return;
    }

    if (token.symbol.length > 10) {
      notify({ type: "error", message: "Symbol maksimal 10 karakter!" });
      return;
    }

    setIsLoading(true);
    
    try {
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const mintKeypair = Keypair.generate();
      const tokenATA = await getAssociatedTokenAddress(mintKeypair.publicKey, publicKey);

      // Upload metadata
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
            isMutable: true, // Changed to true for flexibility
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
          publicKey,
          TOKEN_PROGRAM_ID
        ),
        createAssociatedTokenAccountInstruction(
          publicKey,
          tokenATA,
          publicKey,
          mintKeypair.publicKey,
          TOKEN_PROGRAM_ID
        ),
        createMintToInstruction(
          mintKeypair.publicKey,
          tokenATA,
          publicKey,
          Number(token.amount) * Math.pow(10, Number(token.decimals)),
          [],
          TOKEN_PROGRAM_ID
        ),
        createMetadataIx
      );

      const signature = await sendTransaction(tx, connection, { 
        signers: [mintKeypair] 
      });
      
      setTokenMintAddress(mintKeypair.publicKey.toString());

      notify({
        type: "success",
        message: "Token berhasil dibuat! 🎉",
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
  }, [publicKey, connection, sendTransaction, token]);

  const resetForm = () => {
    setTokenMintAddress("");
    setToken({
      name: "",
      symbol: "",
      decimals: "9",
      amount: "",
      image: "",
      description: ""
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      notify({ type: "success", message: "Berhasil disalin!" });
    } catch (error) {
      notify({ type: "error", message: "Gagal menyalin" });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Branding Section */}
      <div className="lg:w-2/5 bg-gradient-to-br from-purple-900/20 to-slate-800 p-6 lg:p-8">
        <Branding
          image="/assets/branding.png"
          title="Buat Token Impian Anda"
          message="Lengkapi form untuk membuat token kustom dengan fitur lengkap dan metadata terintegrasi"
        />
      </div>

      {/* Form Section */}
      <div className="lg:w-3/5 p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">
            {tokenMintAddress ? "Sukses! 🎉" : "Detail Token"}
          </h2>
          <p className="text-gray-400 mt-2">
            {tokenMintAddress 
              ? "Token Anda telah berhasil dibuat di jaringan Solana"
              : "Isi informasi token Anda"
            }
          </p>
        </div>

        <ScrollArea className="h-[60vh] lg:h-[65vh] pr-4">
          {!tokenMintAddress ? (
            <div className="space-y-6">
              {/* Token Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Nama Token *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={token.name}
                  onChange={(e) => handleFormFieldChange("name", e.target.value)}
                  placeholder="Contoh: Joni Strong"
                  className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  disabled={isLoading}
                />
              </div>

              {/* Symbol */}
              <div className="space-y-2">
                <Label htmlFor="symbol" className="text-white font-medium">
                  Symbol *
                </Label>
                <Input
                  id="symbol"
                  type="text"
                  value={token.symbol}
                  onChange={(e) => handleFormFieldChange("symbol", e.target.value.toUpperCase())}
                  placeholder="Contoh: JOS"
                  className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 uppercase"
                  disabled={isLoading}
                  maxLength={10}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Decimals */}
                <div className="space-y-2">
                  <Label htmlFor="decimals" className="text-white font-medium">
                    Decimals *
                  </Label>
                  <Input
                    id="decimals"
                    type="number"
                    value={token.decimals}
                    onChange={(e) => handleFormFieldChange("decimals", e.target.value)}
                    placeholder="9"
                    min="0"
                    max="18"
                    className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                    disabled={isLoading}
                  />
                </div>

                {/* Total Supply */}
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-white font-medium">
                    Total Supply *
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={token.amount}
                    onChange={(e) => handleFormFieldChange("amount", e.target.value)}
                    placeholder="1000000"
                    min="1"
                    className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white font-medium">
                  Deskripsi
                </Label>
                <Input
                  id="description"
                  type="text"
                  value={token.description}
                  onChange={(e) => handleFormFieldChange("description", e.target.value)}
                  placeholder="Deskripsi singkat tentang token Anda"
                  className="bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
                  disabled={isLoading}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="token-image" className="text-white font-medium">
                  Gambar Token
                </Label>
                <label 
                  htmlFor="token-image"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                    token.image 
                      ? "border-green-500 bg-green-500/10" 
                      : "border-slate-600 bg-slate-800/50 hover:border-purple-500"
                  } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="text-purple-400 w-8 h-8 mb-2 animate-spin" />
                      <p className="text-purple-400 text-sm font-medium">Mengupload...</p>
                    </>
                  ) : token.image ? (
                    <>
                      <Check className="text-green-400 w-8 h-8 mb-2" />
                      <p className="text-green-400 text-sm font-medium">Gambar terpasang</p>
                      <p className="text-gray-400 text-xs mt-1">Klik untuk mengganti</p>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="text-gray-400 w-8 h-8 mb-2" />
                      <p className="text-gray-400 text-sm">Klik untuk upload gambar</p>
                      <p className="text-gray-400 text-xs mt-1">PNG, JPG, GIF (Max 5MB)</p>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  id="token-image"
                  accept="image/*"
                  disabled={isUploading}
                />
                {token.image && (
                  <div className="flex justify-center mt-2">
                    <img 
                      src={token.image} 
                      alt="Preview" 
                      className="h-16 w-16 rounded-lg object-cover border border-slate-600"
                    />
                  </div>
                )}
              </div>

              {/* Create Button */}
              <Button
                onClick={createToken}
                disabled={!publicKey || !token.name.trim() || !token.symbol.trim() || !token.decimals || !token.amount || isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Membuat Token...
                  </>
                ) : publicKey ? (
                  "Buat Token Sekarang"
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    Hubungkan Wallet
                  </>
                )}
              </Button>

              {!publicKey && (
                <Card className="bg-amber-500/20 border-amber-500/30">
                  <CardContent className="p-4">
                    <p className="text-amber-300 text-sm text-center">
                      Silakan hubungkan wallet Anda untuk membuat token
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            // Success View
            <div className="space-y-6 text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                  <Check className="text-white w-6 h-6" />
                </div>
              </div>

              {/* Success Message */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Token Berhasil Dibuat!
                </h3>
                <p className="text-gray-300">
                  Token Anda telah berhasil dibuat dan siap digunakan di jaringan Solana
                </p>
              </div>

              {/* Token Preview */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={token.image || "/assets/logo.png"}
                      alt="Token"
                      className="w-12 h-12 rounded-xl"
                    />
                    <div className="text-left">
                      <h3 className="text-white font-bold text-lg">{token.name}</h3>
                      <p className="text-gray-400">{token.symbol}</p>
                    </div>
                  </div>
                  
                  <Card className="bg-slate-700 border-slate-600">
                    <CardContent className="p-4">
                      <Label className="text-gray-400 text-sm font-medium block mb-2">
                        Alamat Token
                      </Label>
                      <div className="flex items-center gap-2">
                        <p className="text-green-400 font-mono text-sm break-all flex-1">
                          {tokenMintAddress}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(tokenMintAddress)}
                          className="flex-shrink-0 border-slate-600 hover:bg-slate-600"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => copyToClipboard(tokenMintAddress)}
                  variant="outline"
                  className="w-full border-slate-600 hover:bg-slate-700 text-white"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Salin Alamat Token
                </Button>

                <Button
                  onClick={() => window.open(`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`, '_blank')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Lihat di Explorer
                </Button>

                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="w-full border-slate-600 hover:bg-slate-700 text-white"
                >
                  Buat Token Lain
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default CreateView;