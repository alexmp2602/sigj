import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

let inventarios = [
  { id: uuidv4(), recurso: "Papel", stock: 100 },
  { id: uuidv4(), recurso: "Toner", stock: 10 },
];

// GET: Devuelve todos los inventarios
export async function GET() {
  return NextResponse.json(inventarios);
}

// POST: Agrega un nuevo inventario
export async function POST(request: Request) {
  try {
    const { recurso, stock } = await request.json();

    if (!recurso || typeof stock !== "number" || stock <= 0) {
      return NextResponse.json(
        { error: "Datos inválidos. Recurso y stock son obligatorios." },
        { status: 400 }
      );
    }

    const nuevoRecurso = { id: uuidv4(), recurso, stock };
    inventarios.push(nuevoRecurso);
    return NextResponse.json(nuevoRecurso, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al agregar el recurso." },
      { status: 500 }
    );
  }
}

// PUT: Actualiza un inventario existente
export async function PUT(request: Request) {
  try {
    const { id, recurso, stock } = await request.json();

    if (!id || !recurso || typeof stock !== "number" || stock <= 0) {
      return NextResponse.json(
        { error: "Datos inválidos. ID, recurso y stock son obligatorios." },
        { status: 400 }
      );
    }

    const recursoIndex = inventarios.findIndex((item) => item.id === id);
    if (recursoIndex === -1) {
      return NextResponse.json(
        { error: "Recurso no encontrado." },
        { status: 404 }
      );
    }

    inventarios[recursoIndex] = { id, recurso, stock };
    return NextResponse.json(inventarios[recursoIndex], { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar el recurso." },
      { status: 500 }
    );
  }
}

// DELETE: Elimina un inventario
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID del recurso es obligatorio." },
        { status: 400 }
      );
    }

    const recursoExistente = inventarios.some((item) => item.id === id);
    if (!recursoExistente) {
      return NextResponse.json(
        { error: "Recurso no encontrado." },
        { status: 404 }
      );
    }

    inventarios = inventarios.filter((item) => item.id !== id);
    return NextResponse.json({ message: "Recurso eliminado." });
  } catch {
    return NextResponse.json(
      { error: "Error al eliminar el recurso." },
      { status: 500 }
    );
  }
}
