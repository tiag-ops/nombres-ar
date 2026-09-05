import type { Metadata } from "next";
import { SITE_NOMBRE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidad",
  description: `Política de privacidad de ${SITE_NOMBRE}: qué datos se recopilan, cookies y publicidad (AdSense).`,
  alternates: { canonical: "/privacidad/" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="font-display mb-6 text-3xl font-bold sm:text-4xl">Política de privacidad</h1>
      <div className="space-y-6 text-[16px] leading-relaxed">
        <section>
          <h2 className="font-display mb-2 text-xl font-bold">1. Qué datos recopilamos</h2>
          <p>
            {SITE_NOMBRE} no te pide registro, no recopila datos personales de contacto y no
            almacena información identificable en sus propios servidores. El sitio es estático y no
            tiene base de datos propia.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-2 text-xl font-bold">2. Cookies y estadísticas</h2>
          <p>
            El sitio guarda únicamente una preferencia local de tema visual (claro/oscuro) en tu
            navegador (localStorage), que no se envía a ningún servidor y podés borrar en cualquier
            momento.
          </p>
          <p className="mt-2">
            Si en el futuro se incorporan servicios de medición de audiencia o publicidad
            (incluido Google AdSense), esos proveedores pueden utilizar cookies para mostrar
            anuncios según tus visitas previas. Podés optar por no recibir publicidad personalizada
            en{" "}
            <a
              href="https://adssettings.google.com"
              className="font-medium text-[#0F766E] underline decoration-2 underline-offset-2 dark:text-[#5EEAD4]"
              target="_blank"
              rel="noopener noreferrer"
            >
              adssettings.google.com
            </a>
            . Esta política se actualizará antes de activar cualquier servicio de ese tipo.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-2 text-xl font-bold">3. Datos públicos citados</h2>
          <p>
            Toda la información estadística proviene de la RENAPER vía datos.gob.ar, en dominio
            público. El sitio no introduce datos personales: las estadísticas de nombres son
            agregadas por año y jurisdicción, sin referencia a personas individuales.
          </p>
        </section>
        <section>
          <h2 className="font-display mb-2 text-xl font-bold">4. Contacto</h2>
          <p>
            Ante cualquier duda sobre esta política podés escribir a través del formulario de
            contacto que se habilite en el sitio o por los canales publicados en la solapa
            «Quiénes somos».
          </p>
        </section>
      </div>
    </article>
  );
}