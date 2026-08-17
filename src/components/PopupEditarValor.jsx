import { useState } from 'react';
import './PopupEditarValor.css';

export default function PopupEditarValor({ valorInicial, onSalvar, onFechar }) {
  const [valor, setValor] = useState(valorInicial);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  async function handleSalvar(e) {
    e.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      await onSalvar(valor);
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="popup-fundo" onClick={onFechar}>
      <form
        className="popup-caixa"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSalvar}
      >
        <h3 className="popup-titulo">Alterar valor</h3>

        <input
          type="number"
          step="0.01"
          min="0"
          className="form-campo"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          autoFocus
          required
        />

        {erro && <p className="login-erro">{erro}</p>}

        <div className="popup-acoes">
          <button type="button" className="form-botao-secundario" onClick={onFechar}>
            Cancelar
          </button>
          <button type="submit" className="form-botao" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}