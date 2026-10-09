import Image from "next/image";
import type { CSSProperties } from "react";
import { outrosProjetos, projetoDestaque, type Projeto } from "@/data/conteudo";
import { Brilho, Clipe, Estrela, Fita, Gota, Seta } from "./Adesivos";
import Botao from "./Botao";
import Container from "./Container";
import { atrasoEntrada } from "./entrada";
import GaleriaProjeto from "./GaleriaProjeto";
import TituloSecao from "./TituloSecao";

/* Ilustração de "chuva" que aparece enquanto não houver print do projeto */
const ilustracaoChuva: CSSProperties = {
  background: [
    "radial-gradient(circle at 30% 60%, rgba(129,216,208,.55) 0 18px, transparent 19px)",
    "radial-gradient(circle at 62% 42%, rgba(0,149,182,.7) 0 12px, transparent 13px)",
    "radial-gradient(circle at 74% 70%, rgba(129,216,208,.4) 0 26px, transparent 27px)",
    "repeating-linear-gradient(105deg, transparent 0 22px, rgba(129,216,208,.18) 22px 23px)",
  ].join(", "),
};

function dominio(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** Janela de navegador com o print do projeto dentro */
function TelaProjeto({ projeto }: { projeto: Projeto }) {
  return (
    <div className="relative overflow-hidden rounded-[16px] border-[1.5px] border-marinho bg-marinho shadow-[10px_12px_0_0_var(--color-tiffany)] dark:border-[#2b4a73] dark:shadow-[10px_12px_0_0_#3f5fc4]">
      {/* barrinha do navegador */}
      <div className="flex h-[34px] items-center gap-[7px] bg-marinho-escuro px-4">
        <i className="size-[10px] rounded-full bg-[#ff8f8f]" />
        <i className="size-[10px] rounded-full bg-[#ffd36e]" />
        <i className="size-[10px] rounded-full bg-tiffany" />
        {projeto.site && (
          <span className="ml-3 rounded-full bg-white/10 px-3 py-0.5 text-xs text-[#b9c8dd]">{dominio(projeto.site)}</span>
        )}
      </div>

      {projeto.imagem ? (
        // O print aparece inteiro, sem cortar (a janela fica do tamanho da imagem)
        <Image
          src={projeto.imagem}
          alt={`Tela inicial do ${projeto.nome}`}
          width={1915}
          height={865}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="block h-auto w-full bg-white"
        />
      ) : (
        <div className="relative aspect-[16/9]" style={ilustracaoChuva}>
          <b className="absolute bottom-[12%] left-[8%] font-serif text-[clamp(34px,4vw,60px)] font-normal text-white [font-variation-settings:'SOFT'_100]">
            {projeto.nome}
          </b>
        </div>
      )}
    </div>
  );
}

/** Etiquetas de tecnologia */
function Etiquetas({ itens }: { itens: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
      {itens.map((item) => (
        <li
          key={item}
          className="rounded-full border-[1.5px] border-tinta/25 bg-superficie px-3 py-0.5 text-[13px] font-semibold text-tinta"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Destaque({ projeto }: { projeto: Projeto }) {
  return (
    <article className="grid items-center gap-x-[clamp(32px,4.5vw,88px)] gap-y-12 lg:grid-cols-[1fr_1fr]">
      <div className="revelar-zoom relative">
        <TelaProjeto projeto={projeto} />
        {/* Enfeites em volta da tela */}
        <Clipe className="absolute -top-8 left-10 z-[3] w-7 rotate-[8deg]" />
        <Estrela
          cor="#81d8d0"
          costura="#1f3d63"
          className="absolute -top-9 -right-5 z-[3] w-[clamp(64px,6vw,96px)] rotate-12 animate-flutuar"
        />
        <Gota className="absolute -bottom-7 -left-4 z-[3] w-10 -rotate-12 animate-flutuar-lento" />
        <Gota className="absolute -bottom-3 left-10 z-[3] w-6 rotate-6 animate-flutuar" style={{ animationDelay: "1.3s" }} />
      </div>

      <div className="revelar-direita relative lg:-mt-35" style={atrasoEntrada(0.15)}>
        <span className="mb-2 inline-flex -rotate-2 items-center gap-2 bg-tiffany px-3 py-1 text-[13px] font-bold tracking-wide text-marinho uppercase shadow-[2px_3px_0_rgba(31,61,99,0.25)]">
          ★ Projeto em destaque
        </span>
        <h3 className="mb-2 text-[clamp(34px,2.8vw,44px)]">{projeto.nome}</h3>
        <p className="mb-3 max-w-[64ch] text-[clamp(15px,1.1vw,17px)] leading-[1.55]">{projeto.descricao}</p>

        {projeto.destaques && (
          <ul className="mb-3 flex list-none flex-col gap-0.5 p-0 text-[15px]">
            {projeto.destaques.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="text-destaque">✦</span>
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mb-3 flex flex-col gap-0.5 text-[14px] text-tinta-suave">
          {projeto.funcao && (
            <div>
              <strong className="font-semibold text-tinta">Minha função:</strong> {projeto.funcao}
            </div>
          )}
          {projeto.equipe && (
            <div>
              <strong className="font-semibold text-tinta">Equipe:</strong> {projeto.equipe}
            </div>
          )}
        </div>

        {projeto.tecnologias && (
          <div className="mb-4">
            <Etiquetas itens={projeto.tecnologias} />
          </div>
        )}

        <div className="flex flex-wrap gap-3.5">
          {projeto.site && (
            <Botao href={projeto.site} externo>
              Abrir o {projeto.nome} ↗
            </Botao>
          )}
          {projeto.codigo && (
            <Botao href={projeto.codigo} variante="vazio" externo>
              Ver o código
            </Botao>
          )}
        </div>
      </div>
    </article>
  );
}

const papeisCartao = [
  { fita: "bg-tiffany/75", giro: "-rotate-[0.8deg]" },
  { fita: "bg-ceu/80", giro: "rotate-[0.8deg]" },
];

function OutroProjeto({ projeto, indice }: { projeto: Projeto; indice: number }) {
  const papel = papeisCartao[indice % papeisCartao.length];
  return (
    <article
      className={`revelar-colar relative ${papel.giro} rounded-[18px] border-[1.5px] border-tinta/15 bg-superficie p-[clamp(24px,2.4vw,36px)] shadow-[0_18px_30px_-22px_rgba(10,25,45,0.6)] transition duration-300 hover:-translate-y-1.5 hover:rotate-0`}
      style={atrasoEntrada(indice * 0.18)}
    >
      <Fita className="-top-3 left-1/2 -translate-x-1/2 rotate-2" cor={papel.fita} />
      <h3 className="mb-3 text-[clamp(28px,2.4vw,36px)]">{projeto.nome}</h3>
      <p className="mb-5 text-base text-tinta-suave">{projeto.descricao}</p>
      <div className="flex flex-wrap gap-5 text-[15px] font-semibold">
        {projeto.site && (
          <a href={projeto.site} target="_blank" rel="noopener noreferrer">
            Abrir o site ↗
          </a>
        )}
        {projeto.codigo && (
          <a href={projeto.codigo} target="_blank" rel="noopener noreferrer">
            Ver o código ↗
          </a>
        )}
        {/* Abre as fotos e os vídeos do projeto (definidos em conteudo.ts) */}
        {projeto.galeria && projeto.galeria.length > 0 && (
          <GaleriaProjeto nome={projeto.nome} midias={projeto.galeria} />
        )}
      </div>
    </article>
  );
}

export default function Projetos() {
  return (
    <>
      {/* Tela do Pluvite: ocupa uma tela inteira, com tudo no meio */}
      <section id="projetos" className="secao relative overflow-hidden">
        <Brilho className="absolute top-28 right-[8%] w-8 animate-piscar" />

        <Container>
          <div className="mb-15 flex flex-wrap items-end justify-between gap-6">
            <TituloSecao numero="03" recado="o que eu já fiz" titulo="Projetos" />
            <p
              className="revelar-direita hidden items-center gap-2 font-mao text-[26px] text-destaque md:flex"
              style={atrasoEntrada(0.3)}
            >
              o meu favorito
              <Seta className="w-16 rotate-[60deg]" />
            </p>
          </div>

          <Destaque projeto={projetoDestaque} />
        </Container>
      </section>

      {/* Outros projetos, logo abaixo */}
      <div className="relative pb-[clamp(64px,8vw,120px)]">
        <Container>
          <p className="revelar-esquerda mb-10 font-mao text-[clamp(24px,2vw,30px)] leading-none text-destaque">
            outros projetos
          </p>
          <div className="grid gap-10 md:grid-cols-2 md:gap-8">
            {outrosProjetos.map((projeto, i) => (
              <OutroProjeto key={projeto.nome} projeto={projeto} indice={i} />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}