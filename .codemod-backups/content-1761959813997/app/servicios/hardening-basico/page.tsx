
export default function Page() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Hardening básico para PyMEs</h1>
      <div className="mt-4 grid gap-6">
        <div>
          <h2 className="text-xl font-semibold">Qué incluye</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700"><li>MFA y gestión de contraseñas</li><li>Backups y roles/ permisos</li><li>Correo seguro y políticas rápidas</li></ul>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4"><div className="text-sm text-gray-500">SLA típico</div><div className="font-semibold">5–7 días hábiles</div></div>
          <div className="border rounded-lg p-4"><div className="text-sm text-gray-500">Precio</div><div className="font-semibold">Desde USD 299</div></div>
          <div className="border rounded-lg p-4"><div className="text-sm text-gray-500">Qué necesitas</div><div className="text-gray-700">Cuentas admin y lista de usuarios</div></div>
        </div>
        <a href="/iniciar-solicitud" className="inline-block rounded-lg px-4 py-2 bg-accent text-white hover:opacity-90 w-fit">Iniciar solicitud</a>
      </div>
    </section>
  )
}
