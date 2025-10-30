import React, { FC } from "react";
import { useForm } from "@formspree/react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Input 
} from "@/components/ui/input";
import { 
  Button 
} from "@/components/ui/button";
import { 
  Badge 
} from "@/components/ui/badge";
import { 
  Facebook, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Mail, 
  Send,
  Heart,
  Shield,
  FileText,
  Users,
  MessageCircle,
  MapPin
} from "lucide-react";

const Footer: FC = () => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_KEY || "");

  if (state.succeeded) {
    return (
      <div className="bg-slate-900/80 text-center py-20 md:py-32 border-t border-green-500/20">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
            Success!
          </Badge>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text mb-4">
            Terima kasih sudah mengirim pesan 🥳😎
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Kami akan menghubungi Anda segera melalui email dengan update terbaru.
          </p>
        </div>
      </div>
    );
  }

  const menuOne = [
    { name: "Support Center", icon: <MessageCircle className="h-4 w-4" /> },
    { name: "Customer Support", icon: <Users className="h-4 w-4" /> },
    { name: "About Us", icon: <Heart className="h-4 w-4" /> },
    { name: "Projects", icon: <MapPin className="h-4 w-4" /> },
    { name: "Return Policy", icon: <Shield className="h-4 w-4" /> },
  ];

  const menuTwo = [
    { name: "Press Inquiries", icon: <FileText className="h-4 w-4" /> },
    { name: "Social Media", icon: <Facebook className="h-4 w-4" /> },
    { name: "Media Kit", icon: <Send className="h-4 w-4" /> },
    { name: "Site Map", icon: <MapPin className="h-4 w-4" /> },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, name: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, name: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, name: "LinkedIn" },
    { icon: <Youtube className="h-5 w-5" />, name: "YouTube" },
  ];

  return (
    <footer className="bg-slate-900/60 backdrop-blur-lg border-t border-green-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
          
          {/* ===== ABOUT US ===== */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E100</span>
              </div>
              <h5 className="text-green-400 font-bold text-lg">About Us</h5>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Platform terdepan untuk pembuatan dan manajemen token Solana. 
              Membantu kreator dan developer membangun ekosistem blockchain yang lebih baik.
            </p>
            <ul className="space-y-3">
              {menuOne.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors text-sm font-medium group"
                  >
                    <span className="text-green-500 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== MY ACCOUNT ===== */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <h5 className="text-blue-400 font-bold text-lg">My Account</h5>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Kelola akun dan pengaturan Anda dengan mudah. Akses semua fitur 
              dan layanan yang tersedia untuk pengguna ECROP 100.
            </p>
            <ul className="space-y-3">
              {menuTwo.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium group"
                  >
                    <span className="text-blue-500 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== NEWSLETTER ===== */}
          <div className="lg:col-span-6">
            <Card className="bg-slate-800/50 border border-green-500/10 backdrop-blur-xl">
              <CardContent className="p-6 lg:p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-white text-xl lg:text-2xl font-bold flex items-center gap-2">
                    <Mail className="h-5 w-5 text-green-400" />
                    Stay Updated
                  </CardTitle>
                  <p className="text-gray-300 text-sm lg:text-base">
                    Dapatkan tips terbaru dan update fitur langsung ke inbox Anda 💥
                  </p>
                </CardHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-gray-200 text-sm font-medium">
                      Email Address
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500"
                        required
                      />
                      <Button
                        type="submit"
                        disabled={state.submitting}
                        className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-semibold px-6 py-2"
                      >
                        {state.submitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="h-4 w-4" />
                            Subscribe
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>

                {/* ===== SOCIAL LINKS ===== */}
                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <h6 className="text-white text-base font-semibold mb-4 flex items-center gap-2">
                    Follow Our Journey
                  </h6>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        className="w-10 h-10 bg-slate-700/40 border-slate-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600 hover:border-transparent text-white transition-all duration-300 hover:scale-110"
                        asChild
                      >
                        <a href="#" aria-label={social.name}>
                          {social.icon}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div className="border-t border-green-500/20 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-center">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© {new Date().getFullYear()}</span>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                ECROP 100
              </Badge>
              <span>— Designed & Created with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>by</span>
              <span className="text-transparent bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text font-semibold">
                @E100 Team
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
