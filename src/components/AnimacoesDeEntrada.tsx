"use client";

import { useEffect } from "react";

const SELETOR = ".revelar, .revelar-esquerda, .revelar-direita, .revelar-zoom, .revelar-colar, .desenhar";

/**
 * Liga as animações de entrada: quando um elemento com uma das classes "revelar..."
 * aparece na tela, ele ganha o atributo data-visivel e a animação começa (veja globals.css).
 * Cada elemento anima uma vez só.
 *
 * Usa um atributo (e não uma classe) porque o React não mexe nele: assim o elemento
 * não some de novo quando o className muda (por exemplo, ao salvar um arquivo com o
 * npm run dev rodando). Elementos novos que aparecem na página também são observados.
 */
export default function AnimacoesDeEntrada() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(SELETOR).forEach((el) => el.setAttribute("data-visivel", ""));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            entrada.target.setAttribute("data-visivel", "");
            observador.unobserve(entrada.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    // Observa todos os elementos que ainda não apareceram
    const observarNovos = () => {
      document.querySelectorAll<HTMLElement>(SELETOR).forEach((el) => {
        if (!el.hasAttribute("data-visivel") && !el.hasAttribute("data-observado")) {
          el.setAttribute("data-observado", "");
          observador.observe(el);
        }
      });
    };
    observarNovos();

    // Se a página mudar (elementos novos), observa eles também
    let agendado = 0;
    const mudancas = new MutationObserver(() => {
      cancelAnimationFrame(agendado);
      agendado = requestAnimationFrame(observarNovos);
    });
    mudancas.observe(document.body, { childList: true, subtree: true });

    return () => {
      observador.disconnect();
      mudancas.disconnect();
      cancelAnimationFrame(agendado);
      // Libera quem ainda não apareceu, para ser observado de novo se o componente voltar
      document
        .querySelectorAll("[data-observado]:not([data-visivel])")
        .forEach((el) => el.removeAttribute("data-observado"));
    };
  }, []);

  return null;
}
