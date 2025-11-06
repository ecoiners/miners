import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Input, PasswordInput } from "../components/input";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Simulasi proses login
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log({ email, password });
      // Tambahkan logika login di sini
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-100">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl">
        <div className="card-body p-6 sm:p-8">
          <h2 className="card-title text-3xl font-bold text-center mb-2 justify-center text-primary">
            Welcome Back
          </h2>
          
          <p className="text-center text-base-content text-opacity-70 mb-6">
            Masuk ke akun Anda untuk melanjutkan
          </p>

          <form onSubmit={handleLogin}>
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
            
            <div className="flex justify-end mb-4">
              <Link 
                to="/forgot-password" 
                className="text-sm link link-primary hover:link-hover"
              >
                Lupa password?
              </Link>
            </div>
            
            <div className="form-control">
              <button 
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Masuk...' : 'Login'}
              </button>
            </div>
          </form>

          <div className="divider text-base-content text-opacity-50">ATAU</div>

          <div className="text-center">
            <p className="text-sm text-base-content text-opacity-70">
              Belum punya akun?{" "}
              <Link 
                to="/register" 
                className="link link-primary hover:link-hover font-semibold"
              >
                Daftar di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;