import type { Metadata } from "next";
import { SITE_NOMBRE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: `Términos de uso de ${SITE_NOMBRE}: alcance informativo, exactitud de los datos y propiedad del contenido.`,
  alternates: { canonical: "/terminos/" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="font-display mb-6 text-3xl font-bold sm:text-4xl">Términos de uso</h1>
      <div className="space-y-6 text-[16px] leading-relaxed">
        <section>
          <h2 className="font-display mb-2 text-xl font-bold">1. Alcance informativo</h2>
          <p>
            {SITE_NOMBRE} publica estadísticas y contenidos con fines únicamente informativos y
            orientativos. Nada en este sitio constituye asesoramiento legal, médico ni profesional
            de ningún tipo.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-2 text-xl font-bold">2. Exactitud de los datos</h2>
          <p>
            Los datos estadísticos provienen de la RENAPER (datos.gob.ar) y se procesan de forma
            automatizada. Hacemos el mejor esfuerzo por reflejarlos fielmente, pero no
            garantizamos su exactitud ni su vigencia. Ante cualquier discrepancia, prevalece la
            fuente oficial.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-2 text-xl font-bold">3. Contenido</h2>
          <p>
            El contenido editorial (redacción, curadón etimológica, diseño) es de uso libre con
            atribución. Los datos oficiales citados pertenecen a sus titulares y su uso se limita
            al marco de la normativa de datos abiertos argentina.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-2 text-xl font-bold">4. Responsabilidad</h2>
          <p>
            El sitio se ofrece «como está», sin garantías. No nos hacemos responsables por
            decisiones tomadas a partir de su contenido. Si encontrás un error, avisanos y lo
            corregimos.
          </p>
        </section>
      </div>
    </article>
  );
}