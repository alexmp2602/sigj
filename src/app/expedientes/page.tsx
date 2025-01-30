"use client";

import { useState, useMemo } from "react";
import { FiEdit, FiTrash2, FiFileText } from "react-icons/fi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { exportToPDF } from "@/utils/exportUtils";
import ConfirmationModal from "@/components/ConfirmationModal";
import EditModal from "@/components/EditModal";

// Fetch Expedientes
const fetchExpedientes = async () => {
  const res = await fetch("/api/expedientes");
  if (!res.ok) throw new Error("Error al obtener expedientes");

  const json = await res.json();
  return json.data || [];
};

export default function Expedientes() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expedienteToDelete, setExpedienteToDelete] = useState<
    | {
        id: string;
        numero: string;
        estado: string;
        partes: string;
        ultimaModificacion: string;
      }
    | undefined
  >(undefined);
  const [isExporting, setIsExporting] = useState(false);
  const [expedienteToEdit, setExpedienteToEdit] = useState<{
    id: string;
    numero: string;
    estado: string;
    partes: string;
    ultimaModificacion: string;
  } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const itemsPerPage = 5;

  // React Query para obtener datos
  const { data: expedientes = [], isLoading } = useQuery({
    queryKey: ["expedientes"],
    queryFn: fetchExpedientes,
  });

  // Filtrar y Ordenar Expedientes
  const filteredExpedientes = useMemo(() => {
    return expedientes.filter(
      (exp: { numero: string; partes: string; estado: string }) => {
        const matchesSearch =
          exp.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exp.partes.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesEstado =
          estadoFilter === "" || exp.estado.toLowerCase() === estadoFilter;

        return matchesSearch && matchesEstado;
      }
    );
  }, [expedientes, searchQuery, estadoFilter]);

  // Paginación
  const paginatedExpedientes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredExpedientes.slice(start, end);
  }, [filteredExpedientes, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredExpedientes.length / itemsPerPage);

  const handleDelete = async () => {
    if (expedienteToDelete) {
      try {
        console.log("Eliminar expediente:", expedienteToDelete);

        queryClient.setQueryData(["expedientes"], (oldData: { id: string }[]) =>
          oldData.filter((exp) => exp.id !== expedienteToDelete.id)
        );

        toast.success("Expediente eliminado con éxito.");
      } catch (error) {
        toast.error(`Error: ${(error as Error).message}`);
        console.error("Error al eliminar:", error);
      } finally {
        setExpedienteToDelete(undefined);
      }
    }
  };

  const handleEdit = (expediente: {
    id: string;
    numero: string;
    estado: string;
    partes: string;
    ultimaModificacion: string;
  }) => {
    console.log("Editar expediente:", expediente);
    setExpedienteToEdit(expediente);
  };

  const handleSaveEdit = async (expediente: {
    id: string;
    numero: string;
    estado: string;
    partes: string;
    ultimaModificacion?: string;
  }) => {
    try {
      console.log("Guardar cambios del expediente:", expediente);

      // Actualizar el estado local después de guardar
      queryClient.setQueryData(
        ["expedientes"],
        (
          oldData: {
            id: string;
            numero: string;
            estado: string;
            partes: string;
            ultimaModificacion: string;
          }[]
        ) => oldData.map((exp) => (exp.id === expediente.id ? expediente : exp))
      );

      toast.success("Expediente actualizado con éxito.");
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
      console.error("Error al actualizar:", error);
    } finally {
      setExpedienteToEdit(null);
    }
  };

  const handleExport = async (type: "pdf") => {
    setIsExporting(true);
    try {
      if (type === "pdf") await exportToPDF(filteredExpedientes);
      toast.success(
        `Exportación a ${type.toUpperCase()} completada con éxito.`
      );
    } catch (error) {
      toast.error(`Error al exportar: ${(error as Error).message}`);
      console.error("Error al exportar:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleGenerateDocument = async (expediente: { id: string; numero: string; estado: string; partes: string; ultimaModificacion: string }) => {
    if (isDownloading) {
      toast.info("Ya hay una descarga en proceso. Espera un momento...");
      return;
    }

    setIsDownloading(true);

    try {
      const res = await fetch("/api/expedientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...expediente, generateDocument: true }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error desconocido en el servidor.");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `documento_${expediente.numero}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      toast.success("Documento generado con éxito.");
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`);
      console.error("Error al generar el documento:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-transparent shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Gestión de Expedientes {estadoFilter && `(${estadoFilter})`}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Administra, filtra y exporta expedientes con facilidad.
      </p>

      {/* Filtros Activos */}
      <div className="flex gap-2 flex-wrap mb-4">
        {searchQuery && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            Búsqueda: {searchQuery}{" "}
            <button
              onClick={() => setSearchQuery("")}
              className="ml-2 text-blue-500"
            >
              ×
            </button>
          </span>
        )}
        {estadoFilter && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Estado: {estadoFilter}{" "}
            <button
              onClick={() => setEstadoFilter("")}
              className="ml-2 text-green-500"
            >
              ×
            </button>
          </span>
        )}
      </div>

      {/* Barra de Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por número o partes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border rounded-md focus:outline-none dark:bg-gray-700 dark:text-gray-200 text-sm min-w-[200px]"
        />
        <select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
          className="p-3 border rounded-md focus:outline-none dark:bg-gray-700 dark:text-gray-200 text-sm min-w-[150px] appearance-none bg-right bg-no-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            backgroundSize: "1rem",
            backgroundPosition: "calc(100% - 0.75rem) center", // Ajusta la posición de la flecha
          }}
        >
          <option value="">Estado</option>
          <option value="abierto">Abierto</option>
          <option value="cerrado">Cerrado</option>
        </select>
      </div>

      {/* Controles de Paginación */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-blue-600 dark:text-blue-400 font-semibold">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {/* Botones de Exportación */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleExport("pdf")}
          className={`bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition flex items-center gap-2 ${
            isExporting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isExporting}
        >
          {isExporting ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          ) : (
            <>
              <FiFileText />
              Exportar a PDF
            </>
          )}
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-3">Número</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Partes</th>
              <th className="p-3">Última Modificación</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedExpedientes.length > 0 ? (
              paginatedExpedientes.map(
                (exp: {
                  id: string;
                  numero: string;
                  estado: string;
                  partes: string;
                  ultimaModificacion: string;
                }) => (
                  <tr
                    key={exp.id}
                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-transform duration-200 ease-in-out"
                  >
                    <td className="p-3">{exp.numero}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-md text-sm ${
                          exp.estado === "Abierto"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {exp.estado}
                      </span>
                    </td>
                    <td className="p-3">{exp.partes}</td>
                    <td className="p-3">{exp.ultimaModificacion}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="text-blue-500 hover:text-blue-700 transition transform hover:scale-105"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => setExpedienteToDelete(exp)}
                        className="text-red-500 hover:text-red-700 transition transform hover:scale-105"
                      >
                        <FiTrash2 />
                      </button>
                      <button
                        onClick={() => handleGenerateDocument(exp)}
                        className="text-green-500 hover:text-green-700 transition transform hover:scale-105"
                        disabled={isDownloading}
                      >
                        <FiFileText />
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No se encontraron expedientes para los filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Confirmación */}
      <ConfirmationModal
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar el expediente ${expedienteToDelete?.numero}?`}
        isOpen={!!expedienteToDelete}
        onCancel={() => setExpedienteToDelete(undefined)}
        onConfirm={handleDelete}
      />

      {/* Modal de Edición */}
      <EditModal
        isOpen={!!expedienteToEdit}
        expediente={expedienteToEdit}
        onCancel={() => setExpedienteToEdit(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
