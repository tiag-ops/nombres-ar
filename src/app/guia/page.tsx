import type { Metadata } from "next";
import Link from "next/link";
import { GUIAS } from "@/lib/guias";

export const metadata: Metadata = {
  title: "Guías de nombres de bebé",
  description:
    "Guías con datos oficiales RENAPER y base legal: los nombres más elegidos, cómo elegir el nombre, qué dice la ley (Código Civil y Comercial) y cómo se leen la evolución y las tasas.",
  alternates: { canonical: "/guia/" },
};

export default function Page() {
  return (
    <section>
      <h1 className="font-display mb-2 text-3xl font-bold sm:text-4xl">Guías</h1>
      <p className="mb-8 max-w-2xl text-[15px] text-[#6B6558] dark:text-[#9BA89F]">
        Análisis, datos y marco legal para elegir el nombre del bebé, siempre con los registros
        oficiales de RENAPER y el Código Civil y Comercial de la Nación.
      </p>
      <ul className="grid gap-4 md:grid-cols-2">
        {GUIAS.map((g) => (
          <li key={g.slug}>
            <Link href={`/guia/${g.slug}/`} className="card card-hover block h-full">
              <h2 className="font-display mb-1 text-xl font-bold">{g.titulo}</h2>
              <p className="text-sm leading-relaxed text-[#6B6558] dark:text-[#9BA89F]">{g.resumen}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}