import type { NombreM } from "@/lib/datos";
import { serie } from "@/lib/datos";

interface Props {
  nombre: NombreM;
  /** Ancho en px del SVG */
  width?: number;
  height?: number;
  /** Etiqueta accesible (aria-label del gráfico) */
  label: string;
}

/** Sparkline SVG de la evolución 2012–2024 (área + línea con gradiente teal). */
export default function Sparkline({ nombre, width = 320, height = 96, label }: Props) {
  const pts = serie(nombre).map((s) => ({ anio: s.anio, v: s.cantidad }));
  const max = Math.max(...pts.map((p) => p.v), 1);
  const min = Math.min(...pts.map((p) => p.v));
  const rango = max - min || 1;
  const pad = 4;

  const x = (i: number) => pad + (i / (pts.length - 1)) * (width - pad * 2);
  const y = (v: number) => height - pad - ((v - min) / rango) * (height - pad * 2);

  const linea = pts.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.v).toFixed(1)}`).join(" ");
  const area = `${linea} L${x(pts.length - 1).toFixed(1)},${height} L${x(0).toFixed(1)},${height} Z`;
  const ultimo = pts[pts.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      role="img"
      aria-label={label}
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={`g-${nombre.nombre}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F766E" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#0F766E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#g-${nombre.nombre})`} />
      <path
        d={linea}
        fill="none"
        stroke="#0F766E"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="dark:stroke-[#5EEAD4]"
      />
      <circle
        cx={x(pts.length - 1)}
        cy={y(ultimo.v)}
        r="4"
        fill="#C2410C"
        className="dark:fill-[#FDBA74]"
      />
    </svg>
  );
}