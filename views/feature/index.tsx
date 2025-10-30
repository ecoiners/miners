import React, { FC, Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Download, 
  Send, 
  Image, 
  Rocket, 
  ArrowRight,
  Sparkles,
  Coins
} from "lucide-react";

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
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      description: "Ciptakan token Solana hanya dalam hitungan detik — tanpa coding, tanpa batas teknis, dan sepenuhnya gratis.",
      function: setOpenCreateModal,
      color: "from-yellow-500/20 to-amber-600/20",
      badge: "Most Popular"
    },
    {
      label: "Get Airdrop",
      icon: <Download className="h-8 w-8 text-green-400" />,
      description: "Dapatkan SOL gratis di jaringan Devnet untuk pengujian transaksi dan fitur token sebelum deploy ke Mainnet.",
      function: setOpenAirdrop,
      color: "from-green-500/20 to-emerald-600/20",
      badge: "Free"
    },
    {
      label: "Transfer SOL",
      icon: <Send className="h-8 w-8 text-blue-400" />,
      description: "Kirim dan terima SOL dengan antarmuka yang bersih, cepat, dan aman langsung dari dashboard ECROP 100.",
      function: setOpenSendTransaction,
      color: "from-blue-500/20 to-cyan-600/20",
      badge: "Secure"
    },
    {
      label: "Token Metadata",
      icon: <Image className="h-8 w-8 text-pink-400" />,
      description: "Tambahkan nama, simbol, deskripsi, dan gambar agar token Anda tampil profesional di Solana Explorer.",
      function: setOpenTokenMetadata,
      color: "from-pink-500/20 to-rose-600/20",
      badge: "Customizable"
    },
    {
      label: "Contact Support",
      icon: <Rocket className="h-8 w-8 text-purple-400" />,
      description: "Terhubung dengan tim ECROP 100 untuk dukungan teknis, kolaborasi, atau pertanyaan seputar produk.",
      function: setOpenContact,
      color: "from-purple-500/20 to-violet-600/20",
      badge: "24/7 Support"
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-16 text-center">
          <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-400 border-green-500/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Powerful Features
          </Badge>
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Solana Blockchain Toolkit
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Jelajahi berbagai fitur utama ECROP 100 untuk menciptakan, mengelola, dan meluncurkan aset di ekosistem Solana.
            Mulai dari pembuatan token, pengaturan metadata, hingga pengujian transaksi — semuanya tanpa perlu coding, cepat, dan intuitif.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 hover:border-green-400/40 hover:bg-slate-800/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10"
            >
              <CardContent className="p-6 lg:p-8">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  {feature.badge && (
                    <Badge variant="secondary" className="bg-slate-800/60 text-gray-300 text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <CardTitle className="text-white text-xl lg:text-2xl font-bold mb-4">
                  {feature.label}
                </CardTitle>
                
                <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Button */}
                <Button
                  onClick={() => feature.function(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold group/btn"
                >
                  <span className="flex items-center justify-center gap-2">
                    Try Feature
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Additional CTA Card */}
          <Card className="group bg-gradient-to-br from-green-500/10 to-teal-600/10 backdrop-blur-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 col-span-1 md:col-span-2 lg:col-span-3">
            <CardContent className="p-8 lg:p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Coins className="h-10 w-10 text-white" />
              </div>
              
              <CardTitle className="text-white text-2xl lg:text-3xl font-bold mb-4">
                Ready to Launch Your Token?
              </CardTitle>
              
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of creators who have successfully launched their tokens on Solana with ECROP 100. 
                Start your blockchain journey today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setOpenCreateModal(true)}
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold px-8 py-3 text-lg"
                  size="lg"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Create First Token
                </Button>
                
                <Button
                  variant="outline"
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300 font-semibold px-8 py-3 text-lg"
                  size="lg"
                >
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeatureView;