import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  console.log("Perfil actualizado:", data);
  // Simulación: se puede devolver el objeto actualizado o un mensaje de éxito.
  return NextResponse.json({ success: true, user: data });
}
