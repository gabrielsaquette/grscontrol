import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getUsuarios, excluirUsuario } from '../../../services/api';
import { Link } from 'react-router-dom';
import Layout from '../../../components/Layout';
import { TABELA_USUARIOS } from '../../../config/tabelas';
import { rotuloSetor } from '../../../config/opcoes';
import '../../TI.css';

const CAMPOS = TABELA_USUARIOS.campos;

export default function ControleUsuarios() {
    const { usuario } = useAuth();
    const [usuarios, setUsuarios] = useState(null);
    const [erro, setErro] = useState('');

    const [pesquisa, setPesquisa] = useState('');
    const [filtroSetor, setFiltroSetor] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');

    useEffect(() => {
        carregar();
    }, [usuario]);

    function carregar() {
        setUsuarios(null);
        setErro('');

        getUsuarios(usuario.idUsuario)
            .then((dados) => setUsuarios(dados.registros || []))
            .catch((err) => setErro(err.message));
    }

    function handleExcluir(id, nome) {
        if (!window.confirm(`Excluir o usuário "${nome}"?`)) {
            return;
        }

        excluirUsuario(id)
            .then(() => {
                setUsuarios((lista) => lista.filter((item) => item[CAMPOS.id] !== id));
            })
            .catch((err) => {
                setErro(err.message);
            });
    }

    const setores = useMemo(() => {
        if (!usuarios) return [];

        return [...new Map(
            usuarios.map((item) => [
                item[CAMPOS.setor],
                rotuloSetor(item[CAMPOS.setor]),
            ])
        ).entries()];
    }, [usuarios]);

    const statusLista = useMemo(() => {
        if (!usuarios) return [];

        return [...new Set(usuarios.map((item) => item[CAMPOS.status]))];
    }, [usuarios]);

    const usuariosFiltrados = useMemo(() => {
        if (!usuarios) return [];

        const termo = pesquisa.trim().toLowerCase();

        return usuarios.filter((item) => {
            const nome = String(item[CAMPOS.nome] || '').toLowerCase();
            const email = String(item[CAMPOS.email] || '').toLowerCase();
            const setor = rotuloSetor(item[CAMPOS.setor]).toLowerCase();

            const pesquisaOk =
                !termo ||
                nome.includes(termo) ||
                email.includes(termo) ||
                setor.includes(termo);

            const setorOk =
                !filtroSetor || String(item[CAMPOS.setor]) === filtroSetor;

            const statusOk =
                !filtroStatus || String(item[CAMPOS.status]) === filtroStatus;

            return pesquisaOk && setorOk && statusOk;
        });
    }, [usuarios, pesquisa, filtroSetor, filtroStatus]);

    return (
        <Layout>
            <main className="admin-conteudo">
                <div className="admin-acoes">
                    <h2 className="admin-secao-titulo">Controle de Usuários</h2>
                    <Link to="/ti/CadastrarUsuario" className="botao-acessar">
                        + Cadastrar
                    </Link>
                </div>

                <div className="home-filtros">
                    <input
                        type="text"
                        placeholder="Pesquisar por nome, email ou setor..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                    />

                    <select value={filtroSetor} onChange={(e) => setFiltroSetor(e.target.value)}>
                        <option value="">Todos os setores</option>
                        {setores.map(([valor, descricao]) => (
                            <option key={valor} value={valor}>{descricao}</option>
                        ))}
                    </select>

                    <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
                        <option value="">Todos os status</option>
                        {statusLista.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                {erro && <p className="home-erro">{erro}</p>}

                {!erro && !usuarios && (
                    <p className="home-carregando">Carregando usuários...</p>
                )}

                {usuarios && usuariosFiltrados.length === 0 && (
                    <p className="home-vazio">Nenhum usuário encontrado.</p>
                )}

                {usuarios && usuariosFiltrados.length > 0 && (
                    <div className="tabela-wrapper">
                        <table className="tabela-admin">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Setor</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {usuariosFiltrados.map((item) => (
                                    <tr key={item[CAMPOS.id]}>
                                        <td>{item[CAMPOS.id]}</td>
                                        <td>{item[CAMPOS.nome]}</td>
                                        <td>{item[CAMPOS.email]}</td>
                                        <td>{rotuloSetor(item[CAMPOS.setor])}</td>
                                        <td>{item[CAMPOS.status]}</td>
                                        <td>
                                            <Link to={`/ti/editarUsuario/${item[CAMPOS.id]}`} className="botao-acessar" style={{ marginRight: '8px' }}>
                                                Editar
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {usuarios && (
                    <div className="admin-info">
                        <div className="admin-info-item">
                            <span className="admin-info-label">Total de usuários:</span>
                            <span className="admin-info-valor">{usuariosFiltrados.length}</span>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
}