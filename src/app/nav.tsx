"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/ranking/", label: "Ranking" },
  { href: "/letra/a/", label: "Nombres por letra" },
  { href: "/guia/", label: "Guías" },
  { href: "/quienes-somos/", label: "Quiénes somos" },
];

/**
 * Navegación desktop + drawer hamburguesa mobile (regla flota aplicada).
 * El drawer y el overlay se renderizan POR PORTAL al <body>: el <header>
 * sticky tiene backdrop-blur, que crea un containing block para los
 * position:fixed descendientes y los achicaría a la altura del header.
 */
export default function Nav() {
  const [abierto, setAbierto] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [abierto]);

  const drawer = (
    <>
      {/* Overlay */}
      {abierto && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setAbierto(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-[#FDF9F2] shadow-xl transition-transform duration-200 md:hidden dark:bg-[#0D1713] ${
          abierto ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <div className="flex items-center justify-between border-b border-[#E4DCCB] px-5 py-4 dark:border-[#23312B]">
          <span className="font-display text-lg font-bold">NombresAR</span>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setAbierto(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D6CDB8] dark:border-[#2E3D35]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Menú móvil">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setAbierto(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-[#2D2A26] transition-colors hover:bg-[#F0EADA] hover:text-[#0F766E] dark:text-[#EDE9E0] dark:hover:bg-[#16241E] dark:hover:text-[#5EEAD4]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-[#E4DCCB] px-5 py-4 dark:border-[#23312B]">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#6B6558] dark:text-[#9BA89F]">Tema</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <nav className="hidden gap-4 text-sm md:flex" aria-label="Principal">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="transition-colors hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Botón hamburguesa */}
      <button
        type="button"
        aria-label="Abrir menú"
        aria-expanded={abierto}
        onClick={() => setAbierto(true)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D6CDB8] transition-colors hover:border-[#0F766E] md:hidden dark:border-[#2E3D35] dark:hover:border-[#5EEAD4]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay + drawer: al body via portal (escapar del containing block del header backdrop-blur) */}
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}