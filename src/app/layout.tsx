import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LexNova",
  description: "Gestión de tribunales con Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200`}
      >
        <Header />
        <ToastContainer position="top-right" autoClose={3000} />
        <main
          id="main-content"
          className="mt-14 py-6 px-4 mx-auto flex flex-col flex-1 overflow-hidden  scrollbar-custom"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
