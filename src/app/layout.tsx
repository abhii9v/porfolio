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
  metadataBase: new URL("https://abhinavyadav.dev"),
  title: {
    default: "Abhinav Yadav | Senior Data Scientist & Machine Learning Engineer",
    template: "%s | Abhinav Yadav",
  },
  description:
    "Official website of Abhinav Yadav — Senior Data Scientist & ML Engineer specializing in Time Series Forecasting, Recommendation Systems, LLMs, and Data Science Consulting.",
  keywords: [
    "Abhinav Yadav",
    "Abhinav Yadav Data Scientist",
    "Data Scientist Abhinav",
    "Abhinav Yadav Machine Learning Engineer",
    "Abhinav Yadav Portfolio",
    "Abhinav Yadav Assignment Help",
    "Data Science Assignment Help",
    "Abhinav Yadav Data Science Consulting",
    "Abhinav Yadav ShyftLabs",
    "Abhinav Yadav ML Engineer",
    "Time Series Forecasting Expert",
    "Recommendation Systems Engineer",
    "LLM Engineer Portfolio",
  ],
  authors: [{ name: "Abhinav Yadav", url: "https://abhinavyadav.dev" }],
  creator: "Abhinav Yadav",
  publisher: "Abhinav Yadav",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://abhinavyadav.dev",
  },
  openGraph: {
    title: "Abhinav Yadav | Senior Data Scientist & Machine Learning Engineer",
    description:
      "Explore the work, projects, research, and data science consulting services by Abhinav Yadav.",
    url: "https://abhinavyadav.dev",
    siteName: "Abhinav Yadav Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://abhinavyadav.dev/avatar.png",
        width: 1200,
        height: 630,
        alt: "Abhinav Yadav Data Scientist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Yadav | Senior Data Scientist & ML Engineer",
    description:
      "Senior Data Scientist specializing in Time Series Forecasting, LLMs, and Recommendation Systems.",
    images: ["https://abhinavyadav.dev/avatar.png"],
    creator: "@abhinavyadav",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://abhinavyadav.dev/#person",
                  "name": "Abhinav Yadav",
                  "alternateName": [
                    "Abhinav Yadav Data Scientist",
                    "Data Scientist Abhinav",
                    "Abhinav Yadav ML Engineer"
                  ],
                  "url": "https://abhinavyadav.dev",
                  "image": "https://abhinavyadav.dev/avatar.png",
                  "jobTitle": "Senior Data Scientist & Machine Learning Engineer",
                  "worksFor": {
                    "@type": "Organization",
                    "name": "ShyftLabs"
                  },
                  "sameAs": [
                    "https://github.com/abhii9v",
                    "https://www.linkedin.com/in/abhinavyadav"
                  ],
                  "knowsAbout": [
                    "Data Science",
                    "Machine Learning",
                    "Time Series Forecasting",
                    "Large Language Models",
                    "Recommendation Systems",
                    "Data Science Consulting",
                    "Data Science Assignment Help"
                  ],
                  "description": "Abhinav Yadav is a Senior Data Scientist & ML Engineer specializing in Machine Learning, Forecasting, Recommender Systems, and Data Science Consulting."
                },
                {
                  "@type": "WebSite",
                  "@id": "https://abhinavyadav.dev/#website",
                  "url": "https://abhinavyadav.dev",
                  "name": "Abhinav Yadav | Data Scientist Portfolio",
                  "description": "Official Website of Abhinav Yadav — Senior Data Scientist & ML Engineer.",
                  "publisher": {
                    "@id": "https://abhinavyadav.dev/#person"
                  }
                }
              ]
            })
          }}
        />
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
