import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Definir la interfaz para los datos del formulario
interface ResourceFormData {
  recurso: string;
  stock: number; // El stock debe ser un número
}

// Esquema de validación con Yup
const resourceFormSchema = yup.object().shape({
  recurso: yup.string().required("El nombre del recurso es obligatorio."),
  stock: yup
    .number()
    .typeError("El stock debe ser un número.")
    .positive("El stock debe ser mayor a 0.")
    .default(0)
    .required("La cantidad de stock es obligatoria."),
});

// Hook personalizado para manejar el formulario de recursos
export function useResourceForm(
  onSubmit: SubmitHandler<ResourceFormData>,
  defaultValues: ResourceFormData = { recurso: "", stock: 0 }
) {
  const methods = useForm<ResourceFormData>({
    resolver: yupResolver(resourceFormSchema),
    defaultValues,
  });

  return {
    ...methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
}
