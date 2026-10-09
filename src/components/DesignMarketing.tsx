import { designMarketing, type LinkCriativo } from "@/data/conteudo";
import { Estrela } from "./Adesivos";
import Container from "./Container";

/* Cada cartão é um pedaço de papel de uma cor, colado com uma inclinação diferente */
const papeis = [
  { fundo: "bg-ceu", giro: "-rotate-[1.5deg]" },
  { fundo: "bg-white", giro: "rotate-1" },
  { fundo: "bg-poeira", giro: "-rotate-[0.6deg]" },
];

function CartaoCriativo({ link, indice }: { link: LinkCriativo; indice: number }) {
  const temLink = link.href.trim() !== "";
  const papel = papeis[indice % papeis.length];

  const classes = `relative flex min-h-[150px] flex-col justify-between ${papel.fundo} ${papel.giro} p-[26px] pt-8 text-marinho no-underline shadow-[0_16px_30px_-18px_rgba(0,0,0,0.6)] transition-transform duration-200 md:min-h-[200px]`;

  const conteudo = (
    <>
      <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-white/55" />
      <strong className="font-serif text-[28px] leading-[1.1] font-normal [font-variation-settings:'SOFT'_100]">
        {link.titulo}
      </strong>
      <span className="text-[15px] text-marinho-suave">{temLink ? link.descricao : "Em breve"}</span>
    </>
  );

  // Enquanto o link não for preenchido em conteudo.ts, o cartão aparece sem link
  if (!temLink) {
    return <div className={classes}>{conteudo}</div>;
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${classes} hover:-translate-y-1 hover:rotate-0 hover:text-marinho`}
    >
      {conteudo}
    </a>
  );
}

export default function DesignMarketing() {
  return (
    <section id="design" className="jeans relative overflow-hidden py-[clamp(72px,9vw,120px)] text-white">
      {/* Pesponto branco, como a costura de uma calça jeans */}
      <div
        aria-hidden="true"
        className="costura pointer-events-none absolute inset-3 rounded-[22px] border-white/75 md:inset-5"
      />
      <Estrela
        cor="#ffffff"
        costura="#1f3d63"
        className="absolute top-8 right-8 w-14 rotate-12 md:top-10 md:right-14 md:w-16"
      />

      <Container className="relative">
        <div className="mb-12">
          <h2 className="text-[clamp(32px,4.4vw,46px)] tracking-[-0.01em]">{designMarketing.titulo}</h2>
          <p className="mt-3.5 text-[#c9d7e8]">{designMarketing.descricao}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-7">
          {designMarketing.links.map((link, i) => (
            <CartaoCriativo key={link.titulo} link={link} indice={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
