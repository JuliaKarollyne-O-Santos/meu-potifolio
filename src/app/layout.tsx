import type { Metadata } from "next";
import { Caveat, Figtree, Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800", "900"],
  variable: "--font-figtree",
  display: "swap",
});

/* Letra de mão, usada no post-it e nos recadinhos */
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Julia Karollyne potifólio",
  description:
    "Portfólio de Julia Karollyne: estudante de ADS na Fatec Taubaté, desenvolvedora front-end, UI/UX e design.",
};

/*
 * Roda antes da página aparecer:
 * 1) coloca a classe "js" (as animações de entrada só escondem os elementos se tiver JavaScript);
 * 2) aplica o tema claro/escuro sem "piscar". Usa a escolha salva pelo botão;
 *    se não tiver, segue o tema do computador.
 */
const scriptTema = `(function(){var h=document.documentElement;h.classList.add("js");try{var t=localStorage.getItem("tema");var e=t?t==="escuro":window.matchMedia("(prefers-color-scheme: dark)").matches;if(e)h.classList.add("dark");}catch(_){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${figtree.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
