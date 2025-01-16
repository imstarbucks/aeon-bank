import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/ui/nav";
import { QCProvider } from "@/components/queryClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AEON Bank | Malaysia’s FIRST Islamic Digital Bank!",
  description:
    "Simple, Safe and Shariah-Compliant. We are licensed and regulated to operate as a digital bank by Bank Negara Malaysia (BNM).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-200 antialiased`}
      >
        <QCProvider>{children}</QCProvider>
      </body>
    </html>
  );
}
