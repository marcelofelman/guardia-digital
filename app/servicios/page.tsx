
import ServiceCard from "../../components/ServiceCard";

export default function Servicios() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Servicios</h1>
      <p className="mt-2 text-gray-700">Servicios estandarizados, entregados por equipos verificados. Selecciona el que necesitas para ver el detalle y solicitar.</p>
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ServiceCard title="Recuperar cuentas hackeadas" description="WhatsApp, Facebook, Instagram." href="/servicios/recuperar-cuenta" price="Desde USD 49" />
        <ServiceCard title="Evaluación de seguridad para PyMEs" description="Rápida/estándar con reporte y plan de mejora." href="/servicios/evaluacion-seguridad-pyme" price="Desde USD 199" />
        <ServiceCard title="Antecedentes por fuentes abiertas" description="OSINT para personas/empresas." href="/servicios/antecedentes-fuentes-abiertas" price="Desde USD 99" />
        <ServiceCard title="Recuperación tras un hackeo" description="Contención inicial para incidentes menores." href="/servicios/recuperacion-post-incidente" price="Desde USD 199" />
        <ServiceCard title="Refuerzo de seguridad básico para PyMEs" description="Implementación de controles esenciales." href="/servicios/hardening-basico" price="Desde USD 199" />
        <ServiceCard title="Simulación de phishing y concientización" description="Ejercicio controlado y capacitación." href="/servicios/simulacion-phishing" price="USD 199" />
      </div>
    </section>
  );
}
