"use client";

import { useEffect, useState } from "react";
import { perfil } from "@/data/conteudo";
import BotaoTema from "./BotaoTema";
import Container from "./Container";
import FitaListrada from "./FitaListrada";
import Logo from "./Logo";

const itensMenu = [
  { rotulo: "Sobre", href: "#sobre" },
  { rotulo: "Perguntas", href: "#perguntas" },
  { rotulo: "Projetos", href: "#projetos" },
  { rotulo: "Ferramentas", href: "#ferramentas" },
  { rotulo: "Contato", href: "#contato" },
];

/** Linha que cresce embaixo do link ao passar o mouse */
const sublinhado =
  "relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-tiffany after:transition-transform after:duration-300 hover:after:scale-x-100";

export default function Topo() {
  // Fundo azul-marinho com a fita listrada, igual ao rodapé; ganha sombra quando a página rola
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const verificar = () => setRolou(window.scrollY > 24);
    verificar();
    window.addEventListener("scroll", verificar, { passive: true });
    return () => window.removeEventListener("scroll", verificar);
  }, []);

  const solido = rolou || menuAberto;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-marinho text-[#c9d7e8] transition-shadow duration-300 dark:bg-[#0a1830] ${
        solido ? "shadow-[0_12px_30px_-16px_rgba(10,25,45,0.6)]" : ""
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <a
          href="#inicio"
          aria-label={`${perfil.nomeCompleto}, voltar ao início`}
          className="no-underline transition-transform hover:-rotate-3"
          onClick={() => setMenuAberto(false)}
        >
          <Logo className="block size-10" />
        </a>

        <nav aria-label="Menu principal" className="flex items-center gap-3 lg:gap-8">
          <ul className="m-0 hidden list-none items-center gap-8 p-0 lg:flex">
            {itensMenu.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={`text-[15px] font-semibold text-white no-underline hover:text-tiffany ${sublinhado}`}>
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>

          <BotaoTema />

          <a
            href={perfil.links.curriculo}
            download="Curriculo-Julia-Karollyne.pdf"
            className="hidden rounded-full border-[1.5px] border-white/80 px-[18px] py-2 text-[15px] font-semibold text-white no-underline transition hover:border-tiffany hover:bg-tiffany hover:text-marinho sm:inline-block"
          >
            Currículo
          </a>

          {/* Botão do menu no celular */}
          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            aria-expanded={menuAberto}
            aria-controls="menu-celular"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            className="grid size-10 cursor-pointer place-items-center rounded-full border-[1.5px] border-white/70 bg-white/10 text-white lg:hidden"
          >
            <span className="relative block h-3.5 w-[18px]">
              <span
                className={`absolute left-0 h-[2px] w-full rounded bg-current transition duration-300 ${
                  menuAberto ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 h-[2px] w-full rounded bg-current transition duration-300 ${
                  menuAberto ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-full rounded bg-current transition duration-300 ${
                  menuAberto ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </nav>
      </Container>

      {/* Menu do celular */}
      <div
        id="menu-celular"
        className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${
          menuAberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" aria-hidden={!menuAberto}>
          <Container className="pb-6">
            <ul className="m-0 list-none border-t border-dashed border-white/25 p-0 pt-3">
              {itensMenu.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuAberto(false)}
                    tabIndex={menuAberto ? 0 : -1}
                    className="block py-3 font-serif text-[24px] text-white no-underline hover:text-tiffany"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
              <li className="sm:hidden">
                <a
                  href={perfil.links.curriculo}
                  download="Curriculo-Julia-Karollyne.pdf"
                  tabIndex={menuAberto ? 0 : -1}
                  className="mt-2 inline-block rounded-full bg-tiffany px-5 py-2.5 font-semibold text-marinho no-underline"
                >
                  Baixar currículo
                </a>
              </li>
            </ul>
          </Container>
        </div>
      </div>

      {/* Fita listrada embaixo, igual à do rodapé */}
      <FitaListrada />
    </header>
  );
}
