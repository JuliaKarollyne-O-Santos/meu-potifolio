"use client";

import { useEffect, useState } from "react";
import { perfil } from "@/data/conteudo";
import BotaoTema from "./BotaoTema";
import Container from "./Container";
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
  "relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-destaque after:transition-transform after:duration-300 hover:after:scale-x-100";

export default function Topo() {
  // Transparente em cima do banner; ganha fundo quando a página rola
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
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        solido
          ? "border-linha bg-fundo/85 shadow-[0_10px_30px_-20px_rgba(10,25,45,0.5)] backdrop-blur-md"
          : "border-transparent bg-transparent"
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
                <a href={item.href} className={`text-[15px] font-semibold text-tinta no-underline hover:text-tinta ${sublinhado}`}>
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>

          <BotaoTema />

          <a
            href={perfil.links.curriculo}
            download="Curriculo-Julia-Karollyne.pdf"
            className="hidden rounded-full border-[1.5px] border-tinta px-[18px] py-2 text-[15px] font-semibold text-tinta no-underline transition hover:bg-marinho hover:text-white sm:inline-block dark:hover:bg-tiffany dark:hover:text-marinho"
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
            className="grid size-10 cursor-pointer place-items-center rounded-full border-[1.5px] border-tinta/70 bg-superficie/60 text-tinta lg:hidden"
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
            <ul className="m-0 list-none border-t border-dashed border-linha p-0 pt-3">
              {itensMenu.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuAberto(false)}
                    tabIndex={menuAberto ? 0 : -1}
                    className="block py-3 font-serif text-[24px] text-tinta no-underline"
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
                  className="mt-2 inline-block rounded-full bg-marinho px-5 py-2.5 font-semibold text-white no-underline dark:bg-tiffany dark:text-marinho"
                >
                  Baixar currículo
                </a>
              </li>
            </ul>
          </Container>
        </div>
      </div>
    </header>
  );
}
