import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, RotateCcw } from "lucide-react";

function EmailVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Hanya menerima angka

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus ke input berikutnya
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Auto submit jika semua field terisi
    if (newCode.every(digit => digit !== "") && index === 5) {
      handleSubmit(newCode.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newCode = pasteData.split("").concat(Array(6 - pasteData.length).fill(""));
      setCode(newCode);
      
      // Focus ke input terakhir yang terisi
      const lastFilledIndex = Math.min(pasteData.length, 5);
      inputRefs.current[lastFilledIndex].focus();
    }
  };

  const handleSubmit = async (verificationCode = code.join("")) => {
    if (verificationCode.length !== 6) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Verification code:", verificationCode);
      // Tambahkan logika verifikasi di sini
      navigate("/dashboard"); // Redirect setelah sukses
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Resending verification code...");
      // Tambahkan logika resend code di sini
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
    } catch (error) {
      console.error("Resend error:", error);
    } finally {
      setIsResending(false);
    }
  };

  const isCodeComplete = code.every(digit => digit !== "");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-100">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl">
        <div className="card-body p-6 sm:p-8">
          <div className="text-center mb-2">
            <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="card-title text-2xl font-bold justify-center text-primary">
              Verifikasi Email
            </h2>
          </div>

          <p className="text-center text-base-content text-opacity-70 mb-6">
            Masukkan kode verifikasi 6 digit yang telah kami kirim ke email kamu
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-6"
          >
            <div className="flex justify-between gap-2 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="input input-bordered w-12 h-14 text-center text-xl font-bold bg-base-100 border-2 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <div className="form-control">
              <button
                type="submit"
                className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={!isCodeComplete || isLoading}
              >
                {isLoading ? 'Memverifikasi...' : 'Verifikasi'}
              </button>
            </div>
          </form>

          <div className="text-center space-y-4">
            <p className="text-sm text-base-content text-opacity-70">
              Tidak menerima kode?
            </p>
            
            <button
              onClick={handleResendCode}
              className={`btn btn-ghost btn-sm ${isResending ? 'loading' : ''}`}
              disabled={isResending}
            >
              {!isResending && <RotateCcw className="w-4 h-4 mr-2" />}
              {isResending ? 'Mengirim...' : 'Kirim Ulang Kode'}
            </button>
          </div>

          <div className="divider text-base-content text-opacity-50">ATAU</div>

          <div className="text-center">
            <p className="text-sm text-base-content text-opacity-70">
              Masuk dengan akun lain?{" "}
              <button 
                onClick={() => navigate('/login')}
                className="link link-primary hover:link-hover font-semibold"
              >
                Kembali ke Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;