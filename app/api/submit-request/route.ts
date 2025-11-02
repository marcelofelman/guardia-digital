
import { NextRequest, NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

function formatMessage(payload: Record<string, unknown>) {
  const nombre = (payload.nombre as string) || "No especificado";
  const email = (payload.email as string) || "No especificado";
  const pais = (payload.pais as string) || "No especificado";
  const servicio = (payload.servicio as string) || "No especificado";
  const urgencia = (payload.urgencia as string) || "No especificado";
  const descripcion = (payload.descripcion as string) || "Sin descripción provista.";
  const acepta = payload.acepta ? "Sí" : "No";

  return [
    "**Nueva solicitud recibida**",
    `• Nombre: ${nombre}`,
    `• Email: ${email}`,
    `• País: ${pais}`,
    `• Servicio: ${servicio}`,
    `• Urgencia: ${urgencia}`,
    `• Aceptó términos: ${acepta}`,
    "",
    "**Descripción**",
    descripcion
  ].join("\n");
}

export async function POST(req: NextRequest) {
  if (!DISCORD_WEBHOOK_URL) {
    console.error("DISCORD_WEBHOOK_URL no está configurada.");
    return NextResponse.json({ ok: false, error: "Webhook no configurado" }, { status: 500 });
  }

  try {
    const data = await req.json();
    const message = formatMessage(data);

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message })
    });

    if (!response.ok) {
      console.error("Error al enviar a Discord:", await response.text());
      return NextResponse.json({ ok: false, error: "Error enviando a Discord" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}
