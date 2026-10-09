import Image from "next/image";
import type { CSSProperties } from "react";
import { perfil } from "@/data/conteudo";
import { Brilho, Coracao, Espiral, Estrela, Fita, SeloGiratorio, Seta } from "./Adesivos";
import Botao from "./Botao";
import Container from "./Container";
import { atrasoEntrada } from "./entrada";
import LetrasRecortadas, { letrasDoNome } from "./LetrasRecortadas";
import PostIt from "./PostIt";

/*
 * Animações de entrada da primeira tela.
 * Aqui elas começam assim que a página abre (só com CSS), sem esperar o JavaScript
 * carregar. Por isso o post-it e os botões não demoram mais para aparecer.
 */
const entrada = {
  subir: "animate-[entrar-subir_1.8s_cubic-bezier(0.2,0.8,0.2,1)_var(--atraso,0s)_both]",
  esquerda: "animate-[entrar-esquerda_1.8s_cubic-bezier(0.2,0.8,0.2,1)_var(--atraso,0s)_both]",
  zoom: "animate-[entrar-zoom_1.8s_cubic-bezier(0.2,0.8,0.2,1)_var(--atraso,0s)_both]",
  colar: "animate-[entrar-colar_1.9s_cubic-bezier(0.2,0.8,0.2,1)_var(--atraso,0s)_both]",
};

/** Atraso da animação, para cada adesivo se mexer num tempo diferente */
const atraso = (segundos: number): CSSProperties => ({ animationDelay: `${segundos}s` });

/** Adesivos espalhados pelo fundo do banner (atrás do conteúdo) */
function AdesivosDoFundo() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <Brilho className="absolute top-[18%] left-[3%] w-7 animate-piscar" style={atraso(0.4)} />
      <Espiral className="absolute bottom-[12%] left-[2%] hidden w-10 animate-girar md:block" />
      <Estrela
        cor="#81d8d0"
        costura="#1f3d63"
        className="absolute bottom-[8%] left-[40%] hidden w-14 rotate-12 animate-flutuar lg:block"
        style={atraso(1.2)}
      />
      <Brilho className="absolute top-[14%] left-[46%] hidden w-6 animate-piscar lg:block" style={atraso(1.1)} />
      <Brilho className="absolute right-[2%] bottom-[16%] w-8 animate-piscar" style={atraso(0.2)} />
    </div>
  );
}

/**
 * Foto estilo polaroid, presa com fita.
 * Quando sobra espaço fica do lado esquerdo do post-it; quando não, fica em cima dele.
 * A foto fica em public/img/julia.jpg
 */
function Polaroid() {
  return (
    <figure className="relative z-[2] -mb-10 ml-3 w-[150px] shrink-0 -rotate-[6deg] self-start bg-white p-2.5 pb-11 shadow-[0_18px_30px_-12px_rgba(10,25,45,0.5)] transition duration-300 hover:-translate-y-1 hover:rotate-[-2deg] lg:w-[132px] lg:p-2 lg:pb-9 @xl:mt-2 @xl:mb-0 @xl:ml-0 @xl:-mr-4 @xl:w-[clamp(150px,10.5vw,200px)] @xl:p-2.5 @xl:pb-11">
      <Fita className="-top-3 left-1/2 z-10 -translate-x-1/2 rotate-3" cor="bg-tiffany/80" />
      <Image
        src="/img/julia.jpg"
        alt="Foto da Julia"
        width={540}
        height={675}
        sizes="220px"
        priority
        className="block aspect-[4/5] h-auto w-full object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-2 text-center font-mao text-[20px] leading-none text-marinho @xl:text-[clamp(20px,1.5vw,24px)]">
        essa sou eu ♡
      </figcaption>
    </figure>
  );
}

/** Colagem da direita: foto, post-it com as informações e adesivos se mexendo em volta */
function Colagem() {
  return (
    <div className={`${entrada.zoom} relative mx-auto w-full max-w-[600px] pt-10 pb-6 @container lg:py-2`} style={atrasoEntrada(0.2)}>
      {/* Adesivos em volta do post-it */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Estrela
          cor="#3f5fc4"
          costura="#ffffff"
          className="absolute -top-2 -right-2 w-[clamp(96px,11vw,170px)] rotate-12 animate-flutuar sm:right-0"
        />
        <Estrela
          cor="#a9c8e3"
          costura="#1f3d63"
          className="absolute -bottom-4 right-[8%] w-[clamp(72px,8vw,120px)] -rotate-12 animate-flutuar-lento"
          style={atraso(1.5)}
        />
        <Estrela
          cor="#81d8d0"
          costura="#1f3d63"
          className="absolute top-0 left-[40%] hidden w-[clamp(44px,4.5vw,66px)] rotate-[20deg] animate-flutuar sm:block"
          style={atraso(2.4)}
        />
        <Brilho className="absolute top-[38%] -right-3 w-9 animate-piscar sm:-right-6" style={atraso(0.6)} />
        <Brilho className="absolute top-[4%] left-[50%] w-7 animate-piscar" style={atraso(1.4)} />
        <Brilho className="absolute bottom-[12%] right-[22%] w-6 animate-piscar" style={atraso(2)} />
        <Espiral className="absolute top-[62%] left-[6%] hidden w-10 animate-girar lg:block" />
      </div>

      {/* Foto + post-it: lado a lado quando a colagem tem 576px ou mais, senão um em cima do outro */}
      <div className="relative z-[1] flex flex-col @xl:flex-row @xl:items-center">
        <Polaroid />

        <PostIt className="relative z-[1] mx-auto w-[min(100%,420px)] @xl:mx-0 @xl:w-auto @xl:max-w-[410px] @xl:flex-1">
          <p className="mb-3 text-[clamp(26px,2.2vw,32px)] leading-none text-real">quem sou eu:</p>
          <p className="mb-3 text-[clamp(19px,1.45vw,23px)] leading-[1.4]">{perfil.frase}</p>
          <p className="m-0 text-[clamp(16px,1.15vw,18px)] leading-[1.4] text-marinho-suave">{perfil.contexto}</p>
          <Coracao className="absolute right-12 bottom-5 w-7 -rotate-12 text-real/80" />
        </PostIt>
      </div>

      {/* Selo girando: disponível para estágio (por cima do canto do post-it, sem ocupar espaço) */}
      <div className="absolute -bottom-20 -left-[2%] z-[2] w-[clamp(96px,8.5vw,124px)] sm:-left-[8%]">
        <SeloGiratorio id="selo-banner" texto="disponível para estágio ✦ front-end ✦ " className="w-full">
          <Estrela cor="#81d8d0" costura="#1f3d63" className="w-[38%] animate-piscar" />
        </SeloGiratorio>
      </div>
    </div>
  );
}

const etiquetas = [
  { texto: "Front-end", cor: "bg-ceu", giro: "-rotate-3" },
  { texto: "UI/UX", cor: "bg-tiffany", giro: "rotate-2" },
  { texto: "Design", cor: "bg-white", giro: "-rotate-1" },
];

export default function Apresentacao() {
  return (
    <section
      aria-label="Apresentação"
      className="xadrez relative isolate flex min-h-svh items-center overflow-hidden pt-[88px] pb-[64px]"
    >
      <AdesivosDoFundo />

      <Container className="grid items-center gap-x-[clamp(24px,5vw,96px)] gap-y-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className={`${entrada.esquerda} mb-2 flex items-end gap-2 font-mao text-[clamp(24px,2.1vw,32px)] leading-none text-tinta`}>
            oi, eu sou a
            <Seta className="mb-[-12px] w-[clamp(48px,4.2vw,64px)] rotate-[18deg] text-bondi dark:text-tiffany" />
          </p>

          <h1 aria-label={perfil.primeiroNome} className="m-0">
            <LetrasRecortadas letras={letrasDoNome} tamanho="text-[clamp(72px,min(12vw,22vh),230px)]" animar />
          </h1>

          {/* Etiquetas recortadas */}
          <ul className="mt-6 mb-7 flex list-none flex-wrap gap-3 p-0" aria-label="Áreas">
            {etiquetas.map((etiqueta, i) => (
              <li
                key={etiqueta.texto}
                style={atrasoEntrada(0.7 + i * 0.1)}
                className={`${entrada.colar} relative ${etiqueta.cor} ${etiqueta.giro} px-3.5 py-1 text-[14px] font-bold tracking-wide text-marinho uppercase shadow-[2px_3px_0_rgba(31,61,99,0.25)] transition-transform hover:rotate-0 hover:scale-105`}
              >
                {etiqueta.texto}
              </li>
            ))}
          </ul>

          <div className={`${entrada.subir} flex flex-wrap gap-3.5`} style={atrasoEntrada(0.95)}>
            <Botao href="#projetos">Ver projetos</Botao>
            <Botao href={perfil.links.curriculo} variante="vazio" baixar="Curriculo-Julia-Karollyne.pdf">
              Baixar currículo
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
              </svg>
            </Botao>
          </div>
        </div>

        <Colagem />
      </Container>

      {/* Setinha de "role para baixo" */}
      <a
        href="#sobre"
        aria-label="Ir para a seção Sobre"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mao text-[22px] leading-none text-tinta no-underline hover:text-destaque md:flex"
      >
        role
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 animate-quicar" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v15M5 13l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
}