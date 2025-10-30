import React, { FC, Dispatch, SetStateAction, useCallback, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { notify } from "../../utils/notifications";
import Branding from "../../components/Branding";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Loader2, ExternalLink, Copy, Search, FileText, Hash, Link } from "lucide-react";

interface TokenMetadataProps {
  setOpenTokenMetadata: Dispatch<SetStateAction<boolean>>;
}

interface TokenMetadataData {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators?: any[];
}

const TokenMetadata: FC<TokenMetadataProps> = ({ setOpenTokenMetadata }) => {
  const { connection } = useConnection();
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadataData | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [additionalMetadata, setAdditionalMetadata] = useState<any>(null);
  const [isLoaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getMetadata = useCallback(async (address: string) => {
    if (!address.trim()) {
      notify({ type: "error", message: "Masukkan alamat token terlebih dahulu" });
      return;
    }

    // Validasi format alamat Solana
    try {
      new PublicKey(address);
    } catch {
      notify({ type: "error", message: "Format alamat token tidak valid" });
      return;
    }

    setIsLoading(true);
    setLoaded(false);
    setTokenMetadata(null);
    setLogo(null);
    setAdditionalMetadata(null);
    
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
      const metadataData = metadata.data as TokenMetadataData;
      
      setTokenMetadata(metadataData);

      // Fetch additional metadata dari URI
      if (metadataData.uri) {
        try {
          const response = await fetch(metadataData.uri);
          if (response.ok) {
            const additionalData = await response.json();
            setAdditionalMetadata(additionalData);
            setLogo(additionalData.image || null);
          }
        } catch (error) {
          console.warn("Gagal mengambil metadata tambahan:", error);
        }
      }
      
      setLoaded(true);
      
      notify({
        type: "success",
        message: "Berhasil mengambil metadata token! 🎉"
      });
      
    } catch (error: any) {
      console.error("Metadata fetch error:", error);
      notify({
        type: "error", 
        message: error.message || "Gagal mengambil metadata token. Pastikan alamat valid dan token mengikuti standar Metaplex"
      });
    } finally {
      setIsLoading(false);
    }
  }, [connection]);

  const handleSearch = () => {
    getMetadata(tokenAddress);
  };

  const resetSearch = () => {
    setLoaded(false);
    setTokenMetadata(null);
    setLogo(null);
    setAdditionalMetadata(null);
    setTokenAddress("");
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      notify({ type: "success", message: "Berhasil disalin!" });
    } catch (error) {
      notify({ type: "error", message: "Gagal menyalin" });
    }
  };

  const isValidSolanaAddress = (address: string) => {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Branding Section */}
      <div className="lg:w-2/5 bg-gradient-to-br from-emerald-900/20 to-slate-800 p-6 lg:p-8">
        <Branding
          image="/assets/branding.png"
          title="Explorasi Metadata Token"
          message="Temukan semua detail token Anda dengan mudah dan cepat di platform ECROP 100"
        />
      </div>

      {/* Content Section */}
      <div className="lg:w-3/5 p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Search className="w-6 h-6 text-emerald-400" />
            {isLoaded ? "Metadata Ditemukan!" : "Cari Metadata Token"}
          </h2>
          <p className="text-gray-400 mt-2">
            {isLoaded 
              ? "Berikut detail lengkap token Anda" 
              : "Masukkan alamat token untuk melihat metadata lengkap"
            }
          </p>
        </div>

        <ScrollArea className="h-[60vh] lg:h-[65vh] pr-4">
          {!isLoaded ? (
            <div className="space-y-6">
              {/* Search Input */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token-address" className="text-white font-medium">
                    Alamat Token *
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="token-address"
                      type="text"
                      value={tokenAddress}
                      onChange={(e) => setTokenAddress(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Masukkan alamat token (contoh: 7xKXb2...) atau mint address"
                      className="pl-10 pr-4 py-3 bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 font-mono text-sm"
                    />
                  </div>
                  {tokenAddress && !isValidSolanaAddress(tokenAddress) && (
                    <p className="text-red-400 text-sm">
                      Format alamat Solana tidak valid
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleSearch}
                  disabled={!tokenAddress.trim() || isLoading || !isValidSolanaAddress(tokenAddress)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Mencari...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Cari Metadata
                    </>
                  )}
                </Button>
              </div>

              {/* Tips Card */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-emerald-400 text-sm">💡</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-emerald-400 font-semibold text-sm">
                        Tips Pencarian
                      </h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Pastikan alamat token valid (format Solana PublicKey)</li>
                        <li>• Token harus mengikuti standar Metaplex</li>
                        <li>• Token harus sudah terdeploy di jaringan Solana</li>
                        <li>• Metadata harus tersedia di on-chain</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Token Header dengan Logo */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {logo && (
                    <div className="relative">
                      <img
                        src={logo}
                        alt="Token Logo"
                        className="w-16 h-16 rounded-xl border-2 border-emerald-400/30 shadow-lg"
                      />
                      <Badge className="absolute -top-2 -right-2 bg-emerald-500 text-xs">
                        Live
                      </Badge>
                    </div>
                  )}
                  <div>
                    <h3 className="text-white font-bold text-xl">
                      {tokenMetadata?.name || "N/A"}
                    </h3>
                    <p className="text-gray-400 font-mono">
                      {tokenMetadata?.symbol || "N/A"}
                    </p>
                  </div>
                </div>
                
                {additionalMetadata?.external_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(additionalMetadata.external_url, '_blank')}
                    className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/20"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Website
                  </Button>
                )}
              </div>

              {/* Metadata Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Info */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <Label className="text-gray-400 text-sm font-medium">
                        Informasi Dasar
                      </Label>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-gray-400 text-xs">Nama</p>
                        <p className="text-white font-medium">{tokenMetadata?.name || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Symbol</p>
                        <p className="text-white font-medium font-mono">{tokenMetadata?.symbol || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Royalty</p>
                        <p className="text-white font-medium">
                          {tokenMetadata?.sellerFeeBasisPoints ? 
                            `${(tokenMetadata.sellerFeeBasisPoints / 100).toFixed(2)}%` : "0%"
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Info */}
                {additionalMetadata && (
                  <Card className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Hash className="w-4 h-4 text-emerald-400" />
                        <Label className="text-gray-400 text-sm font-medium">
                          Informasi Tambahan
                        </Label>
                      </div>
                      <div className="space-y-2">
                        {additionalMetadata.description && (
                          <div>
                            <p className="text-gray-400 text-xs">Deskripsi</p>
                            <p className="text-white text-sm line-clamp-2">
                              {additionalMetadata.description}
                            </p>
                          </div>
                        )}
                        {additionalMetadata.attributes && (
                          <div>
                            <p className="text-gray-400 text-xs">Attributes</p>
                            <p className="text-white text-sm">
                              {additionalMetadata.attributes.length} attributes
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* URI Metadata */}
              {tokenMetadata?.uri && (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Link className="w-4 h-4 text-emerald-400" />
                      <Label className="text-gray-400 text-sm font-medium">
                        Metadata URI
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-mono break-all flex-1">
                        {tokenMetadata.uri}
                      </p>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(tokenMetadata.uri)}
                          className="border-slate-600 hover:bg-slate-700"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(tokenMetadata.uri, '_blank')}
                          className="border-slate-600 hover:bg-slate-700"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={resetSearch}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Cari Lagi
                </Button>
                
                {tokenMetadata?.uri && (
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-600 hover:bg-slate-700 text-white"
                    onClick={() => window.open(tokenMetadata.uri, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Buka Metadata
                  </Button>
                )}
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default TokenMetadata;