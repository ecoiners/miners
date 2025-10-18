
/** @type {import('next').NextConfig} */
const nextConfig = {
  // HAPUS SEMUA experimental features
  // experimental: {
  //   appDir: false,
  //   esmExternals: "loose",
  // },
  
  // SIMPLIFIKASI transpilePackages - HAPUS yang bermasalah
  transpilePackages: [
    "@rainbow-me/rainbowkit",
    "wagmi"
    // HAPUS: @vanilla-extract/sprinkles, @reown/appkit, @walletconnect/*
  ],
  
  // SIMPLIFIKASI webpack config
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} 
const nextConfig = {
  experimental: {
    appDir: false, // Keep this false for pages directory
    esmExternals: "loose", // This helps with ESM/CommonJS compatibility
  },
  transpilePackages: [
    "@vanilla-extract/sprinkles",
    "@rainbow-me/rainbowkit",
    "@reown/appkit",
    "@walletconnect/ethereum-provider",
    "@walletconnect/universal-provider",
  ],
  webpack: (config, { isServer }) => {
    // Handle module resolution issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      http: false,
      https: false,
      zlib: false,
      path: false,
      os: false,
    };

    // Fix for ESM/CommonJS compatibility
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });

    // Fix for vanilla-extract and other CommonJS modules
    config.module.rules.push({
      test: /\.m?js$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    });

    // Handle .mjs files
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
  // If you're using static export
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
*/
