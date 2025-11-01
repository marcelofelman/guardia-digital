
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
  price: string;
};

export default function ServiceCard({ title, description, href, price }: Props) {
  return (
    <div className="border rounded-xl p-5 hover:shadow-sm transition">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-gray-600">{price}</span>
      </div>
      <p className="mt-2 text-gray-700">{description}</p>
      <div className="mt-4 flex gap-3">
        <Link href={href} className="text-accent hover:underline">Ver detalle</Link>
        <Link href="/iniciar-solicitud" className="text-sm rounded-lg px-3 py-1 border hover:bg-gray-50">Iniciar solicitud</Link>
      </div>
    </div>
  );
}
