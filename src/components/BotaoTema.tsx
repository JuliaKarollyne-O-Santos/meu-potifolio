"use client";

import { useEffect, useRef, useState } from "react";

/* O navegador pode ter (ou não) a função de transição entre telas */
type DocumentoComTransicao = Document & {
  startViewTransition?: (atualizar: () => void) => { ready: Promise<void> };
};

/**
 * Interruptor de tema claro/escuro.
 * - Tema claro: bolinha à esquerda e sol à direita.
 * - Tema escuro: bolinha à direita e lua à esquerda.
 * Ao clicar, o tema novo se espalha pela tela em círculo, saindo do botão.
 * A escolha fica salva para a próxima visita.
 */
export default function BotaoTema() {
  const [escuro, setEscuro] = useState<boolean | null>(null);
  const botao = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setEscuro(document.documentElement.classList.contains("dark"));
  }, []);

  function alternar() {
    const raiz = document.documentElement;
    const novo = !raiz.classList.contains("dark");

    const aplicar = () => {
      raiz.classList.toggle("dark", novo);
      try {
        localStorage.setItem("tema", novo ? "escuro" : "claro");
      } catch {
        // navegador bloqueou o armazenamento: o tema só não fica salvo
      }
      setEscuro(novo);
    };

    const documento = document as DocumentoComTransicao;
    const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Navegadores sem suporte (ex.: Firefox antigo) só trocam o tema, sem o círculo
    if (!documento.startViewTransition || semAnimacao || !botao.current) {
      aplicar();
      return;
    }

    // Centro do botão e o tamanho do círculo para cobrir a tela toda
    const caixa = botao.current.getBoundingClientRect();
    const x = caixa.left + caixa.width / 2;
    const y = caixa.top + caixa.height / 2;
    const raio = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transicao = documento.startViewTransition(aplicar);
    transicao.ready.then(() => {
      raiz.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${raio}px at ${x}px ${y}px)`],
        },
        {
          duration: 750,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }

  const rotulo = escuro ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <button
      ref={botao}
      type="button"
      role="switch"
      aria-checked={escuro ?? false}
      aria-label="Tema escuro"
      title={rotulo}
      onClick={alternar}
      className="group relative h-9 w-[68px] shrink-0 cursor-pointer rounded-full bg-poeira shadow-[inset_0_2px_4px_rgba(10,25,45,0.25)] transition-colors duration-500 dark:bg-[#060f1d] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_0_0_1.5px_#284265]"
    >
      {/* Sol: aparece à direita no tema claro */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute top-1/2 right-2 size-[18px] -translate-y-1/2 text-white transition duration-500 group-hover:rotate-45 dark:scale-0 dark:-rotate-90 dark:opacity-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
      </svg>

      {/* Lua: aparece à esquerda no tema escuro */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="absolute top-1/2 left-2 size-[17px] -translate-y-1/2 scale-0 rotate-90 text-white opacity-0 transition duration-500 dark:scale-100 dark:rotate-0 dark:opacity-100 dark:group-hover:-rotate-12"
        fill="currentColor"
      >
        <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a.6.6 0 0 0-.8-.7A9.5 9.5 0 1 0 21.2 15.4a.6.6 0 0 0-.7-.8Z" />
      </svg>

      {/* Bolinha que desliza (estica um pouco no meio do caminho) */}
      <span
        aria-hidden="true"
        className="absolute top-1 left-1 size-7 rounded-full bg-white shadow-[0_2px_6px_rgba(10,25,45,0.35)] transition-[translate,width] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-active:w-9 dark:translate-x-8 dark:group-active:translate-x-6"
      />
    </button>
  );
}
