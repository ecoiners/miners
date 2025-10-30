import React, { FC, Dispatch, SetStateAction } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { notify } from "@/utils/notifications";
import Branding from "@/components/Branding";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  MessageSquare, 
  Loader2, 
  Info,
  Send
} from "lucide-react";

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
    <div className="flex flex-col lg:flex-row h-full">
      {/* Branding Section */}
      <div className="lg:w-2/5 bg-gradient-to-br from-blue-900/20 to-slate-800 p-6 lg:p-8">
        <Branding
          image="/assets/branding.png"
          title="Hubungi Kami"
          message="Punya pertanyaan atau masukan? Tim ECROP 100 siap membantu Anda dengan senang hati"
        />
      </div>

      {/* Form Section */}
      <div className="lg:w-3/5 p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-400" />
            Kontak Kami
          </h2>
          <p className="text-gray-400 mt-2">
            Kami akan membalas pesan Anda secepatnya melalui email
          </p>
        </div>

        <ScrollArea className="h-[60vh] lg:h-[65vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Alamat Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="email@contoh.com"
                  required
                  className="pl-10 pr-4 py-3 bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white font-medium">
                Pesan Anda *
              </Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                  rows={5}
                  className="pl-10 pr-4 py-3 bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3"
            >
              {state.submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Pesan
                </>
              )}
            </Button>

            {/* Additional Info */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-400 font-semibold text-sm mb-1">
                      Info Kontak
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Biasanya kami membalas dalam 1-2 hari kerja. Untuk pertanyaan mendesak, 
                      silakan hubungi melalui channel resmi kami di platform sosial media.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ContactView;