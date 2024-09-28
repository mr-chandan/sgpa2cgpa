import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SGPA to CGPA Calculator | Convert SGPA to CGPA and Percentage",
  description: "Easily convert your SGPA to CGPA and percentage using two methods: enter individual SGPAs or total SGPA with number of semesters. Supports multiple grading scales.",
  keywords: "SGPA to CGPA, CGPA Calculator, SGPA Calculator, Grading Scale, CGPA to Percentage, Semester GPA, Cumulative GPA",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  openGraph: {
    title: "SGPA to CGPA Calculator",
    description: "Convert your SGPA to CGPA and percentage with ease. Supports various grading scales and multiple methods for calculation.",
    url: "https://sgpa2cgpa.vercel.app/",
    siteName: "SGPA to CGPA Calculator",
    images: [
      {
        url: "/homepage.png",
        width: 1200,
        height: 630,
        alt: "SGPA to CGPA Calculator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "SGPA to CGPA Calculator",
    description: "Easily calculate your CGPA and percentage from SGPA using our simple and effective tool.",
    images: [
      {
        url: "/homepage.png",
        alt: "SGPA to CGPA Calculator Thumbnail",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="author" content="SGPA to CGPA Calculator | Convert SGPA to CGPA and Percentage" />
        <meta name="keywords" content="SGPA, CGPA, GPA calculator, SGPA to CGPA, GPA to percentage" />
        <meta name="description" content="Convert SGPA to CGPA easily and view your percentage using our calculator with support for different grading scales." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph for social media */}
        <meta property="og:title" content="SGPA to CGPA Calculator" />
        <meta property="og:description" content="Convert your SGPA to CGPA and percentage with ease. Supports various grading scales and methods for calculation." />
        <meta property="og:url" content="https://sgpa2cgpa.vercel.app/" />
        <meta property="og:image" content="/homepage.png" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SGPA to CGPA Calculator" />
        <meta name="twitter:description" content="Easily calculate your CGPA and percentage from SGPA using our tool." />
        <meta name="twitter:image" content="/homepage.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* JSON-LD Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "SGPA to CGPA Calculator",
            "description": "Convert your SGPA to CGPA and percentage with ease using this calculator.",
            "url": "https://sgpa2cgpa.vercel.app/",
            "applicationCategory": "Education",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "category": "Education"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SGPA to CGPA Calculator | Convert SGPA to CGPA and Percentage"
            }
          })}
        </script>
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
