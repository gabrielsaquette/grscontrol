import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getLancamentos, excluirLancamento } from '../services/api';
import { TABELA_LANCAMENTOS } from '../config/tabelas';
import { formatarData } from '../utils/formato';
import { rotuloCategoria, rotuloSetor } from '../config/opcoes';
import Layout from '../components/Layout';
import './Home.css';

const CAMPOS = TABELA_LANCAMENTOS.campos;

export default function Home() {
  const { usuario } = useAuth();

  const [lancamentos, setLancamentos] = useState(null);
  const [erro, setErro] = useState('');

  const [pesquisa, setPesquisa] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroFormaPagamento, setFiltroFormaPagamento] = useState('');

  useEffect(() => {
    carregar();
  }, [usuario]);

  function carregar() {
    setLancamentos(null);
    setErro('');

    getLancamentos(usuario.idUsuario)
      .then((dados) => setLancamentos(dados.registros || []))
      .catch((err) => setErro(err.message));
  }

  function handleExcluir(id) {
    if (!window.confirm('Excluir esta anotação?')) {
      return;
    }

    excluirLancamento(id)
      .then(() => {
        setLancamentos((lista) => lista.filter((item) => item[CAMPOS.id] !== id));
      })
      .catch((err) => {
        setErro(err.message);
      });
  }

  const categorias = useMemo(() => {
    if (!lancamentos) return [];

    return [...new Map(
      lancamentos.map((item) => [
        item[CAMPOS.categoria],
        rotuloCategoria(item[CAMPOS.categoria]),
      ])
    ).entries()];
  }, [lancamentos]);

  const formasPagamento = useMemo(() => {
    if (!lancamentos) return [];

    return [...new Map(
      lancamentos.map((item) => [
        item[CAMPOS.setor],
        rotuloSetor(item[CAMPOS.setor]),
      ])
    ).entries()];
  }, [lancamentos]);

  const lancamentosFiltrados = useMemo(() => {
    if (!lancamentos) return [];

    const termo = pesquisa.trim().toLowerCase();

    return lancamentos.filter((item) => {
      const descricao = String(item[CAMPOS.descricao] || '').toLowerCase();
      const observacao = String(item[CAMPOS.observacao] || '').toLowerCase();
      const categoria = rotuloCategoria(item[CAMPOS.categoria]).toLowerCase();
      const setor = rotuloSetor(item[CAMPOS.setor]).toLowerCase();

      const tipoTexto = item[CAMPOS.tipo] === 1 ? 'a - urgente' :
        item[CAMPOS.tipo] === 2 ? 'b - moderado' : 'c - normal';

      const pesquisaOk =
        !termo ||
        descricao.includes(termo) ||
        observacao.includes(termo) ||
        categoria.includes(termo) ||
        setor.includes(termo) ||
        tipoTexto.includes(termo);

      const tipoOk =
        !filtroTipo || String(item[CAMPOS.tipo]) === filtroTipo;

      const categoriaOk =
        !filtroCategoria || String(item[CAMPOS.categoria]) === filtroCategoria;

      const formaPagamentoOk =
        !filtroFormaPagamento || String(item[CAMPOS.setor]) === filtroFormaPagamento;

      return pesquisaOk && tipoOk && categoriaOk && formaPagamentoOk;
    });
  }, [lancamentos, pesquisa, filtroTipo, filtroCategoria, filtroFormaPagamento]);

  return (
    <Layout>
      <main className="home-conteudo">
        <div className="home-acoes">
          <h2 className="home-secao-titulo">Anotações</h2>

          <Link to="/novo" className="form-botao home-botao-novo">
            Nova anotação
          </Link>
        </div>

        <div className="home-filtros">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />

          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="">Todos os tipos</option>
            <option value="1">A - Urgente</option>
            <option value="2">B - Moderado</option>
            <option value="3">C - Normal</option>
          </select>

          <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
            <option value="">Todas categorias</option>
            {categorias.map(([valor, descricao]) => (
              <option key={valor} value={valor}>{descricao}</option>
            ))}
          </select>

          <select value={filtroFormaPagamento} onChange={(e) => setFiltroFormaPagamento(e.target.value)}>
            <option value="">Todos os setores</option>
            {formasPagamento.map(([valor, descricao]) => (
              <option key={valor} value={valor}>{descricao}</option>
            ))}
          </select>
        </div>

        {erro && <p className="home-erro">{erro}</p>}

        {!erro && !lancamentos && (
          <p className="home-carregando">Carregando Anotações...</p>
        )}

        {lancamentos && lancamentosFiltrados.length === 0 && (
          <p className="home-vazio">Nenhuma anotação encontrada.</p>
        )}

        {lancamentos && lancamentosFiltrados.length > 0 && (
          <div className="tabela-wrapper">
            <table className="tabela-lancamentos">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Tipo</th>
                  <th className="coluna-observacao">Observação</th>
                  <th>Setor</th>
                  <th>Ação</th>
                </tr>
              </thead>

              <tbody>
                {lancamentosFiltrados.map((linha) => {
                  const tipo = Number(linha[CAMPOS.tipo]);
                  const rotuloTipo = tipo === 1 ? 'A - Urgente' :
                    tipo === 2 ? 'B - Moderado' : 'C - Normal';

                  return (
                    <tr key={linha[CAMPOS.id]}>
                      <td>{formatarData(linha[CAMPOS.data])}</td>
                      <td>{linha[CAMPOS.descricao]}</td>
                      <td>{rotuloCategoria(linha[CAMPOS.categoria])}</td>
                      <td>{rotuloTipo}</td>
                      <td className="coluna-observacao">
                        {linha[CAMPOS.observacao] || '-'}
                      </td>
                      <td>{rotuloSetor(linha[CAMPOS.setor])}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleExcluir(linha[CAMPOS.id])}
                          className="botao-excluir"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </Layout>
  );
}