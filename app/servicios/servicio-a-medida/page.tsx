export default function Page() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Servicio a medida</h1>
      <p className="mt-2 text-gray-700">Servicios en base a tus necesidades. Contacta para un estimado</p>
      <div className="mt-4 grid gap-6">
        <div>
          <h2 className="text-xl font-semibold">Qué incluye</h2>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>Servicios a medida con profesionales de ciberseguridad.</li>
            <li>Servicios proactivos o reactivos para inviduos o empresas.</li>
            <li>Contáctate con nosotros para darte un presupuesto.</li>
          </ul>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">Duración típica</div>
            <div className="font-semibold">Según alcance</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">Precio</div>
            <div className="font-semibold">A convenir</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">Qué necesitas</div>
            <div className="text-gray-700">Contarnos objetivos, contexto y urgencia</div>
          </div>
        </div>
        <a href="/iniciar-solicitud" className="inline-block rounded-lg px-4 py-2 bg-accent text-white hover:opacity-90 w-fit">Iniciar solicitud</a>
      </div>
    </section>
  );
}
