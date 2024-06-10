"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import { ReactQueryClientProvider } from "./ReactQuery/ReactQuery";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider>
          <Navbar />
          {children} 
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
