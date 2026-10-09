import type { CSSProperties } from "react";

/** Atraso da animação de entrada, em segundos. Ex.: style={atrasoEntrada(0.2)} */
export function atrasoEntrada(segundos: number): CSSProperties {
  return { "--atraso": `${segundos}s` } as CSSProperties;
}
