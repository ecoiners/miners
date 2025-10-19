import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import React, {useState, useEffect} from "react";
import {
	Header,
	HeroSection
} from "../components/HomePage/index";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME;

export default function Home() {
	const [isDarkMode, setIsDarkMode] = useState(false);
	
	useEffect(() => {
		if (typeof window === "undefined") return;
		
		try {
			const saveMode = localStorage.getItem("darkMode");
			let systemPreferDark = false;
			
			try {
			  systemPreferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			  
			} catch (error) {
				systemPreferDark(false);
			}
			
			const userDarkMode = saveMode === "false" ? false : true;
			setIsDarkMode(userDarkMode);
			
		  if (userDarkMode) {
			  document.documentElement.classList.add("dark");
		  } else {
			  document.documentElement.classList.remove("dark");
		  }
			
		} catch (error) {
			console.error(error);
			setIsDarkMode(true);
			document.documentElement.classList.add("dark");
		}
		
	}, []);
	
	const toggleDarkMode = () => {
		const newMode = !isDarkMode;
		setIsDarkMode(newMode);
		applyTheme(newMode);
		
		try {
			localStorage.setItem("darkMode", newMode.toString());
		} catch (error) {
			console.errro(error);
		}
	};
	
	const applyTheme = (dark) => {
		if (typeof document === "undefined") return;
		
		if (dark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};
	
  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-black text-white" : "bg-white text-gray-800"} transition-colors duration-300`}>
      <Head>
        <title>ECROP 100</title>
        <meta name="description" content="ecrop 100 the blockchains crypto app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      
			<Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
			<main>
			  <HeroSection isDarkMode={isDarkMode} />
			</main>
			
    </div>
  );
}
