
# Guardia Digital — MVP Website (Next.js + Tailwind)

## Requisitos
- Node.js 18+
- Cuenta Vercel (opcional) y Stripe (opcional para MVP)

## Instalación
```bash
npm install
npm run dev
```
Abrir http://localhost:3000

## Estructura
- `app/` — App Router de Next.js
- `components/` — Navbar, Footer, etc.
- `app/api/submit-request/route.ts` — endpoint para el formulario (MVP: imprime en consola)

## Personalización
- Ajusta precios/Duración típica y contenido en las páginas de servicio.
- Conecta el endpoint a un servicio de email (Resend/Postmark) o base de datos.
- Configura Google Analytics/Tag Manager si deseas analítica.

## Despliegue
- Vercel recomendado: `vercel` o conectar repo.
