import { useState } from "react";
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";
import {
  getContract,
  prepareContractCall,
  toEther,
  toUnits,
	defineChain
} from "thirdweb";

import { client,TokenAddress } from "./client";

const COMMANDER_ADDRESS = TokenAddress;

export default function Home() {
  const account = useActiveAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("0");

  // Ambil contract instance
  const contract = getContract({
    client,
    address: COMMANDER_ADDRESS,
    chain: defineChain(17000), // ganti ke polygon / holesky / arbitrum, dll
  });

  // ==== READ ====
  const { data: name } = useReadContract({
    contract,
    method: "function name() view returns (string)",
  });

  const { data: totalSupply } = useReadContract({
    contract,
    method: "function totalSupply() view returns (uint256)",
  });
	
	const { data: ownerOfContract } = useReadContract({
		contract,
		method: "function ownerOfContract() view returns (string)"
	})

  // ==== WRITE ====
  const { mutate: sendTx, isPending } = useSendTransaction();

  const handleTransfer = async () => {
    try {
      const tx = prepareContractCall({
        contract,
        method: "function transfer(address to, uint256 amount)",
        params: [recipient, toUnits(amount, 18)],
      });

      await sendTx(tx);
      alert("✅ Transfer success!");
    } catch (err) {
      alert("❌ Transfer failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-zinc-900 p-6 rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-4 text-pink-500">Commander Token</h2>

      <p>
        <span className="font-semibold">Token Name:</span> {name ?? "..."}
      </p>
      <p>
        <span className="font-semibold">Total Supply:</span>{" "}
        {totalSupply ? toEther(totalSupply) : "..."} CMD
      </p>
			
			<p>
        <span className="font-semibold">Owner:</span>{" "}
        {ownerOfContract}
      </p>

      <hr className="my-4 border-zinc-700" />

      <h3 className="text-xl mb-2">Transfer Token</h3>
      <input
        type="text"
        placeholder="Recipient address"
        className="w-full p-2 rounded bg-zinc-800 mb-2 text-white"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        className="w-full p-2 rounded bg-zinc-800 mb-2 text-white"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        disabled={isPending}
        onClick={handleTransfer}
        className="w-full bg-pink-600 hover:bg-pink-700 py-2 rounded mt-2 disabled:opacity-50"
      >
        {isPending ? "Processing..." : "Send Token"}
      </button>
    </div>
  );
}