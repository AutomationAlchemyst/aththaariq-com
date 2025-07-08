import type { Metadata } from "next";
import "./globals.css";
// Import the new components
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Ath Thaariq - Systems Architect & Cycle Breaker",
  description: "Ath Thaariq builds systems to fight chaos—in business and in life. Explore powerful AI automation strategies and raw, honest stories on breaking cycles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-SG" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-gray-900 text-gray-200">
        {/* Add the Header here */}
        <Header />
        {/* The page content will be rendered here */}
        <main>{children}</main>
        {/* Add the Footer here */}
        <Footer />
      </body>
    </html>
  );
}
