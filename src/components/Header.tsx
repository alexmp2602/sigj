"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 w-full bg-blue-600 dark:bg-blue-800 text-white shadow-md z-50">
      <div className="max-w-6xl h-16 mx-auto px-4 flex justify-between items-center">
        {/* Logo y descripción */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">
            <Link href="/" onClick={closeMenu}>
              SIGJ
            </Link>
          </h1>
          <span className="text-sm hidden sm:inline font-light">
            Sistema Integral de Gestión Judicial
          </span>
        </div>

        {/* Botón de menú para móviles */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-white"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Overlay para cerrar menú móvil */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          />
        )}

        {/* Navegación */}
        <nav
          className={`${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } fixed top-0 right-0 h-screen w-64 bg-blue-600 dark:bg-blue-800 sm:bg-transparent sm:dark:bg-transparent sm:static sm:translate-x-0 sm:flex sm:items-center sm:h-auto sm:w-auto transition-transform duration-300 ease-in-out z-50`}
        >
          {/* Perfil del usuario en menú móvil */}
          <div className="sm:hidden p-6 border-b border-blue-500">
            <Link href="/perfil" onClick={closeMenu} className="flex items-center gap-2">
              <Image
                src="/img/profile-placeholder.png"
                alt="Foto de perfil"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-semibold">Nombre Usuario</span>
            </Link>
          </div>

          {/* Rutas de navegación y perfil en escritorio */}
          <ul className="flex flex-col sm:flex-row gap-6 sm:gap-8 text-lg sm:text-sm p-6 sm:p-0 w-full items-center">
            {[
              { href: "/", label: "Inicio" },
              { href: "/expedientes", label: "Expedientes" },
              { href: "/recursos", label: "Recursos" },
              { href: "/historial", label: "Historial" },
              { href: "/calendario", label: "Calendario" },
            ].map(({ href, label }) => (
              <li
                key={href}
                className="sm:border-b-2 sm:border-transparent sm:hover:border-gray-200 transition-all"
              >
                <Link
                  href={href}
                  onClick={closeMenu}
                  className={`${
                    pathname === href
                      ? "text-gray-200 font-semibold"
                      : "hover:text-gray-300"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Perfil del usuario en versión escritorio */}
            <li className="hidden sm:flex ml-auto items-center border-l border-blue-500 pl-4">
              <Link href="/perfil" onClick={closeMenu} className="flex items-center gap-2">
                <Image
                  src="/img/profile-placeholder.png"
                  alt="Foto de perfil"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="font-semibold">Juan Pérez</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
