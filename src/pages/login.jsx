import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link , useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";

import { Input } from "../components/input";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()
	
	const {login, error, isLoading} = useAuthStore()
	
	const handleLogin = async (event) => {
		event.preventDefault();
		
		try {
			await login(email, password);
			navigate("/")
		} catch (error) {
			console.error(error)
		}
	}
	
	return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl mb-6 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
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
					
					<div className="flex items-center mb-6">
					  <Link to="/forgot-password" className="text-sm text-green-400 hover:underline">
						  Lupa password
						</Link>
					</div>
					
					{error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
					
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
					  {isLoading ? <Loader className="animate-spin mx-auto" size={24}/> : "Login"}
          </motion.button>
        </form>
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Belum punya akun?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
