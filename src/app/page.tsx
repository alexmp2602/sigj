export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <section className="p-8">
        <h2 className="text-xl font-semibold mb-4">Bienvenido a LexNova</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <a
            href="/expedientes"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold">Gestión de Expedientes</h3>
            <p>Accede al listado de expedientes judiciales y gestiona casos.</p>
          </a>
          <a
            href="/inventarios"
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold">Gestión de Inventarios</h3>
            <p>Controla los recursos disponibles y gestiona el stock.</p>
          </a>
        </div>
      </section>
    </main>
  );
}
