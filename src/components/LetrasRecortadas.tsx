import type { CSSProperties } from "react";

/*
 * Letras recortadas, inspiradas em colagem de revista:
 * cada letra é um pedaço de papel de um azul diferente, com recorte irregular e levemente torto.
 */

export type LetraRecortada = {
  letra: string;
  papel: string; // cor do papel de fora
  fundo?: string; // cor do papel de dentro (opcional, faz a "camada dupla")
  cor: string; // cor da letra
  fonte: "serif" | "serifItalico" | "sans";
  giro: number; // inclinação em graus
  recorte: string; // formato do papel de fora (clip-path)
  recorteInterno?: string; // formato do papel de dentro
};

const fontes = {
  serif: "font-serif font-black [font-variation-settings:'SOFT'_50]",
  serifItalico: "font-serif font-bold italic [font-variation-settings:'SOFT'_100]",
  sans: "font-sans font-black",
};

/** As cinco letras de "Julia" */
export const letrasDoNome: LetraRecortada[] = [
  {
    letra: "J",
    papel: "#1f3d63",
    fundo: "#a9c8e3",
    cor: "#1f3d63",
    fonte: "serif",
    giro: -6,
    recorte: "polygon(4% 2%, 97% 0%, 100% 88%, 92% 100%, 0% 97%, 2% 40%)",
    recorteInterno: "polygon(0% 4%, 100% 0%, 97% 100%, 3% 95%)",
  },
  {
    letra: "u",
    papel: "#81d8d0",
    cor: "#1f3d63",
    fonte: "sans",
    giro: 5,
    recorte: "polygon(0% 8%, 88% 0%, 100% 12%, 96% 100%, 8% 94%)",
  },
  {
    letra: "l",
    papel: "#3f5fc4",
    fundo: "#1f3d63",
    cor: "#ffffff",
    fonte: "serifItalico",
    giro: -3,
    recorte: "polygon(10% 0%, 100% 4%, 92% 100%, 0% 96%)",
    recorteInterno: "polygon(6% 3%, 96% 0%, 100% 97%, 0% 100%)",
  },
  {
    letra: "i",
    papel: "#8da9c4",
    fundo: "#ffffff",
    cor: "#3f5fc4",
    fonte: "serif",
    giro: 6,
    recorte: "polygon(0% 0%, 94% 6%, 100% 100%, 4% 92%)",
    recorteInterno: "polygon(5% 2%, 100% 0%, 95% 98%, 0% 100%)",
  },
  {
    letra: "a",
    papel: "#1f3d63",
    fundo: "#3f5fc4",
    cor: "#ffffff",
    fonte: "sans",
    giro: -4,
    recorte: "polygon(6% 0%, 100% 6%, 94% 96%, 30% 100%, 0% 90%)",
    recorteInterno: "polygon(0% 6%, 96% 0%, 100% 94%, 4% 100%)",
  },
];

/** Monograma do topo: "J" e "k" recortados */
export const letrasMonograma: LetraRecortada[] = [
  { ...letrasDoNome[0], giro: -5 },
  {
    letra: "k",
    papel: "#81d8d0",
    cor: "#1f3d63",
    fonte: "serifItalico",
    giro: 6,
    recorte: "polygon(0% 6%, 94% 0%, 100% 90%, 6% 100%)",
  },
];

type Props = {
  letras: LetraRecortada[];
  /** Tamanho da letra (classe do Tailwind), ex.: "text-[22px]" */
  tamanho: string;
  /** Anima as letras "se colando" ao abrir a página e depois balançando */
  animar?: boolean;
};

export default function LetrasRecortadas({ letras, tamanho, animar = false }: Props) {
  return (
    <span aria-hidden="true" className={`inline-flex items-end gap-[0.06em] ${tamanho}`}>
      {letras.map((l, i) => (
        <span
          key={`${l.letra}-${i}`}
          className={`inline-block ${animar ? "animate-colar" : ""}`}
          style={
            {
              "--giro": `${l.giro}deg`,
              transform: `rotate(${l.giro}deg)`,
              animationDelay: animar ? `${150 + i * 110}ms` : undefined,
            } as CSSProperties
          }
        >
          {/* Depois de colar, cada letra balança de leve e treme quando passa o mouse */}
          <span
            className={`block p-[0.07em] ${
              animar
                ? "animate-boiar [animation-delay:var(--atraso)] hover:animate-tremer hover:[animation-delay:0s]"
                : ""
            }`}
            style={
              {
                background: l.papel,
                clipPath: l.recorte,
                "--atraso": `${-i * 0.9}s`,
              } as CSSProperties
            }
          >
            <span
              className={`block px-[0.13em] pt-[0.04em] pb-[0.08em] leading-none ${fontes[l.fonte]}`}
              style={{ background: l.fundo ?? "transparent", clipPath: l.recorteInterno, color: l.cor }}
            >
              {l.letra}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}
