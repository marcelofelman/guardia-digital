# Guardia Digital — agents.md

## Resumen del encargo

Documento técnico y creativo para la implementación de la landing page (Home) y estructura UI de un sitio corporativo para Guardia Digital. Objetivo: crear una landing visualmente deslumbrante (estética Awwwards) usando Next.js + pnpm + TypeScript + shadcn + lucide-react, con animaciones avanzadas sólo en la página principal (Home) mediante Framer Motion y efectos WebGL/WebGPU. El resto del sitio usará micro-animaciones de UI (cards, gradientes, bordes animados) y una arquitectura de componentes reutilizables para permitir cambios desde un único lugar.

---

## Objetivos específicos

* Home: efecto visual impactante (WebGL / WebGPU + Framer Motion) con smooth scrolling.
* Resto: componentes limpios con estilos consistentes (shadcn) y micro-animaciones.
* Selector animado de dark mode (claro, oscuro, sistema)
* Formularios: seguro, validado con Zod, CSRF, captcha configurable por .env; un único endpoint que recibe solicitudes y diferencia el asunto según un campo select.
* Reutilización: header con titulo y menus, footer; cards, botones y layouts centralizados (theme/system) para cambios globales.
* Performance: lazy-load assets WebGL, técnicas LCP-friendly, fallback 2D para dispositivos con GPU limitada.
* Accesibilidad y SEO: marcado semántico, ARIA donde corresponda, meta tags y Open Graph.

---

## Stack tecnológico

* Node.js + pnpm
* Next.js (App Router recomendado)
* TypeScript
* shadcn/ui (componentes base)
* lucide-react (iconografía)
* Framer Motion (animaciones JS declarativas)
* react-three-fiber (three.js) para WebGL; opcional: solución WebGPU experimental con `@react-three/fiber` + `three` + `three/examples/jsm/capabilities/` o un wrapper WebGPU si se decide
  -zustand (opcional) o Context API para estado UI compartido
* Zod para validación de formularios
* csurf (o middleware integrado) para CSRF server-side
* API route con Next.js -> endpoint POST `/api/solicitudes` para persistencia
* Integración opcional con Google reCAPTCHA v3 o Cloudflare Turnstile configurable vía .env

---

## Comandos iniciales

```bash
pnpm create next-app@latest guardia-digital --ts
cd guardia-digital
# Instalar dependencias
pnpm add shadcn-ui lucide-react framer-motion three @react-three/fiber zod react-hook-form zustand
pnpm add -D @types/node
```

---

## Variables de entorno recomendadas (.env.local)

```
NEXT_PUBLIC_SITE_TITLE="Guardia Digital"
NEXT_PUBLIC_API_BASE_URL="/api"
NEXT_PUBLIC_TWITTER_URL=""
NEXT_PUBLIC_LINKEDIN_URL=""
NEXT_PUBLIC_INSTAGRAM_URL=""
# Captcha config (opcional)
CAPTCHA_PROVIDER="" # values: none|recaptcha|turnstile
RECAPTCHA_SITE_KEY=""
RECAPTCHA_SECRET_KEY=""
TURNSTILE_SITE_KEY=""
TURNSTILE_SECRET_KEY=""
# Email/Storage
NOTIFICATION_EMAIL="ops@guardiadigital.example"
# Feature flags
ENABLE_SMOOTH_SCROLLING=true
```

---

## Estructura propuesta (sugerida)

```
/app
  /components
    /ui                # botones, inputs, cards, badges (single source of truth)
      Button.tsx
      Input.tsx
      Select.tsx
      Card.tsx
      FormField.tsx
      ThemeProvider.tsx
    /layout
      Header.tsx
      Footer.tsx
      MainLayout.tsx
    /home
      Hero.tsx
      ServicesGrid.tsx
      ServiceCard.tsx
      Testimonials.tsx
      WebGLEffect.tsx
  /lib
    analytics.ts
    captcha.ts
    csrf.ts
  /styles
    tokens.css         # variables CSS (tailwind/shadcn overrides)
  /app/page.tsx       # Home
  /app/(other)/...     # Other routes
/pages                 # API routes (si App Router no cubre)
  /api/solicitudes.ts
  /api/captcha-verify.ts

/public
  /images

/scripts
  build-webgl-assets.js
```

---

## Sistema de diseño y theming

* Centralizar tokens de diseño en `tokens.css` o usando Tailwind config si aplica. Definir: paleta principal (oscura/contrastada), paleta de acento, tipografías, espaciado y radios.
* `ThemeProvider` que exporte variables, utilidades y componentes `Button`, `Card`, `FormField` para que toda la UI consuma el mismo sistema.
* Componentes `ui/*` deben exponer props de diseño (variant, size, tone) y ser el único lugar para cambios visuales.

---

## Reutilización: componentes clave (contrato API)

* `Card` props: `{ title, subtitle?, price?, actions: ReactNode[], variant?, image? }`.
* `Button` props: `{ children, variants: 'primary'|'ghost'|'accent', size }`.
* `FormField` props: `{ label, name, error?, required?, children }`.
* `ServiceCard` recibe la entrada de datos (título, descripción, precio, slug, asuntoValue) desde una configuración central: `/data/services.ts`.

Ejemplo `data/services.ts`:

```ts
export const SERVICES = [
  { id: 'recuperar', title: 'Recuperar cuentas hackeadas', price: 'Desde USD 99', asunto: 'Recuperar cuentas hackeadas' },
  { id: 'evaluacion', title: 'Evaluación de seguridad para PyMEs', price: 'Desde USD 349', asunto: 'Evaluación de seguridad para PyMEs' },
  ...
];
```

---

## Home: animaciones y experiencia visual

### Principios

* Realizar una primera impresión en <2.5s (LCP). Preloader minimal si es necesario.
* Degradados dinámicos y partículas WebGL sincronizadas con scroll y movimiento del cursor.
* Usar Framer Motion para orquestar entradas (stagger) de texto y CTA.
* Separar la experiencia en capas: Background WebGL (GPU), Foreground canvas de partículas, UI HTML accesible encima.

### Componentes visuales propuestos

1. **Hero**

   * Título grande con máscara animada (reveal con clip-path + Framer Motion).
   * Subtítulo y CTA con micro-delays.
   * Background: escena WebGL sutil (ej.: campo de energía, líneas conectivas o voronoi animado) con un `fallback` CSS animated gradient para dispositivos sin GPU.
2. **Servicios**

   * Grid de `ServiceCard` con hover que activa ripple/gradient y micro-rotaciones 3D usando Framer Motion.
   * Cada `ServiceCard` obtiene su contenido de `data/services.ts`. Acción "Iniciar solicitud" abre modal o lleva al formulario con asunto pre-seleccionado.
3. **Testimonials**

   * Carousel con transición 3D suave (Framer Motion). Autoplay pausable con controles visibles y accesibles.
4. **Call to Action fijo**

   * Sticky CTA (botón) con micro-animaciones y transformación al hacer scroll hacia arriba/abajo.

---

## WebGL / WebGPU: ideas y fallback

* **Opción estable (recomendada):** `react-three-fiber` + `three.js` para crear una escena de partículas/field. Ventajas: ecosistema maduro, shaders GLSL, postprocessing.
* **Opción experimental:** WebGPU wrapper (solo si se acepta mayor complejidad); preparar fallback inmediato.

Efectos sugeridos:

* Campo de energía perimetral (layered noise + curl noise) que reacciona a cursor y scroll.
* Malla Voronoi dinámica que se fragmenta y se recompone durante la transición del hero.
* Líneas de conexión entre servicios (micro-interactions) dibujadas con LineSegments y blending.

Fallbacks:

* CSS gradients animados, SVG-based particle simulation con requestAnimationFrame ligera.

Performance:

* Desactivar efectos WebGL en móviles por user-agent o baja potencia GPU.
* Lazy-load del bundle WebGL con `dynamic(() => import('./WebGLEffect'), { ssr: false })`.
* Usar compressed textures y limitar draw calls. Mantener 30–60 FPS en desktop, degradar a 30 FPS en laptops.

---

## Smooth scrolling

* Opción: `locomotive-scroll` o implementación con CSS `scroll-behavior: smooth` + Framer Motion for scroll-linked transforms.
* Considerar problemas de accessibility; proveer un toggle en settings o detectar prefer-reduced-motion.

---

## Formulario: UX y seguridad

### Campos y comportamiento

* Campos: nombre, email, país (detectar por browser locale; searchable select), tipo de servicio (combobox), descripción (textarea 320 char con contador), urgencia (Alta/Media/Baja), checkbox privacidad.
* Validación client-side con `react-hook-form` + Zod. Error messages claros.
* Submit habilitado sólo si validación y checkbox aceptado.
* Integración captcha: si `CAPTCHA_PROVIDER` != none, el formulario renderiza widget y envía token en el body.

### Endpoint `/api/solicitudes`

* Método: POST
* Body: `{ title, name, email, country, serviceType, description, urgency, captchaToken? }`
* Validación server-side con Zod.
* CSRF: usar middleware `csurf` o Next.js built-in protection; check header `x-csrf-token` y cookie.
* Persistencia: almacenar en base de datos o reenviar a correo. Responder con `{ ok: true, id: '<uuid>' }`.

Ejemplo de esquema Zod:

```ts
import { z } from 'zod';
export const solicitudSchema = z.object({
  title: z.string(),
  name: z.string().min(3),
  email: z.string().email(),
  country: z.string().min(2),
  serviceType: z.enum(['Recuperar', 'Evaluacion','OSINT','Recuperacion','Hardening','Phishing']),
  description: z.string().min(1).max(320),
  urgency: z.enum(['Alta','Media','Baja']),
  acceptPrivacy: z.literal(true),
  captchaToken: z.string().optional(),
});
```

---

## UX: Interacciones y microcopy

* CTA principal: "Iniciar solicitud" con micro-reveal y sombra dinámica.
* Botones de acción con estados: hover, pressed, loading (spinner pequeño).
* Formularios con hints inline y contador para descripción.

---

## SEO y metadatos

* Meta tags OG (title, description, image), structured data `Organization` y `Service` schema JSON-LD.
* Canonical, sitemap y robots.txt.

---

## Testimonios y datos ficticios

Crear `data/testimonials.ts` con 6 entradas de ejemplo (nombre, cargo, comentario corto, foto placeholder). Carousel con autoplay y control táctil.

---

## Footer

* Logo y enlaces a redes (leer desde `process.env.*` para no hardcodear).
* Secciones: Enlaces, Legal (Privacidad, Términos, Tratamiento de Datos).

---

## Ejemplos de rutas API y comportamiento

* `POST /api/solicitudes` — recibe formulario, valida, verifica captcha si aplica, crea registro y envía notificación por email.
* `POST /api/captcha-verify` — opcional endpoint para verificar captcha en server side.

---

## Consideraciones de accesibilidad y políticas

* Respetar `prefers-reduced-motion` y ofrecer modo estático.
* Textos con contraste WCAG AA mínimo.
* Formularios accesibles (labels explícitos, role=alert para errores).

---

## Checklist de entrega mínima (MVP)

* [ ] Home con hero estático + efecto WebGL lazy-loaded y fallback.
* [ ] Grid de servicios con `ServiceCard` reutilizable.
* [ ] Formulario con validación Zod, CSRF y captcha condicional.
* [ ] Testimonials carousel.
* [ ] Header sticky y footer con enlaces desde .env.
* [ ] Documentación breve dentro del repo (README) con comandos pnpm.

---

## Recomendaciones finales y prioridades de implementación

1. Implementar sistema de tokens / theme y componentes `ui/*` para garantizar reutilización.
2. Construir MVP del formulario y endpoint `/api/solicitudes` con Zod y CSRF.
3. Desplegar hero con WebGL lazy-loaded + fallback CSS. Asegurar LCP.
4. Añadir micro-animaciones restantes con Framer Motion.
5. Test de performance y mobile-first adjustments.

---

### Anexos rápidos (snippets)

**Lazy load WebGL (Next.js)**

```ts
import dynamic from 'next/dynamic';
const WebGLEffect = dynamic(() => import('@/components/home/WebGLEffect'), { ssr: false });

export default function Hero(){
  return (
    <section>
      <WebGLEffect />
    </section>
  )
}
```

**Ejemplo de Zod + handler (abridged)**

```ts
import { NextApiRequest, NextApiResponse } from 'next';
import { solicitudSchema } from '@/lib/schemas';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end();
  const parse = solicitudSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error });
  // captcha verification, csrf, persistir
  return res.status(200).json({ ok: true });
}
```

---

## Entregables sugeridos

* `agents.md` (este documento)
* README con instrucciones de arranque y variables de entorno
* `data/services.ts` y `data/testimonials.ts`
* Componentes UI en `/components/ui`
* `/app/page.tsx` (Home) con hero y servicios
* `/app/api/solicitudes.ts` endpoint funcional
