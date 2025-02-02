"use client";

import { useState, useMemo, useTransition } from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { AnimatedHeader } from "@/components/AnimatedHeader";

export default function HistorialAcciones() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Actualizaciones de baja prioridad
  const [isPending] = useTransition();

  // Datos estáticos de ejemplo
  const historial = useMemo(
    () => [
      {
        user: "Juan Pérez",
        type: "Expediente",
        date: "2025-03-10",
        action: "Modificación de expediente #3021",
      },
      {
        user: "María Gómez",
        type: "Documento",
        date: "2025-03-09",
        action: "Carga de documento oficial en oficina N°5",
      },
      {
        user: "Carlos López",
        type: "Expediente",
        date: "2025-03-08",
        action: "Consulta de expediente #2918",
      },
      {
        user: "Ana Rodríguez",
        type: "Estado",
        date: "2025-03-07",
        action: "Actualización de estado en expediente #3054",
      },
      {
        user: "Luis Fernández",
        type: "Resolución",
        date: "2025-03-06",
        action: "Ingreso de nueva resolución judicial",
      },
      {
        user: "Sofía Méndez",
        type: "Notificación",
        date: "2025-03-05",
        action: "Envío de notificación a partes del caso #2876",
      },
    ],
    []
  );

  // Filtrado de datos
  const filteredHistorial = useMemo(() => {
    return historial.filter((entry) => {
      return (
        entry.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterType === "" || entry.type === filterType) &&
        (filterDate === "" || entry.date === filterDate) &&
        (filterUser === "" ||
          entry.user.toLowerCase().includes(filterUser.toLowerCase()))
      );
    });
  }, [historial, searchQuery, filterType, filterDate, filterUser]);

  // Ordenamiento
  const sortedHistorial = useMemo(() => {
    return [...filteredHistorial].sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date);
      } else if (sortBy === "user") {
        return sortOrder === "asc"
          ? a.user.localeCompare(b.user)
          : b.user.localeCompare(a.user);
      } else if (sortBy === "type") {
        return sortOrder === "asc"
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      }
      return 0;
    });
  }, [filteredHistorial, sortBy, sortOrder]);

  // Paginación
  const paginatedHistory = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedHistorial.slice(start, start + itemsPerPage);
  }, [sortedHistorial, currentPage]);

  const totalPages = Math.ceil(sortedHistorial.length / itemsPerPage);

  const clearFilters = () => {
    setSearchQuery("");
    setFilterType("");
    setFilterDate("");
    setFilterUser("");
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="max-w-7xl mx-auto rounded-lg p-6">
      {/* Encabezado con animación */}
      <AnimatedHeader
        className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2"
        variant="h1"
      >
        Historial de Acciones
      </AnimatedHeader>
      <AnimatedHeader
        className="text-gray-600 dark:text-gray-400 mb-6"
        variant="p"
      >
        Consulta todas las acciones registradas en el sistema.
      </AnimatedHeader>

      {/* Filtros activos */}
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
        {filterType && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Tipo: {filterType}{" "}
            <button
              onClick={() => setFilterType("")}
              className="ml-2 text-green-500"
            >
              ×
            </button>
          </span>
        )}
        {filterDate && (
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
            Fecha: {filterDate}{" "}
            <button
              onClick={() => setFilterDate("")}
              className="ml-2 text-purple-500"
            >
              ×
            </button>
          </span>
        )}
        {filterUser && (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            Usuario: {filterUser}{" "}
            <button
              onClick={() => setFilterUser("")}
              className="ml-2 text-yellow-500"
            >
              ×
            </button>
          </span>
        )}
      </div>

      {/* Barra de filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar acción..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border rounded-md focus:outline-none dark:bg-gray-700 dark:text-gray-200 text-sm w-full"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-3 border rounded-md focus:outline-none dark:bg-gray-700 dark:text-gray-200 text-sm w-full appearance-none bg-right bg-no-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
            backgroundSize: "1rem",
            backgroundPosition: "calc(100% - 0.75rem) center",
          }}
        >
          <option value="">Tipo</option>
          <option value="Expediente">Expediente</option>
          <option value="Documento">Documento</option>
          <option value="Estado">Estado</option>
          <option value="Resolución">Resolución</option>
          <option value="Notificación">Notificación</option>
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="p-3 border rounded-md focus:outline-none dark:bg-gray-700 dark:text-gray-200 text-sm w-full"
        />
        <input
          type="text"
          placeholder="Filtrar por usuario..."
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="p-3 border rounded-md focus:outline-none dark:bg-gray-700 dark:text-gray-200 text-sm w-full"
        />
      </div>

      {/* Botón para limpiar filtros */}
      <div className="mb-6">
        <button
          onClick={clearFilters}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Botones de ordenamiento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => handleSort("date")}
          className="flex items-center justify-center text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
        >
          Ordenar por Fecha{" "}
          {sortBy === "date" &&
            (sortOrder === "asc" ? (
              <FiArrowUp className="ml-2" />
            ) : (
              <FiArrowDown className="ml-2" />
            ))}
        </button>
        <button
          onClick={() => handleSort("user")}
          className="flex items-center justify-center text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
        >
          Ordenar por Usuario{" "}
          {sortBy === "user" &&
            (sortOrder === "asc" ? (
              <FiArrowUp className="ml-2" />
            ) : (
              <FiArrowDown className="ml-2" />
            ))}
        </button>
        <button
          onClick={() => handleSort("type")}
          className="flex items-center justify-center text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
        >
          Ordenar por Tipo{" "}
          {sortBy === "type" &&
            (sortOrder === "asc" ? (
              <FiArrowUp className="ml-2" />
            ) : (
              <FiArrowDown className="ml-2" />
            ))}
        </button>
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-blue-600 font-semibold">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      {/* Indicador de carga */}
      {isPending && (
        <div className="flex justify-center items-center mb-6" role="status" aria-live="polite">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="sr-only">Cargando...</span>
        </div>
      )}

      {/* Layout de tabla para escritorio */}
      <div className="hidden md:block">
        <table className="w-full text-left bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
          <caption className="sr-only">Historial de acciones</caption>
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-3">Usuario</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {paginatedHistory.length > 0 ? (
              paginatedHistory.map((entry, index) => (
                <tr key={index} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-transform duration-200 ease-in-out">
                  <td className="p-3">{entry.user}</td>
                  <td className="p-3">{entry.type}</td>
                  <td className="p-3">{entry.date}</td>
                  <td className="p-3">{entry.action}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No se encontraron registros para los filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Layout de tarjetas para móvil */}
      <div className="block md:hidden space-y-4">
        {paginatedHistory.length > 0 ? (
          paginatedHistory.map((entry, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow p-4">
              <div className="mb-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Usuario:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">{entry.user}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Tipo:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">{entry.type}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Fecha:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">{entry.date}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Acción:</span>
                <span className="ml-2 text-gray-900 dark:text-gray-100">{entry.action}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-gray-500">
            No se encontraron registros para los filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
}
