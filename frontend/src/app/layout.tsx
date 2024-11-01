import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import CookieConsent from "@/pages/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SJHRC: SHREE JAGANNATH HOSPITAL & RESEARCH CENTRE",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <CookieConsent />
      <AuthProvider>
      {children}
      </AuthProvider>
        </body>
    </html>
  );
}