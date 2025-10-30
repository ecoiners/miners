import React, { FC, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FaqView: FC = () => {
  const question = [
    {
      question: "Apa itu ECROP 100?",
      answer:
        "ECROP 100 adalah platform pembuat token Solana yang mudah digunakan, memungkinkan siapa pun membuat token tanpa coding dalam hitungan menit.",
    },
    {
      question: "Apakah pembuatan token di ECROP 100 gratis?",
      answer:
        "Ya! Anda bisa membuat token Solana secara gratis. Anda hanya perlu membayar biaya gas (network fee) di blockchain Solana saat proses deploy.",
    },
    {
      question: "Bagaimana cara men-deploy token ke blockchain Solana?",
      answer:
        "Setelah Anda mengatur nama token, simbol, dan supply, cukup hubungkan wallet Solana Anda, lalu klik 'Deploy'. Token Anda akan langsung dibuat di jaringan Solana.",
    },
    {
      question: "Apakah saya perlu pengetahuan teknis untuk menggunakan ECROP 100?",
      answer:
        "Tidak. Semua sudah otomatis. ECROP 100 dirancang agar siapa pun, bahkan tanpa pengalaman pemrograman blockchain, bisa membuat token dengan mudah.",
    },
    {
      question: "Apakah token saya bisa diperdagangkan di DEX seperti Raydium atau Jupiter?",
      answer:
        "Ya, tentu saja! Setelah token Anda dibuat, Anda bisa menambahkannya ke DEX seperti Raydium dengan membuat liquidity pool menggunakan pair token Anda.",
    },
    {
      question: "Apakah ECROP 100 aman digunakan?",
      answer:
        "ECROP 100 tidak menyimpan private key atau aset Anda. Semua transaksi dilakukan langsung melalui wallet Anda, sehingga tetap aman dan terdesentralisasi.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* === Header === */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Berikut beberapa pertanyaan umum seputar ECROP 100 dan pembuatan token Solana.  
            Jika masih ada pertanyaan lain, jangan ragu untuk menghubungi kami.
          </p>
        </div>

        {/* === Accordion === */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-6 sm:p-8">
              <Accordion type="single" collapsible className="space-y-4">
                {question.map((ques, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-slate-700/50 rounded-lg px-4 hover:border-green-500/30 transition-colors"
                  >
                    <AccordionTrigger className="text-white font-semibold text-left hover:text-green-400 py-4">
                      {ques.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed pb-4">
                      {ques.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FaqView;