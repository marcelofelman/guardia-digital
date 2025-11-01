
export default function Page() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Recuperación post-incidente (PyMEs)</h1>
      <div className="mt-4 grid gap-6">
        <div>
          <h2 className="text-xl font-semibold">Qué incluye</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700"><li>Contención inicial</li><li>Guía de recuperación</li><li>Restablecimiento de accesos</li><li>Recomendaciones de hardening</li></ul>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4"><div className="text-sm text-gray-500">SLA típico</div><div className="font-semibold">Contacto en 4h hábiles; acciones iniciales en 24h</div></div>
          <div className="border rounded-lg p-4"><div className="text-sm text-gray-500">Precio</div><div className="font-semibold">Desde USD 399</div></div>
          <div className="border rounded-lg p-4"><div className="text-sm text-gray-500">Qué necesitas</div><div className="text-gray-700">Acceso de emergencia y punto de contacto técnico</div></div>
        </div>
        <a href="/iniciar-solicitud" className="inline-block rounded-lg px-4 py-2 bg-accent text-white hover:opacity-90 w-fit">Iniciar solicitud</a>
      </div>
    </section>
  )
}
