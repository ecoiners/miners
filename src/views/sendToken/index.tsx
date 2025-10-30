import React, { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getParsedTokenAccountsByOwner,
  createTransferInstruction,
} from "@solana/spl-token";
import { Transaction, PublicKey } from "@solana/web3.js";
import { AiOutlineClose } from "react-icons/ai";
import { notify } from "../../utils/notifications";

interface SendTokenViewProps {
  setOpenSendToken: Dispatch<SetStateAction<boolean>>;
}

const SendTokenView: FC<SendTokenViewProps> = ({ setOpenSendToken }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [tokens, setTokens] = useState<{ mint: string }[]>([]);
  const [selectedMint, setSelectedMint] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!publicKey) return;
      const acc = await connection.getParsedTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID });
      const data = acc.value.map((a) => ({ mint: a.account.data.parsed.info.mint }));
      setTokens(data);
    };
    fetchTokens();
  }, [publicKey]);

  const handleSend = async () => {
    if (!publicKey || !selectedMint || !receiver || !amount)
      return notify({ type: "error", message: "Isi semua data!" });
    try {
      setLoading(true);
      const mint = new PublicKey(selectedMint);
      const dest = new PublicKey(receiver);

      const fromATA = await getAssociatedTokenAddress(mint, publicKey);
      const toATA = await getAssociatedTokenAddress(mint, dest);
      const ix = createTransferInstruction(fromATA, toATA, publicKey, Number(amount));

      const tx = new Transaction().add(ix);
      const sig = await sendTransaction(tx, connection);
      notify({ type: "success", message: "Token terkirim 🚀", txid: sig });
    } catch {
      notify({ type: "error", message: "Gagal kirim token 😭" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-slate-900/70 backdrop-blur-2xl p-4">
      <div className="bg-slate-800 p-8 rounded-2xl border border-green-500/30 max-w-md w-full">
        <div className="flex justify-between mb-4">
          <h3 className="text-white text-xl font-semibold">Kirim SPL Token</h3>
          <button
            onClick={() => setOpenSendToken(false)}
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-pink-600"
          >
            <AiOutlineClose className="text-white text-xl" />
          </button>
        </div>

        <select
          onChange={(e) => setSelectedMint(e.target.value)}
          className="w-full p-2 rounded-lg bg-slate-900 text-white border border-gray-600 mb-3"
        >
          <option value="">Pilih Token</option>
          {tokens.map((t, i) => (
            <option key={i} value={t.mint}>
              {t.mint.slice(0, 10)}...
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Alamat Penerima"
          className="w-full p-2 rounded-lg bg-slate-900 text-white border border-gray-600 mb-3"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />

        <input
          type="number"
          placeholder="Jumlah Token"
          className="w-full p-2 rounded-lg bg-slate-900 text-white border border-gray-600 mb-3"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Mengirim..." : "Kirim Sekarang"}
        </button>
      </div>
    </section>
  );
};

export default SendTokenView;