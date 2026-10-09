# Portfólio | Julia Karollyne

Meu portfólio pessoal, com estética de colagem: letras recortadas, post-it preso com pino, polaroid, estrelas de feltro, xadrez e rabiscos feitos à mão, em tons de azul. Tem tema claro e escuro, animações de entrada e uma galeria de fotos e vídeos para os projetos.

## Tecnologias

* **Next.js** (App Router)
* **React**
* **TypeScript**
* **Tailwind CSS 4**
* **Deploy:** Vercel

## Como rodar

```bash
npm install
npm run dev
```

Depois, acesse `http://localhost:3000`.

## Como editar o conteúdo

Todos os textos e links ficam em **`src/data/conteudo.ts`**:

* **Perfil e links** (e-mail, GitHub, LinkedIn): procure por `perfil`.
* **Perguntas sobre mim:** procure por `perguntas`. Só as 3 primeiras aparecem no site.
* **Projetos:** `projetoDestaque` (Pluvite) e `outrosProjetos` (Retrôa e CBA).
* **Galeria do CBA:** procure por `galeria`. Cada foto ou vídeo é um bloco `{ ... }`; para tirar um, apague o bloco.

Arquivos em `public/`:

* `curriculo.pdf`: o currículo baixado pelos botões "Currículo" e "Baixar currículo".
* `img/julia.jpg`: minha foto na polaroid da primeira tela.
* `img/pluvite.png`: print da tela inicial do Pluvite.
* `img/cba/` e `videos/cba/`: fotos e vídeos da galeria do CBA.

A seção **Design e marketing** está guardada em `src/components/DesignMarketing.tsx`. Para ela voltar, preencha os links em `designMarketing` e importe o componente em `src/app/page.tsx`.

## Estrutura

```text
src/
  app/
    globals.css         cores dos temas claro/escuro, texturas e animações
    layout.tsx          fontes e script do tema
    page.tsx            monta as seções
  components/
    Topo.tsx            navbar (transparente no banner) + botão de tema + menu do celular
    Apresentacao.tsx    primeira tela: nome, polaroid e post-it
    PostIt.tsx          post-it com pino e letra de mão
    FaixaCorrida.tsx    faixa de palavras correndo
    Sobre.tsx           sobre mim
    Perguntas.tsx       perguntas que abrem ao clicar
    Projetos.tsx        Pluvite em destaque + outros projetos
    GaleriaProjeto.tsx  botão "Ver o projeto" + galeria flutuante de fotos e vídeos
    Ferramentas.tsx     ferramentas do dia a dia
    Contato.tsx         contato
    Adesivos.tsx        elementos gráficos (estrela, pino, clipe, fita, rabiscos...)
  data/
    conteudo.ts         todos os textos e links
public/
  curriculo.pdf         currículo
  img/                  foto, prints e imagens dos projetos
  videos/               vídeos dos projetos
```

## Autora

**Julia Karollyne de Oliveira dos Santos** - [@JuliaKarollyne-O-Santos](https://github.com/JuliaKarollyne-O-Santos)
