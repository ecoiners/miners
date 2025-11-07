// VerifyEmailPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail,
  Clock,
  Globe
} from 'lucide-react';

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split('').concat(Array(6 - pasteData.length).fill(''));
      setOtp(newOtp);
      inputRefs.current[Math.min(pasteData.length, 5)].focus();
    }
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    // Resend OTP logic here
  };

  const handleVerify = () => {
    // Verify OTP logic here
    window.location.href = '/dashboard';
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">ECROP 100</span>
            </Link>
            <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-10 h-10 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
            <p className="text-gray-300">
              We've sent a 6-digit code to <span className="text-purple-400">user@example.com</span>
            </p>
          </div>

          {/* OTP Form */}
          <div className="card bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
            <div className="card-body p-8">
              {/* OTP Inputs */}
              <div className="flex justify-center gap-3 mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="input input-bordered w-14 h-14 text-center text-xl font-bold bg-gray-700 border-gray-600 text-white focus:border-purple-500"
                  />
                ))}
              </div>

              {/* Timer */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Code expires in {timer}s</span>
                </div>
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={!isOtpComplete}
                className="btn btn-primary btn-lg w-full bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white disabled:bg-gray-600"
              >
                Verify Email
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Resend Code */}
              <div className="text-center mt-6">
                <p className="text-gray-400">
                  Didn't receive the code?{' '}
                  {canResend ? (
                    <button onClick={handleResend} className="text-purple-400 hover:underline font-semibold">
                      Resend Code
                    </button>
                  ) : (
                    <span className="text-gray-500">Resend code in {timer}s</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Having trouble? <a href="#" className="text-purple-400 hover:underline">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}