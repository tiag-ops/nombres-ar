// Post-build (se corre después de `next build`), patrón validado de la flota:
// 1) Copia los payloads RSC anidados del export a su ruta PLANA (la que pide el
//    router cliente — /ruta/__next.seg.$var.__PAGE__.txt). Sin esto, cada
//    prefetch/navegación SPA da 404 con CF Pages.
// 2) 301 de toda URL sin barra final hacia su versión con barra.
// 3) /* /404.html 404 — nunca soft-404s (gate SEO).
import {
  readdirSync,
  statSync,
  existsSync,
  writeFileSync,
  copyFileSync,
} from "node:fs";
import { join, relative, dirname, sep } from "node:path";

const OUT = decodeURIComponent(new URL("../out", import.meta.url).pathname).replace(
  /^\/([A-Za-z]):/,
  "$1:",
);

const reglas = ["## Generado por scripts/gen-redirects.mjs — no editar a mano"];
let copiados = 0;

function aplanarArchivo(dir, nombreDir) {
  // copia <dir>/<nombreDir>/[<sub>/]__PAGE__.txt a <dir>/__next.<x>.<sub>.__PAGE__.txt
  const sub = join(dir, nombreDir);
  for (const f of readdirSync(sub)) {
    const p = join(sub, f);
    if (statSync(p).isDirectory()) {
      for (const g of readdirSync(p)) {
        if (g === "__PAGE__.txt") {
          const destino = join(dir, `__next.${nombreDir.slice("__next.".length)}.${f}.__PAGE__.txt`);
          copyFileSync(join(p, g), destino);
          copiados++;
        }
      }
    } else if (f === "__PAGE__.txt") {
      const destino = join(dir, `__next.${nombreDir.slice("__next.".length)}.__PAGE__.txt`);
      copyFileSync(p, destino);
      copiados++;
    }
  }
}

function scan(dir) {
  const archivos = readdirSync(dir);
  if (archivos.includes("index.html")) {
    const rel = relative(OUT, dir).split(sep).join("/");
    for (const a of archivos) {
      if (a.startsWith("__next.") && statSync(join(dir, a)).isDirectory()) {
        aplanarArchivo(dir, a);
      }
    }
    if (rel) reglas.push(`/${rel} /${rel}/ 301`);
  }
  for (const a of archivos) {
    const p = join(dir, a);
    if (statSync(p).isDirectory() && !a.startsWith("_next") && !a.startsWith("__next")) {
      scan(p);
    }
  }
}

if (existsSync(OUT)) {
  scan(OUT);
  reglas.push("/* /404.html 404");
  writeFileSync(
    join(OUT, "_redirects"),
    `${reglas.join("\n")}\n`,
  );
  console.log(`gen-redirects: ${copiados} payloads RSC aplanados + ${reglas.length} reglas`);
} else {
  console.error("ERROR: out/ no existe — correr next build primero");
  process.exit(1);
}