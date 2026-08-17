import './CrudActions.css';

export default function CrudActions({
    id,
    onEditar,
    onExcluir,
    acoesPersonalizadas,
    confirmarExclusao = true,
}) {
    function handleExcluir() {
        if (confirmarExclusao && !window.confirm('Tem certeza que deseja excluir este registro?')) {
            return;
        }
        onExcluir(id);
    }

    return (
        <div className="crud-acoes">
            <button
                type="button"
                className="crud-acao crud-acao-editar"
                onClick={() => onEditar(id)}
                title="Editar"
            >
                ✏️
            </button>

            <button
                type="button"
                className="crud-acao crud-acao-excluir"
                onClick={handleExcluir}
                title="Excluir"
            >
                🗑️
            </button>

            {acoesPersonalizadas && acoesPersonalizadas.map((acao, index) => (
                <button
                    key={index}
                    type="button"
                    className={`crud-acao ${acao.className || ''}`}
                    onClick={() => acao.onClick(id)}
                    title={acao.titulo}
                >
                    {acao.icone}
                </button>
            ))}
        </div>
    );
}