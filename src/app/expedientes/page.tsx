"use client";

import { useEffect, useState } from "react";

interface Expediente {
  id: number;
  numero: string;
  estado: string;
  partes: string;
}

export default function Expedientes() {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [nuevoExpediente, setNuevoExpediente] = useState({
    numero: "",
    estado: "",
    partes: "",
  });

  // Fetch inicial
  useEffect(() => {
    fetch("/api/expedientes")
      .then((res) => res.json())
      .then((data) => setExpedientes(data))
      .catch((error) => console.error("Error al cargar expedientes:", error));
  }, []);

  // Crear nuevo expediente
  const handleCreate = async () => {
    const res = await fetch("/api/expedientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoExpediente),
    });
    const data = await res.json();
    setExpedientes((prev) => [...prev, data]); // Agrega al listado
    setNuevoExpediente({ numero: "", estado: "", partes: "" }); // Limpia el formulario
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Gestión de Expedientes
      </h1>

      {/* Formulario de creación */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Crear Expediente
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Número"
            value={nuevoExpediente.numero}
            onChange={(e) =>
              setNuevoExpediente({ ...nuevoExpediente, numero: e.target.value })
            }
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
          />
          <input
            type="text"
            placeholder="Estado"
            value={nuevoExpediente.estado}
            onChange={(e) =>
              setNuevoExpediente({ ...nuevoExpediente, estado: e.target.value })
            }
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
          />
          <input
            type="text"
            placeholder="Partes"
            value={nuevoExpediente.partes}
            onChange={(e) =>
              setNuevoExpediente({ ...nuevoExpediente, partes: e.target.value })
            }
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <button
          onClick={handleCreate}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Crear
        </button>
      </div>

      {/* Tabla de expedientes */}
      <table className="w-full text-left bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
        <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="p-3">Número</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Partes</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {expedientes.map((exp) => (
            <tr
              key={exp.id}
              className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <td className="p-3">{exp.numero}</td>
              <td className="p-3">{exp.estado}</td>
              <td className="p-3">{exp.partes}</td>
              <td className="p-3">
                <button
                  onClick={async () => {
                    await fetch("/api/expedientes", {
                      method: "DELETE",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ id: exp.id }),
                    });
                    setExpedientes((prev) =>
                      prev.filter((e) => e.id !== exp.id)
                    );
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
