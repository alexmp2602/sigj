"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Importa iconos

interface Expediente {
  id: number;
  numero: string;
  estado: string;
  partes: string;
}

const schema = yup.object().shape({
  numero: yup.string().required("Número es obligatorio"),
  estado: yup.string().required("Estado es obligatorio"),
  partes: yup.string().required("Partes es obligatorio"),
});

export default function Expedientes() {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingExpediente, setEditingExpediente] = useState<Expediente | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      numero: "",
      estado: "",
      partes: "",
    },
  });

  // Fetch inicial
  useEffect(() => {
    fetch("/api/expedientes")
      .then((res) => res.json())
      .then((data) => setExpedientes(data))
      .catch((error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        toast.error("Error al cargar expedientes: " + errorMessage);
      });
  }, []);

  const handleSave = async (data: {
    numero: string;
    estado: string;
    partes: string;
  }) => {
    setIsLoading(true);
    try {
      if (editingExpediente) {
        const res = await fetch("/api/expedientes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editingExpediente, ...data }),
        });

        if (!res.ok) throw new Error("Error al actualizar el expediente");

        setExpedientes((prev) =>
          prev.map((e) =>
            e.id === editingExpediente.id ? { ...e, ...data } : e
          )
        );
        toast.success("Expediente actualizado correctamente");
      } else {
        const res = await fetch("/api/expedientes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Error al crear el expediente");

        const newExpediente = await res.json();
        setExpedientes((prev) => [...prev, newExpediente]);
        toast.success("Expediente creado correctamente");
      }
      reset();
      setEditingExpediente(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar expediente
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/expedientes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Error al eliminar el expediente");

      setExpedientes((prev) => prev.filter((e) => e.id !== id));
      toast.success("Expediente eliminado correctamente");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      toast.error("Error al eliminar el expediente: " + errorMessage);
    }
  };

  // Filtro de búsqueda
  const filteredExpedientes = expedientes.filter(
    (exp) =>
      exp.numero.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.estado.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.partes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Gestión de Expedientes
      </h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar expediente..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
      />

      {/* Formulario */}
      <form
        onSubmit={handleSubmit(handleSave)}
        className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6"
      >
        <Controller
          name="numero"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Número"
              className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.numero
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              }`}
            />
          )}
        />
        <Controller
          name="estado"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Estado"
              className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.estado
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              }`}
            />
          )}
        />
        <Controller
          name="partes"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Partes"
              className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.partes
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              }`}
            />
          )}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-600 text-white px-6 py-3 rounded-md ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isLoading
            ? "Guardando..."
            : editingExpediente
            ? "Actualizar"
            : "Crear"}
        </button>
      </form>

      {/* Tabla */}
      <div className="overflow-x-auto">
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
            {filteredExpedientes.map((exp) => (
              <tr
                key={exp.id}
                className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <td className="p-3">{exp.numero}</td>
                <td className="p-3">{exp.estado}</td>
                <td className="p-3">{exp.partes}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => setEditingExpediente(exp)}
                    className="text-blue-500 hover:text-blue-700 transition flex items-center gap-1"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="text-red-500 hover:text-red-700 transition flex items-center gap-1"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
