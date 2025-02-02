"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiActivity, FiEdit, FiX, FiSave } from "react-icons/fi";
import Image from "next/image";

// Definición del tipo de usuario
interface User {
  name: string;
  email: string;
  role: string;
  bio: string;
  profileImage: string;
}

export default function ProfilePage() {
  // Estado del usuario (datos simulados)
  const [userData, setUserData] = useState<User>({
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    role: "Abogado – Civil y Comercial",
    profileImage: "/img/profile-placeholder.png",
    bio: "Profesional con amplia experiencia en el ámbito judicial, comprometido con la optimización de procesos y la gestión integral de casos.",
  });

  const [activeTab, setActiveTab] = useState("info");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const tabs = [
    {
      key: "info",
      label: "Información Personal",
      icon: <FiUser className="mr-2" />,
    },
    {
      key: "activity",
      label: "Actividad Reciente",
      icon: <FiActivity className="mr-2" />,
    },
  ];

  return (
    <main className="text-gray-800 dark:text-gray-200 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        {/* Cabecera con foto y datos básicos */}
        <div className="p-6 flex flex-col sm:flex-row items-center gap-4 border-b border-gray-200 dark:border-gray-700">
          <Image
            src={userData.profileImage}
            alt="Foto de perfil"
            width={96}
            height={96}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {userData.role}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {userData.email}
            </p>
          </div>
        </div>

        {/* Sección de biografía */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <p className="text-base">{userData.bio}</p>
        </div>

        {/* Navegación tipo pestañas */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1 px-6 py-3 transition-colors duration-200 focus:outline-none ${
                activeTab === tab.key
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Contenido de la pestaña activa */}
        <div className="p-6">
          {activeTab === "info" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre
                </label>
                <p className="mt-1 text-base">{userData.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Correo Electrónico
                </label>
                <p className="mt-1 text-base">{userData.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rol
                </label>
                <p className="mt-1 text-base">{userData.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Biografía
                </label>
                <p className="mt-1 text-base">{userData.bio}</p>
              </div>
              <div>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  <FiEdit className="mr-2" />
                  Editar Perfil
                </button>
              </div>
            </div>
          )}
          {activeTab === "activity" && (
            <div className="space-y-4">
              <p className="text-base text-gray-600 dark:text-gray-400">
                No hay actividad reciente.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tus acciones recientes aparecerán aquí en cuanto se generen
                registros.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal para editar perfil */}
      <AnimatePresence>
        {isEditModalOpen && (
          <EditProfileModal
            onClose={() => setIsEditModalOpen(false)}
            user={userData}
            setUserData={setUserData}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

interface EditProfileModalProps {
  onClose: () => void;
  user: User;
  setUserData: (user: User) => void;
}

function EditProfileModal({
  onClose,
  user,
  setUserData,
}: EditProfileModalProps) {
  // Los datos iniciales se toman del usuario recibido
  const initialUser = {
    name: user.name,
    email: user.email,
    role: user.role,
    bio: user.bio,
    profileImage: user.profileImage,
  };

  const [name, setName] = useState(initialUser.name);
  const [email, setEmail] = useState(initialUser.email);
  const [role, setRole] = useState(initialUser.role);
  const [bio, setBio] = useState(initialUser.bio);
  // Solo almacenamos la URL para la vista previa; el archivo se guarda por separado si fuera necesario
  const [imagePreview, setImagePreview] = useState(initialUser.profileImage);
  const [, setSelectedFile] = useState<File | null>(null);

  // Referencia al input file oculto
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Se crea un objeto actualizado para simular la actualización
    const updatedData = {
      name,
      email,
      role,
      bio,
      profileImage: imagePreview,
    };
    try {
      const res = await fetch("/api/perfil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      console.log("Perfil actualizado:", data);
      // Actualizamos el estado del usuario en el componente padre
      setUserData(updatedData);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el perfil", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      {/* Overlay para cerrar el modal */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto z-10"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Editar Perfil</h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          >
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Actualizar foto de perfil */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="profileImage"
            >
              Foto de Perfil
            </label>
            <div className="flex items-center gap-4">
              <Image
                src={imagePreview}
                alt="Vista previa de la foto de perfil"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover"
              />
              {/* Input file oculto */}
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
              {/* Botón personalizado para disparar el input */}
              <button
                type="button"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition whitespace-nowrap"
              >
                Seleccionar imagen
              </button>
            </div>
          </div>

          {/* Campo Nombre */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Campo Correo Electrónico */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Campo Rol */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Rol
            </label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Campo Biografía */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            >
              Biografía
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <FiSave className="mr-2" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
