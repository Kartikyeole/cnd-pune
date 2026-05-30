import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BadgeGenerator } from "@/components/sections/Badge/BadgeGenerator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloud Native Day Pune 2026 | Presented by Vultr",
  description: "Join developers, engineers, and platform architects for Cloud Native Day Pune 2026. Discover the latest trends in Kubernetes, GitOps, eBPF, and serverless deployments.",
  keywords: ["Kubernetes", "Cloud Native", "Vultr", "Pune Developer Conference", "DevOps", "Docker", "Cloud Native Day Pune 2026"],
  authors: [{ name: "Cloud Native Day Pune Organizers" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC] dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans selection:bg-cnd-blue selection:text-white overflow-x-hidden relative">
        <div className="absolute inset-0 bg-grid-cyber pointer-events-none opacity-40 z-0" />
        <div className="absolute inset-0 bg-grid-cyber-fine pointer-events-none opacity-20 z-0" />

        {/* Soft Blue Ambient light glows */}
        <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-cnd-blue/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-cnd-sky/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] bg-cnd-blue/5 rounded-full blur-[140px] pointer-events-none" />
        <Navbar otherSection={true} />
        <BadgeGenerator />
        <Footer />
      </body>
    </html>
  );
}
