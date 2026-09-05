import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ANIO_ACTUAL,
  dataset,
  displayName,
  miles,
  sexoDe,
  tieneFicha,
} from "@/lib/datos";

const LETRAS = ["a", "b", "c", "d", "e"] as const;
type Letra = (typeof LETRAS)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return LETRAS.map((l) => ({ letra: l }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ letra: string }>;
}): Promise<Metadata> {
  const { letra } = await params;
  if (!(LETRAS as readonly string[]).includes(letra)) return {};
  return {
    title: `Nombres de bebé con ${letra.toUpperCase()} en Argentina`,
    description: `Los nombres más registrados que empiezan con ${letra.toUpperCase()} en Argentina (RENAPER 2012–${ANIO_ACTUAL}): cantidad de inscripciones, tendencia y fichas con significado.`,
    alternates: { canonical: `/letra/${letra}/` },
  };
}

export default async function Page({ params }: { params: Promise<{ letra: string }> }) {
  const { letra } = await params;
  if (!(LETRAS as readonly string[]).includes(letra)) notFound();
  const L = letra.toUpperCase();

  const nombres = dataset.nombres
    .filter((n) => n.nombre.startsWith(L))
    .sort((a, b) => b.total - a.total)
    .slice(0, 40);
  const max = nombres[0]?.total ?? 1;
  const conFicha = tieneFicha;

  return (
    <section>
      <nav className="mb-4 text-sm text-[#6B6558] dark:text-[#9BA89F]" aria-label="Migaja">
        <Link href="/nombres-por-letra/" className="hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">
          Nombres por letra
        </Link>
        <span aria-hidden="true"> · {L}</span>
      </nav>
      <h1 className="font-display mb-2 text-3xl font-bold sm:text-4xl">
        Nombres de bebé con {L}
      </h1>
      <p className="mb-8 max-w-2xl text-[15px] text-[#6B6558] dark:text-[#9BA89F]">
        Los nombres que empiezan con {L} más registrados en Argentina según RENAPER
        (2012–{ANIO_ACTUAL}), ordenados por cantidad de inscripciones. Los que tienen ficha incluyen
        evolución anual, top de provincias y significado.
      </p>

      <div className="card">
        <ul>
          {nombres.map((n, i) => {
            const sexo = sexoDe(n.nombre);
            return (
              <li key={n.nombre} className="border-b border-[#F0EADA] last:border-b-0 dark:border-[#1A2620]">
                {conFicha(n.nombre) ? (
                  <Link href={`/nombre/${n.nombre.toLowerCase()}/`} className="flex items-center gap-3 py-2.5 hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">
                    <span className="w-7 text-right font-display text-sm font-bold text-[#6B6558] dark:text-[#9BA89F]">{i + 1}</span>
                    <span className="font-semibold">{displayName(n.nombre)}</span>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                      sexo === "M"
                        ? "bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#5EEAD4]/10 dark:text-[#5EEAD4]"
                        : sexo === "F"
                          ? "bg-[#C2410C]/10 text-[#C2410C] dark:bg-[#FDBA74]/10 dark:text-[#FDBA74]"
                          : "bg-[#6B6558]/10 text-[#6B6558] dark:bg-[#9BA89F]/10 dark:text-[#9BA89F]"
                    }`}>
                      {sexo === "M" ? "M" : sexo === "F" ? "F" : "—"}
                    </span>
                    <span className="ml-auto text-sm text-[#6B6558] dark:text-[#9BA89F]">
                      {miles(n.total)}
                      <span className="ml-2 hidden text-xs sm:inline">·</span>
                      <span className="ml-1 hidden text-xs sm:inline">ficha {conFicha(n.nombre) ? "✓" : "próximamente"}</span>
                    </span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-3 py-2.5">
                    <span className="w-7 text-right font-display text-sm font-bold text-[#6B6558] dark:text-[#9BA89F]">{i + 1}</span>
                    <span className="font-semibold text-[#6B6558] dark:text-[#9BA89F]">{displayName(n.nombre)}</span>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                      sexo === "M"
                        ? "bg-[#0F766E]/10 text-[#0F766E] dark:bg-[#5EEAD4]/10 dark:text-[#5EEAD4]"
                        : sexo === "F"
                          ? "bg-[#C2410C]/10 text-[#C2410C] dark:bg-[#FDBA74]/10 dark:text-[#FDBA74]"
                          : "bg-[#6B6558]/10 text-[#6B6558] dark:bg-[#9BA89F]/10 dark:text-[#9BA89F]"
                    }`}>
                      {sexo === "M" ? "M" : sexo === "F" ? "F" : "—"}
                    </span>
                    <span className="ml-auto text-sm text-[#6B6558] dark:text-[#9BA89F]">{miles(n.total)}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <p className="mt-6 text-[13px] text-[#6B6558] dark:text-[#9BA89F]">
        Fuente: RENAPER — registros nominales de nacimiento 2012–{ANIO_ACTUAL} (nombres con 100 o
        más registros en el período). La lista completa por letra se expande en las próximas etapas.
      </p>
    </section>
  );
}