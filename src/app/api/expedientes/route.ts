import { NextResponse } from "next/server";
import { z } from "zod";
import { createDocument } from "@/utils/documentUtils";

// Simulación de expedientes en memoria
let expedientes = [
  {
    id: 1,
    numero: "EXP-001",
    estado: "Abierto",
    partes: "Parte A vs Parte B",
    ultimaModificacion: "2024-01-30",
  },
  {
    id: 2,
    numero: "EXP-002",
    estado: "Cerrado",
    partes: "Parte C vs Parte D",
    ultimaModificacion: "2024-01-25",
  },
];

// Esquema de validación para expedientes
const expedienteSchema = z.object({
  id: z.number().optional(),
  numero: z.string().min(1, "El número es obligatorio"),
  estado: z.enum(["Abierto", "Cerrado"]),
  partes: z.string().min(1, "Las partes son obligatorias"),
  ultimaModificacion: z.string().optional(),
});

// ✅ **GET: Obtener expedientes con filtros**
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const estado = searchParams.get("estado")?.toLowerCase();

  const filteredExpedientes = expedientes.filter((exp) => {
    const matchesSearch =
      exp.numero.toLowerCase().includes(search) ||
      exp.partes.toLowerCase().includes(search);
    const matchesEstado = !estado || exp.estado.toLowerCase() === estado;

    return matchesSearch && matchesEstado;
  });

  return NextResponse.json({ data: filteredExpedientes });
}

// ✅ **POST: Crear un nuevo expediente o generar documento**
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // ✅ Si la solicitud incluye `generateDocument`, generamos un PDF en lugar de crear un expediente
    if (body.generateDocument) {
      if (!body.numero) {
        return NextResponse.json(
          { error: "Datos del expediente inválidos." },
          { status: 400 }
        );
      }

      const pdfBuffer = await createDocument(body);
      return new Response(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename=documento_${body.numero}.pdf`,
        },
      });
    }

    // ✅ Si no se requiere generación de documento, creamos un nuevo expediente
    const nuevoExpediente = expedienteSchema.omit({ id: true }).parse(body);
    const expedienteConId = {
      ...nuevoExpediente,
      id: expedientes.length + 1,
      ultimaModificacion: new Date().toISOString(),
    };

    expedientes.push(expedienteConId);

    return NextResponse.json(
      { data: expedienteConId, message: "Expediente creado con éxito" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof z.ZodError
            ? error.errors
            : "Error al procesar la solicitud",
      },
      { status: 400 }
    );
  }
}

// ✅ **PUT: Actualizar un expediente**
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const expedienteActualizado = expedienteSchema.parse(body);

    expedientes = expedientes.map((exp) =>
      exp.id === expedienteActualizado.id
        ? {
            ...exp,
            ...expedienteActualizado,
            ultimaModificacion: new Date().toISOString(),
          }
        : exp
    );

    return NextResponse.json({ message: "Expediente actualizado con éxito" });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof z.ZodError
            ? error.errors
            : "Error al procesar la solicitud",
      },
      { status: 400 }
    );
  }
}

// ✅ **DELETE: Eliminar un expediente**
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (typeof id !== "number") {
      throw new Error("El ID debe ser un número");
    }

    expedientes = expedientes.filter((exp) => exp.id !== id);

    return NextResponse.json({ message: "Expediente eliminado con éxito" });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error al procesar la solicitud",
      },
      { status: 400 }
    );
  }
}
