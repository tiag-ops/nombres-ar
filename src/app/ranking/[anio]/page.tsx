import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ANIO_ACTUAL,
  ANIOS,
  RANK_ANIO_CACHE,
  displayName,
  miles,
  sexoDe,
  tasaPorMil,
} from "@/lib/datos";

export const dynamicParams = false;

export function generateStaticParams() {
  return ANIOS.map((anio) => ({ anio: String(anio) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ anio: string }>;
}): Promise<Metadata> {
  const { anio } = await params;
  const a = Number(anio);
  if (!ANIOS.includes(a)) return {};
  const top1 = RANK_ANIO_CACHE.get(a)?.[0];
  return {
    title: `Ranking de nombres ${anio} en Argentina — los más elegidos`,
    description: `El ranking completo de nombres de bebé ${anio} según RENAPER: ${top1 ? `Nº1 ${displayName(top1.nombre)} (${miles(top1.porAnio[anio] ?? 0)} registros)` : ""} y el top 50 con cantidades, tendencia y vínculo a la ficha de cada nombre.`,
    alternates: { canonical: `/ranking/${anio}/` },
  };
}

export default async function Page({ params }: { params: Promise<{ anio: string }> }) {
  const { anio } = await params;
  const a = Number(anio);
  if (!ANIOS.includes(a)) notFound();
  const filas = RANK_ANIO_CACHE.get(a) ?? [];
  const top50 = filas.slice(0, 50);
  const max = top50[0]?.porAnio[anio] ?? 1;
  const anterior = a > ANIOS[0] ? a - 1 : null;
  const siguiente = a < ANIO_ACTUAL ? a + 1 : null;

  return (
    <section>
      <nav className="mb-6 flex flex-wrap items-center justify-between gap-3" aria-label="Navegación entre años">
        {anterior ? (
          <Link href={`/ranking/${anterior}/`} className="btn-ghost text-sm">← {anterior}</Link>
        ) : (
          <span />
        )}
        <div className="flex flex-wrap justify-center gap-1.5">
          {[...ANIOS].reverse().map((y) => (
            <Link
              key={y}
              href={`/ranking/${y}/`}
              aria-current={y === a ? "page" : undefined}
              className={`rounded-lg px-2.5 py-1.5 text-sm font-semibold ${
                y === a
                  ? "bg-[#0F766E] text-white dark:bg-[#5EEAD4] dark:text-[#04211D]"
                  : "text-[#6B6558] hover:bg-[#F0EADA] dark:text-[#9BA89F] dark:hover:bg-[#16241E]"
              }`}
            >
              {y}
            </Link>
          ))}
        </div>
        {siguiente ? (
          <Link href={`/ranking/${siguiente}/`} className="btn-ghost text-sm">→ {siguiente}</Link>
        ) : (
          <span />
        )}
      </nav>

      <h1 className="font-display mb-2 text-3xl font-bold sm:text-4xl">
        Ranking de nombres {anio}, Argentina
      </h1>
      <p className="mb-6 max-w-2xl text-[15px] text-[#6B6558] dark:text-[#9BA89F]">
        Los 50 nombres más inscriptos en {anio}, según los registros oficiales de RENAPER. La
        cantidad es de bebés nacidos ese año con ese nombre (cada bebé puede figurar en más de un
        nombre si lleva varios).
      </p>

      <div className="card overflow-x-auto">
        <table className="rank-table">
          <caption className="sr-only">Top 50 nombres {anio}</caption>
          <thead>
            <tr>
              <th scope="col" className="w-12">#</th>
              <th scope="col">Nombre</th>
              <th scope="col" className="text-right">Cantidad</th>
              <th scope="col" className="hidden text-right sm:table-cell">Tasa ‰</th>
              <th scope="col" className="hidden w-1/3 md:table-cell">Participación</th>
              <th scope="col" className="text-right">Sexo</th>
            </tr>
          </thead>
          <tbody>
            {top50.map((n, i) => {
              const cant = n.porAnio[anio] ?? 0;
              const tot = n.porAnio[anio] ?? 0;
              const tasa = tasaPorMil(n, a);
              const sexo = sexoDe(n.nombre);
              return (
                <tr key={n.nombre}>
                  <td className="font-display font-bold text-[#C2410C] dark:text-[#FDBA74]">{i + 1}</td>
                  <td>
                    <Link href={`/nombre/${n.nombre.toLowerCase()}/`} className="font-semibold hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">
                      {displayName(n.nombre)}
                    </Link>
                  </td>
                  <td className="text-right font-semibold">{miles(cant)}</td>
                  <td className="hidden text-right text-[#6B6558] sm:table-cell dark:text-[#9BA89F]">
                    {tasa.toLocaleString("es-AR", { maximumFractionDigits: 2 })}
                  </td>
                  <td className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-[#F0EADA] dark:bg-[#1A2620]">
                        <div className="h-full rounded-full bg-[#0F766E] dark:bg-[#5EEAD4]" style={{ width: `${(tot / max) * 100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="text-right">
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-[13px] text-[#6B6558] dark:text-[#9BA89F]">
        Fuente: RENAPER — registros de nacimiento ({anio}). La tasa es por 1.000 nacimientos del
        mismo año. El sexo se asigna con el listado oficial de nombres más frecuentes de RENAPER.
        El significado y la evolución completa 2012–{ANIO_ACTUAL} de cada nombre están en su ficha.
      </p>
    </section>
  );
}

