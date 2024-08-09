import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: "THG",
  description: "Texas Hold'em Poker Card Game",
};

const pokerFont = localFont({
  src: "./PTSerif-Regular.ttf",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black ${pokerFont.className}`}>
        {children}
      </body>
    </html>
  );
}
