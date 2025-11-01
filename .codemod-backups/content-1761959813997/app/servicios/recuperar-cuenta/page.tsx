
export default function Page() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Recuperar cuentas hackeadas</h1>
      <div className="mt-4 grid gap-6">
        <div>
          <h2 className="text-xl font-semibold">Qué incluye</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700"><li>Verificación de identidad del titular</li><li>Guía de recuperación por canal oficial</li><li>Hardening básico post-recuperación</li></ul>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4"><div className="text-sm text-gray-500">SLA típico</div><div className="font-semibold">Primer contacto en 4h hábiles; intento inicial en 24–48h</div></div>
          <div className="border rounded-lg p-4"><div className="text-sm text-gray-500">Precio</div><div className="font-semibold">Desde USD 99</div></div>
          <div className="border rounded-lg p-4"><div className="text-sm text-gray-500">Qué necesitas</div><div className="text-gray-700">Evidencia de titularidad, usuario/teléfono, última actividad conocida</div></div>
        </div>
        <a href="/iniciar-solicitud" className="inline-block rounded-lg px-4 py-2 bg-accent text-white hover:opacity-90 w-fit">Iniciar solicitud</a>
      </div>
    </section>
  )
}
