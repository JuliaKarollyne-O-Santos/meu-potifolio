import type { ReactNode } from "react";
import { Rabisco } from "./Adesivos";
import { atrasoEntrada } from "./entrada";

type TituloSecaoProps = {
  /** Número da seção, ex.: "01" */
  numero: string;
  /** Recadinho escrito à mão em cima do título, ex.: "sobre mim" */
  recado: string;
  titulo: ReactNode;
  descricao?: ReactNode;
  className?: string;
  /** Cor do texto do título (padrão: cor do tema) */
  claro?: boolean;
};

/**
 * Título padrão das seções: número + recadinho à mão + título com rabisco embaixo.
 * Entra animado: o recado vem da esquerda, o título sobe e o rabisco se desenha.
 */
export default function TituloSecao({ numero, recado, titulo, descricao, className = "", claro = false }: TituloSecaoProps) {
  return (
    <div className={className}>
      <p
        className={`revelar-esquerda mb-3 flex items-center gap-3 font-mao text-[clamp(22px,2vw,28px)] leading-none ${
          claro ? "text-tiffany" : "text-destaque"
        }`}
      >
        <span className="rounded-full border-[1.5px] border-current px-2.5 py-0.5 font-sans text-[13px] font-bold tracking-wider">
          {numero}
        </span>
        {recado}
      </p>
      <h2
        className={`revelar desenhar relative inline-block text-[clamp(36px,4.6vw,72px)] tracking-[-0.015em] ${claro ? "text-white" : ""}`}
        style={atrasoEntrada(0.1)}
      >
        {titulo}
        <Rabisco className="absolute -bottom-3 left-0 h-3.5 w-[min(100%,260px)] text-tiffany" />
      </h2>
      {descricao && (
        <p
          className={`revelar mt-7 max-w-[56ch] text-[clamp(17px,1.3vw,19px)] ${claro ? "text-[#c9d7e8]" : "text-tinta-suave"}`}
          style={atrasoEntrada(0.2)}
        >
          {descricao}
        </p>
      )}
    </div>
  );
}
