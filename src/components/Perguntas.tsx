"use client";

import { useState } from "react";
import { perguntas } from "@/data/conteudo";
import { Brilho, Espiral, Estrela } from "./Adesivos";
import Container from "./Container";
import { atrasoEntrada } from "./entrada";
import LetrasRecortadas, { type LetraRecortada } from "./LetrasRecortadas";
import TituloSecao from "./TituloSecao";

/* "?!" recortado, no mesmo estilo do nome */
const letrasPergunta: LetraRecortada[] = [
  {
    letra: "?",
    papel: "#1f3d63",
    fundo: "#81d8d0",
    cor: "#1f3d63",
    fonte: "serif",
    giro: -8,
    recorte: "polygon(4% 0%, 100% 6%, 94% 100%, 0% 94%)",
    recorteInterno: "polygon(0% 3%, 97% 0%, 100% 96%, 4% 100%)",
  },
  {
    letra: "!",
    papel: "#3f5fc4",
    cor: "#ffffff",
    fonte: "serifItalico",
    giro: 7,
    recorte: "polygon(10% 4%, 100% 0%, 90% 100%, 0% 92%)",
  },
];

/* Quantas perguntas aparecem (as primeiras da lista em conteudo.ts) */
const QUANTIDADE = 3;

export default function Perguntas() {
  // Qual pergunta está aberta (começa com a primeira aberta, para mostrar como funciona)
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <section id="perguntas" className="caderno secao relative overflow-hidden">
      {/*
        items-start: as duas colunas começam no topo, então o texto da esquerda
        fica parado quando uma resposta abre ou fecha.
        lg:min-h-[520px]: reserva espaço para a seção não "pular" ao abrir uma resposta.
      */}
      <Container className="grid items-start gap-x-[clamp(32px,6vw,120px)] gap-y-12 lg:min-h-[520px] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative">
          <TituloSecao numero="02" recado="pode perguntar" titulo={perguntas.titulo} descricao={perguntas.descricao} />

          <div
            aria-hidden="true"
            className="revelar-zoom relative mt-12 hidden h-[220px] w-[300px] lg:block"
            style={atrasoEntrada(0.3)}
          >
            <div className="absolute top-2 left-6">
              <LetrasRecortadas letras={letrasPergunta} tamanho="text-[120px]" />
            </div>
            <Estrela cor="#a9c8e3" costura="#1f3d63" className="absolute top-0 right-6 w-16 rotate-12 animate-flutuar" />
            <Brilho className="absolute right-2 bottom-8 w-8 animate-piscar" />
            <Espiral className="absolute bottom-0 left-0 w-10 animate-girar" />
          </div>
        </div>

        <ul className="m-0 flex list-none flex-col gap-4 p-0">
          {perguntas.itens.slice(0, QUANTIDADE).map((item, i) => {
            const estaAberta = aberta === i;
            const idBotao = `pergunta-${i}`;
            const idResposta = `resposta-${i}`;

            return (
              // O <li> só cuida da animação de entrada; o cartão fica no <div> de dentro
              <li key={item.pergunta} className="revelar-direita" style={atrasoEntrada(0.1 + i * 0.09)}>
                <div
                  className={`rounded-[20px] border-[1.5px] bg-superficie transition-[border-color,box-shadow,transform] duration-300 ${
                    estaAberta
                      ? "border-destaque shadow-[5px_6px_0_0_var(--color-tiffany)] dark:shadow-[5px_6px_0_0_#3f5fc4]"
                      : "border-tinta/15 shadow-[0_10px_24px_-20px_rgba(10,25,45,0.6)] hover:-translate-y-0.5 hover:border-tinta/40"
                  }`}
                >
                  <h3 className="m-0 text-[clamp(19px,1.55vw,24px)]">
                    <button
                      type="button"
                      id={idBotao}
                      aria-expanded={estaAberta}
                      aria-controls={idResposta}
                      onClick={() => setAberta(estaAberta ? null : i)}
                      className="flex w-full cursor-pointer items-center gap-4 rounded-[20px] px-5 py-5 text-left text-tinta sm:gap-5 sm:px-7 sm:py-6"
                    >
                      <span className="w-9 shrink-0 font-mao text-[28px] leading-none text-destaque">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{item.pergunta}</span>
                      {/* "+" que vira "x" quando abre */}
                      <span
                        aria-hidden="true"
                        className={`relative grid size-9 shrink-0 place-items-center rounded-full border-[1.5px] transition duration-300 ${
                          estaAberta
                            ? "rotate-45 border-destaque bg-destaque text-white dark:text-marinho"
                            : "border-tinta/40 text-tinta"
                        }`}
                      >
                        <span className="absolute h-[2px] w-3.5 rounded bg-current" />
                        <span className="absolute h-3.5 w-[2px] rounded bg-current" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={idResposta}
                    role="region"
                    aria-labelledby={idBotao}
                    inert={!estaAberta}
                    className={`grid transition-[grid-template-rows] duration-[400ms] ease-out ${
                      estaAberta ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="m-0 px-5 pb-6 text-[clamp(16px,1.2vw,18px)] text-tinta-suave sm:pr-20 sm:pb-7 sm:pl-[86px]">
                        {item.resposta}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
