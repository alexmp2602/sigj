import { FiFolder, FiBox } from "react-icons/fi";

export default function Home() {
  return (
    <main className="bg-transparent text-gray-800 dark:text-gray-300 min-h-screen flex flex-col justify-center items-center transition-colors duration-300">
  <section className="text-center max-w-5xl mx-auto px-8 py-16">
    <h2 className="text-4xl font-extrabold mb-6">
      Bienvenido al{" "}
      <span className="text-blue-700 dark:text-blue-400">SIGJ</span>
    </h2>
    <p className="text-lg mb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
      El <strong>Sistema Integral de Gestión Judicial</strong> (SIGJ) está diseñado
      específicamente para optimizar las operaciones del{" "}
      <strong>Palacio de Tribunales de Mercedes, Buenos Aires</strong>, así como de otros juzgados de la región.
    </p>
    <p className="text-lg mb-8 text-gray-600 dark:text-gray-400 leading-relaxed">
      Con herramientas modernas y fáciles de usar, SIGJ mejora la{" "}
      <strong>gestión de expedientes judiciales</strong>, los{" "}
      <strong>recursos administrativos</strong> y otros procesos clave, reduciendo tiempos administrativos y promoviendo una gestión más eficiente y transparente.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Gestión de Expedientes */}
      <a
        href="/expedientes"
        className="group flex flex-col items-center justify-center text-center p-6 rounded-lg hover:shadow-xl transform hover:scale-105 transition border border-gray-200 dark:border-gray-700 bg-transparent"
      >
        <FiFolder className="text-6xl text-blue-700 dark:text-blue-400 mb-4 group-hover:text-blue-800 dark:group-hover:text-blue-300" />
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          Gestión de Expedientes
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Simplifica la administración y el seguimiento de expedientes judiciales.
          Asegura un acceso rápido y organizado a la información clave de los casos.
        </p>
      </a>

      {/* Gestión de Inventarios */}
      <a
        href="/inventarios"
        className="group flex flex-col items-center justify-center text-center p-6 rounded-lg hover:shadow-xl transform hover:scale-105 transition border border-gray-200 dark:border-gray-700 bg-transparent"
      >
        <FiBox className="text-6xl text-blue-700 dark:text-blue-400 mb-4 group-hover:text-blue-800 dark:group-hover:text-blue-300" />
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          Gestión de Inventarios
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Administra de manera eficiente los recursos del tribunal, asegurando un
          control organizado del inventario administrativo.
        </p>
      </a>
    </div>
  </section>
</main>

  );
}
