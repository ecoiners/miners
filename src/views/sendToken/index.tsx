import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createTransferInstruction } from "@solana/spl-token";
import { Transaction, PublicKey } from "@solana/web3.js";

const SendTokenView = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [tokens, setTokens] = useState<any[]>([]);
  const [selectedToken, setSelectedToken] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Ambil daftar token milik user
  useEffect(() => {
    const fetchTokens = async () => {
      if (!publicKey) return;

      try {
        const accounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        });

        const tokenList = accounts.value.map((acc) => {
          const info = acc.account.data.parsed.info;
          return {
            mint: info.mint,
            balance: info.tokenAmount.uiAmount,
            decimals: info.tokenAmount.decimals,
          };
        });

        setTokens(tokenList);
      } catch (err) {
        console.error("Gagal ambil token:", err);
      }
    };

    fetchTokens();
  }, [publicKey, connection]);

  // Kirim token
  const handleSend = async () => {
    if (!publicKey || !selectedToken || !recipient || !amount) return;

    setLoading(true);
    setStatus("Memproses transaksi...");

    try {
      const mint = new PublicKey(selectedToken);
      const toWallet = new PublicKey(recipient);

      const fromTokenAccount = await getAssociatedTokenAddress(mint, publicKey);
      const toTokenAccount = await getAssociatedTokenAddress(mint, toWallet);

      const tx = new Transaction().add(
        createTransferInstruction(
          fromTokenAccount,
          toTokenAccount,
          publicKey,
          parseInt(amount) * 10 ** 9 // asumsikan 9 desimal (SPL)
        )
      );

      const sig = await sendTransaction(tx, connection);
      await connection.confirmTransaction(sig, "confirmed");

      setStatus("✅ Transaksi berhasil dikirim: " + sig);
    } catch (err) {
      console.error(err);
      setStatus("❌ Gagal kirim token: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Kirim Token SPL</h2>

      <label className="block mb-2 font-semibold">Pilih Token</label>
      <select
        className="select select-bordered w-full mb-4"
        value={selectedToken}
        onChange={(e) => setSelectedToken(e.target.value)}
      >
        <option value="">Pilih token...</option>
        {tokens.map((t, i) => (
          <option key={i} value={t.mint}>
            {t.mint.slice(0, 8)}... | Bal: {t.balance}
          </option>
        ))}
      </select>

      <label className="block mb-2 font-semibold">Alamat Penerima</label>
      <input
        type="text"
        className="input input-bordered w-full mb-4"
        placeholder="Masukkan alamat wallet penerima"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />

      <label className="block mb-2 font-semibold">Jumlah Token</label>
      <input
        type="number"
        className="input input-bordered w-full mb-4"
        placeholder="Masukkan jumlah"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
      >
        {loading ? "Mengirim..." : "Kirim Token"}
      </button>

      {status && <p className="mt-4 text-center text-sm">{status}</p>}
    </div>
  );
};

export default SendTokenView;
