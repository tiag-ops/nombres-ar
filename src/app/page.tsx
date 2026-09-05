import Link from "next/link";
import {
  ANIO_ACTUAL,
  ANIOS,
  FICHAS,
  displayName,
  miles,
  sexoDe,
  significados,
  topPorAnio,
} from "@/lib/datos";
import { SITE_DESCRIPCION } from "@/lib/site";

export const metadata = {
  title: {
    absolute: "NombresAR — Nombres de bebé en Argentina con datos oficiales",
  },
  description: SITE_DESCRIPCION,
  alternates: { canonical: "/" },
};

export default function Home() {
  const topM = topPorAnio(ANIO_ACTUAL, "M", 10);
  const topF = topPorAnio(ANIO_ACTUAL, "F", 10);
  const conFicha = new Set(FICHAS.map((s) => s.toLowerCase()));

  return (
    <>
      <section className="mb-10 text-center">
        <h1 className="font-display mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
          Los nombres de bebé en Argentina,<br className="hidden sm:block" /> con datos oficiales
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#6B6558] dark:text-[#9BA89F]">
          Rankings, tendencias y significado de nombres con los registros públicos de RENAPER
          2012–{ANIO_ACTUAL}: los más elegidos por año, tasa por cada 1.000 nacimientos y el top
          por provincia.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/ranking/" className="btn">Ver el ranking {ANIO_ACTUAL}</Link>
          <Link href="/nombres-por-letra/" className="btn-ghost">Explorar por letra</Link>
        </div>
      </section>

      {/* Top femenino y masculino del último año */}
      <section className="mb-10" aria-labelledby="top-anio">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 id="top-anio" className="font-display text-2xl font-bold">
            Los más elegidos en {ANIO_ACTUAL}
          </h2>
          <Link href="/ranking/" className="text-sm font-medium text-[#0F766E] hover:underline dark:text-[#5EEAD4]">
            Todos los años →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { titulo: "Nombres de nena", lista: topF },
            { titulo: "Nombres de nene", lista: topM },
          ].map(({ titulo, lista }) => (
            <div key={titulo} className="card">
              <h3 className="font-display mb-3 text-lg font-semibold">{titulo}</h3>
              <ol className="space-y-1">
                {lista.map((e, i) => {
                  const slugN = e.nombre.toLowerCase();
                  const href = conFicha.has(slugN) ? `/nombre/${slugN}/` : undefined;
                  const fichaDisp = conFicha.has(slugN);
                  return (
                    <li key={e.nombre} className="flex items-baseline gap-3 rounded-lg px-2 py-1.5 hover:bg-[#F0EADA] dark:hover:bg-[#16241E]">
                      <span className="w-6 text-right font-display text-sm font-bold text-[#C2410C] dark:text-[#FDBA74]">
                        {i + 1}
                      </span>
                      {href ? (
                        <Link href={href} className="font-semibold hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">
                          {displayName(e.nombre)}
                        </Link>
                      ) : (
                        <span className="font-semibold">{displayName(e.nombre)}</span>
                      )}
                      <span className="ml-auto text-sm text-[#6B6558] dark:text-[#9BA89F]">
                        {miles(e.cantidad)} bebés
                      </span>
                      {fichaDisp && (
                        <span aria-hidden="true" title="Tiene ficha completa">
                          📄
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Rankings por año */}
      <section className="mb-10" aria-labelledby="por-anio">
        <h2 id="por-anio" className="font-display mb-4 text-2xl font-bold">
          Ranking por año
        </h2>
        <p className="mb-4 text-[15px] text-[#6B6558] dark:text-[#9BA89F]">
          El ranking nacional completo de cada año, con la posición de los nombres más elegidos.
        </p>
        <div className="flex flex-wrap gap-2">
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
      </section>

      {/* Letras */}
      <section className="mb-10" aria-labelledby="letras">
        <h2 id="letras" className="font-display mb-4 text-2xl font-bold">
          Explorar por letra
        </h2>
        <div className="grid grid-cols-5 gap-2 sm:gap-3" style={{ maxWidth: 420 }}>
          {["A", "B", "C", "D", "E"].map((l) => (
            <Link
              key={l}
              href={`/letra/${l.toLowerCase()}/`}
              className="font-display card card-hover text-center text-2xl font-bold text-[#0F766E] dark:text-[#5EEAD4]"
            >
              {l}
            </Link>
          ))}
        </div>
        <p className="mt-3 text-sm text-[#6B6558] dark:text-[#9BA89F]">
          Por ahora cubrimos las letras A–E con los nombres más registrados; el resto llega en las próximas etapas.
        </p>
      </section>

      {/* Fichas destacadas */}
      <section className="mb-10" aria-labelledby="fichas">
        <h2 id="fichas" className="font-display mb-4 text-2xl font-bold">
          Fichas con significado y tendencia
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {FICHAS.map((n) => {
            const sig = significados[n];
            return (
              <li key={n}>
                <Link
                  href={`/nombre/${n.toLowerCase()}/`}
                  className="card card-hover block"
                >
                  <span className="font-display text-lg font-bold">{displayName(n)}</span>
                  <span className="mt-0.5 block text-xs text-[#6B6558] dark:text-[#9BA89F]">
                    {sexoDe(n) === "M" ? "Masculino" : "Femenino"} · {sig?.origen ?? "—"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Guías */}
      <section aria-labelledby="guias">
        <h2 id="guias" className="font-display mb-4 text-2xl font-bold">
          Guías
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            ["nombres-mas-populares-argentina", "Los nombres más elegidos"],
            ["como-elegir-el-nombre-del-bebe", "Cómo elegir el nombre"],
            ["nombres-prohibidos-argentina", "Nombres prohibidos (guía legal)"],
            ["evolucion-nombres-2012-2024", "Evolución 2012–2024"],
          ].map(([slug, titulo]) => (
            <li key={slug}>
              <Link href={`/guia/${slug}/`} className="card card-hover block">
                <span className="font-semibold hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">{titulo}</span>
                <span className="mt-1 block text-sm text-[#6B6558] dark:text-[#9BA89F]">
                  {titulo === "Nombres prohibidos (guía legal)" ? "Qué dice el Código Civil y Comercial" : "Con datos oficiales RENAPER"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}