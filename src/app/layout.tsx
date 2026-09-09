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
  metadataBase: new URL("https://boss-os-xi.vercel.app"),

  title: {
    default: "Krishnaraj Singh | BOSS.OS",
    template: "%s | BOSS.OS",
  },

  description:
    "Krishnaraj Singh — engineering student and builder exploring software engineering, AI, data, systems, and networking through real-world projects.",

  keywords: [
    "Krishnaraj Singh",
    "BOSS.OS",
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Analytics",
    "Networking",
    "Full Stack Development",
    "AI Engineering",
    "Engineering Student",
  ],

  authors: [{ name: "Krishnaraj Singh" }],

  creator: "Krishnaraj Singh",

  applicationName: "BOSS.OS",

  category: "technology",

  openGraph: {
    title: "Krishnaraj Singh | BOSS.OS",
    description:
      "An interactive personal portfolio built as a retro operating system.",
    url: "https://boss-os-xi.vercel.app",
    siteName: "BOSS.OS",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Krishnaraj Singh — BOSS.OS",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "Krishnaraj Singh | BOSS.OS",
    description:
      "An interactive personal portfolio built as a retro operating system.",
  },

  robots: {
    index: true,
    follow: true,
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}