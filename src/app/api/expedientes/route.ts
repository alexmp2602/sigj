import { NextResponse } from "next/server";

let expedientes = [
  { id: 1, numero: "EXP-001", estado: "Abierto", partes: "Parte A vs Parte B" },
  { id: 2, numero: "EXP-002", estado: "Cerrado", partes: "Parte C vs Parte D" },
];

// GET: Devuelve todos los expedientes
export async function GET() {
  return NextResponse.json(expedientes);
}

// POST: Crea un nuevo expediente
export async function POST(request: Request) {
  const { numero, estado, partes } = await request.json();
  const nuevoExpediente = { id: expedientes.length + 1, numero, estado, partes };
  expedientes.push(nuevoExpediente);
  return NextResponse.json(nuevoExpediente, { status: 201 });
}

// PUT: Actualiza un expediente
export async function PUT(request: Request) {
  const { id, numero, estado, partes } = await request.json();
  expedientes = expedientes.map((exp) =>
    exp.id === id ? { id, numero, estado, partes } : exp
  );
  return NextResponse.json({ message: "Expediente actualizado" });
}

// DELETE: Elimina un expediente
export async function DELETE(request: Request) {
  const { id } = await request.json();
  expedientes = expedientes.filter((exp) => exp.id !== id);
  return NextResponse.json({ message: "Expediente eliminado" });
}
