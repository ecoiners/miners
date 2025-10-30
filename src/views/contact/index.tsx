import React, { FC, Dispatch, SetStateAction } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMessage } from "react-icons/ai";
import { notify } from "../../utils/notifications";
import Branding from "../../components/Branding";

interface ContactProps {
  setOpenContact: Dispatch<SetStateAction<boolean>>;
}

const ContactView: FC<ContactProps> = ({ setOpenContact }) => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_KEY || "");

  if (state.succeeded) {
    notify({ type: "success", message: "Terima kasih sudah mengirim pesan ❤️" });
    setTimeout(() => setOpenContact(false), 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/20 py-4 md:py-8 px-4 flex items-center justify-center">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Branding - TAMPIL DI SEMUA DEVICE */}
            <div className="w-full lg:w-1/2">
              <Branding
                image="/assets/branding.png"
                title="Hubungi Kami"
                message="Punya pertanyaan atau masukan? Tim ECROP 100 siap membantu Anda dengan senang hati"
              />
            </div>

            {/* Form */}
            <div className="w-full lg:w-1/2 p-4 md:p-6 lg:p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">Kontak Kami</h2>
                  <p className="text-gray-400 text-xs md:text-sm">Kami akan membalas pesan Anda secepatnya</p>
                </div>
                <button
                  onClick={() => setOpenContact(false)}
                  className="p-2 hover:bg-slate-700/50 rounded-xl transition-all duration-200 group"
                >
                  <AiOutlineClose className="text-white text-xl group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-gray-300 font-medium mb-2 text-sm md:text-base">
                    Alamat Email *
                  </label>
                  <div className="relative">
                    <AiOutlineMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="email@contoh.com"
                      required
                      className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm md:text-base"
                    />
                  </div>
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-gray-300 font-medium mb-2 text-sm md:text-base">
                    Pesan Anda *
                  </label>
                  <div className="relative">
                    <AiOutlineMessage className="absolute left-4 top-4 text-gray-400 text-lg" />
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tulis pesan Anda di sini..."
                      required
                      rows={5}
                      className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm md:text-base"
                    />
                  </div>
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 md:py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 text-sm md:text-base"
                >
                  {state.submitting ? (
                    <>
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <AiOutlineMail className="text-lg" />
                      <span>Kirim Pesan</span>
                    </>
                  )}
                </button>

                {/* Additional Info */}
                <div className="bg-slate-700/30 rounded-xl p-3 md:p-4 border border-slate-600/50">
                  <h4 className="text-blue-400 font-semibold mb-2 flex items-center text-sm md:text-base">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Info Kontak
                  </h4>
                  <p className="text-gray-300 text-xs md:text-sm">
                    Biasanya kami membalas dalam 1-2 hari kerja. Untuk pertanyaan mendesak, 
                    silakan hubungi melalui channel resmi kami.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;