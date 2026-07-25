import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://imike.gold"),
  title: "(i), Mike Gold — Choose How You Enter",
  description:
    "Meet the manchild, explore the works, or enter the system.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "(i), Mike Gold",
    description: "Choose how you enter.",
    url: "https://imike.gold",
    siteName: "BillBoard OS",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
