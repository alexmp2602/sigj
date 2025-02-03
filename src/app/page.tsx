"use client";

import { motion } from "framer-motion";
import { FiFolder, FiBox, FiClock, FiBell, FiCalendar } from "react-icons/fi";
import Link from "next/link";

export default function Dashboard() {
  // Simulación: el usuario ya ha ingresado y se ha determinado su área.
  const usuario = { nombre: "Juan Pérez", area: "Civil y Comercial" };

  // Menú de funcionalidades basado en el área del usuario.
  const funcionalidades = [
    {
      title: "Registro de Expedientes",
      description: "Consulta y administra los expedientes de tu área.",
      icon: <FiFolder aria-label="Expedientes" />,
      link: "/expedientes",
    },
    {
      title: "Gestión de Recursos y Documentos",
      description:
        "Administra y consulta documentos oficiales y administrativos.",
      icon: <FiBox aria-label="Recursos" />,
      link: "/recursos",
    },
    {
      title: "Historial de Acciones",
      description: "Revisa las actividades y cambios recientes.",
      icon: <FiClock aria-label="Historial" />,
      link: "/historial",
    },
    {
      title: "Agenda Judicial",
      description: "Consulta el calendario de eventos judiciales.",
      icon: <FiCalendar aria-label="Agenda" />,
      link: "/calendario",
    },
  ];

  // Datos simulados para novedades y alertas.
  const novedades = [
    {
      id: 1,
      title: "Nueva audiencia programada",
      description: "Audiencia el 15 de marzo a las 10:00.",
      date: "2025-03-15",
    },
    {
      id: 2,
      title: "Cambio en normativa",
      description: "Se han actualizado las normas de documentación judicial.",
      date: "2025-03-10",
    },
    {
      id: 3,
      title: "Mantenimiento del sistema",
      description: "El sistema estará en mantenimiento el domingo a las 22:00.",
      date: "2025-03-20",
    },
  ];

  return (
    <main
      className="bg-transparent text-gray-800 dark:text-gray-300 min-h-screen flex flex-col justify-center items-center transition-colors duration-300"
      role="main"
    >
      <section className="text-center max-w-5xl mx-auto p-6 py-8">
        {/* Saludo personalizado */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-6"
          aria-label={`Bienvenido ${usuario.nombre}`}
        >
          ¡Bienvenido, <strong>{usuario.nombre}</strong>!
        </motion.h2>

        {/* Información del área y descripción */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-lg mb-6 text-gray-600 dark:text-gray-400 leading-relaxed"
        >
          Has iniciado sesión en el <strong>SIGJ</strong> y ahora accedes a un
          conjunto de funcionalidades adaptadas a tu área:{" "}
          <strong>{usuario.area}</strong>. Aquí podrás gestionar expedientes,
          utilizar herramientas especializadas, consultar el historial de
          acciones y, además, recibir las últimas novedades y alertas.
        </motion.p>

        {/* Panel de funcionalidades */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
        >
          {funcionalidades.map((func, index) => (
            <BentoCard
              key={index}
              title={func.title}
              description={func.description}
              icon={func.icon}
              link={func.link}
            />
          ))}
        </motion.div>

        {/* Sección de Novedades y Alertas al final */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-12"
          aria-labelledby="novedades-heading"
        >
          <h3
            id="novedades-heading"
            className="text-2xl font-bold mb-4 flex justify-center items-center gap-2"
          >
            <FiBell className="text-blue-700 dark:text-blue-400" size={28} />
            Novedades y Alertas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {novedades.map((novedad) => (
              <motion.div
                key={novedad.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                role="article"
                aria-label={`Noticia: ${novedad.title}`}
              >
                <h4 className="text-lg font-semibold">{novedad.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {novedad.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  {novedad.date}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </section>
    </main>
  );
}

/* Componente reutilizable para las tarjetas del menú */
interface BentoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

function BentoCard({ title, description, icon, link }: BentoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800 transition"
      role="region"
      aria-label={title}
    >
      <Link
        href={link}
        className="flex flex-col items-center text-center focus:outline-none active:outline-none" // Eliminamos el ring de foco
      >
        <div className="text-4xl text-blue-700 dark:text-blue-400 mb-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {description}
        </p>
      </Link>
    </motion.div>
  );
}
