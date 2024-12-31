"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-blue-600 text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">LexNova</h1>
        {/* Botón de menú para dispositivos móviles */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-white focus:outline-none"
          aria-label="Abrir menú"
        >
          ☰
        </button>
        {/* Navegación */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:flex gap-4 sm:static sm:mt-0 mt-4`}
        >
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-gray-200 font-semibold" : "hover:text-gray-200"
            } transition-colors`}
          >
            Inicio
          </Link>
          <Link
            href="/expedientes"
            className={`${
              pathname === "/expedientes" ? "text-gray-200 font-semibold" : "hover:text-gray-200"
            } transition-colors`}
          >
            Expedientes
          </Link>
          <Link
            href="/inventarios"
            className={`${
              pathname === "/inventarios" ? "text-gray-200 font-semibold" : "hover:text-gray-200"
            } transition-colors`}
          >
            Inventarios
          </Link>
        </nav>
      </div>
    </header>
  );
}
