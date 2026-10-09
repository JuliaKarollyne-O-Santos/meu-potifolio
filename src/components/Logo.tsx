/**
 * Logo da Julia: J branco num recorte de papel azul, com sombra e uma estrelinha.
 * O fundo é transparente (só o recorte aparece).
 * O mesmo desenho está em src/app/icon.svg, que é o ícone da aba do navegador.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <g transform="rotate(-6 50 50)">
        {/* sombra do papel */}
        <path d="M14 13 L88 10 L91 86 L12 90 Z" fill="#1f3d63" transform="translate(4 4)" />
        {/* papel azul recortado */}
        <path d="M14 13 L88 10 L91 86 L12 90 Z" fill="#3f5fc4" />
        {/* letra J */}
        <path
          d="M34 16 H80 V30 H67 V61 C67 80 55 90 39 90 C27 90 19 84 14 75 L27 67 C30 72 34 76 39 76 C48 76 53 71 53 61 V30 H34 Z"
          fill="#ffffff"
          transform="translate(2 -1) scale(0.94) translate(3 3)"
        />
      </g>
      {/* estrelinha verde-água */}
      <path
        d="M0 -10 L2.9 -3.6 L9.5 -3.1 L4.5 1.3 L5.9 8.1 L0 4.5 L-5.9 8.1 L-4.5 1.3 L-9.5 -3.1 L-2.9 -3.6 Z"
        fill="#81d8d0"
        stroke="#1f3d63"
        strokeWidth="1.6"
        strokeLinejoin="round"
        transform="translate(84 18) rotate(14) scale(1.05)"
      />
    </svg>
  );
}
