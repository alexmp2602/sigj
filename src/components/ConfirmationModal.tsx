"use client";

interface ConfirmationModalProps {
  title: string; // Título del modal
  message: string; // Mensaje del modal
  isOpen: boolean; // Si el modal está visible
  onConfirm: () => void; // Acción a ejecutar al confirmar
  onCancel: () => void; // Acción a ejecutar al cancelar
}

export default function ConfirmationModal({
  title,
  message,
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
