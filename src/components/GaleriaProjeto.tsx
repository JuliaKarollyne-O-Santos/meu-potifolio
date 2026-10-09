"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import type { MidiaProjeto } from "@/data/conteudo";
import { Fita } from "./Adesivos";

type Props = {
  nome: string;
  midias: MidiaProjeto[];
};

type Movimento = "abrir" | "proxima" | "anterior";

/* Cada cartão fica levemente torto, como uma foto colada */
const giros = ["-1.4deg", "1.1deg", "-0.6deg", "1.6deg"];
const fitas = ["bg-tiffany/80", "bg-ceu/90", "bg-postit", "bg-poeira/80"];

/*
 * Animações da galeria (ficam aqui para não precisar mexer no globals.css):
 * - o cartão entra flutuando e se "cola" no meio da tela;
 * - ao trocar de mídia, ele chega pelo lado certo;
 * - depois fica boiando devagar.
 * O tamanho máximo das mídias também fica aqui: elas aparecem inteiras, sem cortar.
 */
const estilos = `
.galeria {
  --galeria-altura: calc(100svh - 290px);
  --galeria-largura: calc(100vw - 64px);
}
@media (min-width: 640px) {
  .galeria {
    --galeria-altura: calc(100svh - 255px);
    --galeria-largura: min(calc(100vw - 220px), 1100px);
  }
}
@keyframes galeria-colar {
  0% { opacity: 0; transform: translateY(90px) rotate(calc(var(--giro) - 7deg)) scale(0.8); }
  60% { opacity: 1; transform: translateY(-10px) rotate(calc(var(--giro) + 1deg)) scale(1.02); }
  100% { opacity: 1; transform: translateY(0) rotate(var(--giro)) scale(1); }
}
@keyframes galeria-proxima {
  0% { opacity: 0; transform: translateX(110px) rotate(calc(var(--giro) + 6deg)) scale(0.9); }
  100% { opacity: 1; transform: translateX(0) rotate(var(--giro)) scale(1); }
}
@keyframes galeria-anterior {
  0% { opacity: 0; transform: translateX(-110px) rotate(calc(var(--giro) - 6deg)) scale(0.9); }
  100% { opacity: 1; transform: translateX(0) rotate(var(--giro)) scale(1); }
}
@keyframes galeria-boiar {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.galeria-abrir { animation: galeria-colar 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.galeria-proxima { animation: galeria-proxima 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.galeria-anterior { animation: galeria-anterior 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.galeria-boiar { animation: galeria-boiar 5s ease-in-out 0.9s infinite; }
`;

/** Tamanho da mídia na tela: o maior possível, mantendo o formato original */
function tamanhoNaTela(midia: MidiaProjeto): CSSProperties {
  const proporcao = midia.largura / midia.altura;
  return {
    width: `min(var(--galeria-largura), calc(var(--galeria-altura) * ${proporcao.toFixed(4)}))`,
    height: "auto",
    aspectRatio: `${midia.largura} / ${midia.altura}`,
  };
}

function Seta({ direcao }: { direcao: "esquerda" | "direita" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={direcao === "direita" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"} />
    </svg>
  );
}

/**
 * Botão "Ver o projeto" + galeria de fotos e vídeos que abre por cima da página.
 * Dá para trocar de mídia pelas setas, pelas miniaturas, pelo teclado (← →)
 * ou arrastando o dedo no celular. Esc ou o X fecham.
 */
export default function GaleriaProjeto({ nome, midias }: Props) {
  const [indice, setIndice] = useState<number | null>(null);
  const [visivel, setVisivel] = useState(false);
  const [movimento, setMovimento] = useState<Movimento>("abrir");

  const botaoRef = useRef<HTMLButtonElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const dialogoRef = useRef<HTMLDivElement>(null);
  const inicioToque = useRef<number | null>(null);

  const aberto = indice !== null;
  const total = midias.length;

  const abrir = () => {
    setMovimento("abrir");
    setIndice(0);
  };

  const fechar = useCallback(() => {
    setVisivel(false);
    window.setTimeout(() => {
      setIndice(null);
      botaoRef.current?.focus();
    }, 300);
  }, []);

  const ir = useCallback(
    (passo: 1 | -1) => {
      setMovimento(passo === 1 ? "proxima" : "anterior");
      setIndice((atual) => (atual === null ? atual : (atual + passo + total) % total));
    },
    [total],
  );

  const irPara = (novo: number) => {
    if (indice === null || novo === indice) return;
    setMovimento(novo > indice ? "proxima" : "anterior");
    setIndice(novo);
  };

  // Enquanto a galeria está aberta: trava a rolagem da página e liga o teclado
  useEffect(() => {
    if (!aberto) return;

    const quadro = requestAnimationFrame(() => setVisivel(true));
    const rolagemAntes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    fecharRef.current?.focus();

    const aoApertarTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      else if (e.key === "ArrowRight") ir(1);
      else if (e.key === "ArrowLeft") ir(-1);
      else if (e.key === "Tab" && dialogoRef.current) {
        // Mantém o foco do teclado dentro da galeria
        const focaveis = dialogoRef.current.querySelectorAll<HTMLElement>("button, video, [href]");
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (e.shiftKey && document.activeElement === primeiro) {
          e.preventDefault();
          ultimo?.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primeiro?.focus();
        }
      }
    };
    window.addEventListener("keydown", aoApertarTecla);

    return () => {
      cancelAnimationFrame(quadro);
      document.body.style.overflow = rolagemAntes;
      window.removeEventListener("keydown", aoApertarTecla);
    };
  }, [aberto, fechar, ir]);

  // Arrastar o dedo para os lados troca de mídia
  const aoTocar = (e: TouchEvent) => {
    inicioToque.current = e.touches[0]?.clientX ?? null;
  };
  const aoSoltar = (e: TouchEvent) => {
    if (inicioToque.current === null) return;
    const distancia = (e.changedTouches[0]?.clientX ?? inicioToque.current) - inicioToque.current;
    if (Math.abs(distancia) > 50) ir(distancia < 0 ? 1 : -1);
    inicioToque.current = null;
  };

  const midia = indice === null ? null : midias[indice];

  return (
    <>
      <button
        ref={botaoRef}
        type="button"
        onClick={abrir}
        aria-haspopup="dialog"
        className="cursor-pointer border-0 bg-transparent p-0 text-destaque underline underline-offset-[3px] hover:text-tinta"
      >
        Ver o projeto ↗
      </button>

      {aberto &&
        midia &&
        indice !== null &&
        createPortal(
          <div
            ref={dialogoRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Fotos e vídeos do ${nome}`}
            className={`galeria fixed inset-0 z-[100] flex flex-col items-center px-3 pt-4 pb-3 transition-opacity duration-300 sm:px-6 sm:pt-5 ${
              visivel ? "opacity-100" : "opacity-0"
            }`}
          >
            <style>{estilos}</style>

            {/* Fundo escuro: clicar nele fecha */}
            <div aria-hidden="true" onClick={fechar} className="absolute inset-0 bg-[#0b1626]/85 backdrop-blur-md" />

            {/* Topo: nome, contador e botão de fechar */}
            <div className="relative z-10 flex w-full max-w-[1200px] items-center justify-between gap-4">
              <p className="m-0 font-mao text-[clamp(26px,2.4vw,34px)] leading-none text-white">
                {nome}{" "}
                <span className="text-tiffany">
                  {indice + 1}/{total}
                </span>
              </p>
              <button
                ref={fecharRef}
                type="button"
                onClick={fechar}
                aria-label="Fechar"
                className="grid size-11 cursor-pointer place-items-center rounded-full border-0 bg-white text-marinho shadow-[3px_4px_0_0_rgba(129,216,208,0.7)] transition duration-300 hover:rotate-90 hover:bg-tiffany"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Palco: a mídia grande no meio */}
            <div
              className="relative z-10 flex min-h-0 w-full flex-1 items-center justify-center py-3"
              onTouchStart={aoTocar}
              onTouchEnd={aoSoltar}
            >
              {total > 1 && (
                <button
                  type="button"
                  onClick={() => ir(-1)}
                  aria-label="Mídia anterior"
                  className="absolute top-1/2 left-0 z-20 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-0 bg-white/90 text-marinho shadow-lg transition hover:scale-110 hover:bg-tiffany sm:left-4 sm:size-14"
                >
                  <Seta direcao="esquerda" />
                </button>
              )}

              {/* key muda a cada troca: assim a animação de entrada roda de novo */}
              <div
                key={indice}
                className={`galeria-${movimento}`}
                style={{ "--giro": giros[indice % giros.length] } as CSSProperties}
              >
                <div className="galeria-boiar">
                  <figure className="relative m-0 min-w-[min(340px,calc(100vw-40px))] rounded-[18px] bg-[#fffdf7] p-2.5 pb-3 shadow-[0_40px_70px_-25px_rgba(0,0,0,0.75)] sm:p-3.5 sm:pb-4">
                    <Fita className="-top-3 left-1/2 z-10 -translate-x-1/2 -rotate-3" cor={fitas[indice % fitas.length]} />

                    {midia.tipo === "video" ? (
                      <video
                        key={midia.src}
                        src={midia.src}
                        poster={midia.capa}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="mx-auto block rounded-[10px] bg-black"
                        style={tamanhoNaTela(midia)}
                      />
                    ) : (
                      <Image
                        src={midia.src}
                        alt={midia.legenda}
                        width={midia.largura}
                        height={midia.altura}
                        sizes="(min-width: 640px) 1100px, 100vw"
                        className="mx-auto block rounded-[10px] bg-white"
                        style={tamanhoNaTela(midia)}
                        priority
                      />
                    )}

                    {/* w-0 + min-w-full: a legenda acompanha a largura do cartão, sem esticar ele */}
                    <figcaption className="w-0 min-w-full px-1 pt-2.5 text-center font-mao text-[clamp(20px,1.7vw,26px)] leading-[1.15] text-marinho">
                      {midia.legenda}
                    </figcaption>
                  </figure>
                </div>
              </div>

              {total > 1 && (
                <button
                  type="button"
                  onClick={() => ir(1)}
                  aria-label="Próxima mídia"
                  className="absolute top-1/2 right-0 z-20 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border-0 bg-white/90 text-marinho shadow-lg transition hover:scale-110 hover:bg-tiffany sm:right-4 sm:size-14"
                >
                  <Seta direcao="direita" />
                </button>
              )}
            </div>

            {/* Miniaturas: clicar leva direto para a mídia */}
            {total > 1 && (
              <ul className="relative z-10 m-0 flex max-w-full list-none gap-2 overflow-x-auto p-1">
                {midias.map((item, i) => (
                  <li key={item.src} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => irPara(i)}
                      aria-label={`Ver ${i + 1}: ${item.legenda}`}
                      aria-current={i === indice}
                      className={`relative grid size-14 cursor-pointer place-items-center overflow-hidden rounded-[10px] border-2 bg-[#14243a] p-0 transition sm:size-16 ${
                        i === indice ? "scale-105 border-tiffany" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={item.tipo === "video" ? (item.capa ?? item.src) : item.src}
                        alt=""
                        width={item.largura}
                        height={item.altura}
                        sizes="64px"
                        className="h-auto max-h-[48px] w-auto max-w-[48px] object-contain sm:max-h-[56px] sm:max-w-[56px]"
                      />
                      {item.tipo === "video" && (
                        <span aria-hidden="true" className="absolute grid size-6 place-items-center rounded-full bg-white/90 text-[10px] text-marinho">
                          ▶
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
