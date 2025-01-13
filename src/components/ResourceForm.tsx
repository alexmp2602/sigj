import { Controller, useFormContext } from "react-hook-form";

interface FormData {
  recurso: string;
  stock: number;
}

export default function ResourceForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // Aseguramos que el stock nunca sea null
        onSubmit({
          recurso: data.recurso,
          stock: data.stock || 0,
        });
      })}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm"
      noValidate
    >
      {/* Campo: Recurso */}
      <div className="flex-1">
        <Controller
          name="recurso"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="text"
                placeholder="Nombre del recurso"
                aria-invalid={!!errors.recurso}
                aria-describedby="error-recurso"
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.recurso
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                } text-sm`}
              />
              {errors.recurso && (
                <p
                  id="error-recurso"
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.recurso.message as string}
                </p>
              )}
            </>
          )}
        />
      </div>

      {/* Campo: Stock */}
      <div className="flex-1">
        <Controller
          name="stock"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="number"
                placeholder="Cantidad de stock"
                value={field.value || 0} // Por defecto, el stock será 0
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? 0 : parseInt(e.target.value, 10);
                  field.onChange(value);
                }}
                aria-invalid={!!errors.stock}
                aria-describedby="error-stock"
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.stock
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                } text-sm`}
              />
              {errors.stock && (
                <p
                  id="error-stock"
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.stock.message as string}
                </p>
              )}
            </>
          )}
        />
      </div>

      {/* Botón de Envío */}
      <button
        type="submit"
        disabled={isLoading}
        className={`px-4 py-2 font-medium rounded-md text-sm transition-all duration-200 ease-in-out ${
          isLoading
            ? "bg-gray-400 text-gray-100 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Cargando..." : "Agregar"}
      </button>
    </form>
  );
}
