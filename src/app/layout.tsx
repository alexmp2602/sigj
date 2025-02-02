import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIGJ - Sistema Integral de Gestión Judicial",
  description: "Sistema moderno para la gestión judicial desarrollado con Next.js.",
  openGraph: {
    title: "SIGJ - Sistema Integral de Gestión Judicial",
    description: "Sistema moderno para la gestión judicial desarrollado con Next.js.",
    url: "https://sigj.vercel.app/",
    siteName: "SIGJ",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://sigj.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SIGJ - Sistema Integral de Gestión Judicial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIGJ - Sistema Integral de Gestión Judicial",
    description: "Sistema moderno para la gestión judicial desarrollado con Next.js.",
    images: ["https://sigj.vercel.app/og-image.jpg"],
  },
  metadataBase: new URL("https://sigj.vercel.app/"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Meta tags esenciales */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1e293b" />
        <link rel="canonical" href="https://sigj.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100 text-gray-900 dark:bg-[#1e293b] dark:text-gray-300 transition-colors duration-300">
        <ClientProvider>
          <div className="flex flex-col min-h-screen">
            {/* Encabezado */}
            <Header />

            {/* Contenido principal */}
            <main className="mt-16 mx-auto flex flex-col flex-1 w-full max-w-7xl rounded-lg overflow-hidden custom-scrollbar items-center">
              {children}
            </main>

            {/* Pie de página */}
            <footer className="py-4 bg-gray-200 dark:bg-gray-800 text-center text-sm text-gray-700 dark:text-gray-400 border-t dark:border-gray-700">
              <p>
                &copy; {new Date().getFullYear()} <strong>SIGJ</strong>. Todos los derechos reservados.
              </p>
              <p>
                Diseñado y desarrollado por{" "}
                <a
                  href="https://alexpereyra.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-400 hover:underline"
                >
                  Alex Pereyra
                </a>
              </p>
            </footer>
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
