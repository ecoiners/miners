import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp, 
  Star,
  Rocket,
  Code,
  Cpu,
  Lock,
  BarChart3,
  Wallet,
  MessageCircle
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Rocket className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300">ECROP 100 Protocol Live</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                  The Future of
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400">
                  Decentralized AI
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                ECROP 100 is revolutionizing the blockchain ecosystem with advanced AI integration, 
                scalable solutions, and community-driven innovation. Join the next generation of 
                decentralized technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/dashboard" 
                  className="btn btn-primary btn-lg bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white hover:from-purple-600 hover:to-pink-600"
                >
                  Launch Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/whitepaper" 
                  className="btn btn-outline btn-lg border-purple-400 text-purple-400 hover:bg-purple-400 hover:border-purple-400 hover:text-gray-900"
                >
                  Read Whitepaper
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="stat-value text-2xl text-purple-400">100M+</div>
                  <div className="stat-desc text-gray-400">Transactions</div>
                </div>
                <div className="text-center">
                  <div className="stat-value text-2xl text-pink-400">50K+</div>
                  <div className="stat-desc text-gray-400">Users</div>
                </div>
                <div className="text-center">
                  <div className="stat-value text-2xl text-purple-400">$10M+</div>
                  <div className="stat-desc text-gray-400">Volume</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="card bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
                <div className="card-body p-8">
                  <div className="aspect-square relative rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-8">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20 rounded-2xl"></div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Globe className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">ECROP 100</h3>
                        <p className="text-gray-300">Next Generation Blockchain Protocol</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the cutting-edge technologies that make ECROP 100 the most advanced 
              blockchain ecosystem in the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="card-body p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title text-2xl text-white mb-4">ECROP AI</h3>
                <p className="text-gray-300 mb-6">
                  Advanced artificial intelligence integrated directly into the blockchain 
                  for smart contract optimization and predictive analytics.
                </p>
                <div className="card-actions">
                  <Link to="/ai" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="card-body p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title text-2xl text-white mb-4">ECROP VM</h3>
                <p className="text-gray-300 mb-6">
                  High-performance virtual machine enabling lightning-fast transaction 
                  processing and smart contract execution.
                </p>
                <div className="card-actions">
                  <Link to="/vm" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="card-body p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title text-2xl text-white mb-4">Framework 100</h3>
                <p className="text-gray-300 mb-6">
                  Comprehensive development framework with built-in tools and libraries 
                  for building decentralized applications with ease.
                </p>
                <div className="card-actions">
                  <Link to="/framework" className="text-pink-400 hover:text-pink-300 flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="card-body p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title text-2xl text-white mb-4">Advanced Security</h3>
                <p className="text-gray-300 mb-6">
                  Multi-layered security protocol with quantum-resistant encryption and 
                  real-time threat detection systems.
                </p>
                <div className="card-actions">
                  <Link to="/security" className="text-green-400 hover:text-green-300 flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Feature 5 */}
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="card-body p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title text-2xl text-white mb-4">High Performance</h3>
                <p className="text-gray-300 mb-6">
                  Achieve up to 100,000 transactions per second with our optimized 
                  consensus algorithm and network architecture.
                </p>
                <div className="card-actions">
                  <Link to="/performance" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Feature 6 */}
            <div className="card bg-gray-800/50 backdrop-blur-lg border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="card-body p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="card-title text-2xl text-white mb-4">Community Driven</h3>
                <p className="text-gray-300 mb-6">
                  Governance model that gives power to the community with transparent 
                  voting and proposal systems.
                </p>
                <div className="card-actions">
                  <Link to="/community" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Buy Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="card bg-gray-800/50 backdrop-blur-lg border border-purple-500/20 shadow-2xl">
                <div className="card-body p-8">
                  <h2 className="card-title text-4xl text-white mb-6">
                    How to Buy <span className="text-purple-400">ECR</span> Tokens
                  </h2>
                  <p className="text-gray-300 text-lg mb-8">
                    Get started with ECROP 100 in just a few simple steps. Join the revolution 
                    and become part of the future of decentralized AI.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        1
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Create Wallet</h4>
                        <p className="text-gray-300">
                          Download and set up the ECROP Wallet or connect your existing Web3 wallet.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        2
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Get Funds</h4>
                        <p className="text-gray-300">
                          Purchase ETH or BNB and transfer to your wallet to swap for ECR tokens.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        3
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Swap Tokens</h4>
                        <p className="text-gray-300">
                          Use our decentralized exchange to swap your assets for ECR tokens instantly.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        4
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Start Earning</h4>
                        <p className="text-gray-300">
                          Stake your tokens, participate in governance, and enjoy ecosystem rewards.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-actions justify-start mt-8">
                    <Link 
                      to="/buy" 
                      className="btn btn-primary bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white hover:from-purple-600 hover:to-pink-600"
                    >
                      Start Buying Now
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="stats stats-vertical lg:stats-horizontal shadow-2xl bg-gray-800/50 backdrop-blur-lg border border-purple-500/20">
                <div className="stat">
                  <div className="stat-figure text-purple-400">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <div className="stat-title text-gray-300">Current Price</div>
                  <div className="stat-value text-purple-400">$0.15</div>
                  <div className="stat-desc text-green-400">↑ 12.5% today</div>
                </div>
                
                <div className="stat">
                  <div className="stat-figure text-pink-400">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <div className="stat-title text-gray-300">Market Cap</div>
                  <div className="stat-value text-pink-400">$15M</div>
                  <div className="stat-desc text-gray-400">Fully diluted</div>
                </div>
                
                <div className="stat">
                  <div className="stat-figure text-blue-400">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="stat-title text-gray-300">Holders</div>
                  <div className="stat-value text-blue-400">12.5K</div>
                  <div className="stat-desc text-gray-400">+1.2K this month</div>
                </div>
              </div>
              
              <div className="card bg-gray-800/50 backdrop-blur-lg border border-green-500/20 mt-8">
                <div className="card-body">
                  <h3 className="card-title text-white flex items-center gap-2">
                    <Wallet className="w-6 h-6 text-green-400" />
                    Presale Live!
                  </h3>
                  <p className="text-gray-300">
                    Join the ECROP 100 presale and get exclusive bonuses and early access to features.
                  </p>
                  <div className="card-actions justify-end">
                    <Link to="/presale" className="btn btn-success btn-sm">
                      Join Presale
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your journey with ECROP 100 today and be part of the future of 
            decentralized artificial intelligence and blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="btn btn-primary btn-lg bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white hover:from-purple-600 hover:to-pink-600"
            >
              Create Account
              <Rocket className="w-5 h-5" />
            </Link>
            <Link 
              to="/community" 
              className="btn btn-outline btn-lg border-purple-400 text-purple-400 hover:bg-purple-400 hover:border-purple-400 hover:text-gray-900"
            >
              <MessageCircle className="w-5 h-5" />
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-gray-900 text-gray-400 border-t border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ECROP 100</span>
            </div>
            <p className="max-w-xs">
              The next generation blockchain ecosystem with integrated AI capabilities 
              and community-driven innovation.
            </p>
          </div>
          
          <div>
            <h3 className="footer-title text-white">Ecosystem</h3>
            <Link to="/ai" className="link link-hover">ECROP AI</Link>
            <Link to="/vm" className="link link-hover">ECROP VM</Link>
            <Link to="/framework" className="link link-hover">Framework 100</Link>
            <Link to="/wallet" className="link link-hover">ECROP Wallet</Link>
          </div>
          
          <div>
            <h3 className="footer-title text-white">Resources</h3>
            <Link to="/whitepaper" className="link link-hover">Whitepaper</Link>
            <Link to="/documentation" className="link link-hover">Documentation</Link>
            <Link to="/explorer" className="link link-hover">Block Explorer</Link>
            <Link to="/dashboard" className="link link-hover">Dashboard</Link>
          </div>
          
          <div>
            <h3 className="footer-title text-white">Community</h3>
            <Link to="/telegram" className="link link-hover">Telegram</Link>
            <Link to="/twitter" className="link link-hover">Twitter</Link>
            <Link to="/discord" className="link link-hover">Discord</Link>
            <Link to="/github" className="link link-hover">GitHub</Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 w-full">
          <p>© 2024 ECROP 100 Protocol. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}