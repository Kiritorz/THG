import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THG",
  description: "Texas Hold'em Poker Card Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        {children}
      </body>
    </html>
  );
}
