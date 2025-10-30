import React, { FC, useState, Dispatch, SetStateAction } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { AiOutlineClose } from "react-icons/ai";
import { notify } from "../../utils/notifications";

interface AirdropViewProps {
  setOpenAirdrop: Dispatch<SetStateAction<boolean>>;
}

const AirdropView: FC<AirdropViewProps> = ({ setOpenAirdrop }) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [amount, setAmount] = useState("1");
  const [loading, setLoading] = useState(false);

  const handleAirdrop = async () => {
    if (!publicKey) return notify({ type: "error", message: "Hubungkan wallet dulu!" });
    setLoading(true);
    try {
      const signature = await connection.requestAirdrop(publicKey, Number(amount) * LAMPORTS_PER_SOL);
      await connection.confirmTransaction(signature, "confirmed");
      notify({ type: "success", message: `Berhasil airdrop ${amount} SOL 💧` });
    } catch {
      notify({ type: "error", message: "Gagal melakukan airdrop 😭" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-slate-900/70 backdrop-blur-2xl">
      <div className="bg-slate-800 p-8 rounded-2xl border border-green-500/30 max-w-sm w-full">
        <h3 className="text-white text-xl font-semibold mb-2">Airdrop Devnet</h3>
        <p className="text-gray-300 text-sm mb-4">Dapatkan SOL gratis untuk pengujian.</p>

        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded-lg bg-slate-900 text-white border border-gray-600 mb-4"
          placeholder="Jumlah SOL"
        />

        <button
          onClick={handleAirdrop}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Memproses..." : "Dapatkan Airdrop"}
        </button>

        <div className="mt-6 text-center">
          <button
            onClick={() => setOpenAirdrop(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 transition"
          >
            <AiOutlineClose className="text-white text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AirdropView;