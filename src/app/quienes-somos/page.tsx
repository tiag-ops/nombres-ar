import type { Metadata } from "next";
import { ANIO_ACTUAL } from "@/lib/datos";
import { SITE_NOMBRE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description: `${SITE_NOMBRE} es un proyecto independiente de datos abiertos: rankings, tendencias y significado de nombres de bebé en Argentina, con fuentes oficiales RENAPER.`,
  alternates: { canonical: "/quienes-somos/" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="font-display mb-6 text-3xl font-bold sm:text-4xl">Quiénes somos</h1>
      <div className="space-y-4 text-[17px] leading-relaxed">
        <p>
          {SITE_NOMBRE} es un proyecto independiente y sin fines de lucro que pone en valor un dato
          público poco explorado: los nombres que los argentinos eligen para sus hijos, tal como se
          registran oficialmente en cada nacimiento.
        </p>
        <p>
          Todos los rankings, tendencias, tasas y top de provincias de este sitio se calculan con
          los registros nominales de nacimiento que publica la RENAPER — Dirección Nacional de
          Población — a través del portal de datos abiertos del Estado argentino (datos.gob.ar),
          para el período 2012–{ANIO_ACTUAL}.
        </p>
        <p>
          El significado de los nombres es un trabajo de curadón etimológica e histórica: cada
          ficha indica origen, significado y contexto cultural con fuentes académicas, sin
          horóscopos ni acrósticos inventados. La sección legal cita el Código Civil y Comercial de
          la Nación vigente.
        </p>
        <p>
          El proyecto no tiene afiliación con la RENAPER ni con ningún organismo del Estado
          argentino. La información se ofrece como está, con fines orientativos, y puede contener
          errores: consultá siempre la fuente oficial para decisiones formales.
        </p>
        <p className="rounded-2xl border border-[#E4DCCB] bg-[#FBF7EF] p-4 text-sm dark:border-[#23312B] dark:bg-[#101B16]">
          🔗 Datos originales:{" "}
          <a
            href="https://datos.gob.ar/dataset/dnp-nombres-personas-fisicas"
            className="font-medium text-[#0F766E] underline decoration-2 underline-offset-2 dark:text-[#5EEAD4]"
            target="_blank"
            rel="noopener noreferrer"
          >
            datos.gob.ar — Nombres de personas físicas (RENAPER)
          </a>
        </p>
      </div>
    </article>
  );
}