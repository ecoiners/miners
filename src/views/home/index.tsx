
import { FC, Dispatch, SetStateAction } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface HomeViewProps {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
}

const HomeView: FC<HomeViewProps> = ({ setOpenCreateModal }) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-transparent pb-20 pt-[90px]"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/50 rounded-2xl border border-green-500/20 backdrop-blur-xl">
          <div className="p-8 lg:p-12">
            <div className="grid grid-cols-1 gap-10 items-center lg:grid-cols-2">
              {/* ========== LEFT SECTION ========== */}
              <div className="relative z-10 text-center lg:text-left">
                {/* Gradients */}
                <div className="absolute -top-3 -left-3 h-12 w-12 bg-gradient-to-r from-red-500 to-pink-600 animate-spin-slow rounded-2xl opacity-40 blur-md" />
                <div className="absolute bottom-0 right-0 h-12 w-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-40 blur-md animate-pulse" />

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
                  <button
                    onClick={() => setOpenCreateModal(true)}
                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-6 py-3 font-medium transition-all duration-300 shadow-md hover:shadow-green-600/20"
                  >
                    <MdGeneratingTokens className="text-xl" />
                    Create Token
                  </button>

                  {/* Wallet Button Custom */}
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

              {/* ========== RIGHT SECTION (Marquee Animasi) ========== */}
              <div className="mx-auto h-[500px] sm:h-[560px] overflow-hidden w-full max-w-md">
                <div className="marquee grid grid-cols-2 gap-4">
                  <div className="marquee-hero flex flex-col gap-4">
                    {["img-6", "img-7", "img-8", "img-9", "img-10", "img-11"].map(
                      (image, i) => (
                        <img
                          src={`/assets/images/ai/${image}.jpg`}
                          alt="crypto"
                          key={i}
                          className="w-48 sm:w-56 md:w-60 rounded-xl object-cover aspect-square border border-slate-800/40"
                        />
                      )
                    )}
                  </div>

                  <div className="marquee-hero marquee-reverse flex flex-col gap-4">
                    {["img-12", "img-13", "img-14", "img-15", "img-6", "img-7"].map(
                      (image, i) => (
                        <img
                          src={`/assets/images/ai/${image}.jpg`}
                          alt="crypto"
                          key={i}
                          className="w-48 sm:w-56 md:w-60 rounded-xl object-cover aspect-square border border-slate-800/40"
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeView;




/* versi 1
import { FC, Dispatch, SetStateAction } from "react";
import { MdGeneratingTokens } from "react-icons/md";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface HomeViewProps {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
}

const HomeView: FC<HomeViewProps> = ({setOpenCreateModal}) => {
	
	return (
		<section id="home" className="relative overflow-hidden pb-20 pt-[72px] bg-transparent">
		  <div className="px-6 py-4">
			  <div className="bg-slate-900/40 rounded-2xl ">
				
				  <div className="container">
					  <div className="p-6">
						  <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
							  
								
								<div className="bg-gradient-to-r from-red-500 to-pink-600 -z-1 start-0 absolute top-0 h-14 w-14 animate-[spin_10s_linear_infinite] rounded-2xl rounded-br-none rounded-tl-none">
								</div>
								
								<div className="bg-gradient-to-r from-red-600 to-pink-700 -z-1 end-0 absolute bottom-0 animate-pink rounded-full h-14 w-14"></div>
								
								<div>
								  <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent font-semibold rounded-md px-3 py-1 text-sm uppercase tracking-wider">
									  CREATE SOLANA TOKEN V.0.1.28
									</span>
									
									<h1 className="md:text-5xl/tight my-4 max-w-lg text-4xl font-medium text-white">
									  Buat token solana tanpa coding free
									</h1>
									<p className="text-gray-300 md:text-lg">
									  ECROP 100 - 
										Platform pembuat token Solana paling mudah dan gratis. Buat token crypto Anda sendiri di blockchain Solana dalam hitungan menit - tanpa perlu pengetahuan teknis atau coding. Lengkap dengan fitur metadata, supply yang dapat disesuaikan, dan deploy instan.
									</p>
									
									<div className="new_add_css">
									  <a onClick={() => setOpenCreateModal(true)} className="bg-slate-500/20 pe-4 group mt-10 inline-flex items-center justify-center gap-2 rounded-full px-1 text-white transition-all duration-500">
										  <span className="bg-gradient-to-r from-green-500 to-teal-600 text-white me-2 flex h-11 w-11 items-center justify-center rounded-full group-hover:from-green-600 group-hover:to-teal-700 ">
											  <i data-lucide="image">
												  <MdGeneratingTokens />
												</i>
											</span>
											Create
										</a>
										
										<a className="mt-8">
										  <WalletMultiButton className="border-green border-2"/>
										</a>
									</div>
								</div>
								
								<div className="mx-auto h-[595px] overflow-hidden">
								  <div className="marquee grid grid-cols-2 gap-6">
									 
									  <div className="relative m-auto flex flex-col gap-6 overflow-hidden">
										  <div className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6">
											  {
													[
														"img-6", "img-7", "img-8",
														"img-9", "img-10", "img-11"
													].map((image, index) => (
														<img src={`/assets/images/ai/${image}.jpg`} alt="crypto" key={index} className="aspect-1 h-full w-60 rounded-xl object-cover"/>
													))
												}
											</div>
											
											<div className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6" aria-hidden="true">
											  {
													[
														"img-6", "img-7", "img-8",
														"img-9", "img-10", "img-11"
													].map((image, index) => (
														<img src={`/assets/images/ai/${image}.jpg`} alt="crypto" key={index} className="aspect-1 h-full w-60 rounded-xl object-cover"/>
													))
												}
											</div>
										</div>
										
										<div className="marquee-reverse m-auto flex flex-col gap-6 overflow-hidden">
										  <div className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6">
											  {
													[
														"img-7", "img-13", "img-9",
														"img-10", "img-14", "img-15"
													].map((image, index) => (
														<img src={`/assets/images/ai/${image}.jpg`} alt="crypto" key={index} className="aspect-1 h-full w-60 rounded-xl object-cover"/>
													))
												}
											</div>
											
											<div className="marquee-hero flex min-h-full flex-shrink-0 flex-col items-center justify-around gap-6" aria-hidden="true">
											  {
													[
														"img-7", "img-13", "img-9",
														"img-10", "img-14", "img-15"
													].map((image, index) => (
														<img src={`/assets/images/ai/${image}.jpg`} alt="crypto" key={index} className="aspect-1 h-full w-60 rounded-xl object-cover"/>
													))
												}
											</div>
										</div>
										
									</div>
								</div>
								
							</div>
						</div>
					</div>
					
					
				</div>
			</div>
		</section>
	);
};

export default HomeView;
*/