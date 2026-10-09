import AnimacoesDeEntrada from "@/components/AnimacoesDeEntrada";
import Apresentacao from "@/components/Apresentacao";
import Contato from "@/components/Contato";
import FaixaCorrida from "@/components/FaixaCorrida";
import Ferramentas from "@/components/Ferramentas";
import Perguntas from "@/components/Perguntas";
import Projetos from "@/components/Projetos";
import Rodape from "@/components/Rodape";
import Sobre from "@/components/Sobre";
import Topo from "@/components/Topo";

/*
 * A seção "Design e marketing" está guardada em src/components/DesignMarketing.tsx.
 * Para ela voltar: importe aqui e coloque <DesignMarketing /> depois de <Projetos />.
 */

export default function Home() {
  return (
    <>
      <Topo />
      <main id="inicio">
        <Apresentacao />
        <FaixaCorrida />
        <Sobre />
        <Perguntas />
        <Projetos />
        <Ferramentas />
        <Contato />
      </main>
      <Rodape />
      <AnimacoesDeEntrada />
    </>
  );
}
