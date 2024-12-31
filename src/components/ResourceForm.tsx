import { Controller, useFormContext } from "react-hook-form";

interface FormData {
  recurso: string;
  stock: number | null;
}

export default function ResourceForm({ onSubmit, isLoading }: { onSubmit: (data: FormData) => void; isLoading: boolean }) {
  const { handleSubmit, control, formState: { errors } } = useFormContext<FormData>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm"
    >
      <div className="flex-1">
        <Controller
          name="recurso"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Nombre del recurso"
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.recurso
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              } text-sm`}
            />
          )}
        />
        {errors.recurso && typeof errors.recurso.message === 'string' && (
          <p className="text-red-500 text-xs mt-1">{errors.recurso.message}</p>
        )}
      </div>

      <div className="flex-1">
        <Controller
          name="stock"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              placeholder="Cantidad de stock"
              value={field.value || ""}
              onChange={(e) => {
                const value = e.target.value === "" ? null : parseInt(e.target.value, 10);
                field.onChange(value);
              }}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.stock
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              } text-sm`}
            />
          )}
        />
        {errors.stock && <p className="text-red-500 text-xs mt-1">{String(errors.stock.message)}</p>}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-all duration-200 ease-in-out text-sm"
        disabled={isLoading}
      >
        {isLoading ? "Cargando..." : "Agregar"}
      </button>
    </form>
  );
}
