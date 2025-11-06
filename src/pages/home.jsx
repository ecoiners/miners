import { Link } from "react-router-dom";
import { 
  Coins, 
  Gift, 
  TrendingUp, 
  Users, 
  Shield, 
  Clock,
  Star,
  ArrowRight,
  Zap
} from "lucide-react";

function Home() {
  const features = [
    {
      icon: <Coins className="w-8 h-8" />,
      title: "Dapatkan Crypto",
      description: "Selesaikan tugas dan dapatkan berbagai cryptocurrency",
      color: "text-yellow-400"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Airdrop Eksklusif",
      description: "Akses awal ke airdrop token yang menjanjikan",
      color: "text-green-400"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Maksimalkan Penghasilan",
      description: "Optimalkan potensi penghasilan Anda dengan tools kami",
      color: "text-blue-400"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Aman & Terlindungi",
      description: "Aset dan data Anda dilindungi dengan baik",
      color: "text-purple-400"
    }
  ];

  const earningMethods = [
    {
      name: "Tugas Harian",
      points: "10-50",
      frequency: "Harian",
      icon: <Clock className="w-6 h-6" />
    },
    {
      name: "Program Referral",
      points: "100",
      frequency: "Per Referral",
      icon: <Users className="w-6 h-6" />
    },
    {
      name: "Misi Airdrop",
      points: "50-200",
      frequency: "Mingguan",
      icon: <Gift className="w-6 h-6" />
    },
    {
      name: "Tugas Sosial",
      points: "5-20",
      frequency: "Harian",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const testimonials = [
    {
      name: "Ahmad Crypto",
      earnings: "5000 Points + $250 Crypto",
      content: "Dapatkan cukup untuk Bitcoin pertama saya! Platform ini benar-benar legit.",
      rating: 5
    },
    {
      name: "Sari Trader",
      earnings: "3200 Points + $150 Crypto",
      content: "Platform airdrop terbaik yang pernah saya gunakan. Pembayaran cepat!",
      rating: 5
    },
    {
      name: "Budi Investor",
      earnings: "1800 Points + $75 Crypto",
      content: "Cara yang bagus untuk mendapatkan crypto sambil belajar tentang proyek baru.",
      rating: 4
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-primary/10">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <div className="badge badge-primary badge-lg mb-6 gap-2 p-4">
              <Zap className="w-4 h-4" />
              Mulai Dapatkan Crypto Hari Ini!
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Dapatkan <span className="text-primary">Crypto</span> & 
              <span className="text-secondary"> Points</span> Setiap Hari
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-base-content/70 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna yang mendapatkan cryptocurrency melalui airdrop, tugas, dan referral. 
              Mulai dengan 100 points gratis dan konversi menjadi crypto nyata!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/register" className="btn btn-primary btn-lg gap-2">
                Mulai Dapatkan <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/earn" className="btn btn-outline btn-lg gap-2">
                <Coins className="w-5 h-5" />
                Lihat Tugas
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-base-200 rounded-lg">
                <div className="stat-value text-primary text-2xl">10K+</div>
                <div className="stat-desc">Pengguna Aktif</div>
              </div>
              <div className="text-center p-4 bg-base-200 rounded-lg">
                <div className="stat-value text-secondary text-2xl">$1M+</div>
                <div className="stat-desc">Total Dibayarkan</div>
              </div>
              <div className="text-center p-4 bg-base-200 rounded-lg">
                <div className="stat-value text-accent text-2xl">50+</div>
                <div className="stat-desc">Airdrop</div>
              </div>
              <div className="text-center p-4 bg-base-200 rounded-lg">
                <div className="stat-value text-info text-2xl">24/7</div>
                <div className="stat-desc">Dukungan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mengapa Pilih CryptoEarn?</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Kami menyediakan berbagai cara untuk mendapatkan cryptocurrency dan reward melalui tugas dan aktivitas sederhana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body text-center">
                  <div className={`mx-auto mb-4 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="card-title justify-center text-lg mb-2">{feature.title}</h3>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earning Methods Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mulai Dapatkan Hari Ini</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Berbagai cara untuk mendapatkan points dan mengkonversinya ke cryptocurrency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {earningMethods.map((method, index) => (
              <div key={index} className="card bg-base-200 shadow-lg border border-base-300">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-primary">
                      {method.icon}
                    </div>
                    <h3 className="card-title text-lg">{method.name}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Points:</span>
                      <span className="font-bold text-primary">{method.points}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Frekuensi:</span>
                      <span className="font-semibold">{method.frequency}</span>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary btn-sm">Mulai</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/earn" className="btn btn-primary btn-lg gap-2">
              Lihat Semua Cara Dapatkan
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Pengguna Kami</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Bergabung dengan ribuan pengguna puas yang mendapatkan cryptocurrency setiap hari
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-base-content/70 mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-primary">{testimonial.earnings}</div>
                    </div>
                    <div className="avatar">
                      <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Siap Mulai Dapatkan Crypto?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Daftar sekarang dan dapatkan 100 points gratis untuk memulai perjalanan crypto Anda!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn btn-accent btn-lg gap-2">
              <Zap className="w-5 h-5" />
              Mulai Gratis
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
              Masuk
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-300 text-base-content">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="bg-gradient-to-r from-primary to-secondary p-1 rounded">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">CryptoEarn</span>
            </div>
            <p className="mt-2">Dapatkan cryptocurrency melalui airdrop dan tugas</p>
          </div>
          <div>
            <span className="footer-title">Platform</span>
            <a className="link link-hover">Dapatkan Crypto</a>
            <a className="link link-hover">Airdrop</a>
            <a className="link link-hover">Sistem Points</a>
            <a className="link link-hover">Program Referral</a>
          </div>
          <div>
            <span className="footer-title">Perusahaan</span>
            <a className="link link-hover">Tentang kami</a>
            <a className="link link-hover">Kontak</a>
            <a className="link link-hover">Blog</a>
            <a className="link link-hover">Press kit</a>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <a className="link link-hover">Syarat penggunaan</a>
            <a className="link link-hover">Kebijakan privasi</a>
            <a className="link link-hover">Kebijakan cookie</a>
          </div>
        </div>
        <div className="divider"></div>
        <div>
          <p>Hak Cipta © 2024 - Semua hak dilindungi oleh CryptoEarn</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
