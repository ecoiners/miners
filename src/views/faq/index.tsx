

import React, { FC, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const FaqView: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
        "Setelah Anda mengatur nama token, simbol, dan supply, cukup hubungkan wallet Solana Anda, lalu klik ‘Deploy’. Token Anda akan langsung dibuat di jaringan Solana.",
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
    <section id="faq" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        {/* === Header === */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Berikut beberapa pertanyaan umum seputar ECROP 100 dan pembuatan token Solana.  
            Jika masih ada pertanyaan lain, jangan ragu untuk menghubungi kami.
          </p>
        </div>

        {/* === Accordion === */}
        <div className="max-w-3xl mx-auto space-y-4">
          {question.map((ques, index) => (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 backdrop-blur-xl ${
                openIndex === index
                  ? "border-green-500/40 bg-slate-800/60"
                  : "border-green-500/10 bg-slate-900/40"
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-white font-medium"
              >
                <span>{ques.question}</span>
                <HiChevronDown
                  className={`text-xl transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-green-400" : "rotate-0"
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-300 text-sm leading-relaxed">
                  {ques.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqView;

/*
import { FC } from "react";

const FaqView: FC = ({}) => {
	const question = [
    {
      question: " Who are produces sit pleasure?",
      answer:
        " Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      id: "faq-1",
    },
    {
      question: " What is quo voluptas nulla pariatur?",
      answer:
        "Vivamus elementum semper nisi. Aenean vulputate eleifendtellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.",
      id: "faq-2",
    },
    {
      question: "How to do transactions using iMbank?",
      answer:
        " Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      id: "faq-3",
    },
    {
      question: " hot to activate iMbank service?",
      answer:
        "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      id: "faq-4",
    },
    {
      question: "  Who is eligible to open iMbank account?",
      answer:
        "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      id: "faq-5",
    },
    {
      question: "wil i be given a passbook?",
      answer:
        "Aenean commodo ligula eget dolor. Aenean massa. Cum sociisnatoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      id: "faq-6",
    },
  ];
	
	return (
		<section className="py-20" id="faq">
		  <div className="container">
			  <div className="mb-10 flex items-end justify-between ">
				  <div className="mx-auto max-w-2xl text-center">
					  <h2 className="mb-4 text-3xl font-semibold text-white capitalize">
						  Any Question
						</h2>
						<p className="text-gray-300 text-sm font-medium ">
						  any question descripion tolong disi
						</p>
					</div>
				</div>
				
				<div className="mx-auto max-w-3xl">
				  <div className="hs-accordion-group space-y-4">
					  {
							question.map((ques, index) => (
								<div id={ques.id} className="hs-accordion bg-slate-900/40 overflow-hidden rounded-md border border-green-400 backdrop-blur-3xl" key={index}>
								  <button aria-controls={`faq-accordion-${index + 1}`} className="hs-accordion-toggle inline-flex items-center justify-between gap-x-3 px-6 py-4 text-left capitalize text-white transition-all duration-300">
									  <h5 className="flex text-base font-semibold">
										  <i className="me-3 h-5 w-5 stroke-white align-middle"></i>
											{ques.question}
										</h5>
										
										<i className="hs-accordion-active:rotate-180 h-4 w-4 transition-all duration-500">
										</i>
									</button>
									
									<div id={`faq-accordion-${index + 1}`} className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby={ques.id}>
									  <div className="px-6 pb-4 pt-0">
										  <p className="mb-2 text-gray-300 font-medium text-sm">
											  {ques.answer}
											</p>
											
											<p className="text-sm text-gray-300 font-medium">
											  Have you ever wanted to become blockchain developer check
												the pro nft marketplace course.
											</p>
										</div>
									</div>
								</div>
							))
						}
					</div>
				</div>
			</div>
		</section>
	);
};

export default FaqView;
*/