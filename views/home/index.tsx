import { FC, Dispatch, SetStateAction } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowRight, Star } from "lucide-react";

interface HomeViewProps {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
}

const HomeView: FC<HomeViewProps> = ({ setOpenCreateModal }) => {
  const brands = [
    { name: "Binance", logo: "/assets/brands/bnbsvg" },
    { name: "Solana", logo: "/assets/brands/sol.svg" },
    { name: "Bitcoin", logo: "/assets/brands/btc.svg" },
    { name: "Avalanche", logo: "/assets/brands/avax.svg" },
    { name: "Nano", logo: "/assets/brands/nano.svg" },
    { name: "Music", logo: "/assets/brands/music.svg" },
    { name: "Phantom", logo: "/assets/brands/neu.svg" },
    { name: "Magic Eden", logo: "/assets/brands/nexo.svg" },
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-transparent pb-20 pt-24 md:pt-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-red-500/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-slate-900/50 border border-green-500/20 backdrop-blur-xl overflow-hidden">
          <CardContent className="p-6 lg:p-12">
            <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
              {/* ========== LEFT SECTION ========== */}
              <div className="relative z-10 text-center lg:text-left">
                {/* Badge */}
                <Badge className="mb-4 bg-gradient-to-r from-green-500 to-teal-600 text-white border-0 px-4 py-2 text-sm">
                  <Star className="h-3 w-3 mr-1" />
                  Create Solana Token v0.1.28
                </Badge>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Buat Token Solana{" "}
                  <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                    Tanpa Coding
                  </span>{" "}
                  🚀
                </h1>

                {/* Description */}
                <p className="text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 text-lg md:text-xl leading-relaxed">
                  <span className="font-semibold text-green-400">ECROP 100</span>{" "}
                  adalah platform all-in-one untuk membuat dan mengelola token
                  Solana. Cukup satu klik untuk membuat token, mengatur metadata,
                  dan deploy langsung ke blockchain — tanpa perlu coding sama
                  sekali.
                </p>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-12 lg:mb-0">
                  <Button
                    onClick={() => setOpenCreateModal(true)}
                    className="group bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/20"
                    size="lg"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Create Token
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {/* Wallet Button Custom */}
                  <WalletMultiButton
                    style={{
                      borderRadius: "0.75rem",
                      fontWeight: 600,
                      padding: "12px 24px",
                      background: "linear-gradient(90deg, #22c55e 0%, #0d9488 100%)",
                      color: "#fff",
                      border: "1px solid rgba(34,197,94,0.4)",
                      boxShadow: "0 0 12px rgba(20,200,140,0.2)",
                      transition: "all 0.3s ease",
                      fontSize: "16px",
                    }}
                    className="wallet-custom hover:scale-105 transition-transform"
                  />
                </div>
              </div>

              {/* ========== RIGHT SECTION (Image Gallery) ========== */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className={`${item % 2 === 0 ? 'mt-8' : ''}`}>
                      <img
                        src={`/assets/images/ai/img-${item + 5}.jpg`}
                        alt="Crypto Token"
                        className="w-full h-48 sm:h-56 lg:h-64 rounded-2xl object-cover border border-slate-700/50 shadow-lg hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Brand Marquee Section */}
        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold">
              Didukung oleh ekosistem terbaik
            </p>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee space-x-12 py-4">
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                >
                  <div className="w-32 h-16 bg-slate-800/50 rounded-xl flex items-center justify-center border border-slate-700/30 backdrop-blur-sm">
                    <span className="text-white font-semibold text-sm">
                      {brand.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Animation CSS */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HomeView;