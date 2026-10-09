import type { ReactNode } from "react";

type BotaoProps = {
  href: string;
  children: ReactNode;
  variante?: "cheio" | "vazio";
  externo?: boolean;
  /** Se tiver um nome de arquivo, o link baixa o arquivo em vez de abrir. Ex.: baixar="Curriculo.pdf" */
  baixar?: string;
};

const base =
  "inline-flex items-center gap-2 rounded-full border-[1.5px] px-[26px] py-[14px] text-base font-semibold no-underline shadow-[3px_4px_0_0_rgba(31,61,99,0.25)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[4px_6px_0_0_rgba(31,61,99,0.3)] active:translate-y-0";

const variantes = {
  cheio:
    "border-marinho bg-marinho text-white hover:border-bondi hover:bg-bondi hover:text-white dark:border-tiffany dark:bg-tiffany dark:text-marinho dark:hover:border-white dark:hover:bg-white dark:hover:text-marinho",
  vazio:
    "border-tinta bg-superficie text-tinta hover:bg-marinho hover:text-white dark:hover:bg-tiffany dark:hover:text-marinho",
};

export default function Botao({ href, children, variante = "cheio", externo = false, baixar }: BotaoProps) {
  return (
    <a
      href={href}
      className={`${base} ${variantes[variante]}`}
      {...(baixar
        ? { download: baixar }
        : externo
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
    >
      {children}
    </a>
  );
}
