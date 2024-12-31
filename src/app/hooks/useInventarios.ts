import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface Inventario {
  id: number;
  recurso: string;
  stock: number;
}

export function useInventarios() {
  const [inventarios, setInventarios] = useState<Inventario[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiRequest = useCallback(async <T>(
    url: string,
    method: string,
    body?: Record<string, unknown>
  ): Promise<T> => {
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }, []);

  const handleCreate = async (data: { recurso: string; stock: number }) => {
    setIsLoading(true);
    try {
      const newItem = await apiRequest<Inventario>(
        "/api/inventarios",
        "POST",
        data
      );
      setInventarios((prev) => [...prev, newItem]);
      toast.success("Recurso agregado con éxito.");
    } catch {
      toast.error("Error al agregar el recurso.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id: number, recurso: string, stock: number) => {
    setIsLoading(true);
    try {
      const updatedItem = await apiRequest<Inventario>("/api/inventarios", "PUT", {
        id,
        recurso,
        stock,
      });
      setInventarios((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );
      toast.success("Recurso actualizado con éxito.");
    } catch {
      toast.error("Error al actualizar el recurso.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await apiRequest<void>("/api/inventarios", "DELETE", { id });
      setInventarios((prev) => prev.filter((i) => i.id !== id));
      toast.info("Recurso eliminado.");
    } catch {
      toast.error("Error al eliminar el recurso.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicate = (recurso: Inventario) => {
    const duplicate = { ...recurso, id: Date.now() };
    setInventarios((prev) => [...prev, duplicate]);
    toast.success(`Recurso "${recurso.recurso}" duplicado con éxito.`);
  };

  return {
    inventarios,
    isLoading,
    handleCreate,
    handleEdit,
    handleDelete,
    handleDuplicate,
    setInventarios,
  };
}
