/*
 * Elementos gráficos do portfólio, inspirados em colagem e scrapbook:
 * estrela de feltro com costura, brilho, espiral, pino, clipe, fita adesiva,
 * selo giratório e rabiscos feitos "à mão".
 * Todos são só decoração (aria-hidden).
 *
 * Os rabiscos (Seta, Rabisco, Coracao, Envelope, Gota) usam a cor do texto (currentColor),
 * então mudam sozinhos no tema escuro. Ex.: <Seta className="w-16 text-bondi" />
 */
import type { CSSProperties, ReactNode } from "react";

type Classe = { className?: string; style?: CSSProperties };

/* ------------------------------------------------------------------ Adesivos */

type EstrelaProps = Classe & {
  cor: string;
  costura: string; // cor da linha tracejada (costura)
};

export function Estrela({ className = "", style, cor, costura }: EstrelaProps) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} style={style}>
      <polygon
        points="50,4 61,37 96,37 68,58 79,92 50,72 21,92 32,58 4,37 39,37"
        fill={cor}
        stroke={cor}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <polygon
        points="50,13.6 58.8,40 86.8,40 64.4,56.8 73.2,84 50,68 26.8,84 35.6,56.8 13.2,40 41.2,40"
        fill="none"
        stroke={costura}
        strokeWidth="1.6"
        strokeDasharray="3.5 3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const caminhoBrilho =
  "M50 6 C54 36 64 46 94 50 C64 54 54 64 50 94 C46 64 36 54 6 50 C36 46 46 36 50 6Z";

export function Brilho({ className = "", style }: Classe) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} style={style}>
      <path d={caminhoBrilho} fill="#ffffff" stroke="#ffffff" strokeWidth="16" strokeLinejoin="round" />
      <path d={caminhoBrilho} fill="#ffffff" stroke="#1f3d63" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  );
}

/** Gera o caminho de uma espiral desenhada à mão (2 voltas e pouco) */
function gerarEspiral(): string {
  const pontos: string[] = [];
  const passos = 120;
  for (let i = 0; i <= passos; i++) {
    const angulo = (i / passos) * 4.4 * Math.PI;
    const raio = 2 + angulo * 2.75;
    pontos.push(`${(50 + raio * Math.cos(angulo)).toFixed(1)} ${(50 + raio * Math.sin(angulo)).toFixed(1)}`);
  }
  return `M${pontos.join(" L")}`;
}

const caminhoEspiral = gerarEspiral();

export function Espiral({ className = "", style }: Classe) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} style={style}>
      <circle cx="50" cy="50" r="46" fill="#ffffff" />
      <path d={caminhoEspiral} fill="none" stroke="#1f3d63" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Pino (percevejo) que prende o post-it */
export function Pino({ className = "", style, cor = "#3f5fc4" }: Classe & { cor?: string }) {
  return (
    <svg viewBox="0 0 60 72" aria-hidden="true" className={className} style={style}>
      {/* sombra no papel */}
      <ellipse cx="38" cy="64" rx="11" ry="3.5" fill="rgba(10,25,45,0.28)" />
      {/* agulha */}
      <path d="M30 40 L35 63" stroke="#8796a8" strokeWidth="2.6" strokeLinecap="round" />
      {/* base */}
      <ellipse cx="30" cy="40" rx="15" ry="5.5" fill={cor} />
      <ellipse cx="30" cy="40" rx="15" ry="5.5" fill="rgba(0,0,0,0.28)" />
      {/* corpo */}
      <path d="M21 22 L19 39 Q30 45 41 39 L39 22 Z" fill={cor} />
      <path d="M33 22 L35 40 Q38.5 39.6 41 39 L39 22 Z" fill="rgba(0,0,0,0.18)" />
      {/* cabeça */}
      <ellipse cx="30" cy="20" rx="20" ry="8" fill={cor} />
      <ellipse cx="30" cy="18.6" rx="20" ry="7" fill={cor} />
      <ellipse cx="30" cy="18.6" rx="20" ry="7" fill="rgba(255,255,255,0.16)" />
      {/* brilho */}
      <ellipse cx="22" cy="16.5" rx="7" ry="2.2" fill="rgba(255,255,255,0.75)" />
    </svg>
  );
}

/** Clipe de papel */
export function Clipe({ className = "", style }: Classe) {
  return (
    <svg viewBox="0 0 40 100" aria-hidden="true" className={className} style={style}>
      <path
        d="M14 30 V78 A8 8 0 0 0 30 78 V18 A12 12 0 0 0 6 18 V74"
        fill="none"
        stroke="#ffffff"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M14 30 V78 A8 8 0 0 0 30 78 V18 A12 12 0 0 0 6 18 V74"
        fill="none"
        stroke="#8da9c4"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Pedaço de fita adesiva (washi tape) */
export function Fita({
  className = "",
  style,
  cor = "bg-tiffany/70",
}: Classe & { cor?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute block h-6 w-24 ${cor} ${className}`}
      style={{
        clipPath: "polygon(3% 0, 97% 4%, 100% 50%, 97% 100%, 2% 96%, 0 50%)",
        ...style,
      }}
    />
  );
}

/** Selo redondo com texto girando em volta */
export function SeloGiratorio({
  id,
  texto,
  className = "",
  style,
  children,
}: Classe & { id: string; texto: string; children?: ReactNode }) {
  return (
    <div aria-hidden="true" className={`relative ${className}`} style={style}>
      <svg viewBox="0 0 200 200" className="size-full animate-girar-lento">
        <defs>
          <path id={id} d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
        </defs>
        <circle cx="100" cy="100" r="97" fill="#1f3d63" stroke="#ffffff" strokeWidth="3" />
        <circle cx="100" cy="100" r="90" fill="none" stroke="#81d8d0" strokeWidth="1.5" strokeDasharray="4 4" />
        <text
          fill="#ffffff"
          fontSize="17"
          fontWeight="700"
          letterSpacing="1"
          style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif", textTransform: "uppercase" }}
        >
          <textPath href={`#${id}`} textLength="458" lengthAdjust="spacing">
            {texto}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ Rabiscos (cor do texto) */

/** Seta curvinha desenhada à mão */
export function Seta({ className = "", style }: Classe) {
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true" fill="none" className={className} style={style}>
      <path
        d="M6 18 C 30 4, 58 6, 62 26 C 66 46, 40 52, 38 38 C 36 24, 70 22, 88 40 C 96 48, 102 56, 106 66"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M92 62 L107 68 L110 52" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Rabisco ondulado para sublinhar títulos */
export function Rabisco({ className = "", style }: Classe) {
  return (
    <svg viewBox="0 0 240 24" aria-hidden="true" fill="none" preserveAspectRatio="none" className={className} style={style}>
      <path
        d="M4 14 C 24 4, 40 22, 60 12 S 96 4, 116 13 S 152 22, 172 11 S 214 5, 236 12"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Coraçãozinho desenhado */
export function Coracao({ className = "", style }: Classe) {
  return (
    <svg viewBox="0 0 60 56" aria-hidden="true" fill="none" className={className} style={style}>
      <path
        d="M30 50 C 12 38, 4 28, 6 17 C 8 6, 22 4, 30 16 C 36 4, 52 4, 54 16 C 56 28, 46 38, 30 50 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M44 14 C 47 15, 48 17, 48 20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** Envelope desenhado (contato) */
export function Envelope({ className = "", style }: Classe) {
  return (
    <svg viewBox="0 0 100 74" aria-hidden="true" fill="none" className={className} style={style}>
      <rect x="4" y="6" width="92" height="62" rx="6" fill="var(--superficie)" stroke="currentColor" strokeWidth="3.2" />
      <path d="M6 10 L50 42 L94 10" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M6 64 L38 34 M94 64 L62 34" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** Gotinha de chuva (Pluvite) */
export function Gota({ className = "", style }: Classe) {
  return (
    <svg viewBox="0 0 40 56" aria-hidden="true" className={className} style={style}>
      <path d="M20 3 C 26 16, 36 26, 36 37 A16 16 0 0 1 4 37 C 4 26, 14 16, 20 3 Z" fill="#81d8d0" stroke="#1f3d63" strokeWidth="2.6" />
      <path d="M12 36 A8 8 0 0 0 18 46" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
