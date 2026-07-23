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
    "Official portfolio & consulting website of Abhinav Yadav — Senior Data Scientist & ML Systems Engineer specializing in Time Series Forecasting, Recommendation Systems, LLMs, Excel/VBA Automation, and Data Science Consulting.",
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
    "Abhinav Yadav AI Engineer",
    "Time Series Forecasting Expert",
    "Recommendation Systems Engineer",
    "LLM Engineer Portfolio",
    "Excel VBA Automation Expert",
    "SQL Database Architect Abhinav",
    "Data Analytics Tutoring Abhinav Yadav",
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
      "Official website of Abhinav Yadav. Production-grade Machine Learning, Time Series Forecasting, Recommendation Systems, Excel/VBA Automation, and Data Science Consulting.",
    url: "https://abhinavyadav.dev",
    siteName: "Abhinav Yadav Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://abhinavyadav.dev/linkedin_image_abhinav.png",
        width: 1200,
        height: 630,
        alt: "Abhinav Yadav - Senior Data Scientist & Machine Learning Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Yadav | Senior Data Scientist & ML Engineer",
    description:
      "Senior Data Scientist & Technical Solutions Architect specializing in Time Series Forecasting, LLMs, Recommendation Systems, and Data Science Consulting.",
    images: ["https://abhinavyadav.dev/linkedin_image_abhinav.png"],
    creator: "@abhii9v",
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
                    "Abhinav Yadav ML Engineer",
                    "Abhinav Yadav AI Consultant"
                  ],
                  "url": "https://abhinavyadav.dev",
                  "image": "https://abhinavyadav.dev/linkedin_image_abhinav.png",
                  "jobTitle": "Senior Data Scientist & Machine Learning Engineer",
                  "worksFor": {
                    "@type": "Organization",
                    "name": "ShyftLabs"
                  },
                  "sameAs": [
                    "https://github.com/abhii9v",
                    "https://www.linkedin.com/in/abhii9v"
                  ],
                  "knowsAbout": [
                    "Data Science",
                    "Machine Learning",
                    "Time Series Forecasting",
                    "Large Language Models",
                    "Recommendation Systems",
                    "Data Science Consulting",
                    "Data Science Assignment Help",
                    "Excel VBA Automation",
                    "Database Systems & SQL Architecting",
                    "Data Analytics Tutoring"
                  ],
                  "description": "Abhinav Yadav is a Senior Data Scientist & Technical Solutions Architect specializing in Machine Learning Systems, Time Series Forecasting, Recommendation Systems, Excel/VBA Automation, and Data Science Consulting."
                },
                {
                  "@type": "WebSite",
                  "@id": "https://abhinavyadav.dev/#website",
                  "url": "https://abhinavyadav.dev",
                  "name": "Abhinav Yadav | Senior Data Scientist & ML Engineer Portfolio",
                  "description": "Official Website and Portfolio of Abhinav Yadav — Senior Data Scientist, ML Systems Engineer & Consultant.",
                  "publisher": {
                    "@id": "https://abhinavyadav.dev/#person"
                  }
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://abhinavyadav.dev/#service",
                  "name": "Abhinav Yadav Data Science & AI Consulting",
                  "url": "https://abhinavyadav.dev",
                  "image": "https://abhinavyadav.dev/linkedin_image_abhinav.png",
                  "description": "Custom AI/ML pipelines, automated Excel & VBA sheet tooling, relational SQL databases, Tableau dashboards, and 1-on-1 academic mentoring.",
                  "provider": {
                    "@id": "https://abhinavyadav.dev/#person"
                  },
                  "areaServed": "Global",
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Services Catalog",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Machine Learning & AI Engineering"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Time Series Forecasting & Predictive Modeling"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Excel VBA & Spreadsheet Automation"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "Data Science Assignment Help & Mentoring"
                        }
                      }
                    ]
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
