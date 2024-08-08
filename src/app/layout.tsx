import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const copyduck = localFont({ src: './Copyduck.ttf' })

export const metadata: Metadata = {
  title: "THOG",
  description: "Texas Hold'em Poker Card Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={copyduck.className}> */}
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
}
