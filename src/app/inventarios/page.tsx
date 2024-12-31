"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StockChart from "../../components/StockChart";

interface Inventario {
  id: number;
  recurso: string;
  stock: number;
}

export default function Inventarios() {
  const [inventarios, setInventarios] = useState<Inventario[]>([]);
  const [nuevoRecurso, setNuevoRecurso] = useState({
    recurso: "",
    stock: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch inicial
  useEffect(() => {
    const fetchInventarios = async () => {
      try {
        const res = await fetch("/api/inventarios");
        if (!res.ok) throw new Error("Error al cargar inventarios");
        const data = await res.json();
        setInventarios(data);
      } catch (error) {
        toast.error("Error al cargar los inventarios.", {
          icon: <span>❌</span>,
        });
        console.error(error);
      }
    };

    fetchInventarios();
  }, []);

  // Crear nuevo recurso
  const handleCreate = async () => {
    if (!nuevoRecurso.recurso || nuevoRecurso.stock <= 0) {
      toast.error("Por favor, completa todos los campos con valores válidos.", {
        icon: <span>⚠️</span>,
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/inventarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoRecurso),
      });

      if (!res.ok) throw new Error("Error al agregar el recurso.");

      const data = await res.json();
      setInventarios((prev) => [...prev, data]); // Agrega al listado
      setNuevoRecurso({ recurso: "", stock: 0 }); // Limpia el formulario
      toast.success("Recurso agregado con éxito.", {
        icon: <span>✅</span>,
      });
    } catch (error) {
      toast.error("Hubo un error al agregar el recurso.", {
        icon: <span>❌</span>,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar recurso
  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/inventarios", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Error al eliminar el recurso.");

      setInventarios((prev) => prev.filter((i) => i.id !== id)); // Elimina del listado
      toast.info("Recurso eliminado.", {
        icon: <span>🗑️</span>,
      });
    } catch (error) {
      toast.error("Hubo un error al eliminar el recurso.", {
        icon: <span>❌</span>,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Gestión de Inventarios
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lista de recursos */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Lista de Recursos
          </h2>
          {/* Formulario */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
            className="flex flex-col md:flex-row gap-4 mb-6"
          >
            <input
              type="text"
              placeholder="Ingrese el nombre del recurso"
              value={nuevoRecurso.recurso}
              onChange={(e) =>
                setNuevoRecurso({ ...nuevoRecurso, recurso: e.target.value })
              }
              className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            />
            <input
              type="number"
              placeholder="Ingrese cantidad de stock"
              value={nuevoRecurso.stock}
              onChange={(e) =>
                setNuevoRecurso({
                  ...nuevoRecurso,
                  stock: parseInt(e.target.value),
                })
              }
              className="w-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            />
            <button
              type="submit"
              className={`btn btn-primary hover:scale-105 transition-transform duration-150 ease-in-out ${
                isLoading ? "loading" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Agregar"}
            </button>
          </form>
          {/* Tabla con scroll interno */}
          <div className="overflow-y-auto max-h-80">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="text-left p-3 text-gray-800 dark:text-gray-200">
                    Recurso
                  </th>
                  <th className="text-left p-3 text-gray-800 dark:text-gray-200">
                    Stock
                  </th>
                  <th className="text-left p-3 text-gray-800 dark:text-gray-200">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventarios.map((inv) => (
                  <tr
                    key={inv.id}
                    className={`hover:bg-gray-100 dark:hover:bg-gray-600 ${
                      inv.stock < 5 ? "bg-red-50 dark:bg-red-800" : ""
                    }`}
                  >
                    <td className="p-3 text-gray-700 dark:text-gray-200">
                      {inv.recurso}
                    </td>
                    <td
                      className={`p-3 ${
                        inv.stock < 5
                          ? "text-red-500 font-bold"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {inv.stock}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(inv.id)}
                        className="btn btn-sm btn-error flex items-center gap-2"
                        aria-label={`Eliminar recurso ${inv.recurso}`}
                        disabled={isLoading}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Columna derecha: Gráfico */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <StockChart data={inventarios} />
        </div>
      </div>
    </div>
  );
}
