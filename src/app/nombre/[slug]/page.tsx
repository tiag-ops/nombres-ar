import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ANIO_ACTUAL,
  FICHAS,
  deltaPct,
  displayName,
  faqsDe,
  hermanitos,
  letraDe,
  LETRAS_CON_FICHA,
  miles,
  nombrePorSlug,
  posicion,
  record,
  serie,
  sexoDe,
  significados,
  tasaPorMil,
  tendencia,
  tieneFicha,
  topProvincias,
} from "@/lib/datos";
import { SITE_URL } from "@/lib/site";
import { GUIAS } from "@/lib/guias";
import Sparkle from "@/components/sparkline";
import { Stat, TendenciaBadge } from "@/components/stats";

/** Guías curadas que toda ficha enlaza (linking interno consistente). */
const GUIAS_REL = GUIAS.filter((g) =>
  ["nombres-mas-populares-argentina", "evolucion-nombres-2012-2024"].includes(g.slug)
);

export const dynamicParams = false;

export function generateStaticParams() {
  return FICHAS.map((nombre) => ({ slug: nombre.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = nombrePorSlug(slug);
  if (!n) return {};
  const disp = displayName(n.nombre);
  const tasa = tasaPorMil(n, ANIO_ACTUAL);
  const pos = posicion(n, ANIO_ACTUAL);
  return {
    title: `Nombre ${disp}: significado, tendencia y ranking en Argentina`,
    description: `${disp} es el ${pos ? `${pos}º nombre más elegido` : "nombre"} de Argentina según RENAPER ${ANIO_ACTUAL} (tasa de ${tasa.toLocaleString("es-AR", { maximumFractionDigits: 2 })}‰). Su significado, evolución 2012–${ANIO_ACTUAL} y top de provincias.`,
    alternates: { canonical: `/nombre/${slug}/` },
    openGraph: {
      type: "website",
      locale: "es_AR",
      siteName: "NombresAR",
      url: `${SITE_URL}/nombre/${slug}/`,
      title: `${disp} — significado y datos oficiales`,
      description: `Evolución oficial ${ANIO_ACTUAL}, ranking nacional y significado del nombre ${disp}.`,
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: `Nombre ${disp} — NombresAR` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${disp} — significado y datos oficiales`,
      description: `Evolución oficial ${ANIO_ACTUAL}, ranking nacional y significado del nombre ${disp}.`,
      images: [`${SITE_URL}/og.png`],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = nombrePorSlug(slug);
  if (!n) notFound();
  const disp = displayName(n.nombre);
  const sexo = sexoDe(n.nombre);
  const sig = significados[n.nombre];
  const tasa = tasaPorMil(n, ANIO_ACTUAL);
  const del = deltaPct(n, ANIO_ACTUAL);
  const tend = tendencia(n);
  const pos = posicion(n, ANIO_ACTUAL);
  const rec = record(n);
  const provs = topProvincias(n, 3);
  // Solo hermanitos con ficha propia (los demás no tienen página: zero-404s de flota)
  const hermanos = hermanitos(n, 3).filter((h) => tieneFicha(h.nombre));
  const serieAnual = serie(n);
  const primerAnio = serieAnual.find((s) => s.cantidad > 0)?.anio;
  const letra = letraDe(n.nombre);
  const faqs = faqsDe(n);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: `Nombres con ${letra.toUpperCase()}`,
            item: `${SITE_URL}/letra/${letra}/`,
          },
          { "@type": "ListItem", position: 3, name: disp, item: `${SITE_URL}/nombre/${slug}/` },
        ],
      },
      {
        "@type": "ItemPage",
        name: disp,
        headline: `Nombre ${disp}: significado, tendencia y ranking en Argentina`,
        description: `${disp} — datos oficiales RENAPER: ranking 2012–${ANIO_ACTUAL}, evolución, tasa cada 1.000 nacimientos y top de provincias.`,
        url: `${SITE_URL}/nombre/${slug}/`,
        inLanguage: "es-AR",
        mainEntityOfPage: `${SITE_URL}/nombre/${slug}/`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <article>
      {/* Hero */}
      <header className="mb-8">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Link href="/" className="text-sm text-[#6B6558] hover:text-[#0F766E] dark:text-[#9BA89F] dark:hover:text-[#5EEAD4]">
            ← Inicio
          </Link>
          <span aria-hidden="true" className="text-[#6B6558]/50 dark:text-[#9BA89F]/50">·</span>
          <Link href={`/letra/${letra}/`} className="text-sm text-[#6B6558] hover:text-[#0F766E] dark:text-[#9BA89F] dark:hover:text-[#5EEAD4]">
            Letra {letra}
          </Link>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl">{disp}</h1>
            <p className="mt-2 text-lg text-[#6B6558] dark:text-[#9BA89F]">
              {sexo === "M" ? "Nombre masculino" : sexo === "F" ? "Nombre femenino" : "Nombre sin sexo dominante"} ·{" "}
              {sig?.origen ?? "Origen vario"} · {pos ? `${pos}º en el ranking nacional` : "fuera del top 2024"}
            </p>
          </div>
          <TendenciaBadge t={tend} />
        </div>
      </header>

      {/* Stats grid */}
      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Estadísticas">
        <Stat etiqueta="Registros 2012–2024" valor={miles(n.total)} sub={`desde ${primerAnio ?? 2012}`} />
        <Stat
          etiqueta={`Ranking ${ANIO_ACTUAL}`}
          valor={pos ? `N° ${pos}` : "—"}
          sub={tasa.toLocaleString("es-AR", { maximumFractionDigits: 2 }) + " cada 1.000 nac. · " + miles(n.porAnio[String(ANIO_ACTUAL)] ?? 0) + " bebés"}
        />
        <Stat
          etiqueta="Variación anual"
          valor={del === null ? "—" : `${del >= 0 ? "+" : ""}${del.toLocaleString("es-AR", { maximumFractionDigits: 1 })}%`}
          sub={`${ANIO_ACTUAL} vs ${ANIO_ACTUAL - 1}`}
        />
        <Stat etiqueta="Año pico" valor={String(rec.anio)} sub={miles(rec.cantidad) + " registros"} />
      </section>

      {/* Evolución */}
      <section className="card mb-8" aria-labelledby="evolucion">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="evolucion" className="font-display text-2xl font-bold">
            Evolución oficial 2012–{ANIO_ACTUAL}
          </h2>
          <span className="text-sm text-[#6B6558] dark:text-[#9BA89F]">
            Fuente: RENAPER · cantidad de bebés inscriptos por año
          </span>
        </div>
        <Sparkle nombre={n} label={`Evolución de ${disp} de 2012 a ${ANIO_ACTUAL}`} />
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-5" aria-label="Serie anual">
          {serieAnual.slice(-10).map((s) => (
            <div key={s.anio} className="flex items-baseline justify-between border-b border-[#F0EADA] py-1.5 dark:border-[#1A2620]">
              <span className="text-sm text-[#6B6558] dark:text-[#9BA89F]">{s.anio}</span>
              <span className="text-sm font-semibold">{miles(s.cantidad)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Top provincias */}
      <section className="card mb-8" aria-labelledby="provincias">
        <h2 id="provincias" className="font-display mb-4 text-2xl font-bold">
          Provincias donde más se usa
        </h2>
        <div className="space-y-4">
          {provs.map((p) => (
            <div key={p.nombre}>
              <div className="mb-1 flex items-baseline justify-between text-sm">
                <span className="font-medium">{p.nombre}</span>
                <span className="text-[#6B6558] dark:text-[#9BA89F]">
                  {miles(p.cantidad)} · {p.pct.toLocaleString("es-AR", { maximumFractionDigits: 1 })}%
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#F0EADA] dark:bg-[#1A2620]" role="presentation">
                <div
                  className="h-full rounded-full bg-[#0F766E] dark:bg-[#5EEAD4]"
                  style={{ width: `${Math.max(p.pct, 4)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Significado curado */}
      {sig && (
        <section className="card mb-8" aria-labelledby="significado">
          <h2 id="significado" className="font-display mb-3 text-2xl font-bold">
            Significado de {disp}
          </h2>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#0F766E] dark:text-[#5EEAD4]">
            Origen: {sig.origen}
          </p>
          <p className="mb-3 text-lg leading-relaxed">{sig.significado}</p>
          <p className="text-[15px] leading-relaxed text-[#6B6558] dark:text-[#9BA89F]">{sig.nota}</p>
          {sig.santoral && (
            <p className="mt-3 text-sm text-[#6B6558] dark:text-[#9BA89F]">
              🗓️ Santoral: {sig.santoral}
            </p>
          )}
        </section>
      )}

      {/* Preguntas frecuentes — únicas por nombre, computadas de los datos */}
      <section className="card mb-8" aria-labelledby="faq">
        <h2 id="faq" className="font-display mb-4 text-2xl font-bold">
          Preguntas frecuentes sobre {disp}
        </h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-[#F0EADA] pb-3 last:border-b-0 dark:border-[#1A2620]">
              <h3 className="mb-1 font-semibold">{f.q}</h3>
              <p className="text-[15px] leading-relaxed text-[#6B6558] dark:text-[#9BA89F]">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hermanitos */}
      {hermanos.length > 0 && (
        <section className="card mb-8" aria-labelledby="hermanitos">
          <h2 id="hermanitos" className="font-display mb-2 text-2xl font-bold">
            Nombres con curva parecida
          </h2>
          <p className="mb-4 text-sm text-[#6B6558] dark:text-[#9BA89F]">
            Nombres cuya evolución 2012–{ANIO_ACTUAL} sigue un patrón estadísticamente similar al de {disp}. Útil si buscás alternativas con la misma onda.
          </p>
          <div className="flex flex-wrap gap-3">
            {hermanos.map((h) => (
              <Link
                key={h.nombre}
                href={`/nombre/${h.nombre.toLowerCase()}/`}
                className="rounded-full border border-[#E4DCCB] px-4 py-2 text-sm font-medium transition-colors hover:border-[#0F766E] hover:text-[#0F766E] dark:border-[#23312B] dark:hover:border-[#5EEAD4] dark:hover:text-[#5EEAD4]"
              >
                {displayName(h.nombre)}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Guías relacionadas */}
      <section className="card mb-8" aria-labelledby="guias"><h2 className="font-display mb-4 text-2xl font-bold">Guías para seguir explorando</h2>
        <ul className="space-y-3">
          {GUIAS_REL.map((g) => (
            <li key={g.slug}>
              <Link href={`/guia/${g.slug}/`} className="group block">
                <span className="font-semibold text-[#0F766E] underline-offset-4 group-hover:underline dark:text-[#5EEAD4]">
                  {g.titulo}
                </span>
                <span className="block text-sm text-[#6B6558] dark:text-[#9BA89F]">{g.resumen}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Notas */}
      <section className="rounded-2xl border border-[#E4DCCB] bg-[#FBF7EF] p-5 text-[13px] leading-relaxed text-[#6B6558] dark:border-[#23312B] dark:bg-[#101B16] dark:text-[#9BA89F]" aria-label="Nota metodológica">
        <p>
          Los datos provienen de los registros nominales de nacimiento publicados por RENAPER
          (datos.gob.ar), período 2012–{ANIO_ACTUAL}. La estadística cuenta inscripciones, no personas:
          un bebé con dos nombres figura en la estadística de cada uno. La tasa se calcula por cada
          1.000 nacimientos del año, sobre el total nacional publicado.
        </p>
      </section>

      {/* Datos estructurados: breadcrumb + item + FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}