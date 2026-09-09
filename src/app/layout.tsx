import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krishnaraj Singh | BOSS.OS",
  description:
    "Krishnaraj Singh — engineering student and builder exploring software engineering, AI, data, systems, and networking through real-world projects.",
  keywords: [
    "Krishnaraj Singh",
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Analytics",
    "Networking",
    "BOSS.OS",
  ],
  authors: [{ name: "Krishnaraj Singh" }],
  creator: "Krishnaraj Singh",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}