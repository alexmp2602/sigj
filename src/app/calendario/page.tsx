"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import { AnimatedHeader } from "@/components/AnimatedHeader";
import { FiArrowUp, FiArrowDown, FiCalendar } from "react-icons/fi";

/**
 * Hook para debounced value: devuelve el valor pasado después de esperar el delay.
 */
function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export default function CalendarioJudicial() {
  // Estados para búsqueda, filtrado, orden y paginación.
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // useTransition para actualizaciones de baja prioridad
  const [isPending, startTransition] = useTransition();

  // Aplicamos debounce a la búsqueda para evitar actualizaciones innecesarias.
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Datos simulados para eventos judiciales.
  const events = useMemo(
    () => [
      {
        id: "1",
        date: "2025-03-15",
        time: "10:00",
        title: "Audiencia de inicio de juicio",
        description: "Audiencia inicial para el caso #3021 en la sala 3.",
      },
      {
        id: "2",
        date: "2025-03-18",
        time: "14:30",
        title: "Presentación de pruebas",
        description: "Presentación de pruebas en el caso #2918, sala 1.",
      },
      {
        id: "3",
        date: "2025-03-20",
        time: "09:00",
        title: "Audiencia de sentencia",
        description: "Sentencia en el caso #3054, sala 2.",
      },
      {
        id: "4",
        date: "2025-03-22",
        time: "11:00",
        title: "Audiencia de conciliación",
        description: "Reunión de conciliación en el caso #2890, sala 4.",
      },
      {
        id: "5",
        date: "2025-03-25",
        time: "15:00",
        title: "Informe de gestión judicial",
        description: "Presentación del informe trimestral de la sala 3.",
      },
      {
        id: "6",
        date: "2025-03-28",
        time: "08:30",
        title: "Revisión de documentos",
        description: "Revisión de pruebas y documentos en el caso #3021.",
      },
    ],
    []
  );

  // Filtrado de eventos por búsqueda (con el valor debounced) y fecha.
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
      const matchesDate = filterDate === "" || event.date === filterDate;
      return matchesSearch && matchesDate;
    });
  }, [events, debouncedSearchQuery, filterDate]);

  // Ordenar eventos por fecha (ascendente o descendente).
  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      return sortOrder === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date);
    });
  }, [filteredEvents, sortOrder]);

  // Paginación de eventos.
  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedEvents.slice(start, start + itemsPerPage);
  }, [sortedEvents, currentPage]);

  const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);

  // Alterna el orden de la lista.
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Limpia filtros de búsqueda y fecha.
  const clearFilters = () => {
    setSearchQuery("");
    setFilterDate("");
  };

  return (
    <div className="w-full bg-transparent max-w-7xl rounded-lg p-6">
      {/* Encabezado principal */}
      <AnimatedHeader
        className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2"
        variant="h1"
      >
        <FiCalendar size={32} className="text-blue-600 dark:text-blue-400" />
        Calendario Judicial
      </AnimatedHeader>
      <AnimatedHeader
        className="text-gray-600 dark:text-gray-400 mb-6"
        variant="p"
      >
        Consulta los próximos eventos judiciales y mantente informado.
      </AnimatedHeader>

      {/* Filtros activos */}
      <div className="flex gap-2 flex-wrap mb-4 justify-center">
        {searchQuery && (
          <span
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            aria-label={`Filtro de búsqueda activo: ${searchQuery}`}
          >
            Búsqueda: {searchQuery}{" "}
            <button onClick={() => setSearchQuery("")} className="ml-2 text-blue-500" aria-label="Eliminar filtro de búsqueda">
              ×
            </button>
          </span>
        )}
        {filterDate && (
          <span
            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
            aria-label={`Filtro de fecha activo: ${filterDate}`}
          >
            Fecha: {filterDate}{" "}
            <button onClick={() => setFilterDate("")} className="ml-2 text-purple-500" aria-label="Eliminar filtro de fecha">
              ×
            </button>
          </span>
        )}
      </div>

      {/* Barra de filtros */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por título o descripción..."
          value={searchQuery}
          onChange={(e) => startTransition(() => setSearchQuery(e.target.value))}
          className="p-3 border rounded-md focus:outline-none dark:bg-gray-700 dark:text-gray-200 text-sm"
          aria-label="Buscar eventos"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => startTransition(() => setFilterDate(e.target.value))}
          className="p-3 border rounded-md focus:outline-none dark:bg-gray-700 dark:text-gray-200 text-sm"
          aria-label="Filtrar por fecha"
        />
        <button
          onClick={clearFilters}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          aria-label="Limpiar filtros"
        >
          Limpiar filtros
        </button>
      </section>

      {/* Botón de ordenamiento */}
      <section className="mb-6 text-center">
        <button
          onClick={handleSort}
          className="flex items-center justify-center mx-auto text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
          aria-label={`Ordenar eventos ${sortOrder === "asc" ? "descendente" : "ascendente"}`}
        >
          Ordenar por Fecha{" "}
          {sortOrder === "asc" ? <FiArrowUp className="ml-2" /> : <FiArrowDown className="ml-2" />}
        </button>
      </section>

      {/* Indicador de carga */}
      {isPending && (
        <div className="flex justify-center items-center mb-6" role="status" aria-live="polite">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="sr-only">Cargando...</span>
        </div>
      )}

      {/* Layout de eventos */}
      <section className="mb-6">
        {/* Vista en escritorio */}
        <div className="hidden md:block">
          <table className="w-full text-left bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
            <caption className="sr-only">Próximos eventos</caption>
            <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="p-3">Fecha</th>
                <th className="p-3">Hora</th>
                <th className="p-3">Título</th>
                <th className="p-3">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.length > 0 ? (
                paginatedEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                  >
                    <td className="p-3">{event.date}</td>
                    <td className="p-3">{event.time}</td>
                    <td className="p-3 font-semibold">{event.title}</td>
                    <td className="p-3">{event.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
                    No se encontraron eventos para los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Vista en móviles */}
        <div className="block md:hidden space-y-4">
          {paginatedEvents.length > 0 ? (
            paginatedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow p-4"
                role="article"
                aria-label={`Evento: ${event.title}`}
              >
                <div className="mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Fecha:
                  </span>
                  <span className="ml-2 text-gray-900 dark:text-gray-100">
                    {event.date}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Hora:
                  </span>
                  <span className="ml-2 text-gray-900 dark:text-gray-100">
                    {event.time}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Título:
                  </span>
                  <span className="ml-2 text-gray-900 dark:text-gray-100">
                    {event.title}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Descripción:
                  </span>
                  <span className="ml-2 text-gray-900 dark:text-gray-100">
                    {event.description}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-gray-500">
              No se encontraron eventos para los filtros aplicados.
            </div>
          )}
        </div>
      </section>

      {/* Controles de paginación */}
      <nav className="flex justify-between items-center" aria-label="Controles de paginación">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          aria-label="Página anterior"
        >
          Anterior
        </button>
        <span className="text-blue-600 font-semibold" aria-live="polite">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          aria-label="Página siguiente"
        >
          Siguiente
        </button>
      </nav>
    </div>
  );
}
