import type { Metadata } from "next";
import { Inter, Epilogue } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const clashDisplay = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuickHire - Find Your Dream Job",
  description: "Great platform for the job seeker that searching for new career heights and passionate about startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${epilogue.variable} ${clashDisplay.variable} font-inter antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
