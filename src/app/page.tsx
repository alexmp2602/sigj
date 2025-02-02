"use client";
import { motion } from "framer-motion";
import { FiFolder, FiBox, FiClock, FiBell } from "react-icons/fi";
import Link from "next/link";

export default function Dashboard() {
  // Simulación: el usuario ya ha ingresado y se ha determinado su área.
  const usuario = { nombre: "Juan Pérez", area: "Civil y Comercial" };

  // Menú de funcionalidades basado en el área del usuario.
  const funcionalidades = [
    {
      title: "Registro de Expedientes",
      description: "Consulta y administra los expedientes de tu área.",
      icon: <FiFolder />,
      link: "/expedientes",
    },
    {
      title: "Herramientas de Gestión",
      description: "Accede a recursos y utilidades exclusivas.",
      icon: <FiBox />,
      link: "/herramientas",
    },
    {
      title: "Historial de Acciones",
      description: "Revisa las actividades y cambios recientes.",
      icon: <FiClock />,
      link: "/historial",
    },
    {
      title: "Novedades y Alertas",
      description: "Mantente informado sobre las últimas actualizaciones.",
      icon: <FiBell />,
      link: "/novedades",
    },
  ];

  return (
    <main className="bg-transparent text-gray-800 dark:text-gray-300 min-h-screen flex flex-col justify-center items-center transition-colors duration-300">
      <section className="text-center max-w-5xl mx-auto p-6 py-8">
        {/* Saludo personalizado */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-6"
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
          acciones y recibir las últimas novedades y alertas.
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
    >
      <Link href={link} className="flex flex-col items-center text-center">
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
