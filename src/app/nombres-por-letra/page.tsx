import Link from "next/link";
import { ANIO_ACTUAL, LETRAS_CON_FICHA } from "@/lib/datos";

export const metadata = {
  title: "Nombres de bebé por letra en Argentina",
  description: `Explorá los nombres de bebé más registrados en Argentina por cada letra, con datos oficiales RENAPER 2012–${ANIO_ACTUAL}, significado y evolución.`,
  alternates: { canonical: "/nombres-por-letra/" },
};

export default function Page() {
  return (
    <section>
      <h1 className="font-display mb-2 text-3xl font-bold sm:text-4xl">Nombres por letra</h1>
      <p className="mb-8 max-w-2xl text-[15px] text-[#6B6558] dark:text-[#9BA89F]">
        Los nombres más registrados en Argentina para cada inicial, con su cantidad de inscripciones
        oficiales (RENAPER 2012–{ANIO_ACTUAL}) y fichas con significado, tendencia y evolución.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {LETRAS_CON_FICHA.map((l) => (
          <Link href={`/letra/${l}/`} key={l} className="card card-hover block text-center">
            <span className="font-display block text-4xl font-bold text-[#0F766E] dark:text-[#5EEAD4]">
              {l.toUpperCase()}
            </span>
            <span className="mt-2 block text-sm font-medium">Nombres con {l.toUpperCase()}</span>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-[13px] text-[#6B6558] dark:text-[#9BA89F]">
        Las letras de esta lista crecen automáticamente a medida que se publican nuevas fichas con
        significado. Fuente: RENAPER, registros nominales de nacimiento 2012–{ANIO_ACTUAL}.
      </p>
    </section>
  );
}