
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white/60 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Guardia<span className="text-accent">Digital</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/servicios" className="hover:text-accent">Servicios</Link>
          <Link href="/como-funciona" className="hover:text-accent">Cómo funciona</Link>
          <Link href="/iniciar-solicitud" className="rounded-lg px-3 py-2 bg-accent text-white hover:opacity-90">Iniciar solicitud</Link>
        </nav>
      </div>
    </header>
  );
}
