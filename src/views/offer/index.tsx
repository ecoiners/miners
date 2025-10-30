import React, { FC } from "react";

const OfferView: FC = () => {
  const items = [
    {
      title: "Pembuat Token Terbaik",
      desc: "Bangun token Solana secara instan dengan dukungan metadata, supply, dan logo yang dapat disesuaikan.",
    },
    {
      title: "Deploy Token Sekejap",
      desc: "Luncurkan token Anda ke jaringan Devnet atau Mainnet hanya dengan beberapa klik — cepat dan efisien.",
    },
    {
      title: "Manajemen Token Lengkap",
      desc: "Kelola mint, burn, dan distribusi token langsung dari dashboard ECROP 100 tanpa perlu kode rumit.",
    },
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        {/* === Header Section === */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-semibold capitalize text-white">
            Fitur Unggulan ECROP 100
          </h2>
          <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
            Platform all-in-one untuk membuat dan mengelola token Solana secara cepat, aman, dan fleksibel.
          </p>
        </div>

        {/* === Cards Grid === */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/40 border-l-2 border-green-400 rounded-xl backdrop-blur-xl 
                         p-8 hover:-translate-y-1 hover:border-teal-400 transition-all duration-300"
            >
              <h3 className="mb-3 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                {item.desc}
              </p>
              <a
                href="#"
                className="relative group inline-flex items-center gap-2 text-sm font-medium text-teal-400 hover:text-green-300 transition"
              >
                Selengkapnya
                <span className="absolute left-0 -bottom-0.5 h-px w-6 bg-gradient-to-r from-green-400 to-teal-400 rounded transition-all duration-500 group-hover:w-full"></span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferView;