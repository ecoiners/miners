import { useState } from "react";
import { useContract, useContractRead, useContractWrite } from "thirdweb/react";
import { toUnits, toEther } from "thirdweb";

import {TokenAddress} from "../client";

export default function Home() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("0");

  const { contract } = useContract(TokenAddress);

  // ==== READ ====
  const { data: name } = useContractRead(contract, "name");
	const { data: symbol } = useContractRead(contract, "symbol");
  const { data: totalSupply } = useContractRead(contract, "totalSupply");
	const { data: ownerOfContract } = useContractRead(contract, "ownerOfContract");

  // ==== WRITE ====
  const { mutateAsync: transfer, isLoading } = useContractWrite(contract, "transfer");

  const handleTransfer = async () => {
    try {
      const tx = await transfer({
        args: [recipient, toUnits(amount, 18)], // ✅ tanpa ethers
      });
      alert("✅ Transfer success!");
      console.log("TX:", tx);
    } catch (err) {
      alert("❌ Transfer failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-zinc-900 p-6 rounded-2xl shadow-lg text-white">
      <div>
			  <h2 className="text-2xl font-semibold mb-4 text-pink-500">Commander Token</h2>
  
        <p>
          <span className="font-semibold">Token Name:</span> {name || "..."}
        </p>
			  
			  <p>
					<span className=" font-semibold">Token Symbol: </span> 
				  {symbol}
			  </p>
        <p>
          <span className="font-semibold">Total Supply:</span>{" "}
          {totalSupply ? toEther(totalSupply) : "..."} E100
        </p>
			  
			  <p><span className=" font-semibold text-green-500">Owner : </span> {ownerOfContract}</p >
      </div>
      <hr className="my-4 border-zinc-700" />

			<div>
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
          disabled={isLoading}
          onClick={handleTransfer}
          className="w-full bg-pink-600 hover:bg-pink-700 py-2 rounded mt-2 disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Send Token"}
        </button>
			</div>
    </div>
  );
} 
