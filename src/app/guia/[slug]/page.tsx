import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIAS, guiaPorSlug } from "@/lib/guias";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = guiaPorSlug(slug);
  if (!g) return {};
  return {
    title: g.titulo,
    description: g.resumen,
    alternates: { canonical: `/guia/${slug}/` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guiaPorSlug(slug);
  if (!g) notFound();

  return (
    <article className="mx-auto max-w-3xl">
      <nav className="mb-4 text-sm text-[#6B6558] dark:text-[#9BA89F]" aria-label="Migaja">
        <Link href="/guia/" className="hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">Guías</Link>
        <span aria-hidden="true"> · </span>
        <span>{g.titulo}</span>
      </nav>
      <header className="mb-8">
        <h1 className="font-display mb-3 text-3xl font-bold leading-tight sm:text-4xl">{g.titulo}</h1>
        <p className="text-lg text-[#6B6558] dark:text-[#9BA89F]">{g.resumen}</p>
      </header>
      {g.secciones.map((s, i) => (
        <section key={i} className="mb-8">
          <h2 className="font-display mb-3 border-b border-[#E4DCCB] pb-2 text-2xl font-bold dark:border-[#23312B]">
            {s.h}
          </h2>
          {s.p.map((p, j) => (
            <p key={j} className="mb-3 text-[17px] leading-relaxed text-[#2D2A26] dark:text-[#EDE9E0]">
              {p}
            </p>
          ))}
        </section>
      ))}
      <aside className="mt-10 rounded-2xl border border-[#E4DCCB] bg-[#FBF7EF] p-5 text-sm text-[#6B6558] dark:border-[#23312B] dark:bg-[#101B16] dark:text-[#9BA89F]">
        <p className="mb-2 font-semibold">¿Buscás un nombre con datos?</p>
        <Link href="/ranking/" className="font-medium text-[#0F766E] hover:underline dark:text-[#5EEAD4]">
          Ver el ranking nacional →
        </Link>{" "}
        <span>·</span>{" "}
        <Link href="/nombres-por-letra/" className="font-medium text-[#0F766E] hover:underline dark:text-[#5EEAD4]">
          Explorar por letra →
        </Link>
        <p className="mt-3">
          La información legal de este sitio es orientativa y no constituye asesoramiento
          profesional. Verificá siempre el texto vigente de la norma en la fuente oficial.
        </p>
      </aside>
    </article>
  );
}