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
        <main className="py-6 px-4 min-h-screen max-w-6xl mx-auto">{children}</main>
        <footer className="bg-gray-800 text-gray-400 text-center p-4 mt-6">
          © {new Date().getFullYear()} LexNova - Todos los derechos reservados
        </footer>
      </body>
    </html>
  );
}
