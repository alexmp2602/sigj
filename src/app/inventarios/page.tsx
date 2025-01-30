"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import ResourceForm from "@/components/ResourceForm";
import ResourceTable from "@/components/ResourceTable";

const StockChart = dynamic(() => import("../../components/StockChart"), {
  ssr: false,
});

interface Inventario {
  id: number;
  recurso: string;
  stock: number;
  duplicado?: boolean;
}

const schema = yup.object().shape({
  recurso: yup
    .string()
    .trim()
    .min(3, "El recurso debe tener al menos 3 caracteres.")
    .required("El nombre del recurso es obligatorio."),
  stock: yup
    .number()
    .typeError("El stock debe ser un número válido.")
    .min(1, "El stock debe ser al menos 1.")
    .required("La cantidad de stock es obligatoria."),
});

export default function Inventarios() {
  const [inventarios, setInventarios] = useState<Inventario[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingRecurso, setEditingRecurso] = useState<Inventario | null>(null);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { recurso: "", stock: 0 },
  });

  const { reset } = methods;

  // Fetch inicial
  useEffect(() => {
    const fetchInventarios = async () => {
      try {
        const res = await fetch("/api/inventarios");
        if (!res.ok) throw new Error("Error al cargar inventarios.");
        const data = await res.json();
        setInventarios(data);
      } catch (error) {
        toast.error(
          (error as Error).message || "Error al cargar los inventarios."
        );
        console.error(error);
      }
    };

    fetchInventarios();
  }, []);

  // Crear nuevo recurso
  const handleCreate = useCallback(
    async (data: { recurso: string; stock: number }) => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/inventarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Error al agregar el recurso.");

        const newItem = await res.json();
        setInventarios((prev) => [...prev, newItem]);
        reset();
        toast.success("Recurso agregado con éxito.");
      } catch (error) {
        toast.error(
          (error as Error).message || "Hubo un error al agregar el recurso."
        );
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [reset]
  );

  // Eliminar recurso
  const handleDelete = useCallback(
    async (id: number) => {
      const recurso = inventarios.find((item) => item.id === id);

      if (recurso?.duplicado) {
        setInventarios((prev) => prev.filter((i) => i.id !== id));
        toast.info("Recurso duplicado eliminado.");
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch("/api/inventarios", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Error desconocido.");

        setInventarios((prev) => prev.filter((i) => i.id !== id));
        toast.success("Recurso eliminado con éxito.");
      } catch (error) {
        toast.error(`Error: ${(error as Error).message}`);
        console.error("Error al eliminar:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [inventarios]
  );

  // Editar recurso
  const handleEdit = useCallback(
    async (id: number, recurso: string, stock: number) => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/inventarios", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, recurso, stock }),
        });

        if (!res.ok) throw new Error("Error al actualizar el recurso.");

        const updatedItem = await res.json();
        setInventarios((prev) =>
          prev.map((item) => (item.id === id ? updatedItem : item))
        );

        toast.success("Recurso actualizado con éxito.");
        setEditingRecurso(null);
      } catch (error) {
        toast.error(
          (error as Error).message || "Hubo un error al actualizar el recurso."
        );
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Duplicar recurso
  const handleDuplicate = useCallback((recurso: Inventario) => {
    const duplicate = { ...recurso, id: Date.now(), duplicado: true };
    setInventarios((prev) => [...prev, duplicate]);
    toast.success(`Recurso "${recurso.recurso}" duplicado con éxito.`);
  }, []);

  return (
    <div className="flex flex-col h-full p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario y tabla */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Gestión de Inventarios
          </h2>
          <FormProvider {...methods}>
            <ResourceForm onSubmit={handleCreate} isLoading={isLoading} />
          </FormProvider>
          <ResourceTable
            inventarios={inventarios}
            editingRecurso={editingRecurso}
            setEditingRecurso={setEditingRecurso}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDuplicate={handleDuplicate}
          />
        </div>
        {/* Gráfico */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <Suspense fallback={<p>Cargando gráfico...</p>}>
            <StockChart data={inventarios} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
