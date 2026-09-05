import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-16 text-center">
      <p className="font-display text-7xl font-bold text-[#0F766E] dark:text-[#5EEAD4]">404</p>
      <h1 className="font-display mt-4 text-2xl font-bold">Esa página no tiene nombre conocido</h1>
      <p className="mx-auto mt-2 max-w-md text-[15px] text-[#6B6558] dark:text-[#9BA89F]">
        Se acabó la página, pero no los nombres. Explorá el ranking oficial o las fichas con
        tendencia y significado.
      </p>
      <p className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn">Ir al inicio</Link>
        <Link href="/ranking/" className="btn-ghost">Ver el ranking</Link>
      </p>
    </section>
  );
}