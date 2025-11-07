// ResetPasswordPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Mail,
  Lock,
  Shield,
  Globe
} from 'lucide-react';

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (step === 1) {
      // Send OTP logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(2);
    } else if (step === 2) {
      // Verify OTP and reset password
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(3);
    }
    
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
              {step === 1 ? 'Reset Password' : step === 2 ? 'Enter Verification Code' : 'Password Updated'}
            </h1>
            <p className="text-gray-300">
              {step === 1 && 'Enter your email to receive a reset code'}
              {step === 2 && 'Enter the 6-digit code sent to your email'}
              {step === 3 && 'Your password has been successfully updated'}
            </p>
          </div>

          {step < 3 && (
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
              <div className="card-body p-8">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Email Input */}
                  {step === 1 && (
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
                          placeholder="Enter your email"
                          className="input input-bordered w-full pl-12 bg-gray-700 border-gray-600 text-white"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: OTP and New Password */}
                  {step === 2 && (
                    <div className="space-y-6">
                      {/* OTP Input */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-gray-300">Verification Code</span>
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
                      </div>

                      {/* New Password */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-gray-300">New Password</span>
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className="input input-bordered w-full pl-12 pr-12 bg-gray-700 border-gray-600 text-white"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                          >
                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-gray-300">Confirm New Password</span>
                        </label>
                        <div className="relative">
                          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            className="input input-bordered w-full pl-12 pr-12 bg-gray-700 border-gray-600 text-white"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                          <div className="text-red-400 text-sm mt-2">Passwords do not match</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || (step === 2 && formData.newPassword !== formData.confirmPassword)}
                    className="btn btn-primary btn-lg w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white disabled:bg-gray-600"
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        {step === 1 ? 'Sending Code...' : 'Updating Password...'}
                      </>
                    ) : (
                      <>
                        {step === 1 ? 'Send Reset Code' : 'Reset Password'}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Back to Login */}
                <div className="text-center mt-6">
                  <Link to="/login" className="text-purple-400 hover:underline font-semibold">
                    ← Back to Login
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Success Step */}
          {step === 3 && (
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-green-500/20 shadow-2xl">
              <div className="card-body p-8 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Password Updated!</h3>
                <p className="text-gray-300 mb-6">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
                <Link 
                  to="/login" 
                  className="btn btn-primary btn-lg w-full bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white"
                >
                  Continue to Login
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4" />
              <span>Protected by advanced security measures</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}