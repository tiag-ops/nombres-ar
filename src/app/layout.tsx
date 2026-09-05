import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import Link from "next/link";
import Nav from "./nav";
import { themeScript } from "./theme-script";
import { SITE_URL, SITE_NOMBRE } from "@/lib/site";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NombresAR — Nombres de bebé en Argentina con datos oficiales",
    template: "%s | NombresAR",
  },
  description:
    "Rankings oficiales de nombres de bebé en Argentina (RENAPER 2012–2024): los más elegidos, tendencia año a año, tasa cada 1.000 nacimientos, top por provincia y significado de cada nombre.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: SITE_NOMBRE,
    images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "NombresAR — nombres de bebé en Argentina con datos oficiales RENAPER" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NombresAR — Nombres de bebé en Argentina con datos oficiales",
    description:
      "Rankings oficiales de nombres de bebé en Argentina (RENAPER 2012–2024): tendencia año a año, tasa cada 1.000 nacimientos y significado de cada nombre.",
    images: [`${SITE_URL}/og.png`],
  },
  verification: {
    google: "PENDIENTE_GSC",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${serif.variable} ${inter.variable}`}>
        <header className="sticky top-0 z-10 border-b border-[#E4DCCB] bg-[#FDF9F2]/95 backdrop-blur dark:border-[#23312B] dark:bg-[#0C1512]/95">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-display text-xl font-bold tracking-tight">
              Nombres<span className="text-[#0F766E]">AR</span>
            </Link>
            <div className="flex items-center gap-3">
              <Nav />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mt-12 border-t border-[#E4DCCB] py-8 text-[13px] text-[#6B6558] dark:border-[#23312B] dark:text-[#9BA89F]">
          <div className="mx-auto max-w-5xl px-4">
            <p className="mb-2 flex flex-wrap gap-x-4 gap-y-1">
              <Link href="/ranking/" className="hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">Ranking de nombres</Link>
              <Link href="/guia/" className="hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">Guías</Link>
              <Link href="/quienes-somos/" className="hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">Quiénes somos</Link>
              <Link href="/privacidad/" className="hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">Privacidad</Link>
              <Link href="/terminos/" className="hover:text-[#0F766E] dark:hover:text-[#5EEAD4]">Términos</Link>
            </p>
            <p className="max-w-3xl">
              Datos: RENAPER (Dirección Nacional de Población), publicados en
              datos.gob.ar, período 2012–2024. Sin afiliación oficial. La
              información es orientativa; el significado de los nombres es
              etimológico y cultural, no normativo.
            </p>
            <p className="mt-2">© {new Date().getFullYear()} {SITE_NOMBRE}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}