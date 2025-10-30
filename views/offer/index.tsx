import React, { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Rocket, Settings } from "lucide-react";

const OfferView: FC = () => {
  const items = [
    {
      title: "Pembuat Token Terbaik",
      desc: "Bangun token Solana secara instan dengan dukungan metadata, supply, dan logo yang dapat disesuaikan.",
      icon: <Zap className="h-6 w-6 text-green-400" />
    },
    {
      title: "Deploy Token Sekejap",
      desc: "Luncurkan token Anda ke jaringan Devnet atau Mainnet hanya dengan beberapa klik — cepat dan efisien.",
      icon: <Rocket className="h-6 w-6 text-blue-400" />
    },
    {
      title: "Manajemen Token Lengkap",
      desc: "Kelola mint, burn, dan distribusi token langsung dari dashboard ECROP 100 tanpa perlu kode rumit.",
      icon: <Settings className="h-6 w-6 text-purple-400" />
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* === Header Section === */}
        <div className="mb-12 lg:mb-16 text-center">
          <Badge variant="secondary" className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
            Fitur Unggulan
          </Badge>
          <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Platform Terdepan untuk Token Solana
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Platform all-in-one untuk membuat dan mengelola token Solana secara cepat, aman, dan fleksibel.
          </p>
        </div>

        {/* === Cards Grid === */}
        <div className="grid gap-6 sm:gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <Card 
              key={idx}
              className="group bg-slate-900/40 border-l-4 border-green-400 rounded-xl backdrop-blur-xl 
                         hover:-translate-y-2 hover:border-teal-400 transition-all duration-300 
                         hover:shadow-2xl hover:shadow-green-500/10 border-0"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-slate-800/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-white">
                    {item.title}
                  </CardTitle>
                </div>
                <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                  {item.desc}
                </p>
                <Button variant="ghost" className="p-0 h-auto text-teal-400 hover:text-green-300 group/btn">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    Selengkapnya
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferView;