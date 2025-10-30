import React, { FC, Dispatch, SetStateAction } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { FaUsers, FaChartLine, FaSearch, FaGift } from "react-icons/fa";
import { LuArrowRightFromLine } from "react-icons/lu";
import { IoIosArrowRoundForward } from "react-icons/io";

interface ToolsViewProps {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  setOpenTokenMetadata: Dispatch<SetStateAction<boolean>>;
  setOpenContact: Dispatch<SetStateAction<boolean>>;
  setOpenAirdrop: Dispatch<SetStateAction<boolean>>;
  setOpenSendTransaction: Dispatch<SetStateAction<boolean>>;
}

const ToolsView: FC<ToolsViewProps> = ({
  setOpenCreateModal,
  setOpenTokenMetadata,
  setOpenContact,
  setOpenAirdrop,
  setOpenSendTransaction,
}) => {
  const tools = [
    { label: "Create Token", icon: <MdGeneratingTokens className="text-4xl text-red-400" />, function: setOpenCreateModal },
    { label: "Token Metadata", icon: <MdGeneratingTokens className="text-4xl text-yellow-400" />, function: setOpenTokenMetadata },
    { label: "Contact US", icon: <RiContactsLine className="text-4xl text-indigo-400" />, function: setOpenContact },
    { label: "Airdrop", icon: <FaGift className="text-4xl text-purple-400" />, function: setOpenAirdrop },
    { label: "Send Transaction", icon: <IoSend className="text-4xl text-blue-400" />, function: setOpenSendTransaction },
    { label: "Buddy Tokens", icon: <FaUsers className="text-4xl text-teal-400" />, function: setOpenSendTransaction },
    { label: "Top Tokens", icon: <FaChartLine className="text-4xl text-pink-400" />, function: setOpenSendTransaction },
    { label: "Solana Explorer", icon: <FaSearch className="text-4xl text-green-400" />, function: setOpenSendTransaction },
  ];

  return (
    <section id="tools" className="py-20">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h4 className="mb-4 text-3xl font-semibold text-white">
            Solana Powerful Tools
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            Satu ekosistem alat canggih untuk membangun dan mengelola aset di blockchain Solana.
            Dari pembuatan token dan pengaturan metadata hingga eksplorasi jaringan dan pengiriman transaksi —
            semuanya dapat dilakukan dalam satu tempat, cepat dan intuitif.
            Dilengkapi fitur Airdrop khusus Testnet untuk pengujian, serta dukungan penuh jaringan Mainnet.
            ECROP 100 dirancang bagi siapa pun — pengembang maupun kreator — tanpa batas teknis dan tanpa coding.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => tool.function(true)}
              className="group bg-slate-900/40 rounded-2xl backdrop-blur-2xl p-6 border border-green-500/20 hover:border-green-400/40 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-500/20 shadow-inner">
                  {tool.icon}
                </div>
                <h3 className="text-white font-medium text-xl">{tool.label}</h3>
              </div>

              <div className="flex items-center gap-2 text-sm text-green-400 group-hover:text-green-300 transition-all">
                <span>Pilih & Coba</span>
                <LuArrowRightFromLine className="text-base" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        <div className="mt-12 flex justify-center">
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 px-6 py-2 rounded-lg text-white font-medium transition-all duration-300 shadow-md">
            Lihat Semua Tools
            <IoIosArrowRoundForward className="text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ToolsView;