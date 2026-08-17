import { useAuth } from '../context/AuthContext';
import MenuTopo from './MenuTopo';
import '../pages/Home.css';

export default function Layout({ children }) {
  const { usuario, sair } = useAuth();

  return (
    <div className="home-pagina">
      <header className="home-cabecalho">
        <h1 className="home-titulo">GRSControl</h1>
        <div className="home-usuario">
          <span>{usuario?.nomeAbb || 'Usuário'}</span>
          <button className="home-sair" onClick={sair}>
            Sair
          </button>
        </div>
      </header>

      <MenuTopo />

      {children}
    </div>
  );
}