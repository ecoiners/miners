import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { NetworkConfigurationProvider } from "@/context/network-configuration-provider";

import ParticlesCanvas from "@/components/particles";
import Header from "@/components/header";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ECROP 100 - SOLANA TOKEN CREATOR",
  description: "Build Solana token dapps",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} text-white font-sans antialiased bg-gradient-to-br from-green-700 via-teal-700 to-emerald-800 min-h-screen relative overflow-hidden`}
      >
			  <NetworkConfigurationProvider>
          <ParticlesCanvas />
				  <Header />
          {children}
				</NetworkConfigurationProvider>
      </body>
    </html>
  );
}
