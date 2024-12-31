"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-blue-600 dark:bg-blue-800 text-white shadow-md z-50">
      <div className="max-w-6xl h-16 mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">
          <Link href="/">LexNova</Link>
        </h1>

        {/* Botón de menú para dispositivos móviles */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-white focus:outline-none"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navegación */}
        <nav
          className={`${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } fixed top-0 right-0 h-screen w-64 bg-blue-600 dark:bg-blue-800 sm:bg-transparent sm:dark:bg-transparent sm:static sm:translate-x-0 sm:flex sm:items-center sm:h-auto sm:w-auto transition-transform duration-300 ease-in-out`}
        >
          <ul className="flex flex-col sm:flex-row gap-6 sm:gap-8 text-lg sm:text-sm p-6 sm:p-0">
            <li className="sm:border-b-2 sm:border-transparent sm:hover:border-gray-200 transition-all">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  pathname === "/"
                    ? "text-gray-200 font-semibold"
                    : "hover:text-gray-300"
                }`}
              >
                Inicio
              </Link>
            </li>
            <li className="sm:border-b-2 sm:border-transparent sm:hover:border-gray-200 transition-all">
              <Link
                href="/expedientes"
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  pathname === "/expedientes"
                    ? "text-gray-200 font-semibold"
                    : "hover:text-gray-300"
                }`}
              >
                Expedientes
              </Link>
            </li>
            <li className="sm:border-b-2 sm:border-transparent sm:hover:border-gray-200 transition-all">
              <Link
                href="/inventarios"
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  pathname === "/inventarios"
                    ? "text-gray-200 font-semibold"
                    : "hover:text-gray-300"
                }`}
              >
                Inventarios
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
