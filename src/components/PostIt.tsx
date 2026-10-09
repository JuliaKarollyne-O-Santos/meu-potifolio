import { Patrick_Hand } from "next/font/google";
import type { ReactNode } from "react";
import { Pino } from "./Adesivos";

/* Letra de mão em letra de forma, só para o texto do post-it */
const letraDeForma = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type PostItProps = {
  children: ReactNode;
  className?: string;
  /** Cor do papel (gradiente de cima para baixo) */
  papel?: string;
  /** Cor do cantinho dobrado */
  dobra?: string;
  /** Cor do pino */
  corPino?: string;
};

const TAMANHO_DOBRA = 38; // px

/**
 * Post-it preso por um pino, com o cantinho de baixo dobrado.
 * Ele balança devagar, como se estivesse pendurado no pino.
 */
export default function PostIt({
  children,
  className = "",
  papel = "linear-gradient(172deg, #dcf8f3 0%, #c8f1eb 55%, #b3e7df 100%)",
  dobra = "linear-gradient(135deg, #8fd0c6 0%, #a9e0d8 45%, #e6fbf8 100%)",
  corPino = "#3f5fc4",
}: PostItProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Gira em volta do ponto onde o pino está */}
      <div className="animate-balancar origin-[50%_24px]">
        <div className="relative drop-shadow-[0_18px_22px_rgba(10,25,45,0.28)]">
          <div
            className={`${letraDeForma.className} relative px-[clamp(22px,2.4vw,34px)] pt-12 pb-10 text-marinho`}
            style={{
              background: papel,
              clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${TAMANHO_DOBRA}px), calc(100% - ${TAMANHO_DOBRA}px) 100%, 0 100%)`,
            }}
          >
            {/* faixa de cola do post-it, um pouco mais escura */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-9 bg-[#1f3d63]/[0.04]" />
            {children}
          </div>
          {/* cantinho dobrado */}
          <span
            aria-hidden="true"
            className="absolute right-0 bottom-0 block"
            style={{
              width: TAMANHO_DOBRA,
              height: TAMANHO_DOBRA,
              background: dobra,
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
            }}
          />
        </div>
      </div>
      <Pino cor={corPino} className="absolute -top-3 left-1/2 z-10 w-14 -translate-x-1/2" />
    </div>
  );
}
