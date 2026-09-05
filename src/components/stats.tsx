import type { Tendencia } from "@/lib/datos";

/** Badge de tendencia: ▲ alza, → estable, ▼ baja (WCAG: siempre con texto, no solo color). */
export function TendenciaBadge({ t }: { t: Tendencia }) {
  if (t === "alza")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#0F766E]/10 px-3 py-1 text-xs font-semibold text-[#0F766E] dark:bg-[#5EEAD4]/10 dark:text-[#5EEAD4]">
        <span aria-hidden="true">▲</span> En alza
      </span>
    );
  if (t === "baja")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[#C2410C]/10 px-3 py-1 text-xs font-semibold text-[#C2410C] dark:bg-[#FDBA74]/10 dark:text-[#FDBA74]">
        <span aria-hidden="true">▼</span> En baja
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#6B6558]/10 px-3 py-1 text-xs font-semibold text-[#6B6558] dark:bg-[#9BA89F]/10 dark:text-[#9BA89F]">
      <span aria-hidden="true">→</span> Estable
    </span>
  );
}

/** Celda de estadística de la ficha (título + valor + sub). */
export function Stat({
  etiqueta,
  valor,
  sub,
}: {
  etiqueta: string;
  valor: string;
  sub?: string;
}) {
  return (
    <div className="card">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#6B6558] dark:text-[#9BA89F]">
        {etiqueta}
      </p>
      <p className="font-display mt-1 text-2xl font-bold">{valor}</p>
      {sub && <p className="mt-0.5 text-sm text-[#6B6558] dark:text-[#9BA89F]">{sub}</p>}
    </div>
  );
}