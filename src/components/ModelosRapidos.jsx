import { useState } from 'react';
import { MODELOS_RAPIDOS } from '../config/modelos';
import { formatarMoeda } from '../utils/formato';
import './ModelosRapidos.css';

export default function ModelosRapidos({ onSelecionar }) {
  const [carregandoId, setCarregandoId] = useState(null);

  async function handleClick(modelo) {
    setCarregandoId(modelo.id);
    try {
      await onSelecionar(modelo);
    } finally {
      setCarregandoId(null);
    }
  }

  return (
    <aside className="modelos-rapidos">
      <h3 className="modelos-titulo">Lançamento rápido</h3>
      <p className="modelos-subtitulo">Clique para cadastrar direto, sem preencher o formulário</p>

      <div className="modelos-lista">
        {MODELOS_RAPIDOS.map((modelo) => (
          <button
            key={modelo.id}
            type="button"
            className="modelo-item"
            onClick={() => handleClick(modelo)}
            disabled={carregandoId !== null}
          >
            <span className="modelo-nome">{modelo.rotulo}</span>
            <span className="modelo-valor">
              {carregandoId === modelo.id ? 'Salvando...' : formatarMoeda(modelo.valor)}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}