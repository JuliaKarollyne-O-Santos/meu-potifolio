/*
 * ============================================================
 *  CONTEÚDO DO PORTFÓLIO
 *  Todos os textos e links do site ficam aqui.
 *  Para trocar um link, edite só este arquivo.
 *
 *  Links vazios ("") aparecem como "Em breve" no site,
 *  sem ficar quebrados. Preencha quando tiver o link.
 * ============================================================
 */

export type Area = {
  titulo: string;
  descricao: string;
};

/** Uma foto ou um vídeo da galeria de um projeto */
export type MidiaProjeto = {
  tipo: "foto" | "video";
  /** Caminho dentro de /public, ex.: "/img/cba/foto.jpg" */
  src: string;
  /** Tamanho original da mídia em pixels (serve para mostrar inteira, sem cortar) */
  largura: number;
  altura: number;
  /** Frase que aparece embaixo da mídia */
  legenda: string;
  /** Só para vídeo: imagem que aparece antes de dar play */
  capa?: string;
};

export type Projeto = {
  nome: string;
  descricao: string;
  destaques?: string[];
  funcao?: string;
  tecnologias?: string[];
  equipe?: string;
  site?: string;
  codigo?: string;
  /** Caminho de um print do projeto dentro de /public, ex.: "/img/pluvite.png" */
  imagem?: string;
  /** Fotos e vídeos que abrem no botão "Ver o projeto" */
  galeria?: MidiaProjeto[];
};

export type LinkCriativo = {
  titulo: string;
  descricao: string;
  href: string;
};

export type Pergunta = {
  pergunta: string;
  resposta: string;
};

export type GrupoFerramentas = {
  titulo: string;
  itens: string[];
};

export const perfil = {
  primeiroNome: "Julia",
  sobrenome: "Karollyne",
  nomeCompleto: "Julia Karollyne de Oliveira dos Santos",
  frase:
    "Desenvolvedora front-end e designer em formação. Gosto de entender o que as pessoas precisam e transformar isso em telas simples, bonitas e bem pensadas.",
  contexto:
    "Estudante de Análise e Desenvolvimento de Sistemas na Fatec Taubaté, em Taubaté (SP).",
  email: "juliakarollyne3m@gmail.com",
  links: {
    // Coloque o PDF do currículo em /public com o nome curriculo.pdf
    curriculo: "/curriculo.pdf",
    github: "https://github.com/JuliaKarollyne-O-Santos",
    linkedin: "https://www.linkedin.com/in/julia-santos-588b20326/",
  },
};

export const sobre = {
  titulo: "Entre quem usa e quem constrói",
  paragrafos: [
    "Comecei na programação pela ETEC, no programa AMS, onde me formei técnica em Desenvolvimento de Sistemas. Hoje curso Análise e Desenvolvimento de Sistemas na Fatec Taubaté.",
    "No caminho, descobri que gosto mais da parte que fica perto das pessoas: conversar com o cliente, entender o problema, organizar a equipe e desenhar a solução antes de escrever o código.",
    "Estou em busca do meu primeiro estágio em desenvolvimento front-end, UI/UX ou marketing digital.",
  ],
  areas: [
    {
      titulo: "Interfaces",
      descricao:
        "Telas responsivas com HTML, CSS, React, Next.js e Tailwind, a partir de protótipos no Figma.",
    },
    {
      titulo: "Design e marketing",
      descricao: "Peças visuais e conteúdo para redes sociais no Canva, Figma e CorelDRAW.",
    },
    {
      titulo: "Requisitos e organização",
      descricao:
        "Levantamento de requisitos, documentação de software e gestão com Scrum e Kanban. Já atuei como Scrum Master.",
    },
  ] satisfies Area[],
};

/*
 * PERGUNTAS SOBRE MIM
 * Aparecem na seção "Perguntas": a pessoa clica na pergunta e a resposta abre.
 * Só as 3 PRIMEIRAS aparecem no site (para caber na tela).
 * Para trocar quais aparecem, mude a ordem: as de baixo ficam guardadas.
 */
export const perguntas = {
  titulo: "Perguntas sobre mim",
  descricao: "Clique em uma pergunta para ver a resposta.",
  itens: [
    {
      pergunta: "Quem é a Julia?",
      resposta:
        "Sou estudante de Análise e Desenvolvimento de Sistemas na Fatec Taubaté. Antes, me formei técnica em Desenvolvimento de Sistemas pela ETEC, no programa AMS.",
    },
    {
      pergunta: "O que eu mais gosto de fazer?",
      resposta:
        "Desenvolver interfaces e pensar na experiência de quem vai usar. Gosto de conversar com o cliente, entender o problema, desenhar as telas no Figma e depois transformar tudo em código.",
    },
    {
      pergunta: "Que oportunidade eu estou buscando?",
      resposta:
        "Meu primeiro estágio em desenvolvimento front-end, UI/UX ou marketing digital, em um lugar onde eu possa aprender com a equipe e contribuir de verdade.",
    },
    {
      pergunta: "Como eu trabalho em equipe?",
      resposta:
        "Já fui Scrum Master no Pluvite e no Retrôa. Gosto de organizar as tarefas com Scrum e Kanban, manter a documentação em dia e garantir que todo mundo saiba o que fazer.",
    },
    {
      pergunta: "Quais tecnologias eu uso?",
      resposta:
        "No dia a dia: HTML, CSS, JavaScript, TypeScript, React, React Native, Next.js e Tailwind. Para dados, Supabase, PostgreSQL e MySQL. Para design, Figma, Canva e CorelDRAW.",
    },
    {
      pergunta: "Eu uso inteligência artificial?",
      resposta:
        "Sim, como apoio para estudar, revisar código e escrever documentação. Mas sempre confiro e entendo o que foi feito antes de usar.",
    },
  ] satisfies Pergunta[],
};

export const projetoDestaque: Projeto = {
  nome: "Pluvite",
  descricao:
    "Plataforma web e aplicativo de monitoramento de desastres naturais para o Vale do Paraíba e Litoral Norte. Envia alertas em tempo real e aproxima a população das prefeituras em situações de risco.",
  destaques: [
    "Mapa interativo com o nível de risco de cada cidade",
    "Feed colaborativo para relatar ocorrências com foto e localização",
    "Rotas recalculadas com IA para desviar das áreas de risco",
  ],
  funcao: "Scrum Master e desenvolvedora front-end",
  tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Supabase"],
  equipe: "5 pessoas, Projeto Integrador I da Fatec Taubaté",
  site: "https://pluvite.vercel.app/",
  codigo: "https://github.com/JuliaKarollyne-O-Santos/Pluvite",
  // Print da tela inicial (fica em public/img/pluvite.png)
  imagem: "/img/pluvite.png",
};

export const outrosProjetos: Projeto[] = [
  {
    nome: "Retrôa",
    descricao:
      "E-commerce de antiguidades e decoração vintage, com catálogo, busca, sacola e cálculo de frete. Atuei como Scrum Master e na documentação de requisitos.",
    site: "https://retroa.vercel.app/",
    codigo: "https://github.com/AnaClara-S-Pereira/Retroa",
  },
  {
    nome: "CBA",
    descricao:
      "Meu TCC na ETEC: comedouro e bebedouro automatizados para animais de rua e pets, com Arduino (C/C++) e aplicativo para controlar o abastecimento à distância. Apresentado no XIV CICTED.",
    codigo: "https://github.com/JuliaKarollyne-O-Santos/CBA-Comedouro-Bebedouro-Automatizado",
    /*
     * GALERIA DO CBA
     * Abre quando a pessoa clica em "Ver o projeto".
     * As fotos ficam em public/img/cba e os vídeos em public/videos/cba.
     * Para tirar uma mídia, apague o bloco { ... } dela. Para mudar a ordem, troque os blocos de lugar.
     */
    galeria: [
      {
        tipo: "video",
        src: "/videos/cba/cba-funcionando.mp4",
        capa: "/img/cba/cba-funcionando-capa.jpg",
        largura: 720,
        altura: 1280,
        legenda: "O protótipo funcionando de verdade",
      },
      {
        tipo: "video",
        src: "/videos/cba/cba-aplicativo.mp4",
        capa: "/img/cba/cba-aplicativo-capa.jpg",
        largura: 784,
        altura: 1700,
        legenda: "O aplicativo: liberar na hora ou programar intervalos",
      },
      {
        tipo: "video",
        src: "/videos/cba/cba-montagem.mp4",
        capa: "/img/cba/cba-montagem-capa.jpg",
        largura: 720,
        altura: 1280,
        legenda: "Por dentro: reservatórios, potes e a caixa com o Arduino",
      },
      {
        tipo: "foto",
        src: "/img/cba/cba-modelo-3d.png",
        largura: 1271,
        altura: 779,
        legenda: "Modelo 3D do projeto, por fora e por dentro",
      },
      {
        tipo: "foto",
        src: "/img/cba/cba-mecanismo.png",
        largura: 1214,
        altura: 683,
        legenda: "Modelo 3D do mecanismo: bomba de água, funil e micro servo motor",
      },
      {
        tipo: "foto",
        src: "/img/cba/cba-banner-cicted.jpg",
        largura: 960,
        altura: 1280,
        legenda: "Nosso banner no XIV CICTED",
      },
      {
        tipo: "foto",
        src: "/img/cba/cba-equipe-cicted.jpg",
        largura: 1526,
        altura: 1600,
        legenda: "Parte da equipe apresentando o CBA no XIV CICTED",
      },
    ],
  },
];

/*
 * DESIGN E MARKETING (guardado para depois)
 * A seção não aparece no site agora. Para voltar com ela, preencha os links abaixo
 * e importe o componente DesignMarketing em src/app/page.tsx.
 */
export const designMarketing = {
  titulo: "Design e marketing",
  descricao: "Além do código, crio artes e conteúdo para redes sociais.",
  links: [
    {
      titulo: "Portfólio de design",
      descricao: "Artes, identidade visual e peças gráficas",
      href: "", // TROCAR: link do documento com suas artes
    },
    {
      titulo: "Instagram",
      descricao: "Conteúdo e posts que criei",
      href: "", // TROCAR: link do Instagram
    },
    {
      titulo: "Facebook",
      descricao: "Campanhas e publicações",
      href: "", // TROCAR: link do Facebook
    },
  ] satisfies LinkCriativo[],
};

export const ferramentas: GrupoFerramentas[] = [
  {
    titulo: "Front-end",
    itens: ["HTML", "CSS", "JavaScript", "TypeScript", "React e React Native", "Next.js", "Tailwind CSS"],
  },
  { titulo: "Dados", itens: ["PostgreSQL", "MySQL", "Supabase", "brModelo"] },
  { titulo: "Design", itens: ["Figma", "Canva", "CorelDRAW"] },
  { titulo: "Organização", itens: ["Scrum", "Kanban", "Jira", "Git e GitHub"] },
];
