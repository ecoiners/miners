"use client";

import { Link } from "next/link";
import ConnectWallet from "./ConnectWallet";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-zinc-900 text-white">
      <div className="flex items-center gap-2">
        <img
          src="https://gateway.pinata.cloud/ipfs/bafybeibqbay4tbzr2azii4y27xlltvdqbqp6kwhseioiqbtmtzbiji6sfm"
          alt="logo"
          className="w-8 h-8 rounded-full"
        />
        <Link href="/" className="text-lg font-semibold">
          ECROP 100
        </Link>
      </div>

      {/* Tombol Connect Wallet dari Thirdweb */}
      <ConnectWallet />
    </header>
  );
}
