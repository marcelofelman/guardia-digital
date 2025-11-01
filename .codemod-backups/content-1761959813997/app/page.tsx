
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-semibold">Servicios destacados</h2>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ServiceCard title="Recuperar cuentas hackeadas" description="WhatsApp, Facebook, Instagram. Verificación de identidad y guía oficial." href="/servicios/recuperar-cuenta" price="USD 99" />
          <ServiceCard title="Evaluación de seguridad para PyMEs" description="Revisión rápida/estándar con reporte de hallazgos y plan de 30–60 días." href="/servicios/evaluacion-seguridad-pyme" price="USD 349" />
          <ServiceCard title="Antecedentes por fuentes abiertas" description="Rastreo OSINT en fuentes públicas para personas/empresas." href="/servicios/antecedentes-fuentes-abiertas" price="USD 149" />
          <ServiceCard title="Recuperación post-incidente" description="Contención inicial y guía de recuperación para incidentes menores." href="/servicios/recuperacion-post-incidente" price="USD 399" />
          <ServiceCard title="Hardening básico para PyMEs" description="MFA, contraseñas, backups, roles, correo seguro: 10–15 políticas rápidas." href="/servicios/hardening-basico" price="USD 299" />
          <ServiceCard title="Simulación de phishing y concientización" description="Campaña controlada, métricas y micro-capacitación." href="/servicios/simulacion-phishing" price="USD 249" />
        </div>
      </section>
    </>
  );
}
