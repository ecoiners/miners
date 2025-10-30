import React, { FC, Dispatch, SetStateAction } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { AiOutlineClose } from "react-icons/ai";
import { notify } from "../../utils/notifications";
import Branding from "../../components/Branding";

interface ContactProps {
  setOpenContact: Dispatch<SetStateAction<boolean>>;
}

const ContactViewVersi2: FC<ContactProps> = ({ setOpenContact }) => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_KEY || "");

  if (state.succeeded) {
    notify({ type: "success", message: "Terima kasih sudah mengirim pesan ❤️" });
    setTimeout(() => setOpenContact(false), 1500);
  }

  return (
    <section className="flex w-full min-h-screen items-center justify-center py-8 px-4 bg-transparent overflow-y-auto">
      <div className="container bg-slate-800/60 backdrop-blur-2xl border border-slate-700/40 shadow-2xl rounded-2xl mx-auto max-w-5xl overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* === LEFT SIDE: Branding === */}
          <Branding
            image="/assets/branding.png"
            title="Hubungi Kami ✉️"
            message="Kirimkan saran, pertanyaan, atau masukan Anda langsung kepada tim ECROP 100."
          />

          {/* === RIGHT SIDE: Form === */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center p-8 lg:p-10 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Form Kontak</h3>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Alamat email Anda"
              required
              className="mb-4 rounded-lg bg-transparent border border-gray-600 text-white px-3 py-2 focus:border-green-400 focus:ring-0 outline-none"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />

            <textarea
              id="message"
              name="message"
              placeholder="Tulis pesan Anda di sini..."
              required
              rows={5}
              className="mb-4 rounded-lg bg-transparent border border-gray-600 text-white px-3 py-2 focus:border-green-400 focus:ring-0 outline-none resize-none"
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 rounded-lg transition-all duration-500"
            >
              {state.submitting ? "Mengirim..." : "Kirim Pesan"}
            </button>

            {/* Tombol Tutup */}
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setOpenContact(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition"
              >
                <AiOutlineClose className="text-white text-xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactView;