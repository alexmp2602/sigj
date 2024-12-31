import { FiTrash2, FiEdit, FiCopy } from "react-icons/fi";

export default function ResourceTable({
  inventarios,
  editingRecurso,
  setEditingRecurso,
  handleEdit,
  handleDelete,
  handleDuplicate,
}: {
  inventarios: { id: number; recurso: string; stock: number }[];
  editingRecurso: { id: number; recurso: string; stock: number } | null;
  setEditingRecurso: (
    resource: { id: number; recurso: string; stock: number } | null
  ) => void;
  handleEdit: (id: number, recurso: string, stock: number) => void;
  handleDelete: (id: number) => void;
  handleDuplicate: (resource: {
    id: number;
    recurso: string;
    stock: number;
  }) => void;
}) {
  return (
    <div className="overflow-x-auto text-sm mb-4">
      {/* Tabla tradicional para pantallas medianas y grandes */}
      <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700 text-sm hidden md:table">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-2 text-left text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
              Recurso
            </th>
            <th className="p-2 text-left text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
              Stock
            </th>
            <th className="p-2 text-left text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {inventarios.map((inv) => (
            <tr
              key={inv.id}
              className={`${
                inv.stock < 5
                  ? "bg-red-50 dark:bg-red-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              <td className="p-2 text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 truncate max-w-xs">
                {editingRecurso?.id === inv.id ? (
                  <input
                    type="text"
                    value={editingRecurso.recurso}
                    onChange={(e) =>
                      setEditingRecurso({
                        ...editingRecurso,
                        recurso: e.target.value,
                      })
                    }
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  />
                ) : (
                  inv.recurso
                )}
              </td>
              <td
                className={`p-2 text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 ${
                  inv.stock < 5 ? "text-red-500 font-bold" : ""
                }`}
              >
                {editingRecurso?.id === inv.id ? (
                  <input
                    type="number"
                    value={editingRecurso.stock}
                    onChange={(e) =>
                      setEditingRecurso({
                        ...editingRecurso,
                        stock: Number(e.target.value),
                      })
                    }
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  />
                ) : (
                  inv.stock
                )}
              </td>
              <td className="p-2 text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600">
                <div className="flex items-center gap-2 justify-start">
                  {editingRecurso?.id === inv.id ? (
                    <>
                      <button
                        onClick={() =>
                          handleEdit(
                            editingRecurso.id,
                            editingRecurso.recurso,
                            editingRecurso.stock
                          )
                        }
                        className="text-green-500 hover:text-green-700 transition"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingRecurso(null)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingRecurso(inv)}
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(inv.id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
                      >
                        <FiTrash2 />
                      </button>
                      <button
                        onClick={() => handleDuplicate(inv)}
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition"
                      >
                        <FiCopy />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Alternativa para pantallas pequeñas */}
      <div className="block md:hidden">
        {inventarios.map((inv) => (
          <div
            key={inv.id}
            className={`p-4 mb-4 border rounded-lg ${
              inv.stock < 5
                ? "bg-red-50 dark:bg-red-800"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            {editingRecurso?.id === inv.id ? (
              <>
                <input
                  type="text"
                  value={editingRecurso.recurso}
                  onChange={(e) =>
                    setEditingRecurso({
                      ...editingRecurso,
                      recurso: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Nombre del recurso"
                />
                <input
                  type="number"
                  value={editingRecurso.stock}
                  onChange={(e) =>
                    setEditingRecurso({
                      ...editingRecurso,
                      stock: Number(e.target.value),
                    })
                  }
                  className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Cantidad de stock"
                />
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() =>
                      handleEdit(
                        editingRecurso.id,
                        editingRecurso.recurso,
                        editingRecurso.stock
                      )
                    }
                    className="text-green-500 hover:text-green-700 transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingRecurso(null)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Recurso:</span> {inv.recurso}
                </p>
                <p
                  className={`text-gray-800 dark:text-gray-200 ${
                    inv.stock < 5 ? "text-red-500 font-bold" : ""
                  }`}
                >
                  <span className="font-semibold">Stock:</span> {inv.stock}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => setEditingRecurso(inv)}
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(inv.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 />
                  </button>
                  <button
                    onClick={() => handleDuplicate(inv)}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition"
                  >
                    <FiCopy />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
