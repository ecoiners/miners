import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Wallet,
  CreditCard,
  Coins,
  Shield,
  Zap,
  TrendingUp,
  ArrowUpRight,
  Copy,
  ExternalLink
} from 'lucide-react';

export default function BuyPage() {
  const [activeTab, setActiveTab] = useState('card');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('usdt');
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'usdt', name: 'USDT (ERC20)', icon: '💵', fee: '0.1%' },
    { id: 'usdc', name: 'USDC', icon: '💵', fee: '0.1%' },
    { id: 'eth', name: 'Ethereum', icon: '⎊', fee: '0.2%' },
    { id: 'bnb', name: 'BNB', icon: '⎊', fee: '0.15%' },
    { id: 'matic', name: 'Polygon', icon: '🔷', fee: '0.1%' },
  ];

  const cardNetworks = [
    { id: 'visa', name: 'Visa', icon: '💳' },
    { id: 'mastercard', name: 'Mastercard', icon: '💳' },
    { id: 'amex', name: 'American Express', icon: '💳' },
  ];

  const calculateECR = (amount) => {
    const price = 0.15; // $0.15 per ECR
    return amount ? (amount / price).toFixed(2) : '0';
  };

  const handleBuy = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStep(3);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Buy ECR Tokens
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Purchase ECR tokens instantly with multiple payment methods. 
            Join the ECROP 100 ecosystem today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Purchase Form */}
          <div className="lg:col-span-2">
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
              <div className="card-body p-8">
                {/* Progress Steps */}
                <div className="steps steps-horizontal w-full mb-8">
                  <div className={`step ${step >= 1 ? 'step-primary' : ''}`}>
                    <div className="step-circle">
                      {step > 1 ? <CheckCircle className="w-5 h-5" /> : 1}
                    </div>
                    <div className="step-content">
                      <div className="step-title">Payment Method</div>
                      <div className="step-description">Choose how to pay</div>
                    </div>
                  </div>
                  <div className={`step ${step >= 2 ? 'step-primary' : ''}`}>
                    <div className="step-circle">
                      {step > 2 ? <CheckCircle className="w-5 h-5" /> : 2}
                    </div>
                    <div className="step-content">
                      <div className="step-title">Review</div>
                      <div className="step-description">Confirm details</div>
                    </div>
                  </div>
                  <div className={`step ${step >= 3 ? 'step-primary' : ''}`}>
                    <div className="step-circle">3</div>
                    <div className="step-content">
                      <div className="step-title">Complete</div>
                      <div className="step-description">Receive tokens</div>
                    </div>
                  </div>
                </div>

                {/* Payment Method Tabs */}
                <div className="tabs tabs-boxed bg-gray-700/50 p-1 mb-6">
                  <button 
                    className={`tab tab-lg flex-1 ${activeTab === 'card' ? 'tab-active bg-purple-500' : ''}`}
                    onClick={() => setActiveTab('card')}
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Credit/Debit Card
                  </button>
                  <button 
                    className={`tab tab-lg flex-1 ${activeTab === 'crypto' ? 'tab-active bg-purple-500' : ''}`}
                    onClick={() => setActiveTab('crypto')}
                  >
                    <Coins className="w-5 h-5 mr-2" />
                    Cryptocurrency
                  </button>
                </div>

                {step === 1 && (
                  <>
                    {/* Card Payment */}
                    {activeTab === 'card' && (
                      <div className="space-y-6">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-gray-300">Card Network</span>
                          </label>
                          <div className="grid grid-cols-3 gap-4">
                            {cardNetworks.map(network => (
                              <button
                                key={network.id}
                                className="btn btn-outline border-gray-600 hover:border-purple-500 hover:bg-purple-500/10"
                              >
                                <span className="text-2xl mr-2">{network.icon}</span>
                                {network.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-gray-300">Card Number</span>
                            </label>
                            <input 
                              type="text" 
                              placeholder="1234 5678 9012 3456" 
                              className="input input-bordered bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-gray-300">Expiry Date</span>
                            </label>
                            <input 
                              type="text" 
                              placeholder="MM/YY" 
                              className="input input-bordered bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-gray-300">CVV</span>
                            </label>
                            <input 
                              type="text" 
                              placeholder="123" 
                              className="input input-bordered bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text text-gray-300">Country</span>
                            </label>
                            <select className="select select-bordered bg-gray-700 border-gray-600 text-white">
                              <option>United States</option>
                              <option>United Kingdom</option>
                              <option>Canada</option>
                              <option>Australia</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Crypto Payment */}
                    {activeTab === 'crypto' && (
                      <div className="space-y-6">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-gray-300">Select Payment Method</span>
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {paymentMethods.map(method => (
                              <button
                                key={method.id}
                                onClick={() => setPaymentMethod(method.id)}
                                className={`btn justify-start h-auto py-4 ${
                                  paymentMethod === method.id 
                                    ? 'btn-primary bg-purple-500 border-purple-500' 
                                    : 'btn-outline border-gray-600 hover:border-purple-500'
                                }`}
                              >
                                <span className="text-2xl mr-3">{method.icon}</span>
                                <div className="text-left">
                                  <div className="font-semibold">{method.name}</div>
                                  <div className="text-sm opacity-70">Fee: {method.fee}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Wallet Address Display */}
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text text-gray-300">Send to Wallet Address</span>
                          </label>
                          <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <code className="text-sm text-gray-300 font-mono">
                                0x742d35Cc6634C0532925a3b8Df5A4f7a6C6E5A8F
                              </code>
                              <button className="btn btn-ghost btn-sm">
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-xs text-gray-400 mt-2">
                              Send exact amount of {paymentMethod.toUpperCase()} to this address
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Amount Input */}
                    <div className="form-control mt-6">
                      <label className="label">
                        <span className="label-text text-gray-300">Amount to Spend</span>
                      </label>
                      <div className="join w-full">
                        <input 
                          type="number" 
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className="input input-bordered join-item flex-1 bg-gray-700 border-gray-600 text-white text-lg"
                        />
                        <select className="select select-bordered join-item bg-gray-700 border-gray-600 text-white">
                          <option>USD</option>
                          <option>EUR</option>
                          <option>GBP</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      onClick={() => setStep(2)}
                      disabled={!amount}
                      className="btn btn-primary btn-lg w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white"
                    >
                      Continue to Review
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="bg-gray-700/50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Order Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Payment Method:</span>
                          <span className="text-white font-medium">
                            {activeTab === 'card' ? 'Credit Card' : paymentMethods.find(m => m.id === paymentMethod)?.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Amount:</span>
                          <span className="text-white font-medium">${amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">ECR Price:</span>
                          <span className="text-white font-medium">$0.15</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Network Fee:</span>
                          <span className="text-white font-medium">
                            {paymentMethods.find(m => m.id === paymentMethod)?.fee}
                          </span>
                        </div>
                        <div className="border-t border-gray-600 pt-3">
                          <div className="flex justify-between text-lg">
                            <span className="text-gray-300">You Receive:</span>
                            <span className="text-purple-400 font-bold">
                              {calculateECR(amount)} ECR
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="form-control">
                      <label className="label cursor-pointer justify-start">
                        <input type="checkbox" className="checkbox checkbox-primary mr-3" />
                        <span className="label-text text-gray-300">
                          I agree to the <a href="#" className="text-purple-400 hover:underline">Terms of Service</a> and 
                          <a href="#" className="text-purple-400 hover:underline"> Privacy Policy</a>
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setStep(1)}
                        className="btn btn-outline btn-lg flex-1 border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-400"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handleBuy}
                        disabled={isProcessing}
                        className="btn btn-primary btn-lg flex-1 bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white"
                      >
                        {isProcessing ? (
                          <>
                            <span className="loading loading-spinner"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            Confirm Purchase
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Purchase Successful!</h3>
                    <p className="text-gray-300 mb-2">
                      You have successfully purchased <strong>{calculateECR(amount)} ECR</strong>
                    </p>
                    <p className="text-gray-400 text-sm mb-6">
                      Tokens will be deposited to your wallet within 5-10 minutes
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Link to="/dashboard" className="btn btn-primary">
                        Go to Dashboard
                      </Link>
                      <Link to="/wallet" className="btn btn-outline border-gray-600 text-gray-300">
                        View Wallet
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Info & Stats */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-purple-500/20">
              <div className="card-body">
                <h3 className="card-title text-white">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  E100 Price
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Current Price:</span>
                    <span className="text-purple-400 font-bold">$0.15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">24h Change:</span>
                    <span className="text-green-400">+12.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Market Cap:</span>
                    <span className="text-gray-300">$15M</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-green-500/20">
              <div className="card-body">
                <h3 className="card-title text-white">
                  <Zap className="w-6 h-6 text-green-400" />
                  Why Buy E100?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300">Staking Rewards</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300">Governance Voting</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300">Fee Discounts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300">Early Access</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Security Card */}
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-blue-500/20">
              <div className="card-body">
                <h3 className="card-title text-white">
                  <Shield className="w-6 h-6 text-blue-400" />
                  Secure Payment
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Bank-Level Security</div>
                      <div className="text-sm text-gray-400">SSL Encrypted</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Instant Delivery</div>
                      <div className="text-sm text-gray-400">5-10 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Multi-Currency</div>
                      <div className="text-sm text-gray-400">10+ options</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-yellow-500/20">
              <div className="card-body">
                <h3 className="card-title text-white">Need Help?</h3>
                <p className="text-gray-300 mb-4">
                  Our support team is here to help you with your purchase.
                </p>
                <div className="space-y-2">
                  <button className="btn btn-outline btn-sm w-full justify-start border-gray-600 text-gray-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Contact Support
                  </button>
                  <button className="btn btn-outline btn-sm w-full justify-start border-gray-600 text-gray-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    FAQ & Guides
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}