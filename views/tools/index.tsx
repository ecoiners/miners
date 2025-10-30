import React, { FC, Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Search, 
  Users, 
  Gift, 
  Send, 
  TrendingUp, 
  FileText,
  MessageCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

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
    { 
      label: "Create Token", 
      icon: <Zap className="h-8 w-8 text-red-400" />, 
      function: setOpenCreateModal,
      description: "Buat token Solana custom dengan mudah",
      color: "from-red-500/20 to-pink-600/20"
    },
    { 
      label: "Token Metadata", 
      icon: <FileText className="h-8 w-8 text-yellow-400" />, 
      function: setOpenTokenMetadata,
      description: "Lihat dan edit metadata token",
      color: "from-yellow-500/20 to-amber-600/20"
    },
    { 
      label: "Contact US", 
      icon: <MessageCircle className="h-8 w-8 text-indigo-400" />, 
      function: setOpenContact,
      description: "Hubungi tim support kami",
      color: "from-indigo-500/20 to-purple-600/20"
    },
    { 
      label: "Airdrop", 
      icon: <Gift className="h-8 w-8 text-purple-400" />, 
      function: setOpenAirdrop,
      description: "Distribusi token ke multiple wallet",
      color: "from-purple-500/20 to-pink-600/20"
    },
    { 
      label: "Send Transaction", 
      icon: <Send className="h-8 w-8 text-blue-400" />, 
      function: setOpenSendTransaction,
      description: "Kirim transaksi dengan mudah",
      color: "from-blue-500/20 to-cyan-600/20"
    },
    { 
      label: "Buddy Tokens", 
      icon: <Users className="h-8 w-8 text-teal-400" />, 
      function: setOpenSendTransaction,
      description: "Kelompokkan token terkait",
      color: "from-teal-500/20 to-emerald-600/20"
    },
    { 
      label: "Top Tokens", 
      icon: <TrendingUp className="h-8 w-8 text-pink-400" />, 
      function: setOpenSendTransaction,
      description: "Lihat token trending",
      color: "from-pink-500/20 to-rose-600/20"
    },
    { 
      label: "Solana Explorer", 
      icon: <Search className="h-8 w-8 text-green-400" />, 
      function: setOpenSendTransaction,
      description: "Jelajahi blockchain Solana",
      color: "from-green-500/20 to-emerald-600/20"
    },
  ];

  return (
    <section id="tools" className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 lg:mb-16 text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Powerful Tools
          </Badge>
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Solana Ecosystem Toolkit
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Satu ekosistem alat canggih untuk membangun dan mengelola aset di blockchain Solana.
            Dari pembuatan token dan pengaturan metadata hingga eksplorasi jaringan dan pengiriman transaksi —
            semuanya dapat dilakukan dalam satu tempat, cepat dan intuitif.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {tools.map((tool, index) => (
            <Card 
              key={index}
              onClick={() => tool.function(true)}
              className="group bg-slate-900/40 rounded-2xl backdrop-blur-2xl border border-slate-700/50 
                         hover:border-green-400/40 hover:bg-slate-800/50 transition-all duration-300 
                         cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10"
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {tool.icon}
                </div>
                <CardTitle className="text-white font-bold text-lg mb-2">
                  {tool.label}
                </CardTitle>
                <p className="text-gray-400 text-sm mb-4">
                  {tool.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-green-400 group-hover:text-green-300 transition-all">
                  <span className="font-medium">Try Now</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Button */}
        <div className="flex justify-center">
          <Button className="group bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 px-8 py-3 rounded-xl text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-green-500/20">
            Lihat Semua Tools
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsView;