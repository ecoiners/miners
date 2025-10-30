
import React, { FC } from "react";
import { useForm } from "@formspree/react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";

const Footer: FC = () => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_KEY);

  if (state.succeeded) {
    return (
      <div className="bg-slate-900/80 text-center py-20 border-t border-green-500/20">
        <h1 className="text-4xl md:text-5xl font-semibold text-transparent bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text">
          Terima kasih sudah mengirim pesan 🥳😎
        </h1>
      </div>
    );
  }

  const menuOne = [
    "Support Center",
    "Customer Support",
    "About Us",
    "Project",
    "Return Policy",
  ];

  const menuTwo = [
    "Press Inquiries",
    "Social Media Support",
    "Image & B-ROLL",
    "Site Map",
  ];

  return (
    <footer className="bg-slate-900/60 backdrop-blur-lg border-t border-green-500/20">
      <div className="container mx-auto px-6 lg:px-20 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">

        {/* ===== ABOUT US ===== */}
        <div className="col-span-2 sm:col-span-1 lg:col-span-3">
          <h5 className="text-green-400 font-semibold mb-3 text-lg">
            About Us
          </h5>
          <ul className="space-y-2">
            {menuOne.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-gray-300 hover:text-green-400 transition text-sm font-medium"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== MY ACCOUNT ===== */}
        <div className="col-span-2 sm:col-span-1 lg:col-span-3">
          <h5 className="text-green-400 font-semibold mb-3 text-lg">
            My Account
          </h5>
          <ul className="space-y-2">
            {menuTwo.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="text-gray-300 hover:text-green-400 transition text-sm font-medium"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== NEWSLETTER ===== */}
        <div className="col-span-2 lg:col-span-6">
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-green-500/10 shadow-inner">
            <h6 className="text-white text-xl font-semibold mb-4">
              Newsletter
            </h6>
            <p className="text-gray-300 text-sm mb-6">
              Signup and receive the latest tips 💥
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <label htmlFor="email" className="text-gray-200 text-sm">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full h-12 rounded-xl bg-slate-700/50 border border-slate-500/30 text-white px-4 pr-36 focus:outline-none focus:ring-2 focus:ring-green-600/50 transition"
                  required
                />
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="absolute right-2 top-1.5 h-9 px-5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 transition shadow-md"
                >
                  Subscribe
                </button>
              </div>
            </form>

            {/* ===== SOCIAL ===== */}
            <div className="mt-8">
              <h6 className="text-white text-base mb-3 font-semibold">
                Follow Us
              </h6>
              <div className="flex items-center gap-3">
                {[TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter, TiSocialYoutube].map(
                  (Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="p-2 rounded-lg bg-slate-700/40 hover:bg-gradient-to-r from-green-600 to-teal-600 transition text-white text-2xl"
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR ===== */}
      <div className="border-t border-green-500/20 py-5">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 text-gray-400 text-sm text-center gap-3">
          <p>
            © <span className="text-green-400">ECROP 100</span> — Designed &
            Created by{" "}
            <span className="text-transparent bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text font-semibold">
              @E100
            </span>
          </p>
          <p>Terms, Conditions & Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



/* v 1
import React, { FC } from "react";
import { useForm } from "@formspree/react";
import {
	TiSocialFacebook,
	TiSocialLinkedin,
	TiSocialTwitter,
	TiSocialYoutube
} from "react-icons/ti";


const Footer: FC = () => {
	const [state, handleSubmit] = useForm("xvgwyqqz");
	
	if (state.succeeded) {
		return (
			<h1 className="md:text-5xl/tight my-4 max-w-lg text-4xl font-medium text-white">
			  Terimakasih sudah mengirim pesan🥳😎
			</h1>
		);
	}
	
	const menuOne = [
		"Support Center",
		"Customer Support",
		"About US",
		"Project",
		"Return Policy"
	];
	
	const menuTwo = [
		"Press inquires",
		"Social Media Support",
		"Image & B-ROL",
		"Site Map"
	];
	
	return (
		<footer className="bg-slate-900/40 border-t border-green-500/20 backdrop-blur-3xl">
		  <div className="container py-20 lg:px-20">
			  <div className="grid grid-cols-2 gap-10 lg:grid-cols-12 lg:gap-16">
				  
					<div className="col-span-2 sm:col-span-1 lg:col-span-3">
					  <ul className="flex flex-col gap-3">
						  <h5 className="text-gray-200 font-medium mb-2 lg:text-lg xl:text-lg">
							  About US
							</h5>
							
							{menuOne.map((item, index) => (
								<li key={index}>
								  <a href="#" className="text-gray-300 text-base transition-all hover:text-white">
									  <i data-lucide="gauge-circle" className="me-2 inline-block h-4 w-4">
										</i>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>
					
					<div className="col-span-2 sm:col-span-1 lg:col-span-3">
					  <div className="flex flex-col gap-3">
						  <h5 className="text-gray-200 font-medium mb-2 lg:text-lg xl:text-xl">My Account</h5>
							
							{menuTwo.map((item, index) => (
								<li key={index}>
								  <a href="#" className="text-gray-300 text-base transition-all hover:text-white">
									  <i data-lucide="gauge-circle" className="me-2 inline-block h-4 w-4">
										</i>
										{item}
									</a>
								</li>
							))}
						</div>
					</div>
					
					<div className="col-span-2 lg:col-span-6">
					  <div className="bg-slate-900/50 rounded-xl">
						  
							<div className="p-10">
							  <h6 className="text-white mb-4 text-xl">New Letter</h6>
								<p className="text-gray-200 text-base font-medium mb-6">
								  Singup and recevied the latest tips💥
								</p>
								
								<form onSubmit={handleSubmit} className="mb-6 space-y-2">
								  <label htmlFor="email" className="text-base text-white">Email</label>
									
									<div className="relative">
									  <input 
										  className="bg-slate-500/30 border-slate-500/30 text-white pe-40 ps-4 h-12 w-full rounded-lg py-4 backdrop-blur-3xl focus:ring-0 focus:border-white"
											type="email"
											id="email"
											name="email"
										/>
										
										<button
										  type="submit"
											disabled={state.submitting}
											className="bg-gradient-to-r from-red-500 to-pink-600 text-white end-[6px] absolute top-[6px] inline-flex transition-all h-9 items-center justify-center gap-2 px-6 rounded-md"
										>
										  Subscribe
										</button>
									</div>
								</form>
								
								<div>
								  <h6 className="mb-4 text-white text-base">Follow US</h6>
									<ul className="flex flex-wrap items-center gap-1 text-gray-300">
									  {
											[
											  <TiSocialFacebook/>,
											  <TiSocialLinkedin/>,
											  <TiSocialTwitter/>,
											  <TiSocialYoutube/>
										  ].map((social,index) => (
												<li key={index}>
												  <a href="#" className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent transition-all duration-500 group inline-flex h-10 w-10 items-center justify-center rounded-lg">
													  <i data-lucide="facebook" className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
														  {social}
														</i>
													</a>
												</li>
											))
									  }
									</ul>
								</div>
							</div>
							
						</div>
					</div>
					
				</div>
			</div>
			
			<div className="border-t py-6 border-green-500/20">
			  <div className="md:text-start container flex flex-wrap h-full items-center justify-center gap-4 text-center md:justify-between lg:px-20">
				  <p className="text-gray-400 text-base font-medium">
					  @ ECROP 100 - 
						<a href="#" >
						  Design & Created {" "}
							<i data-lucide="heart" className="inline h-4 w-4 fill-red-500 text-red-500">
							  by @E100
							</i>
						</a>
					</p>
					
					<p className="text-gray-400 text-base font-medium">
					  Terms Conditions & Policy
					</p>
				</div>
			</div>
		</footer>
	);
	
};

export default Footer;
*/