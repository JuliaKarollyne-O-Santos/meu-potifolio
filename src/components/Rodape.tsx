import { perfil } from "@/data/conteudo";
import Container from "./Container";
import FitaListrada from "./FitaListrada";
import LetrasRecortadas, { letrasMonograma } from "./LetrasRecortadas";

export default function Rodape() {
  return (
    <footer className="bg-marinho text-[#c9d7e8] dark:bg-[#0a1830]">
      <FitaListrada />
      <Container className="flex flex-wrap items-center justify-between gap-6 py-10">
        <div className="flex items-center gap-4">
          <LetrasRecortadas letras={letrasMonograma} tamanho="text-[30px]" />
          <div className="text-sm leading-relaxed">
            <strong className="block font-semibold text-white">{perfil.nomeCompleto}</strong>
            Feito com Next.js, TypeScript e Tailwind · {new Date().getFullYear()}
          </div>
        </div>
        <a
          href="#inicio"
          className="group inline-flex items-center gap-2 font-mao text-[24px] text-tiffany no-underline hover:text-white"
        >
          voltar ao topo
          <span aria-hidden="true" className="inline-block transition-transform group-hover:-translate-y-1">
            ↑
          </span>
        </a>
      </Container>
    </footer>
  );
}
