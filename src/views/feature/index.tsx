import React, { FC, Dispatch, SetStateAction } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { FaRocket } from "react-icons/fa";
import { TbSend, TbCloudDownload } from "react-icons/tb";
import { AiOutlinePicture } from "react-icons/ai";
import { LuArrowRightFromLine } from "react-icons/lu";

// Props interface
interface FeatureViewProps {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  setOpenTokenMetadata: Dispatch<SetStateAction<boolean>>;
  setOpenContact: Dispatch<SetStateAction<boolean>>;
  setOpenAirdrop: Dispatch<SetStateAction<boolean>>;
  setOpenSendTransaction: Dispatch<SetStateAction<boolean>>;
}

const FeatureView: FC<FeatureViewProps> = ({
  setOpenCreateModal,
  setOpenTokenMetadata,
  setOpenContact,
  setOpenAirdrop,
  setOpenSendTransaction,
}) => {
  const features = [
    {
      label: "Token Generator",
      icon: <MdGeneratingTokens className="text-4xl text-yellow-400" />,
      description:
        "Ciptakan token Solana hanya dalam hitungan detik — tanpa coding, tanpa batas teknis, dan sepenuhnya gratis.",
      function: setOpenCreateModal,
    },
    {
      label: "Get Airdrop",
      icon: <TbCloudDownload className="text-4xl text-green-400" />,
      description:
        "Dapatkan SOL gratis di jaringan Devnet untuk pengujian transaksi dan fitur token sebelum deploy ke Mainnet.",
      function: setOpenAirdrop,
    },
    {
      label: "Transfer SOL",
      icon: <TbSend className="text-4xl text-blue-400" />,
      description:
        "Kirim dan terima SOL dengan antarmuka yang bersih, cepat, dan aman langsung dari dashboard ECROP 100.",
      function: setOpenSendTransaction,
    },
    {
      label: "Token Metadata",
      icon: <AiOutlinePicture className="text-4xl text-pink-400" />,
      description:
        "Tambahkan nama, simbol, deskripsi, dan gambar agar token Anda tampil profesional di Solana Explorer.",
      function: setOpenTokenMetadata,
    },
    {
      label: "Contact Support",
      icon: <FaRocket className="text-4xl text-purple-400" />,
      description:
        "Terhubung dengan tim ECROP 100 untuk dukungan teknis, kolaborasi, atau pertanyaan seputar produk.",
      function: setOpenContact,
    },
  ];

  return (
    <section  className="py-20">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-medium capitalize text-white">
              Pilih Fitur Generator Blockchain Solana
            </h2>
            <p className="text-gray-300 text-sm font-medium">
              Jelajahi berbagai fitur utama ECROP 100 untuk menciptakan, mengelola, dan meluncurkan aset di ekosistem Solana.
              <br />
              Mulai dari pembuatan token, pengaturan metadata, hingga pengujian transaksi dan airdrop — semuanya tanpa perlu coding, cepat, dan intuitif.
            </p>
          </div>
        </div>

        {/* Fitur Cards */}
        <div className="bg-slate-900/40 flex flex-wrap rounded-3xl backdrop-blur-3xl border border-green-500/20">
          {features.map((list, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 border-b border-green-500/30 hover:bg-slate-800/30 transition-all duration-300"
            >
              <div className="p-8 sm:p-10">
                <div className="bg-slate-500/20 text-gray-200 mb-8 inline-flex h-16 w-16 items-center justify-center rounded-xl shadow-lg">
                  {list.icon}
                </div>

                <h3 className="mb-3 text-2xl font-semibold text-white">{list.label}</h3>
                <p className="text-base text-gray-300 mb-6 leading-relaxed">{list.description}</p>

                <button
                  onClick={() => list.function(true)}
                  className="inline-flex items-center justify-center rounded-lg gap-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white transition-all duration-300 px-6 py-2 shadow-md"
                >
                  Coba Tools
                  <LuArrowRightFromLine className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureView;