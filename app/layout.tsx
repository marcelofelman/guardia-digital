
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VercelAnalytics from "../components/VercelAnalytics";

export const metadata: Metadata = {
  title: "Soluciones de ciberseguridad, sin vueltas.",
  description:
    "Detectamos, protegemos y resolvemos rápido. Atención directa, resultados claros y un equipo que te habla en tu idioma.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <VercelAnalytics />
      </body>
    </html>
  );
}
