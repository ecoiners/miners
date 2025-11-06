import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Input } from "../components/input";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Reset password email sent to:", email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending reset email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-base-100">
        <div className="card w-full max-w-md bg-base-200 shadow-2xl">
          <div className="card-body p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-success bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            
            <h2 className="card-title text-2xl font-bold justify-center text-success mb-2">
              Email Terkirim!
            </h2>
            
            <p className="text-base-content text-opacity-70 mb-2">
              Kami telah mengirim instruksi reset password ke:
            </p>
            
            <p className="font-semibold text-primary mb-6">{email}</p>
            
            <p className="text-sm text-base-content text-opacity-70 mb-6">
              Silakan periksa inbox email Anda dan ikuti petunjuk untuk mereset password Anda.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleBackToLogin}
                className="btn btn-primary w-full"
              >
                Kembali ke Login
              </button>
              
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn btn-ghost w-full"
              >
                Kirim Ulang Email
              </button>
            </div>

            <div className="divider text-base-content text-opacity-50">BUTUH BANTUAN?</div>

            <div className="text-center">
              <p className="text-sm text-base-content text-opacity-70">
                Tidak menerima email?{" "}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="link link-primary hover:link-hover font-semibold"
                >
                  Klik di sini
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-100">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl">
        <div className="card-body p-6 sm:p-8">
          <div className="text-center mb-2">
            <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="card-title text-2xl font-bold justify-center text-primary">
              Lupa Password
            </h2>
          </div>

          <p className="text-center text-base-content text-opacity-70 mb-6">
            Masukkan email Anda yang terdaftar. Kami akan mengirim instruksi untuk mereset password Anda.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              icon={Mail}
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="form-control">
              <button
                type="submit"
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={!email || isLoading}
              >
                {isLoading ? 'Mengirim...' : 'Kirim Instruksi Reset'}
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={handleBackToLogin}
              className="btn btn-ghost btn-sm gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Login
            </button>
          </div>

          <div className="divider text-base-content text-opacity-50">BUTUH BANTUAN?</div>

          <div className="text-center">
            <p className="text-sm text-base-content text-opacity-70">
              Masih mengalami masalah?{" "}
              <button className="link link-primary hover:link-hover font-semibold">
                Hubungi Support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;