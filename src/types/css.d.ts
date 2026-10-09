/*
 * Avisa o TypeScript que arquivos .css podem ser importados
 * (ex.: import "./globals.css" no layout.tsx).
 * Sem isso, versões novas do TypeScript mostram o erro ts(2882).
 */
declare module "*.css";