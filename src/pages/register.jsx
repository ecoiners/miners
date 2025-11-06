import { useState } from "react";
import { User, Mail, Lock, Gift, Check, X, Eye, EyeOff } from "lucide-react"; 
import { Link } from "react-router-dom";
import { Input, PasswordStrengthMeter, PasswordInput } from "../components/input";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulasi proses register
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log({ username, email, password, referralCode });
      // Tambahkan logika register di sini
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-100">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl">
        <div className="card-body p-6 sm:p-8">
          <h2 className="card-title text-3xl font-bold text-center mb-2 justify-center text-primary">
            Buat Akun
          </h2>
          
          <p className="text-center text-base-content text-opacity-70 mb-6">
            Daftar untuk mulai menggunakan layanan kami
          </p>

          <form onSubmit={handleRegister}>
            <Input
              icon={User}
              type="text"
              placeholder="Masukkan nama pengguna"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <Input
              icon={Mail}
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <PasswordInput
              icon={Lock}
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              icon={Gift}
              type="text"
              placeholder="Masukkan kode referral (opsional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />

            {/* Indikator kekuatan password */}
            <PasswordStrengthMeter password={password} />

            <div className="form-control mt-6">
              <button 
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Mendaftarkan...' : 'Daftar'}
              </button>
            </div>
          </form>

          <div className="divider text-base-content text-opacity-50">ATAU</div>

          <div className="text-center">
            <p className="text-sm text-base-content text-opacity-70">
              Sudah punya akun?{" "}
              <Link to="/login" className="link link-primary hover:link-hover font-semibold">
                Login di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;