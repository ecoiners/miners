import { motion } from "framer-motion";
import { useState, useNavigate} from "react";
import { User, Mail, Lock, Gift, Loader} from "lucide-react"; 
import { Link } from "react-router-dom";
import { Input, PasswordStrengthMeter } from "../components/input";
import { useAuthStore } from "../store/auth-store";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
	const navigate = useNavigate();
	
	const { register, error, isLoading } = useAuthStore();

  const handleRegister = async (event) => {
    event.preventDefault();
    
		try {
			await register(username, email, password, referralCode);
			
			navigate("/verify-email");
		} catch (error) {
			console.error(error);
		}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl mb-6 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
          Buat Akun
        </h2>

        <form onSubmit={handleRegister}>
          <Input
            icon={User}
            type="text"
            placeholder="Masukkan nama pengguna"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            icon={Gift}
            type="text"
            placeholder="Masukkan kode referral (opsional)"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
					
					{error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

          {/* Indikator kekuatan password */}
          <PasswordStrengthMeter password={password} />

          <motion.button
            className="mt-5 py-3 px-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                       font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                       focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
						disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Register"}
          </motion.button>
        </form>
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Register;