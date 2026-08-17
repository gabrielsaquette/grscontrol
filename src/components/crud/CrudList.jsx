import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CrudFilters from './CrudFilters';
import CrudActions from './CrudActions';
import './CrudList.css';

export default function CrudList({
    titulo,
    entidade,           // Nome da entidade (ex: 'anotacoes')
    campos,             // Configuração dos campos da tabela
    dados,              // Dados da listagem
    erro,
    carregando,
    onCarregar,         // Função para carregar dados
    onExcluir,          // Função para excluir
    onEditar,           // Função para editar (redireciona)
    filtros,            // Configuração dos filtros
    colunas,            // Configuração das colunas a exibir
    renderCustomizado,  // Função para renderização customizada
    acoesPersonalizadas, // Botões extras
}) {
    const [pesquisa, setPesquisa] = useState('');
    const [filtrosAtivos, setFiltrosAtivos] = useState({});

    useEffect(() => {
        if (onCarregar) {
            onCarregar();
        }
    }, []);

    // Aplicar filtros e pesquisa
    const dadosFiltrados = useMemo(() => {
        if (!dados) return [];

        const termo = pesquisa.trim().toLowerCase();

        return dados.filter((item) => {
            // Filtro de pesquisa global
            const pesquisaOk = !termo || colunas.some((col) => {
                const valor = String(item[col.campo] || '').toLowerCase();
                return valor.includes(termo);
            });

            if (!pesquisaOk) return false;

            // Filtros específicos
            for (const [chave, valor] of Object.entries(filtrosAtivos)) {
                if (valor && String(item[chave]) !== valor) {
                    return false;
                }
            }

            return true;
        });
    }, [dados, pesquisa, filtrosAtivos, colunas]);

    // Extrair opções para filtros
    const opcoesFiltros = useMemo(() => {
        if (!dados || !filtros) return {};

        const opcoes = {};
        filtros.forEach((filtro) => {
            const valores = [...new Set(dados.map((item) => String(item[filtro.campo])))];
            opcoes[filtro.campo] = valores.map((valor) => ({
                valor,
                rotulo: filtro.rotuloFn ? filtro.rotuloFn(valor) : valor,
            }));
        });
        return opcoes;
    }, [dados, filtros]);

    function handleFiltroChange(campo, valor) {
        setFiltrosAtivos((prev) => ({
            ...prev,
            [campo]: valor,
        }));
    }

    function limparFiltros() {
        setPesquisa('');
        setFiltrosAtivos({});
    }

    return (
        <div className="crud-container">
            <div className="crud-header">
                <h2 className="crud-titulo">{titulo}</h2>
                <Link to={`/${entidade}/novo`} className="crud-botao-novo">
                    + Novo {titulo.slice(0, -1)}
                </Link>
            </div>

            <CrudFilters
                pesquisa={pesquisa}
                onPesquisaChange={setPesquisa}
                filtros={filtros}
                filtrosAtivos={filtrosAtivos}
                onFiltroChange={handleFiltroChange}
                opcoesFiltros={opcoesFiltros}
                onLimpar={limparFiltros}
                entidade={entidade}
            />

            {erro && <p className="crud-erro">{erro}</p>}

            {carregando && <p className="crud-carregando">Carregando...</p>}

            {!erro && !carregando && dados && dadosFiltrados.length === 0 && (
                <p className="crud-vazio">Nenhum registro encontrado.</p>
            )}

            {!erro && !carregando && dados && dadosFiltrados.length > 0 && (
                <div className="crud-tabela-wrapper">
                    <table className="crud-tabela">
                        <thead>
                            <tr>
                                {colunas.map((col) => (
                                    <th key={col.campo} className={col.className || ''}>
                                        {col.rotulo}
                                    </th>
                                ))}
                                <th className="crud-coluna-acoes">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosFiltrados.map((item) => (
                                <tr key={item.id}>
                                    {colunas.map((col) => (
                                        <td key={col.campo} className={col.className || ''}>
                                            {renderCustomizado ? (
                                                renderCustomizado(item, col)
                                            ) : (
                                                col.formatar ? col.formatar(item[col.campo]) : item[col.campo] || '-'
                                            )}
                                        </td>
                                    ))}
                                    <td>
                                        <CrudActions
                                            id={item.id}
                                            onEditar={() => onEditar(item.id)}
                                            onExcluir={() => onExcluir(item.id)}
                                            acoesPersonalizadas={acoesPersonalizadas ? acoesPersonalizadas(item) : undefined}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}