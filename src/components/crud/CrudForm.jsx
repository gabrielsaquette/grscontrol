import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrudForm.css';

export default function CrudForm({
    titulo,
    entidade,
    campos,           // Configuração dos campos do formulário
    dadosIniciais = {},
    onSalvar,
    onCancelar,
    salvando = false,
    erro = '',
    children,        // Para conteúdo extra
}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(dadosIniciais);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSalvar(formData);
    }

    function handleCancelar() {
        if (onCancelar) {
            onCancelar();
        } else {
            navigate(`/${entidade}`);
        }
    }

    return (
        <div className="crud-form-wrapper">
            <form className="crud-form" onSubmit={handleSubmit}>
                <div className="crud-form-cabecalho">
                    <h2 className="crud-form-titulo">
                        {dadosIniciais.id ? `Editar ${titulo.slice(0, -1)}` : `Novo ${titulo.slice(0, -1)}`}
                    </h2>
                    {children?.cabecalho}
                </div>

                <div className="crud-form-grade">
                    {campos.map((campo) => {
                        if (campo.tipo === 'hidden') return null;

                        return (
                            <div
                                key={campo.nome}
                                className={`crud-form-linha ${campo.larga ? 'crud-form-linha-larga' : ''}`}
                            >
                                <label className="crud-form-rotulo">
                                    {campo.rotulo}
                                    {campo.obrigatorio && <span className="crud-form-obrigatorio">*</span>}
                                </label>

                                {campo.tipo === 'select' ? (
                                    <select
                                        name={campo.nome}
                                        className="crud-form-campo"
                                        value={formData[campo.nome] || ''}
                                        onChange={handleChange}
                                        required={campo.obrigatorio}
                                        disabled={campo.desabilitado}
                                    >
                                        <option value="" disabled>
                                            {campo.placeholder || 'Selecione...'}
                                        </option>
                                        {campo.opcoes.map((opcao) => (
                                            <option key={opcao.valor} value={opcao.valor}>
                                                {opcao.rotulo}
                                            </option>
                                        ))}
                                    </select>
                                ) : campo.tipo === 'textarea' ? (
                                    <textarea
                                        name={campo.nome}
                                        className="crud-form-campo crud-form-textarea"
                                        value={formData[campo.nome] || ''}
                                        onChange={handleChange}
                                        required={campo.obrigatorio}
                                        rows={campo.linhas || 3}
                                        placeholder={campo.placeholder}
                                    />
                                ) : campo.tipo === 'number' ? (
                                    <input
                                        type="number"
                                        name={campo.nome}
                                        className="crud-form-campo"
                                        value={formData[campo.nome] || ''}
                                        onChange={handleChange}
                                        required={campo.obrigatorio}
                                        step={campo.step || '0.01'}
                                        min={campo.min}
                                        max={campo.max}
                                        placeholder={campo.placeholder}
                                    />
                                ) : campo.tipo === 'date' ? (
                                    <input
                                        type="date"
                                        name={campo.nome}
                                        className="crud-form-campo"
                                        value={formData[campo.nome] || ''}
                                        onChange={handleChange}
                                        required={campo.obrigatorio}
                                    />
                                ) : campo.tipo === 'checkbox' ? (
                                    <input
                                        type="checkbox"
                                        name={campo.nome}
                                        className="crud-form-checkbox"
                                        checked={formData[campo.nome] || false}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <input
                                        type={campo.tipo || 'text'}
                                        name={campo.nome}
                                        className="crud-form-campo"
                                        value={formData[campo.nome] || ''}
                                        onChange={handleChange}
                                        required={campo.obrigatorio}
                                        placeholder={campo.placeholder}
                                    />
                                )}

                                {campo.ajuda && (
                                    <small className="crud-form-ajuda">{campo.ajuda}</small>
                                )}
                            </div>
                        );
                    })}

                    {children?.corpo}
                </div>

                {erro && <p className="crud-form-erro">{erro}</p>}

                <div className="crud-form-acoes">
                    <button
                        type="button"
                        className="crud-form-botao-secundario"
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="crud-form-botao-primario"
                        disabled={salvando}
                    >
                        {salvando ? 'Salvando...' : dadosIniciais.id ? 'Atualizar' : 'Salvar'}
                    </button>
                </div>
            </form>
        </div>
    );
}