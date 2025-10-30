import React, { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  TOKEN_PROGRAM_ID,
  getMint,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createBurnInstruction,
} from "@solana/spl-token";
import { Transaction, PublicKey } from "@solana/web3.js";
import { AiOutlineClose } from "react-icons/ai";
import { notify } from "../../utils/notifications";

interface TokenManagerViewProps {
  setOpenTokenManager: Dispatch<SetStateAction<boolean>>;
}

const TokenManagerView: FC<TokenManagerViewProps> = ({ setOpenTokenManager }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [mintAddress, setMintAddress] = useState("");
  const [supply, setSupply] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const getSupply = async () => {
    if (!mintAddress) return;
    try {
      const mintInfo = await getMint(connection, new PublicKey(mintAddress));
      setSupply(mintInfo.supply.toString());
    } catch {
      notify({ type: "error", message: "Gagal ambil data token" });
    }
  };

  const handleMint = async () => {
    if (!publicKey || !mintAddress || !amount) return;
    try {
      setLoading(true);
      const mint = new PublicKey(mintAddress);
      const ata = await getAssociatedTokenAddress(mint, publicKey);
      const ix = createMintToInstruction(mint, ata, publicKey, Number(amount));
      const tx = new Transaction().add(ix);
      const sig = await sendTransaction(tx, connection);
      notify({ type: "success", message: "Token ditambah ✅", txid: sig });
      getSupply();
    } finally {
      setLoading(false);
    }
  };

  const handleBurn = async () => {
    if (!publicKey || !mintAddress || !amount) return;
    try {
      setLoading(true);
      const mint = new PublicKey(mintAddress);
      const ata = await getAssociatedTokenAddress(mint, publicKey);
      const ix = createBurnInstruction(ata, mint, publicKey, Number(amount));
      const tx = new Transaction().add(ix);
      const sig = await sendTransaction(tx, connection);
      notify({ type: "success", message: "Token dibakar 🔥", txid: sig });
      getSupply();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-slate-900/70 backdrop-blur-2xl p-4">
      <div className="bg-slate-800 p-8 rounded-2xl border border-green-500/30 max-w-md w-full">
        <div className="flex justify-between mb-4">
          <h3 className="text-white text-xl font-semibold">Token Manager</h3>
          <button
            onClick={() => setOpenTokenManager(false)}
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-pink-600"
          >
            <AiOutlineClose className="text-white text-xl" />
          </button>
        </div>

        <input
          placeholder="Mint Address"
          className="w-full p-2 rounded-lg bg-slate-900 text-white border border-gray-600 mb-3"
          value={mintAddress}
          onChange={(e) => setMintAddress(e.target.value)}
        />

        <button
          onClick={getSupply}
          className="w-full bg-slate-700 text-white py-2 rounded-lg font-semibold mb-4"
        >
          Lihat Supply
        </button>

        {supply && (
          <p className="text-green-400 mb-4 text-center text-sm">
            Total Supply: {supply}
          </p>
        )}

        <input
          placeholder="Jumlah"
          className="w-full p-2 rounded-lg bg-slate-900 text-white border border-gray-600 mb-3"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={handleMint}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 rounded-lg font-semibold"
          >
            Mint
          </button>
          <button
            onClick={handleBurn}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 rounded-lg font-semibold"
          >
            Burn
          </button>
        </div>
      </div>
    </section>
  );
};

export default TokenManagerView;