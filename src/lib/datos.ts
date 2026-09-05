// Núcleo de datos de NombresAR.
// Fuente única de verdad: nombres.json (derivado del CSV completo RENAPER).
// frecuentes.json solo aporta el mapa sexo→nombre (los 169 nombres con sexo publicado).
import nombresRaw from "@/data/renaper/nombres.json";
import nacimientosRaw from "@/data/renaper/nacimientos.json";
import sexoRaw from "@/data/renaper/sexo-nombres.json";
import tildesRaw from "@/data/renaper/tildes.json";
import significadosRaw from "@/data/significados.json";

// ---------- tipos ----------
export interface NombreM {
  nombre: string;
  total: number;
  porAnio: Record<string, number>;
  provTotal: Record<string, number>;
}

export interface Dataset {
  fuente?: string;
  urlFuente?: string;
  urlMetodologia?: string;
  descargadoEl?: string;
  umbralRegistros?: number;
  jurisdicciones: Record<string, string>;
  nombres: NombreM[];
}

export interface Nacimientos {
  fuente?: string;
  nota?: string;
  porAnio: Record<string, number>;
}

export interface Significado {
  origen: string;
  significado: string;
  nota: string;
  santoral: string | null;
}

export type Sexo = "M" | "F";

// ---------- datos crudos ----------
export const dataset = nombresRaw as unknown as Dataset;
export const nacimientos = nacimientosRaw as unknown as Nacimientos;
export const sexoMap = sexoRaw as unknown as Record<string, Sexo>;
export const tildes = tildesRaw as unknown as Record<string, string>;
export const significados = significadosRaw as unknown as Record<string, Significado>;

export const ANIOS = Object.keys(nacimientos.porAnio)
  .map(Number)
  .sort((a, b) => a - b);
export const ANIO_INICIAL = ANIOS[0];
export const ANIO_ACTUAL = ANIOS[ANIOS.length - 1];

export const JURISDICCIONES = dataset.jurisdicciones;
/** Provincias reales (excluye "99" que es la fila nacional/sin provincia asignada). */
export const PROVINCIAS = Object.entries(JURISDICCIONES)
  .filter(([id]) => id !== "99")
  .map(([id, nombre]) => ({ id, nombre }));

const POR_SLUG = new Map(dataset.nombres.map((n) => [slug(n.nombre), n]));

// ---------- helpers de display ----------
/** Forma legible (con tilde) de un nombre canónico del CSV. */
export function displayName(nombre: string): string {
  return tildes[nombre] ?? nombre;
}

/** Slug de URL: minúsculas sin tildes (el CSV ya viene sin tildes, sobramos). */
export function slug(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function nombrePorSlug(s: string): NombreM | undefined {
  return POR_SLUG.get(s);
}

export function sexoDe(nombre: string): Sexo | null {
  return sexoMap[nombre] ?? null;
}

/** Formateo de miles con punto (es-AR). */
export function miles(n: number): string {
  return new Intl.NumberFormat("es-AR").format(n);
}

export function pct(n: number, dec = 1): string {
  return `${n.toFixed(dec).replace(".", ",")}%`;
}

// ---------- series ----------
export function serie(n: NombreM): { anio: number; cantidad: number }[] {
  return ANIOS.map((anio) => ({ anio, cantidad: n.porAnio[String(anio)] ?? 0 }));
}

/** Tasa cada 1.000 nacimientos de un año (denominador: total nacional de ese año). */
export function tasaPorMil(n: NombreM, anio: number): number {
  const nac = nacimientos.porAnio[String(anio)];
  if (!nac) return 0;
  return ((n.porAnio[String(anio)] ?? 0) / nac) * 1000;
}

/** Variación % contra el año previo (null si no hay previo o previo = 0). */
export function deltaPct(n: NombreM, anio: number): number | null {
  const ant = n.porAnio[String(anio - 1)];
  if (!ant) return null;
  const act = n.porAnio[String(anio)] ?? 0;
  if (ant === 0) return null;
  return ((act - ant) / ant) * 100;
}

export type Tendencia = "alza" | "estable" | "baja";

/** Tendencia del último año: >+3% alza, <-3% baja, intermedio estable. */
export function tendencia(n: NombreM, anio: number = ANIO_ACTUAL): Tendencia {
  const d = deltaPct(n, anio);
  if (d === null) return "estable";
  if (d >= 3) return "alza";
  if (d <= -3) return "baja";
  return "estable";
}

/** Récord histórico (año y cantidad máxima). */
export function record(n: NombreM): { anio: number; cantidad: number } {
  let best = { anio: ANIOS[0], cantidad: 0 };
  for (const a of ANIOS) {
    const c = n.porAnio[String(a)] ?? 0;
    if (c > best.cantidad) best = { anio: a, cantidad: c };
  }
  return best;
}

// ---------- rankings ----------
/** Ranking nacional de un año: nombres con >0 registros, descendente. */
export function rankAnio(anio: number): NombreM[] {
  return dataset.nombres
    .filter((n) => (n.porAnio[String(anio)] ?? 0) > 0)
    .sort((a, b) => (b.porAnio[String(anio)] ?? 0) - (a.porAnio[String(anio)] ?? 0));
}

export const RANK_ANIO_CACHE = new Map<number, NombreM[]>(
  ANIOS.map((a) => [a, rankAnio(a)]),
);

/** Posición 1-based en el ranking nacional del año (null si no aparece ese año). */
export function posicion(n: NombreM, anio: number): number | null {
  const r = RANK_ANIO_CACHE.get(anio);
  if (!r) return null;
  const i = r.indexOf(n);
  return i === -1 ? null : i + 1;
}

/** Top K de un año (opcional filtro por sexo conocido). */
export function topPorAnio(
  anio: number,
  sexo?: Sexo,
  k = 10,
): { nombre: string; cantidad: number; sexo: Sexo | null }[] {
  const r = RANK_ANIO_CACHE.get(anio) ?? [];
  return r
    .filter((n) => (sexo ? sexoDe(n.nombre) === sexo : true))
    .slice(0, k)
    .map((n) => ({ nombre: n.nombre, cantidad: n.porAnio[String(anio)] ?? 0, sexo: sexoDe(n.nombre) }));
}

/** Top provincias de un nombre (excluye fila 99). */
export function topProvincias(n: NombreM, k = 3): { nombre: string; cantidad: number; pct: number }[] {
  const entradas = Object.entries(n.provTotal)
    .filter(([id]) => id !== "99")
    .sort((a, b) => b[1] - a[1])
    .slice(0, k);
  const total = entradas.reduce((s, [, c]) => s + c, 0) || 1;
  return entradas.map(([id, c]) => ({ nombre: JURISDICCIONES[id] ?? id, cantidad: c, pct: (c / total) * 100 }));
}

// ---------- hermanitos (correlación de curvas) ----------
function pearson(a: number[], b: number[]): number {
  const n = a.length;
  if (n !== b.length || n === 0) return 0;
  const ma = a.reduce((s, v) => s + v, 0) / n;
  const mb = b.reduce((s, v) => s + v, 0) / n;
  let num = 0;
  let da = 0;
  let db = 0;
  for (let i = 0; i < n; i++) {
    num += (a[i] - ma) * (b[i] - mb);
    da += (a[i] - ma) ** 2;
    db += (b[i] - mb) ** 2;
  }
  const den = Math.sqrt(da * db);
  return den === 0 ? 0 : num / den;
}

/** Nombres con curva de uso más parecida (correlación de tasas 2012–2024). */
export function hermanitos(n: NombreM, k = 3): { nombre: string; r: number }[] {
  const base = serie(n).map((s) => tasaPorMil(n, s.anio));
  return dataset.nombres
    .filter((o) => o.nombre !== n.nombre && o.total >= 5000)
    .map((o) => ({ nombre: o.nombre, r: pearson(base, serie(o).map((s) => tasaPorMil(o, s.anio))) }))
    .sort((a, b) => b.r - a.r)
    .slice(0, k);
}

// ---------- metadata de fichas ----------
export const FICHAS = dataset.nombres
  .slice()
  .sort((a, b) => b.total - a.total)
  .slice(0, 24)
  .map((n) => n.nombre)
  .filter((n) => significados[n]);

/** ¿Este nombre tiene ficha generada? (los demás NO tienen página: zero-404s de flota) */
const FICHAS_SLUGS = new Set(FICHAS.map((n) => n.toLowerCase()));
export function tieneFicha(nombre: string): boolean {
  return FICHAS_SLUGS.has(nombre.toLowerCase());
}