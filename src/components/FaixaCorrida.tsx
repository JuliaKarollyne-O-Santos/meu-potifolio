import { Fragment } from "react";

const palavras = ["Front-end", "UI/UX", "Design", "React", "Next.js", "TypeScript", "Figma", "Scrum"];

/** Borda de papel rasgado (gerada uma vez, sempre igual) */
function gerarRasgo(): string {
  const alturas = [8, 3, 10, 5, 12, 4, 9, 2, 11, 6, 13, 3, 8, 5, 10, 2, 12, 7, 4, 11, 6, 9, 3, 12, 5, 8, 2, 10, 6, 13, 4, 9, 7, 11, 3, 8, 12, 5, 10, 4];
  const passo = 100 / (alturas.length - 1);
  const pontos = alturas.map((a, i) => `${(i * passo).toFixed(2)} ${a}`).join(" L");
  return `M0 16 L${pontos} L100 16 Z`;
}

const rasgo = gerarRasgo();

/** Estrelinha de quatro pontas entre as palavras */
function Separador() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="mx-[clamp(18px,2.4vw,36px)] w-[0.6em] shrink-0 fill-tiffany">
      <path d="M12 1 C13 9 15 11 23 12 C15 13 13 15 12 23 C11 15 9 13 1 12 C9 11 11 9 12 1Z" />
    </svg>
  );
}

/** Faixa azul com palavras correndo, com a borda de cima rasgada */
export default function FaixaCorrida() {
  // A lista aparece duas vezes para a animação dar a volta sem "pulo"
  const lista = [...palavras, ...palavras];

  return (
    <div aria-hidden="true" className="relative z-[2] bg-marinho text-white dark:bg-[#0a1830]">
      <svg
        viewBox="0 0 100 16"
        preserveAspectRatio="none"
        className="absolute bottom-full left-0 h-[18px] w-full fill-marinho dark:fill-[#0a1830]"
      >
        <path d={rasgo} />
      </svg>

      <div className="overflow-hidden py-[clamp(14px,1.6vw,22px)]">
        <div className="flex w-max animate-deslizar items-center font-serif text-[clamp(26px,3vw,44px)] whitespace-nowrap italic [font-variation-settings:'SOFT'_100]">
          {lista.map((palavra, i) => (
            <Fragment key={`${palavra}-${i}`}>
              <span>{palavra}</span>
              <Separador />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
