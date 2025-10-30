"use client";

import { Dispatch, SetStateAction } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HomeViewProps {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
}

export default function HomeView({ setOpenCreateModal }: HomeViewProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden pb-20 pt-[90px] bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <Card className="border border-green-500/20 bg-slate-900/50 backdrop-blur-xl shadow-lg rounded-2xl">
          <CardContent className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              
              {/* LEFT SECTION */}
              <div className="relative z-10 text-center lg:text-left">
                {/* Decorative gradients */}
                <div className="absolute -top-3 -left-3 h-12 w-12 bg-gradient-to-r from-green-400 to-teal-500 animate-spin-slow rounded-2xl opacity-40 blur-md" />
                <div className="absolute bottom-0 right-0 h-12 w-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full opacity-40 blur-md animate-pulse" />

                <span className="inline-block bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent font-semibold rounded-md px-3 py-1 text-sm uppercase tracking-wider mb-2">
                  Create Solana Token v0.1.28
                </span>

                <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
                  Buat Token Solana Tanpa Coding — Gratis 🚀
                </h1>

                <p className="text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 text-base md:text-lg leading-relaxed">
                  <span className="font-semibold text-green-400">ECROP 100</span>{" "}
                  adalah platform all-in-one untuk membuat dan mengelola token
                  Solana. Cukup satu klik untuk membuat token, mengatur metadata,
                  dan deploy langsung ke blockchain — tanpa perlu coding sama
                  sekali.
                </p>

                {/* BUTTONS */}
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
                  <Button
                    onClick={() => setOpenCreateModal(true)}
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white shadow-md hover:shadow-green-600/30 transition-all duration-300"
                  >
                    <MdGeneratingTokens className="text-xl" />
                    Create Token
                  </Button>

                  <WalletMultiButton
                    style={{
                      borderRadius: "0.75rem",
                      fontWeight: 500,
                      padding: "12px 24px",
                      background:
                        "linear-gradient(90deg, #22c55e 0%, #0d9488 100%)",
                      color: "#fff",
                      border: "1px solid rgba(34,197,94,0.4)",
                      boxShadow: "0 0 12px rgba(20,200,140,0.2)",
                      transition: "all 0.3s ease",
                    }}
                    className="wallet-custom"
                  />
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="mx-auto h-[480px] sm:h-[540px] overflow-hidden w-full max-w-md">
                <div className="marquee grid grid-cols-2 gap-4">
                  <div className="marquee-hero flex flex-col gap-4">
                    {["img-6", "img-7", "img-8", "img-9", "img-10", "img-11"].map(
                      (image) => (
                        <img
                          key={image}
                          src={`/assets/images/ai/${image}.jpg`}
                          alt="crypto"
                          className="w-48 sm:w-56 md:w-60 rounded-xl object-cover aspect-square border border-slate-800/40"
                        />
                      )
                    )}
                  </div>
                  <div className="marquee-hero marquee-reverse flex flex-col gap-4">
                    {["img-12", "img-13", "img-14", "img-15", "img-6", "img-7"].map(
                      (image) => (
                        <img
                          key={image}
                          src={`/assets/images/ai/${image}.jpg`}
                          alt="crypto"
                          className="w-48 sm:w-56 md:w-60 rounded-xl object-cover aspect-square border border-slate-800/40"
                        />
                      )
                    )}
                  </div>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}