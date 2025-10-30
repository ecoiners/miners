import React, { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getParsedTokenAccountsByOwner, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { AiOutlineClose } from "react-icons/ai";

interface TokenExplorerViewProps {
  setOpenTokenExplorer: Dispatch<SetStateAction<boolean>>;
}

interface TokenData {
  mint: string;
  amount: string;
  decimals: number;
}

const TokenExplorerView: FC<TokenExplorerViewProps> = ({ setOpenTokenExplorer }) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTokens = async () => {
    if (!publicKey) return;
    setLoading(true);
    try {
      const accounts = await connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID });
      const data = accounts.value.map((acc) => ({
        mint: acc.account.data.parsed.info.mint,
        amount: acc.account.data.parsed.info.tokenAmount.uiAmountString,
        decimals: acc.account.data.parsed.info.tokenAmount.decimals,
      }));
      setTokens(data);
    } catch {
      console.error("Gagal ambil token list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [publicKey]);

  return (
    <section className="flex items-center justify-center h-screen bg-slate-900/70 backdrop-blur-2xl p-4">
      <div className="bg-slate-800 p-8 rounded-2xl border border-green-500/30 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-xl font-semibold">My Tokens</h3>
          <button
            onClick={() => setOpenTokenExplorer(false)}
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90"
          >
            <AiOutlineClose className="text-white text-xl" />
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center">Memuat token...</p>
        ) : tokens.length === 0 ? (
          <p className="text-gray-400 text-center">Tidak ada token ditemukan</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tokens.map((t, i) => (
              <div
                key={i}
                className="p-4 bg-slate-900/60 rounded-xl border border-slate-700 hover:border-green-500/50 transition"
              >
                <h4 className="text-white font-semibold text-sm mb-1 break-all">{t.mint}</h4>
                <p className="text-green-400 text-sm">Balance: {t.amount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TokenExplorerView;