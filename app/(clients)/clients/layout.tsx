import type { Metadata } from "next";
import localFont from "next/font/local";
import "../../globals.css";
import { HeroSection } from "./_components/layout/hero-sections";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CooperFilme - Roteiros",
  description: "Envie seu roteiro para ser avaliado pela CooperFilme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <HeroSection />
        {children}
      </body>
    </html>
  );
}
