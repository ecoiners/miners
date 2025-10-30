import React, { FC, Dispatch, SetStateAction, useCallback, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { AiOutlineSearch } from "react-icons/ai";
import { notify } from "../../utils/notifications";
import Branding from "../../components/Branding";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, ExternalLink, Copy, Search } from "lucide-react";

interface TokenMetadataProps {
  setOpenTokenMetadata: Dispatch<SetStateAction<boolean>>;
  openTokenMetadata: boolean;
}

const TokenMetadata: FC<TokenMetadataProps> = ({ setOpenTokenMetadata, openTokenMetadata }) => {
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

  const handleSearch = () => {
    getMetadata(tokenAddress);
  };

  const resetSearch = () => {
    setLoaded(false);
    setTokenMetadata(null);
    setLogo(null);
    setTokenAddress("");
  };

  return (
    <Dialog open={openTokenMetadata} onOpenChange={setOpenTokenMetadata}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-slate-900 border border-green-500/20 backdrop-blur-md overflow-hidden">
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
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <Search className="w-6 h-6 text-emerald-400" />
                {isLoaded ? "Metadata Ditemukan!" : "Cari Metadata Token"}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {isLoaded 
                  ? "Berikut detail lengkap token Anda" 
                  : "Masukkan alamat token untuk melihat metadata lengkap"
                }
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-[60vh] lg:h-[65vh] pr-4">
              {!isLoaded ? (
                <div className="space-y-6">
                  {/* Search Input */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Masukkan alamat token (contoh: 7xKX...)"
                        className="pl-10 pr-4 py-3 bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <Button
                      onClick={handleSearch}
                      disabled={!tokenAddress || isLoading}
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
                        <div>
                          <h4 className="text-emerald-400 font-semibold text-sm mb-1">
                            Tips Pencarian
                          </h4>
                          <p className="text-gray-300 text-sm">
                            Pastikan alamat token valid dan sudah terdeploy di jaringan Solana. 
                            Token harus mengikuti standar Metaplex untuk metadata.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Token Logo */}
                  {logo && (
                    <div className="flex justify-center">
                      <div className="relative">
                        <img
                          src={logo}
                          alt="Token Logo"
                          className="w-20 h-20 rounded-2xl border-2 border-emerald-400/30 shadow-lg"
                        />
                        <Badge className="absolute -top-2 -right-2 bg-emerald-500">
                          Live
                        </Badge>
                      </div>
                    </div>
                  )}

                  {/* Metadata Details */}
                  <div className="space-y-4">
                    <Card className="bg-slate-800 border-slate-700">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-gray-400 font-medium">
                          Nama Token
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white font-semibold text-lg">
                          {tokenMetadata?.name || "Tidak tersedia"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800 border-slate-700">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-gray-400 font-medium">
                          Symbol
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white font-semibold text-lg">
                          {tokenMetadata?.symbol || "Tidak tersedia"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-800 border-slate-700">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-gray-400 font-medium">
                          URI Metadata
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <p className="text-white text-sm font-mono break-all flex-1">
                            {tokenMetadata?.uri || "Tidak tersedia"}
                          </p>
                          {tokenMetadata?.uri && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigator.clipboard.writeText(tokenMetadata.uri)}
                              className="flex-shrink-0 border-slate-600 hover:bg-slate-700"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    {tokenMetadata?.uri && (
                      <Button
                        variant="outline"
                        className="w-full border-slate-600 hover:bg-slate-700 text-white"
                        onClick={() => window.open(tokenMetadata.uri, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Buka URI Metadata
                      </Button>
                    )}

                    <Button
                      onClick={resetSearch}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Cari Token Lain
                    </Button>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenMetadata;
