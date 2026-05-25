import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Watermark from "./components/Watermark";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NAX USA Logistics",
  description: "NAX (U.S.A.), INC. — Premium freight forwarding & cold chain logistics platform serving the U.S. West Coast.",
  // Tambahkan bagian icons ini untuk memanggil favicon di folder public
  icons: {
    icon: "/icon.png",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Watermark />
      </body>
    </html>
  );
}