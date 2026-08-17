import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { criarLancamento } from '../services/api';
import { CATEGORIAS, SETORES } from '../config/opcoes';
import Layout from '../components/Layout';
import ModelosRapidos from '../components/ModelosRapidos';
import './NovoLancamento.css';

export default function NovoLancamento() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [tipo, setTipo] = useState('1');
  const [categoria, setCategoria] = useState('');
  const [setor, setSetor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [observacao, setObservacao] = useState('');
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const fecharModal = useCallback(() => setModalAberto(false), []);

  useEffect(() => {
    if (!modalAberto) return;

    function aoPressionarTecla(e) {
      if (e.key === 'Escape') fecharModal();
    }

    document.addEventListener('keydown', aoPressionarTecla);
    return () => document.removeEventListener('keydown', aoPressionarTecla);
  }, [modalAberto, fecharModal]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      await criarLancamento({
        idUsuario: usuario.idUsuario,
        tipo,
        categoria,
        setor,
        descricao,
        observacao,
      });
      navigate('/');
    } catch (err) {
      setErro(err.message);
    } finally {
      setSalvando(false);
    }
  }

  async function handleModeloRapido(modelo) {
    setErro('');
    try {
      await criarLancamento({
        idUsuario: usuario.idUsuario,
        tipo: modelo.tipo,
        categoria: modelo.categoria,
        setor: modelo.setor,
        descricao: modelo.descricao,
        observacao: '',
      });
      navigate('/');
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <Layout>
      <main className="home-conteudo">
        <div className="novo-lancamento-wrapper">
          <form className="form-lancamento" onSubmit={handleSubmit}>
            <div className="form-cabecalho">
              <h2 className="form-titulo">Nova anotação</h2>
              <button
                type="button"
                className="form-botao-rapido"
                onClick={() => setModalAberto(true)}
              >
                Cadastro Rápido
              </button>
            </div>

            <div className="form-grade">
              <div className="form-linha">
                <label className="form-rotulo">Tipo</label>
                <select className="form-campo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value="" disabled>Selecione</option>
                  <option value="1">A - Urgente</option>
                  <option value="2">B - Moderado</option>
                  <option value="3">C - Normal</option>
                </select>
              </div>

              <div className="form-linha">
                <label className="form-rotulo">Categoria</label>
                <select
                  className="form-campo"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                >
                  <option value="" disabled>Selecione</option>
                  {CATEGORIAS.map((c) => (
                    <option key={c.id} value={c.id}>{c.rotulo}</option>
                  ))}
                </select>
              </div>

              <div className="form-linha">
                <label className="form-rotulo">Setor</label>
                <select
                  className="form-campo"
                  value={setor}
                  onChange={(e) => setSetor(e.target.value)}
                  required
                >
                  <option value="" disabled>Selecione</option>
                  {SETORES.map((f) => (
                    <option key={f.id} value={f.id}>{f.rotulo}</option>
                  ))}
                </select>
              </div>

              <div className="form-linha form-linha-larga">
                <label className="form-rotulo">Descrição</label>
                <input
                  type="text"
                  className="form-campo"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>

              <div className="form-linha form-linha-larga">
                <label className="form-rotulo">Observação</label>
                <textarea
                  className="form-campo form-textarea"
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {erro && <p className="login-erro">{erro}</p>}

            <div className="form-acoes">
              <button type="button" className="form-botao-secundario" onClick={() => navigate('/')}>
                Cancelar
              </button>
              <button type="submit" className="form-botao" disabled={salvando}>
                {salvando ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>

        {modalAberto && (
          <div className="modal-sobreposicao" onClick={fecharModal}>
            <div
              className="modal-conteudo"
              role="dialog"
              aria-modal="true"
              aria-label="Cadastro rápido"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-cabecalho">
                <h3 className="modal-titulo">Cadastro Rápido</h3>
                <button
                  type="button"
                  className="modal-fechar"
                  onClick={fecharModal}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>
              <div className="modal-corpo">
                <ModelosRapidos onSelecionar={handleModeloRapido} />
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}