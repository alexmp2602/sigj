import { FiFolder, FiBox } from "react-icons/fi";

export default function Home() {
  return (
    <main className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-16">
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold mb-6">
          Bienvenido a{" "}
          <span className="text-blue-600 dark:text-blue-400">LexNova</span>
        </h2>
        <p className="text-lg mb-12 text-gray-600 dark:text-gray-300">
          Administra tus expedientes y controla inventarios de manera intuitiva
          y eficiente.
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
          {/* Gestión de Expedientes */}
          <a
            href="/expedientes"
            aria-label="Ir a Gestión de Expedientes"
            className="group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:border-blue-600 dark:hover:border-blue-400 border border-transparent"
          >
            <div className="flex items-center gap-4 mb-4">
              <FiFolder className="text-3xl text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition">
                Gestión de Expedientes
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Accede al listado de expedientes judiciales y gestiona casos.
            </p>
          </a>

          {/* Gestión de Inventarios */}
          <a
            href="/inventarios"
            aria-label="Ir a Gestión de Inventarios"
            className="group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:border-blue-600 dark:hover:border-blue-400 border border-transparent"
          >
            <div className="flex items-center gap-4 mb-4">
              <FiBox className="text-3xl text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition">
                Gestión de Inventarios
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Controla los recursos disponibles y gestiona el stock.
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}
