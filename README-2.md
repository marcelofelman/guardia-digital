# Guardia Digital

This is a corporate website for Guardia Digital, built with Next.js, pnpm, TypeScript, shadcn/ui, and Framer Motion. It features a visually engaging home page with advanced animations and a robust UI structure for the rest of the site.

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

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

## Project Structure

The project follows a structured approach with clear separation of concerns:

```
/app
  /components
    /ui                # Reusable UI components (shadcn/ui based)
    /layout            # Layout components (Header, Footer, MainLayout)
    /home              # Components specific to the Home page
    /contact           # Components specific to the Contact page (e.g., ContactForm)
  /lib                 # Utility functions (analytics, captcha, csrf, schemas)
  /styles              # Global styles and design tokens
  /app/page.tsx       # Home page
  /app/(other)/...     # Other routes
/data                  # Static data (services, testimonials)
/pages                 # API routes (e.g., /api/solicitudes)
/public
  /images              # Static images
/scripts
  build-webgl-assets.js # Placeholder for WebGL asset build script
```

## Features Implemented

*   **Home Page:** Visually stunning hero section with Framer Motion animations and a WebGL particle background (with CSS fallback). Includes animated services grid and a 3D testimonials carousel.
*   **Dark Mode Toggle:** Animated selector for light, dark, and system themes.
*   **Contact Form:** Client-side validation with `react-hook-form` and `Zod`, connected to a server-side API endpoint (`/api/solicitudes`) with Zod validation.
*   **Reusable UI Components:** Centralized `shadcn/ui` components for consistent styling.
*   **Performance:** WebGL effects are lazy-loaded.
*   **SEO & Accessibility:** Basic semantic markup and Next.js metadata are in place.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.