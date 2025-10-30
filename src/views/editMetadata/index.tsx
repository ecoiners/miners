import React, { FC, useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { PROGRAM_ID, createUpdateMetadataAccountV2Instruction } from "@metaplex-foundation/mpl-token-metadata";
import { notify } from "../../utils/notifications";

interface EditMetadataViewProps {
  setOpenEditMetadata: Dispatch<SetStateAction<boolean>>;
}

const EditMetadataView: FC<EditMetadataViewProps> = ({ setOpenEditMetadata }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [mintAddress, setMintAddress] = useState("");
  const [meta, setMeta] = useState({ name: "", symbol: "", description: "", image: "" });
  const [loading, setLoading] = useState(false);

  const uploadMetadata = async () => {
    const data = JSON.stringify(meta);
    const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
        "Content-Type": "application/json",
      },
    });
    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  };

  const handleUpdate = async () => {
    if (!publicKey || !mintAddress) return;
    setLoading(true);
    try {
      const uri = await uploadMetadata();
      const mint = new PublicKey(mintAddress);
      const [metadataPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), mint.toBuffer()],
        PROGRAM_ID
      );

      const ix = createUpdateMetadataAccountV2Instruction(
        {
          metadata: metadataPDA,
          updateAuthority: publicKey,
        },
        {
          updateMetadataAccountArgsV2: {
            data: {
              name: meta.name,
              symbol: meta.symbol,
              uri,
              creators: null,
              sellerFeeBasisPoints: 0,
              collection: null,
              uses: null,
            },
            updateAuthority: publicKey,
            primarySaleHappened: null,
            isMutable: true,
          },
        }
      );

      const tx = new Transaction().add(ix);
      const sig = await sendTransaction(tx, connection);
      notify({ type: "success", message: "Metadata diperbarui ✅", txid: sig });
    } catch {
      notify({ type: "error", message: "Gagal update metadata 😭" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-slate-900/70 backdrop-blur-2xl p-4">
      <div className="bg-slate-800 p-8 rounded-2xl border border-green-500/30 max-w-md w-full">
        <div className="flex justify-between mb-4">
          <h3 className="text-white text-xl font-semibold">Edit Token Metadata</h3>
          <button
            onClick={() => setOpenEditMetadata(false)}
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-pink-600"
          >
            <AiOutlineClose className="text-white text-xl" />
          </button>
        </div>

        <input
          placeholder="Mint Address"
          className="w-full p-2 mb-3 rounded-lg bg-slate-900 text-white border border-gray-600"
          value={mintAddress}
          onChange={(e) => setMintAddress(e.target.value)}
        />

        {["name", "symbol", "description", "image"].map((f) => (
          <input
            key={f}
            placeholder={f.toUpperCase()}
            className="w-full p-2 mb-3 rounded-lg bg-slate-900 text-white border border-gray-600"
            value={(meta as any)[f]}
            onChange={(e) => setMeta({ ...meta, [f]: e.target.value })}
          />
        ))}

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Memproses..." : "Update Metadata"}
        </button>
      </div>
    </section>
  );
};

export default EditMetadataView;