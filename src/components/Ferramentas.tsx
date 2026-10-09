import { ferramentas } from "@/data/conteudo";
import { Espiral, Estrela } from "./Adesivos";
import Container from "./Container";
import { atrasoEntrada } from "./entrada";
import TituloSecao from "./TituloSecao";

/* Cada grupo tem uma cor de papel; as etiquetas ficam levemente tortas */
const cores = ["bg-ceu", "bg-tiffany", "bg-[#dbe8f5]", "bg-postit"];
const giros = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-0"];

export default function Ferramentas() {
  return (
    <section id="ferramentas" className="pontilhado secao relative overflow-hidden">
      <Estrela
        cor="#3f5fc4"
        costura="#ffffff"
        className="absolute top-24 right-[5%] hidden w-20 rotate-12 animate-flutuar md:block"
      />
      <Espiral className="absolute bottom-12 left-[4%] hidden w-11 animate-girar md:block" />

      <Container>
        <TituloSecao
          numero="04"
          recado="minha caixinha"
          titulo="Ferramentas do dia a dia"
          className="mb-[clamp(48px,5vw,72px)]"
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {ferramentas.map((grupo, g) => (
            <div
              key={grupo.titulo}
              style={atrasoEntrada(g * 0.12)}
              className="revelar rounded-[20px] border-[1.5px] border-tinta/15 bg-superficie p-7 shadow-[0_16px_28px_-22px_rgba(10,25,45,0.6)]"
            >
              <h3 className="mb-5 flex items-center gap-2 font-mao text-[30px] leading-none text-destaque [font-variation-settings:normal]">
                <span aria-hidden="true" className={`size-3 rounded-full ${cores[g % cores.length]}`} />
                {grupo.titulo}
              </h3>
              <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
                {grupo.itens.map((item, i) => (
                  <li
                    key={item}
                    className={`${cores[g % cores.length]} ${giros[(i + g) % giros.length]} px-3 py-1.5 text-[15px] font-semibold text-marinho shadow-[2px_3px_0_rgba(31,61,99,0.22)] transition-transform duration-200 hover:scale-110 hover:rotate-0`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
