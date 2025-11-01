
"use client";
import { useState } from "react";

export default function IniciarSolicitud() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/submit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Error");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold">Iniciar solicitud</h1>
      <p className="mt-2 text-gray-700">Cuéntanos qué necesitas. Te contactaremos en horario laboral.</p>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <div className="grid gap-1">
          <label className="text-sm">Nombre y apellido</label>
          <input name="nombre" required className="border rounded-lg px-3 py-2" />
        </div>
        <div className="grid gap-1">
          <label className="text-sm">Correo electrónico</label>
          <input type="email" name="email" required className="border rounded-lg px-3 py-2" />
        </div>
        <div className="grid gap-1">
          <label className="text-sm">País</label>
          <input name="pais" className="border rounded-lg px-3 py-2" />
        </div>
        <div className="grid gap-1">
          <label className="text-sm">Tipo de servicio</label>
          <select name="servicio" className="border rounded-lg px-3 py-2">
            <option>Recuperar cuentas hackeadas</option>
            <option>Evaluación de seguridad para PyMEs</option>
            <option>Investigación de personas y empresas</option>
            <option>Recuperación tras un hackeo</option>
            <option>Refuerzo de seguridad básico</option>
            <option>Simulación de phishing y concientización</option>
          </select>
        </div>
        <div className="grid gap-1">
          <label className="text-sm">Descripción breve del caso</label>
          <textarea name="descripcion" rows={4} className="border rounded-lg px-3 py-2" />
        </div>
        <div className="grid gap-1">
          <label className="text-sm">Urgencia</label>
          <select name="urgencia" className="border rounded-lg px-3 py-2">
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="acepta" required />
          <span className="text-sm">Acepto Política de Privacidad y Términos</span>
        </div>
        <button className="rounded-lg px-4 py-2 bg-accent text-white hover:opacity-90 w-fit">Enviar solicitud</button>
        {status === "ok" && <div className="text-green-600 text-sm">Solicitud enviada. Te contactaremos por correo.</div>}
        {status === "error" && <div className="text-red-600 text-sm">Hubo un error. Intenta nuevamente.</div>}
      </form>
    </section>
  );
}
