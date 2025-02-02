"use client";
import { motion } from "framer-motion";
import {
  FiFolder,
  FiBox,
  FiClock,
  FiBell,
  FiCalendar,
  FiDownload,
} from "react-icons/fi";
import Link from "next/link";

export default function Home() {
  const notifications = [
    "Nueva audiencia programada para el 15 de marzo.",
    "Cambio en normativa de documentación judicial.",
    "Mantenimiento del sistema el domingo a las 22:00.",
  ];

  return (
    <main className="bg-transparent text-gray-800 dark:text-gray-300 min-h-screen flex flex-col justify-center items-center transition-colors duration-300">
      <section className="text-center max-w-5xl mx-auto p-6 py-8">
        {/* Título principal con animación */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-6"
        >
          Bienvenidos al{" "}
          <span className="text-blue-700 dark:text-blue-400">SIGJ</span>
        </motion.h2>

        {/* Texto de Presentación con mejor separación visual */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-lg mb-6 text-gray-600 dark:text-gray-400 leading-relaxed"
        >
          Esta demostración ha sido desarrollada como una{" "}
          <strong>muestra de mis habilidades</strong> en desarrollo de software
          y soluciones informáticas. A través del{" "}
          <strong>Sistema Integral de Gestión Judicial (SIGJ)</strong>, busco
          ilustrar cómo herramientas digitales modernas pueden
          <strong> optimizar</strong> y <strong>modernizar</strong> la gestión
          administrativa en el{" "}
          <strong>Palacio de Tribunales de Mercedes</strong>, mejorando la
          eficiencia y facilitando el acceso a la información de manera
          organizada y segura.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg mb-6 text-gray-600 dark:text-gray-400 leading-relaxed"
        >
          Si bien el SIGJ está diseñado considerando{" "}
          <strong>posibles necesidades reales</strong> del tribunal, su
          propósito principal es demostrar mis capacidades en el desarrollo y
          optimización de sistemas digitales. No se trata de una propuesta de
          implementación obligatoria, sino de un ejemplo práctico de lo que
          puedo construir y adaptar en un entorno profesional.
        </motion.p>

        {/* Botón de Descarga de Documento de Presentación */}
        <motion.a
          href="/SIGJ_Presentacion.pdf"
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 inline-flex items-center bg-gray-700 dark:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 dark:hover:bg-gray-500 transition"
        >
          <FiDownload className="mr-2" /> Descargar Presentación
        </motion.a>

        {/* Panel de herramientas (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <BentoCard
            title="Gestión de Expedientes"
            description="Consulta y administra expedientes judiciales."
            icon={<FiFolder />}
            link="/expedientes"
          />
          <BentoCard
            title="Gestión de Recursos y Documentos"
            description="Administra y consulta documentos oficiales y administrativos."
            icon={<FiBox />}
            link="/recursos"
          />
          <BentoCard
            title="Historial de Acciones"
            description="Visualiza las últimas modificaciones realizadas."
            icon={<FiClock />}
            link="/historial"
          />
          <BentoCard
            title="Calendario Judicial"
            description="Revisa fechas clave y vencimientos."
            icon={<FiCalendar />}
            link="/calendario"
          />
        </div>

        {/* Sección de alertas y noticias */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <FiBell className="mr-2" /> Alertas y Noticias
          </h3>
          <ul className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md">
            {notifications.map((alert, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 py-1">
                • {alert}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

/* Componente reutilizable para las tarjetas del Bento Grid */
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
