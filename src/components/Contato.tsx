import { perfil } from "@/data/conteudo";
import { Brilho, Envelope, Estrela, Rabisco } from "./Adesivos";
import Container from "./Container";
import { atrasoEntrada } from "./entrada";

type ItemContato = { rotulo: string; href: string; externo?: boolean; baixar?: string };

export default function Contato() {
  const itens: ItemContato[] = [
    { rotulo: perfil.email, href: `mailto:${perfil.email}` },
    { rotulo: "GitHub", href: perfil.links.github, externo: true },
    { rotulo: "LinkedIn", href: perfil.links.linkedin, externo: true },
    { rotulo: "Baixar currículo", href: perfil.links.curriculo, baixar: "Curriculo-Julia-Karollyne.pdf" },
  ];

  return (
    <section id="contato" className="xadrez-claro secao relative overflow-hidden">
      {/* Enfeites */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Estrela
          cor="#3f5fc4"
          costura="#ffffff"
          className="absolute top-[16%] right-[6%] hidden w-[clamp(80px,9vw,150px)] rotate-12 animate-flutuar sm:block"
        />
        <Estrela
          cor="#81d8d0"
          costura="#1f3d63"
          className="absolute right-[22%] bottom-[14%] hidden w-16 -rotate-12 animate-flutuar-lento md:block"
        />
        <Envelope className="absolute top-[52%] right-[10%] hidden w-[clamp(90px,8vw,130px)] rotate-[10deg] animate-flutuar-lento text-tinta lg:block" />
        <Brilho className="absolute top-[12%] left-[46%] w-7 animate-piscar" />
        <Brilho className="absolute bottom-[18%] left-[3%] w-8 animate-piscar" style={{ animationDelay: "1s" }} />
      </div>

      <Container className="relative">
        <p className="revelar-esquerda mb-4 font-mao text-[clamp(24px,2.2vw,32px)] leading-none text-destaque">05 · me chama!</p>
        <h2
          className="revelar desenhar mb-6 text-[clamp(52px,8vw,136px)] leading-[0.95] tracking-[-0.02em]"
          style={atrasoEntrada(0.1)}
        >
          Vamos{" "}
          <span className="whitespace-nowrap">
            <span className="relative inline-block italic">
              conversar
              <Rabisco className="absolute -bottom-2 left-0 h-[0.16em] w-full text-tiffany" />
            </span>
            ?
          </span>
        </h2>
        <p className="revelar mb-10 max-w-[40ch] text-[clamp(19px,1.8vw,24px)] leading-[1.55]" style={atrasoEntrada(0.25)}>
          Se você tem uma vaga de estágio ou um projeto em que eu possa ajudar, me chama.
        </p>

        <ul className="m-0 flex list-none flex-wrap gap-3.5 p-0">
          {/* Itens sem link (ex.: LinkedIn vazio em conteudo.ts) não aparecem */}
          {itens
            .filter((item) => item.href.trim() !== "")
            .map((item, i) => (
              <li key={item.rotulo} className="revelar-zoom" style={atrasoEntrada(0.35 + i * 0.1)}>
                <a
                  href={item.href}
                  {...(item.baixar
                    ? { download: item.baixar }
                    : item.externo
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  className="inline-block rounded-full border-[1.5px] border-tinta bg-superficie px-[24px] py-3.5 font-semibold text-tinta no-underline shadow-[3px_4px_0_0_rgba(31,61,99,0.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-marinho hover:text-white dark:hover:bg-tiffany dark:hover:text-marinho"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
        </ul>
      </Container>
    </section>
  );
}
