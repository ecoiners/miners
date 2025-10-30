import React, { FC, Dispatch, SetStateAction } from "react";
import { MdGeneratingTokens, MdEditNote } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { FaUsers, FaChartLine, FaSearch, FaGift, FaCogs, FaListUl } from "react-icons/fa";
import { LuArrowRightFromLine } from "react-icons/lu";
import { IoIosArrowRoundForward } from "react-icons/io";

interface ToolsViewProps {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  setOpenTokenMetadata: Dispatch<SetStateAction<boolean>>;
  setOpenContact: Dispatch<SetStateAction<boolean>>;
  setOpenAirdrop: Dispatch<SetStateAction<boolean>>;
  setOpenSendTransaction: Dispatch<SetStateAction<boolean>>;
  setOpenTokenExplorer: Dispatch<SetStateAction<boolean>>;
  setOpenSendToken: Dispatch<SetStateAction<boolean>>;
  setOpenTokenManager: Dispatch<SetStateAction<boolean>>;
  setOpenEditMetadata: Dispatch<SetStateAction<boolean>>;
}

const ToolsView: FC<ToolsViewProps> = ({
  setOpenCreateModal,
  setOpenTokenMetadata,
  setOpenContact,
  setOpenAirdrop,
  setOpenSendTransaction,
  setOpenTokenExplorer,
  setOpenSendToken,
  setOpenTokenManager,
  setOpenEditMetadata,
}) => {
  const tools = [
    {
      label: "Create Token",
      icon: <MdGeneratingTokens className="text-4xl text-red-400" />,
      action: setOpenCreateModal,
    },
    {
      label: "Token Metadata",
      icon: <MdGeneratingTokens className="text-4xl text-yellow-400" />,
      action: setOpenTokenMetadata,
    },
    {
      label: "Edit Metadata",
      icon: <MdEditNote className="text-4xl text-orange-400" />,
      action: setOpenEditMetadata,
    },
    {
      label: "Airdrop",
      icon: <FaGift className="text-4xl text-purple-400" />,
      action: setOpenAirdrop,
    },
    {
      label: "Send Token",
      icon: <IoSend className="text-4xl text-blue-400" />,
      action: setOpenSendTransaction,
    },
    {
      label: "Token Explorer",
      icon: <FaSearch className="text-4xl text-green-400" />,
      action: setOpenTokenExplorer,
    },
    {
      label: "Send Token",
      icon: <FaListUl className="text-4xl text-pink-400" />,
      action: setOpenSendToken,
    },
    {
      label: "Token Manager",
      icon: <FaCogs className="text-4xl text-teal-400" />,
      action: setOpenTokenManager,
    },
    {
      label: "Contact Us",
      icon: <RiContactsLine className="text-4xl text-indigo-400" />,
      action: setOpenContact,
    },
  ];

  return (
    <section id="tools" className="py-20 px-4 sm:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h4 className="mb-4 text-3xl font-semibold text-white">
            Solana Powerful Tools
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            Satu ekosistem alat canggih untuk membangun dan mengelola aset di blockchain Solana.
            Dari pembuatan token, metadata, hingga eksplorasi dan manajemen lengkap —
            semua dapat diakses secara instan dan responsif. Didukung fitur Airdrop Testnet
            serta dukungan jaringan Mainnet.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              onClick={() => tool.action(true)}
              className="group bg-slate-900/40 rounded-2xl backdrop-blur-2xl p-6 border border-green-500/20 hover:border-green-400/40 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-slate-500/20 shadow-inner">
                  {tool.icon}
                </div>
                <h3 className="text-white font-medium text-lg sm:text-xl">
                  {tool.label}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-sm text-green-400 group-hover:text-green-300 transition-all">
                <span>Buka Fitur</span>
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
