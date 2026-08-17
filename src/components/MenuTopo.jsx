import { NavLink } from 'react-router-dom';
import './MenuTopo.css';

const ITENS_MENU = [
  { rotulo: 'Home', caminho: '/' },
  { rotulo: 'Administração', caminho: '/administracao' },
  { rotulo: 'Produção', caminho: '/producao' },
  { rotulo: 'Estoque', caminho: '/estoque' },
  { rotulo: 'Almoxarifado', caminho: '/almoxarifado' },
  { rotulo: 'Manutenção', caminho: '/manutencao' },
  { rotulo: 'T.I.', caminho: '/ti' },
  { rotulo: 'RH', caminho: '/rh' },
  { rotulo: 'Logística', caminho: '/logistica' },
  { rotulo: 'Relatórios', caminho: '/relatorios' },
];

export default function MenuTopo() {
  return (
    <nav className="menu-topo">
      {ITENS_MENU.map((item) => (
        <NavLink
          key={item.caminho}
          to={item.caminho}
          end={item.caminho === '/'}
          className={({ isActive }) =>
            'menu-item' + (isActive ? ' menu-item-ativo' : '')
          }
        >
          {item.rotulo}
        </NavLink>
      ))}
    </nav>
  );
}