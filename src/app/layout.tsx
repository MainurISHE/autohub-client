import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactQueryProvider } from "@/shared/providers/react-query-provider";
import { AuthProvider } from "@/shared/providers/auth-provider";

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
  title: "AutoHub",
  description: "Marketplace for buying and selling cars",
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
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
