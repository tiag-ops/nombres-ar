import type { Metadata } from "next";
import Link from "next/link";
import {
  ANIOS,
  ANIO_ACTUAL,
  displayName,
  miles,
  rankAnio,
  sexoDe,
} from "@/lib/datos";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ranking de nombres de bebé en Argentina",
  description: `El ranking oficial de nombres ${ANIO_ACTUAL} según RENAPER, y la lista completa de todos los años (2012–${ANIO_ACTUAL}): los más elegidos con cantidades, tasa y tendencia.`,
  alternates: { canonical: "/ranking/" },
};

export default function Page() {
  const top = rankAnio(ANIO_ACTUAL).slice(0, 25);
  const max = top[0]?.porAnio[String(ANIO_ACTUAL)] ?? 1;

  return (
    <section>
      <h1 className="font-display mb-2 text-3xl font-bold sm:text-4xl">
        Ranking de nombres de bebé en Argentina
      </h1>
      <p className="mb-8 max-w-2xl text-[15px] text-[#6B6558] dark:text-[#9BA89F]">
        Los nombres más inscriptos por año según los registros oficiales de RENAPER. Elegí un año
        para ver el ranking completo con cantidades, tasa por 1.000 nacimientos y la ficha de cada
        nombre.
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        {[...ANIOS].reverse().map((a) => (
          <Link
            key={a}
            href={`/ranking/${a}/`}
            className="rounded-xl border border-[#E4DCCB] px-4 py-2 text-sm font-semibold transition-colors hover:border-[#0F766E] hover:text-[#0F766E] dark:border-[#23312B] dark:hover:border-[#5EEAD4] dark:hover:text-[#5EEAD4]"
          >
            {a}
          </Link>
        ))}
      </div>

      <div className="card">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold">Top 25 — {ANIO_ACTUAL}</h2>
          <Link
            href={`/ranking/${ANIO_ACTUAL}/`}
            className="text-sm font-medium text-[#0F766E] hover:underline dark:text-[#5EEAD4]"
          >
            Ver los 50 →
          </Link>
        </div>
        <ol className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
          {top.map((n, i) => {
            const cant = n.porAnio[String(ANIO_ACTUAL)] ?? 0;
            const sexo = sexoDe(n.nombre);
            return (
              <li key={n.nombre} className="flex items-baseline gap-3 rounded-lg px-2 py-1.5 hover:bg-[#F0EADA] dark:hover:bg-[#16241E]">
                <span className="w-6 text-right font-display text-sm font-bold text-[#C2410C] dark:text-[#FDBA74]">{i + 1}</span>
                <Link href={`/nombre/${n.nombre.toLowerCase()}/`} className="font-semibold hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">
                  {displayName(n.nombre)}
                </Link>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                    sexo === "M"
                      ? "bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#5EEAD4]/10 dark:text-[#5EEAD4]"
                      : sexo === "F"
                        ? "bg-[#C2410C]/10 text-[#C2410C] dark:bg-[#FDBA74]/10 dark:text-[#FDBA74]"
                        : "bg-[#6B6558]/10 text-[#6B6558] dark:bg-[#9BA89F]/10 dark:text-[#9BA89F]"
                  }`}
                >
                  {sexo === "M" ? "M" : sexo === "F" ? "F" : "—"}
                </span>
                <span className="ml-auto text-sm text-[#6B6558] dark:text-[#9BA89F]">{miles(cant)}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}