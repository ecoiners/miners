
import { useForm } from "@formspree/react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Footer() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_KEY!);

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
          <Card className="bg-slate-800/50 rounded-2xl border border-green-500/10 shadow-inner">
            <CardContent className="p-8">
              <h6 className="text-white text-xl font-semibold mb-4">
                Newsletter
              </h6>
              <p className="text-gray-300 text-sm mb-6">
                Signup and receive the latest tips 💥
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Label htmlFor="email" className="text-gray-200 text-sm">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full h-12 rounded-xl bg-slate-700/50 border border-slate-500/30 text-white px-4 pr-36 focus:outline-none focus:ring-2 focus:ring-green-600/50 transition"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={state.submitting}
                    className="absolute right-2 top-1.5 h-9 px-5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 transition shadow-md"
                  >
                    Subscribe
                  </Button>
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
            </CardContent>
          </Card>
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