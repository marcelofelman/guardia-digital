
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VercelAnalytics from "../components/VercelAnalytics";

export const metadata: Metadata = {
  title: "Guardia Digital | Ciberseguridad accesible para personas y PyMEs",
  description: "Servicios estandarizados de ciberseguridad: recuperación de cuentas, evaluaciones para PyMEs, Refuerzo de seguridad y más. Pagos en USD con escrow.",
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
