import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import ConvexClientProvider from "./convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Header from "@/components/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "alie creator ai ",
  description: "alie creator ai content and image tools generator video dan lainnya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable}`}
      >
			  <ThemeProvider
				  attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
				>
				  <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} appearance={{baseTheme: dark}}>
						<ConvexClientProvider>
						  <Header />
						  <main className="bg-slate-900 text-white overflow-x-hidden min-h-screen">
                {children}
							</main>
					  </ConvexClientProvider>
					</ClerkProvider>
				</ThemeProvider>
      </body>
    </html>
  );
}

