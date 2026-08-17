import Layout from '../components/Layout';

export default function EmConstrucao({ titulo }) {
  return (
    <Layout>
      <main className="home-conteudo">
        <p className="home-carregando">{titulo} em construção.</p>
      </main>
    </Layout>
  );
}