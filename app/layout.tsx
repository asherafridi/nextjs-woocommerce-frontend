import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "remixicon/fonts/remixicon.css";
import Navbar from "@/components/Navbar";
import TopLoader from "@/components/TopLoader";


const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"], // optional: choose weights you’ll use
});

export const metadata: Metadata = {
  title: "Zain Mart",
  description: "Building for the web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased">
        <TopLoader />
        <Header />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
