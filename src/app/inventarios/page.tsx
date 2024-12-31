"use client";

import { useEffect, useState, Suspense } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import ResourceForm from "@/components/ResourceForm";
import ResourceTable from "@/components/ResourceTable";

const StockChart = dynamic(() => import("../../components/StockChart"), { ssr: false });

interface Inventario {
  id: number;
  recurso: string;
  stock: number;
}

const schema = yup.object().shape({
  recurso: yup.string().required("El nombre del recurso es obligatorio."),
  stock: yup
    .number()
    .typeError("El stock debe ser un número.")
    .positive("El stock debe ser mayor a 0.")
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
  const handleCreate = async (data: { recurso: string; stock: number }) => {
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

      setInventarios((prev) => prev.filter((i) => i.id !== id));
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

  // Editar recurso
  const handleEdit = async (id: number, recurso: string, stock: number) => {
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

      toast.success("Recurso actualizado con éxito.", {
        icon: <span>✅</span>,
      });
      setEditingRecurso(null);
    } catch (error) {
      toast.error("Hubo un error al actualizar el recurso.", {
        icon: <span>❌</span>,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Duplicar recurso
  const handleDuplicate = async (recurso: Inventario) => {
    const duplicate = { ...recurso, id: Date.now() }; // Generar un nuevo ID único
    setInventarios((prev) => [...prev, duplicate]); // Agregar el recurso duplicado a la lista
    toast.success(`Recurso "${recurso.recurso}" duplicado con éxito.`, {
      icon: <span>✅</span>,
    });
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sección de formulario y tabla */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Lista de Recursos
          </h2>

          {/* Formulario */}
          <FormProvider {...methods}>
            <ResourceForm onSubmit={(data: { recurso: string; stock: number | null }) => handleCreate({ ...data, stock: data.stock || 0 })} isLoading={isLoading} />
          </FormProvider>

          {/* Tabla */}
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
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 pt-6">
          <Suspense fallback={<p>Cargando gráfico...</p>}>
            <StockChart data={inventarios} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
