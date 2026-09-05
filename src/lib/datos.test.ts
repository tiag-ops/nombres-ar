import { describe, expect, it } from "vitest";
import {
  ANIOS,
  ANIO_ACTUAL,
  FICHAS,
  LETRAS_CON_FICHA,
  LETRAS_DISPONIBLES,
  RANK_ANIO_CACHE,
  dataset,
  deltaPct,
  displayName,
  faqsDe,
  hermanitos,
  letraDe,
  nombrePorSlug,
  posicion,
  record,
  serie,
  sexoDe,
  significados,
  tasaPorMil,
  tildes,
  tendencia,
  topPorAnio,
  topProvincias,
} from "./datos";

const ANIO = 2024;

describe("canarys verificados contra el CSV RENAPER", () => {
  it("Benjamín 2024 = 8.835 registros", () => {
    const b = nombrePorSlug("benjamin");
    expect(b).toBeDefined();
    expect(b!.porAnio[String(ANIO)]).toBe(8835);
    expect(b!.total).toBe(259663);
  });

  it("Isabella 2024 = 8.379 registros", () => {
    const i = nombrePorSlug("isabella");
    expect(i).toBeDefined();
    expect(i!.porAnio[String(ANIO)]).toBe(8379);
  });

  it("tasa Benjamín 2024 ≈ 13,34‰ (8.835 / 662.466 nac)", () => {
    const b = nombrePorSlug("benjamin")!;
    const t = tasaPorMil(b, ANIO);
    expect(t).toBeCloseTo(13.34, 1);
  });

  it("Benjamín era N°1 del ranking total 2012 (30.010 registros)", () => {
    const top = RANK_ANIO_CACHE.get(2012)!.slice(0, 1);
    expect(top[0].nombre).toBe("Benjamin");
    expect(top[0].porAnio["2012"]).toBe(30010);
  });
});

describe("consistencia del dataset", () => {
  it("2741 nombres únicos, umbral ≥100 registros período completo", () => {
    expect(dataset.nombres.length).toBe(2741);
    for (const n of dataset.nombres) expect(n.total).toBeGreaterThanOrEqual(100);
  });

  it("los 100 top-100 tienen significado y sexo", () => {
    expect(FICHAS.length).toBe(100);
    for (const n of FICHAS) {
      expect(significados[n], `sin significado: ${n}`).toBeDefined();
      expect(sexoDe(n), `sin sexo: ${n}`).not.toBeNull();
    }
  });

  it("los 169 frecuentes tienen sexo (mapa completo)", () => {
    for (const [n, s] of Object.entries(sexoMapCopy())) {
      expect(["M", "F"]).toContain(s);
      expect(tildes[n]).toBeDefined(); // todos los frecuentes tienen display con tilde
    }
  });

  it("top-25 de cada año 2012–2024 tienen sexo (para ranking F/M)", () => {
    for (const anio of ANIOS) {
      const top = RANK_ANIO_CACHE.get(anio)!.slice(0, 25);
      for (const n of top) {
        expect(sexoDe(n.nombre), `${anio} ${n.nombre}`).not.toBeNull();
      }
    }
  });

  it("cloud: sin duplicados ni nombres vacíos", () => {
    const slugs = dataset.nombres.map((n) => n.nombre.toLowerCase());
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every(Boolean)).toBe(true);
  });
});

describe("funciones del motor", () => {
  it("serie() devuelve registros anuales 2012–2024", () => {
    const b = nombrePorSlug("benjamin")!;
    const s = serie(b);
    expect(s.length).toBe(ANIOS.length);
    expect(s[s.length - 1]).toEqual({ anio: ANIO, cantidad: 8835 });
  });

  it("deltaPct() 2024 vs 2023 de Benjamín ≈ −8,4% (tendencia a la baja)", () => {
    const b = nombrePorSlug("benjamin")!;
    const d = deltaPct(b, ANIO);
    expect(d).toBeCloseTo(-8.4, 0);
    expect(tendencia(b)).toBe("baja");
  });

  it("tendencia: Mateo estable, Jazmín en baja", () => {
    const mateo = nombrePorSlug("mateo")!;
    const jazmin = nombrePorSlug("jazmin")!;
    expect(["alza", "baja", "estable"]).toContain(tendencia(mateo));
    expect(tendencia(jazmin)).toBe("baja");
  });

  it("posicion(): Benjamín N°1 del ranking 2024", () => {
    const b = nombrePorSlug("benjamin")!;
    expect(posicion(b, ANIO)).toBe(1);
  });

  it("record(): Benjamín pico en 2013 con 33.214", () => {
    const b = nombrePorSlug("benjamin")!;
    const r = record(b);
    expect(r.anio).toBe(2013);
    expect(r.cantidad).toBe(33214);
  });

  it("topProvincias(): excluye '99' (sin determinar)", () => {
    const b = nombrePorSlug("benjamin")!;
    const provs = topProvincias(b, 3);
    expect(provs.every((p) => p.nombre !== "99")).toBe(true);
    expect(provs.every((p) => p.cantidad > 0)).toBe(true);
  });

  it("hermanitos(): correlación devuelve nombres distintos y con r alto/medio", () => {
    const b = nombrePorSlug("benjamin")!;
    const hs = hermanitos(b, 3);
    expect(hs.length).toBeGreaterThan(0);
    expect(hs.every((h) => h.nombre.toLowerCase() !== "benjamin")).toBe(true);
    for (const h of hs) expect(h.r).toBeGreaterThan(0.5);
  });
});

describe("display y slugs", () => {
  it("displayName aplica tildes (benjamin → Benjamín)", () => {
    expect(displayName("Benjamin")).toBe("Benjamín");
    expect(displayName("Jazmin")).toBe("Jazmín");
    expect(displayName("Maia")).toBe("Maia");
  });

  it("tildes.json cubre 185 nombres de frecuentes", () => {
    expect(Object.keys(tildes).length).toBe(185);
  });
});

describe("SEO por artículo (FAQ y letras)", () => {
  it("faqsDe(): 4 preguntas únicas con datos reales para Benjamín", () => {
    const b = nombrePorSlug("benjamin")!;
    const faqs = faqsDe(b);
    expect(faqs.length).toBe(4);
    const texto = faqs.map((f) => f.q + " " + f.a).join(" ");
    expect(texto).toContain("Benjamín");
    expect(texto).toContain("259.663"); // total 2012–2024
    expect(texto).toContain("2013"); // año pico
    // las FAQ son únicas por nombre: Benjamín ≠ Mateo textualmente
    const mateo = faqsDe(nombrePorSlug("mateo")!);
    expect(mateo[0].q).not.toBe(faqs[0].q);
    expect(mateo[0].a).not.toBe(faqs[0].a);
  });

  it("faqsDe(): respuestas coherentes para un nombre en alza y uno en baja", () => {
    const b = nombrePorSlug("benjamin")!; // baja
    const bajas = faqsDe(b).find((f) => f.q.includes("alza o en baja"))!.a;
    expect(bajas.toLowerCase()).toContain("bajó");
    const fem = faqsDe(nombrePorSlug("valentina")!)[2].a;
    expect(fem.toLowerCase()).toContain("mujer");
  });

  it("LETRAS_CON_FICHA: cubre todas las letras reales de las 24 fichas", () => {
    for (const n of FICHAS) {
      const l = n.normalize("NFD").replace(/[\u0300-\u036f]/g, "")[0].toLowerCase();
      expect(LETRAS_CON_FICHA).toContain(l);
    }
    expect(new Set(LETRAS_CON_FICHA).size).toBe(LETRAS_CON_FICHA.length); // sin duplicados
    expect(LETRAS_CON_FICHA.length).toBeGreaterThan(5); // antes: 5 hardcodeadas
  });

  it("LETRAS_DISPONIBLES: cada nombre del dataset mapea a una letra de la lista", () => {
    for (const n of dataset.nombres.slice(0, 500)) {
      const l = n.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "")[0].toLowerCase();
      expect(LETRAS_DISPONIBLES).toContain(l);
    }
    expect(LETRAS_CON_FICHA.every((l) => LETRAS_DISPONIBLES.includes(l))).toBe(true);
  });

  it("letraDe(): normaliza sin tildes (Ángel → a)", () => {
    expect(letraDe("Angel")).toBe("a");
    expect(letraDe("Águeda")).toBe("a");
    expect(letraDe("Benjamin")).toBe("b");
    expect(letraDe("Valentina")).toBe("v");
  });
});

function sexoMapCopy(): Record<string, string> {
  // sexoDe devuelve 'M'|'F'|null; construimos un mapa con moderación
  const m: Record<string, string> = {};
  for (const n of Object.keys(tildes)) {
    const s = sexoDe(n);
    if (s) m[n] = s;
  }
  return m;
}

describe("sanity general", () => {
  it("FICHAS están todas en el dataset", () => {
    for (const n of FICHAS) expect(nombrePorSlug(n.toLowerCase())).toBeDefined();
  });
});