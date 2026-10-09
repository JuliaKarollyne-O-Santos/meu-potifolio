import { sobre } from "@/data/conteudo";
import { Brilho, Estrela, Fita, Seta } from "./Adesivos";
import Container from "./Container";
import { atrasoEntrada } from "./entrada";
import TituloSecao from "./TituloSecao";

/* Cada área é um cartãozinho de papel colado com fita */
const cartoes = [
  { papel: "bg-[#dbe8f5]", giro: "-rotate-[1.6deg]", fita: "bg-tiffany/75", lado: "left-8" },
  { papel: "bg-postit", giro: "rotate-[1.2deg]", fita: "bg-poeira/70", lado: "right-10" },
  { papel: "bg-white", giro: "-rotate-[0.8deg]", fita: "bg-ceu/80", lado: "left-1/2 -translate-x-1/2" },
];

export default function Sobre() {
  return (
    <section id="sobre" className="secao relative overflow-hidden">
      <Brilho className="absolute top-24 right-[6%] w-8 animate-piscar" />
      <Estrela
        cor="#81d8d0"
        costura="#1f3d63"
        className="absolute bottom-10 left-[3%] hidden w-16 -rotate-12 animate-flutuar-lento md:block"
      />

      <Container className="grid items-center gap-x-[clamp(32px,6vw,120px)] gap-y-14 lg:grid-cols-2">
        <div className="relative">
          <TituloSecao numero="01" recado="sobre mim" titulo={sobre.titulo} />
          <div className="mt-7 flex flex-col gap-3 text-[clamp(16px,1.15vw,18px)] leading-[1.6]">
            {sobre.paragrafos.map((paragrafo, i) => (
              <p key={paragrafo} className="revelar m-0 max-w-[62ch]" style={atrasoEntrada(0.2 + i * 0.12)}>
                {paragrafo}
              </p>
            ))}
          </div>
          <a
            href="#perguntas"
            className="revelar-esquerda group mt-5 ml-14 hidden w-fit items-center gap-3 font-mao text-[24px] text-destaque no-underline hover:text-tinta lg:flex"
            style={atrasoEntrada(0.6)}
          >
            o que eu faço
            <Seta className="w-16 rotate-[60deg] transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </div>

        <ul className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8">
          {sobre.areas.map((area, i) => {
            const cartao = cartoes[i % cartoes.length];
            return (
              <li
                key={area.titulo}
                className={`revelar-colar ${i === 2 ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%+40px)]" : ""}`}
                style={atrasoEntrada(0.15 + i * 0.18)}
              >
                <div
                  className={`relative ${cartao.papel} ${cartao.giro} h-full px-6 pt-7 pb-5 text-marinho shadow-[0_18px_30px_-18px_rgba(10,25,45,0.55)] transition duration-300 hover:-translate-y-1.5 hover:rotate-0`}
                >
                  <Fita className={`-top-3 ${cartao.lado} -rotate-2`} cor={cartao.fita} />
                  <span className="mb-2 block font-serif text-[34px] leading-none text-real italic [font-variation-settings:'SOFT'_100]">
                    0{i + 1}
                  </span>
                  <strong className="mb-1 block font-serif text-[clamp(20px,1.5vw,23px)] font-medium [font-variation-settings:'SOFT'_100]">
                    {area.titulo}
                  </strong>
                  <span className="text-[15px] leading-[1.55] text-marinho-suave">{area.descricao}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
