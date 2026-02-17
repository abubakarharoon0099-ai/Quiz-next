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
  title: "Zoombox Quiz App",
  description: "Zoombox Quiz App built with Next.js and TypeScript",
  icons: {
    icon: [
      { url: "/zoombox-logo.png", sizes: "any" }, 
      { url: "/zoombox-logo.png", type: "image/png" }, 
    ],
    shortcut: "/zoombox-logo.p.png",
    apple: "/zoombox-logo.png",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
