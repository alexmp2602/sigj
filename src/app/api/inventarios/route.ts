import { NextResponse } from "next/server";

let inventarios = [
  { id: 1, recurso: "Papel", stock: 100 },
  { id: 2, recurso: "Toner", stock: 10 },
];

// GET: Devuelve todos los inventarios
export async function GET() {
  return NextResponse.json(inventarios);
}

// POST: Agrega un nuevo inventario
export async function POST(request: Request) {
  const { recurso, stock } = await request.json();
  const nuevoRecurso = { id: inventarios.length + 1, recurso, stock };
  inventarios.push(nuevoRecurso);
  return NextResponse.json(nuevoRecurso, { status: 201 });
}

// DELETE: Elimina un inventario
export async function DELETE(request: Request) {
  const { id } = await request.json();
  inventarios = inventarios.filter((item) => item.id !== id);
  return NextResponse.json({ message: "Recurso eliminado" });
}
