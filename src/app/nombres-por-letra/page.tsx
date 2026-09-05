import Link from "next/link";

export const metadata = {
  title: "Nombres de bebé por letra (A–E)",
  description:
    "Explorá los nombres de bebé más registrados en Argentina por cada letra, con datos oficiales RENAPER 2012–2024.",
  alternates: { canonical: "/nombres-por-letra/" },
};

export default function Page() {
  return (
    <section>
      <h1 className="font-display mb-2 text-3xl font-bold sm:text-4xl">Nombres por letra</h1>
      <p className="mb-8 max-w-2xl text-[15px] text-[#6B6558] dark:text-[#9BA89F]">
        Los nombres más registrados en Argentina para cada inicial, con su cantidad de inscripciones
        oficiales (RENAPER 2012–2024). Por ahora cubrimos las letras A a E.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {["A", "B", "C", "D", "E"].map((l) => (
          <Link href={`/letra/${l.toLowerCase()}/`} key={l} className="card card-hover block text-center">
            <span className="font-display block text-4xl font-bold text-[#0F766E] dark:text-[#5EEAD4]">{l}</span>
            <span className="mt-2 block text-sm font-medium">Nombres con {l}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}