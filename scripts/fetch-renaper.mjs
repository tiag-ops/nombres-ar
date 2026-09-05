// Fetcher de datos oficiales RENAPER (dataset "Nombres propios en Argentina", datos.gob.ar).
// Descarga los 2 CSV oficiales y genera los JSON que consume el build:
//   src/data/renaper/frecuentes.json  — top 169 nombres con sexo (rankings, hubs, sexo)
//   src/data/renaper/nombres.json     — resumen por nombre (>=100 registros): serie anual + provincias
// Sale 0 en todos los caminos: si el sitio ya tiene JSON no se bloquea el deploy.
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(RAIZ, "src", "data", "renaper");

const FUENTE = "RENAPER — Dirección Nacional de Población";
const URL_COMPLETO =
  "https://datosabiertos.renaper.gob.ar/nombres_propios_provincia_anio_2012_2024.csv";
const URL_FRECUENTES =
  "https://datosabiertos.renaper.gob.ar/nombres_propios_frecuentes_anio_sexo_provincia_2012_2024.csv";
const URL_METODOLOGIA =
  "https://datosabiertos.renaper.gob.ar/Metodologia_nombres_propios_Argentina.pdf";

// "NOMBRE UNICO" es el bucket de nombres registrados una sola vez: NO es un nombre.
const BUCKET_RUIDO = "NOMBRE UNICO";

function parseCsv(texto) {
  const lineas = texto.split(/\r?\n/);
  const encabezado = lineas[0].split(",");
  const filas = [];
  for (let i = 1; i < lineas.length; i++) {
    const l = lineas[i].trim();
    if (!l) continue;
    const partes = l.split(",");
    const fila = {};
    encabezado.forEach((h, j) => (fila[h] = partes[j]));
    filas.push(fila);
  }
  return filas;
}

async function descargar(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (nombres-ar fetcher)" },
    signal: AbortSignal.timeout(120_000),
  });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return await res.text();
}

function titulo(n) {
  return n.charAt(0).toUpperCase() + n.slice(1).toLowerCase();
}

async function main() {
  const descargadoEl = new Date().toISOString();
  mkdirSync(DATA, { recursive: true });

  console.log("Descargando CSV de frecuentes (con sexo)...");
  const filasFrec = parseCsv(await descargar(URL_FRECUENTES));
  console.log(`  ${filasFrec.length} filas frecuentes`);

  const jurisdicciones = {};
  for (const f of filasFrec) {
    if (!jurisdicciones[f.provincia_id]) jurisdicciones[f.provincia_id] = f.nombre_provincia;
  }

  const frecuentesJson = {
    fuente: FUENTE,
    urlFuente: URL_FRECUENTES,
    urlMetodologia: URL_METODOLOGIA,
    descargadoEl,
    jurisdicciones,
    filas: filasFrec.map((f) => ({
      nombre: titulo(f.nombre),
      sexo: f.sexo,
      anio: Number(f.anio),
      provId: Number(f.provincia_id),
      cantidad: Number(f.cantidad),
    })),
  };
  writeFileSync(join(DATA, "frecuentes.json"), JSON.stringify(frecuentesJson));
  console.log(`  frecuentes.json: ${frecuentesJson.filas.length} filas, ${Object.keys(jurisdicciones).length} jurisdicciones`);

  console.log("Descargando CSV completo (10 MB)...");
  const filasComp = parseCsv(await descargar(URL_COMPLETO));
  console.log(`  ${filasComp.length} filas completas`);

  // Agregación por nombre (nacional)
  const porNombre = new Map(); // nombre -> { porAnio: {}, provTotal: {} }
  for (const f of filasComp) {
    const nombre = titulo(f.nombre);
    if (nombre === titulo(BUCKET_RUIDO)) continue;
    let e = porNombre.get(nombre);
    if (!e) {
      e = { porAnio: {}, provTotal: {} };
      porNombre.set(nombre, e);
    }
    const anio = Number(f.anio);
    const cantidad = Number(f.cantidad);
    e.porAnio[anio] = (e.porAnio[anio] || 0) + cantidad;
    e.provTotal[f.provincia_id] = (e.provTotal[f.provincia_id] || 0) + cantidad;
  }

  // Solo nombres con >=100 registros en el período (inventario para fichas)
  const UMBRAL = 100;
  const resumen = [];
  for (const [nombre, e] of porNombre) {
    const total = Object.values(e.porAnio).reduce((a, b) => a + b, 0);
    if (total < UMBRAL) continue;
    resumen.push({
      nombre,
      total,
      porAnio: e.porAnio,
      provTotal: e.provTotal,
    });
  }
  resumen.sort((a, b) => b.total - a.total);

  const nombresJson = {
    fuente: FUENTE,
    urlFuente: URL_COMPLETO,
    urlMetodologia: URL_METODOLOGIA,
    descargadoEl,
    umbralRegistros: UMBRAL,
    jurisdicciones,
    nombres: resumen,
  };
  writeFileSync(join(DATA, "nombres.json"), JSON.stringify(nombresJson));
  console.log(`  nombres.json: ${resumen.length} nombres (>= ${UMBRAL} registros)`);

  // Verificación rápida contra canarios conocidos
  const benja2024 = resumen.find((n) => n.nombre === "Benjamin")?.porAnio[2024];
  const isa2024 = resumen.find((n) => n.nombre === "Isabella")?.porAnio[2024];
  console.log(`  canarios: Benjamin 2024 = ${benja2024}, Isabella 2024 = ${isa2024}`);
}

main().catch((e) => {
  console.error("ERROR en fetch-renaper:", e.message);
  process.exit(1);
});
