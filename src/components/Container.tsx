import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Ocupa a largura da tela, com uma margem pequena dos lados (no máximo 1760px em telas muito grandes) */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1760px] px-[clamp(20px,4.5vw,88px)] ${className}`}>
      {children}
    </div>
  );
}
