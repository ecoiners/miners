// ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail,
  Shield,
  Globe,
  CheckCircle
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (step === 1) {
      // Send reset email logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(2);
      setCountdown(30); // Start 30-second countdown
      startCountdown();
    } else if (step === 2) {
      // Verify and reset password
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(3);
    }
    
    setIsLoading(false);
  };

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCountdown(30);
    startCountdown();
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
              <Shield className="w-10 h-10 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {step === 1 ? 'Forgot Password' : step === 2 ? 'Reset Password' : 'Success!'}
            </h1>
            <p className="text-gray-300">
              {step === 1 && 'Enter your email to receive a password reset link'}
              {step === 2 && 'Enter the verification code and new password'}
              {step === 3 && 'Your password has been reset successfully'}
            </p>
          </div>

          {/* Step 1: Email Input */}
          {step === 1 && (
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
              <div className="card-body p-8">
                <form onSubmit={handleSubmit}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300">Email Address</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="input input-bordered w-full pl-12 bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-lg w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white"
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Sending Reset Link...
                      </>
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-6">
                  <Link to="/login" className="text-purple-400 hover:underline font-semibold">
                    ← Back to Login
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Reset Password */}
          {step === 2 && (
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
              <div className="card-body p-8">
                <form onSubmit={handleSubmit}>
                  {/* Verification Code */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-300">Verification Code</span>
                      {countdown > 0 ? (
                        <span className="label-text-alt text-gray-400">
                          Resend in {countdown}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendCode}
                          disabled={isLoading}
                          className="label-text-alt text-purple-400 hover:underline"
                        >
                          Resend Code
                        </button>
                      )}
                    </label>
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      placeholder="Enter 6-digit code"
                      className="input input-bordered w-full bg-gray-700 border-gray-600 text-white text-center text-lg font-mono"
                      required
                    />
                    <div className="text-xs text-gray-400 mt-2">
                      We sent a verification code to {formData.email || 'your email'}
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text text-gray-300">New Password</span>
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="input input-bordered w-full bg-gray-700 border-gray-600 text-white"
                      required
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text text-gray-300">Confirm New Password</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      className="input input-bordered w-full bg-gray-700 border-gray-600 text-white"
                      required
                    />
                    {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                      <div className="text-red-400 text-sm mt-2">Passwords do not match</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || formData.newPassword !== formData.confirmPassword}
                    className="btn btn-primary btn-lg w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white disabled:bg-gray-600"
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Resetting Password...
                      </>
                    ) : (
                      <>
                        Reset Password
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="text-purple-400 hover:underline font-semibold"
                  >
                    ← Use different email
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-green-500/20 shadow-2xl">
              <div className="card-body p-8 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Password Reset Successful!</h3>
                <p className="text-gray-300 mb-2">
                  Your password has been successfully reset.
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  You can now login with your new password.
                </p>
                
                <div className="space-y-3">
                  <Link 
                    to="/login" 
                    className="btn btn-primary btn-lg w-full bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white"
                  >
                    Continue to Login
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  
                  <Link 
                    to="/" 
                    className="btn btn-outline w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Security Information */}
          <div className="mt-8 space-y-4">
            <div className="alert alert-info bg-blue-500/10 border-blue-500/20">
              <Shield className="w-5 h-5 text-blue-400" />
              <div>
                <h4 className="font-semibold text-white">Security Notice</h4>
                <p className="text-sm text-gray-300">
                  For your security, the reset link will expire in 1 hour. 
                  If you didn't request this reset, please secure your account.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4" />
              <span>Protected by advanced encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}