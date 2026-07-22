import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/layout/AppContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import ChatInterface from "@/components/ai/ChatInterface";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhinav Yadav | Senior Data Scientist & ML Engineer",
  description: "Portfolio of Abhinav Yadav, experienced Data Scientist specializing in Forecasting, LLMs, Recommendation Systems, and Production AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        <AppProvider>
          {/* Subtle grid layer on top of black background */}
          <div className="fixed inset-0 bg-grid pointer-events-none -z-10" />
          <InteractiveBackground />
          <Navbar />
          <main className="flex-1 flex flex-col w-full relative">
            {children}
          </main>
          <Footer />
          <ChatInterface />
        </AppProvider>
      </body>
    </html>
  );
}
