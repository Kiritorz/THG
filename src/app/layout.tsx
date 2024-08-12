import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: "Texas Hold'em"
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
