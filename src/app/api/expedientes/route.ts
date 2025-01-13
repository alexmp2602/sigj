import { NextResponse } from "next/server";
import { z } from "zod";

let expedientes = [
  {
    id: 1,
    numero: "EXP-001",
    estado: "Abierto",
    partes: "Parte A vs Parte B",
    historial: [] as { cambio: string; fecha: string }[],
  },
  {
    id: 2,
    numero: "EXP-002",
    estado: "Cerrado",
    partes: "Parte C vs Parte D",
    historial: [],
  },
];

// Esquema de validación
const expedienteSchema = z.object({
  id: z.number().optional(),
  numero: z.string().min(1, "El número es obligatorio"),
  estado: z.enum(["Abierto", "Cerrado"]),
  partes: z.string().min(1, "Las partes son obligatorias"),
});

// GET: Devuelve expedientes con paginación, filtros y exportación
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const estado = searchParams.get("estado")?.toLowerCase();
  const format = searchParams.get("format");

  // Filtrado
  const filteredExpedientes = expedientes.filter((exp) => {
    const matchesSearch =
      exp.numero.toLowerCase().includes(search) ||
      exp.partes.toLowerCase().includes(search);
    const matchesEstado =
      !estado || exp.estado.toLowerCase() === estado;

    return matchesSearch && matchesEstado;
  });

  // Exportar a CSV
  if (format === "csv") {
    const csvData =
      "ID,Número,Estado,Partes\n" +
      filteredExpedientes
        .map((exp) => `${exp.id},${exp.numero},${exp.estado},${exp.partes}`)
        .join("\n");

    return new Response(csvData, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=expedientes.csv",
      },
    });
  }

  // Paginación
  const total = filteredExpedientes.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedExpedientes = filteredExpedientes.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedExpedientes,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}

// POST: Crea un nuevo expediente
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nuevoExpediente = expedienteSchema.omit({ id: true }).parse(body);

    const expedienteConId = {
      ...nuevoExpediente,
      id: expedientes.length + 1,
      historial: [],
    };
    expedientes.push(expedienteConId);

    return NextResponse.json(
      { data: expedienteConId, message: "Expediente creado con éxito" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof z.ZodError ? error.errors : "Error al procesar la solicitud" },
      { status: 400 }
    );
  }
}

// PUT: Actualiza un expediente y registra historial
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const expedienteActualizado = expedienteSchema.parse(body);

    expedientes = expedientes.map((exp) => {
      if (exp.id === expedienteActualizado.id) {
        return {
          ...exp,
          ...expedienteActualizado,
          historial: [
            ...exp.historial,
            {
              cambio: `Actualizado el expediente: ${JSON.stringify(expedienteActualizado)}`,
              fecha: new Date().toISOString(),
            },
          ],
        };
      }
      return exp;
    });

    return NextResponse.json({ message: "Expediente actualizado con éxito" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof z.ZodError ? error.errors : "Error al procesar la solicitud" },
      { status: 400 }
    );
  }
}

// DELETE: Elimina un expediente
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (typeof id !== "number") {
      throw new Error("El ID debe ser un número");
    }

    const index = expedientes.findIndex((exp) => exp.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Expediente no encontrado" }, { status: 404 });
    }

    expedientes.splice(index, 1);

    return NextResponse.json({ message: "Expediente eliminado con éxito" });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al procesar la solicitud" },
      { status: 400 }
    );
  }
}
