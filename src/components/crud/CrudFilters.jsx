import './CrudFilters.css';

export default function CrudFilters({
    pesquisa,
    onPesquisaChange,
    filtros,
    filtrosAtivos,
    onFiltroChange,
    opcoesFiltros,
    onLimpar,
    entidade,
}) {
    const temFiltrosAtivos = Object.values(filtrosAtivos).some((v) => v);

    return (
        <div className="crud-filtros">
            <div className="crud-filtros-linha">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={pesquisa}
                    onChange={(e) => onPesquisaChange(e.target.value)}
                    className="crud-filtros-pesquisa"
                />

                {filtros && filtros.map((filtro) => (
                    <select
                        key={filtro.campo}
                        className="crud-filtros-select"
                        value={filtrosAtivos[filtro.campo] || ''}
                        onChange={(e) => onFiltroChange(filtro.campo, e.target.value)}
                    >
                        <option value="">{filtro.rotulo}</option>
                        {opcoesFiltros[filtro.campo]?.map((opcao) => (
                            <option key={opcao.valor} value={opcao.valor}>
                                {opcao.rotulo}
                            </option>
                        ))}
                    </select>
                ))}

                {temFiltrosAtivos && (
                    <button
                        type="button"
                        className="crud-filtros-limpar"
                        onClick={onLimpar}
                    >
                        Limpar filtros
                    </button>
                )}
            </div>
        </div>
    );
}