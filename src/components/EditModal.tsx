import React, { useState, useEffect } from "react";

interface EditModalProps {
  isOpen: boolean;
  expediente: { id: string; numero: string; estado: string; partes: string } | null;
  onCancel: () => void;
  onSave: (expediente: { id: string; numero: string; estado: string; partes: string }) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, expediente, onCancel, onSave }) => {
  const [numero, setNumero] = useState("");
  const [estado, setEstado] = useState("");
  const [partes, setPartes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (expediente) {
      setNumero(expediente.numero);
      setEstado(expediente.estado);
      setPartes(expediente.partes);
      setError("");
    }
  }, [expediente]);

  const handleSave = () => {
    if (!numero.trim() || !estado.trim() || !partes.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
    onSave({ ...expediente!, numero, estado, partes });
  };

  if (!isOpen || !expediente) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50 transition-opacity animate-fade-in">
      <div
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-md relative transition-transform animate-scale-in"
      >
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-white hover:text-gray-400 text-2xl"
          aria-label="Cerrar"
        >
          &times;
        </button>
        <h2 id="modal-title" className="text-2xl font-bold mb-4 text-blue-400">Editar Expediente</h2>
        <p id="modal-description" className="sr-only">Formulario para editar los datos del expediente.</p>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        
        <div className="mb-4">
          <label htmlFor="numero" className="block text-gray-300">Número</label>
          <input
            id="numero"
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="estado" className="block text-gray-300">Estado</label>
          <input
            id="estado"
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="partes" className="block text-gray-300">Partes</label>
          <input
            id="partes"
            type="text"
            value={partes}
            onChange={(e) => setPartes(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!numero.trim() || !estado.trim() || !partes.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
