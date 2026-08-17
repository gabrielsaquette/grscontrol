import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; // Adicione esta importação
import { SETORES, MENUS } from '../../../config/opcoes';
import Layout from '../../../components/Layout';
import './NovoLancamento.css';

export default function CadastrarUsuario() {
    const navigate = useNavigate();
    const { usuario } = useAuth(); // Adicione esta linha para obter o usuário logado
    const [setor, setSetor] = useState('');

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        perfil: '',
        setor: '',
        status: 'ativo'
    });

    const [erro, setErro] = useState('');
    const [salvando, setSalvando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');

        if (formData.senha !== formData.confirmarSenha) {
            setErro('As senhas não coincidem');
            return;
        }

        if (formData.senha.length < 6) {
            setErro('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        setSalvando(true);

        try {
            console.log('Dados do usuário:', {
                idUsuario: usuario.idUsuario, // Adicione o idUsuario aqui
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
                perfil: formData.perfil,
                setor: formData.setor,
                status: formData.status
            });

            // Aqui você deve chamar a função da API que faz o cadastro
            // Exemplo: await cadastrarUsuario(usuario.idUsuario, formData);

            await new Promise(resolve => setTimeout(resolve, 1000));

            navigate('/ti/controleUsuarios');
        } catch (err) {
            setErro(err.message || 'Erro ao cadastrar usuário');
        } finally {
            setSalvando(false);
        }
    }

    return (
        <Layout>
            <main className="home-conteudo">
                <div className="novo-lancamento-wrapper">
                    <form className="form-lancamento" onSubmit={handleSubmit}>
                        <div className="form-cabecalho">
                            <h2 className="form-titulo">Cadastrar Usuário</h2>
                        </div>

                        <div className="form-grade">
                            <div className="form-linha form-linha-larga">
                                <label className="form-rotulo">Nome Completo *</label>
                                <input
                                    type="text"
                                    name="nome"
                                    className="form-campo"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    required
                                    placeholder="Digite o nome completo"
                                />
                            </div>

                            <div className="form-linha form-linha-larga">
                                <label className="form-rotulo">E-mail *</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-campo"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Digite o e-mail"
                                />
                            </div>

                            <div className="form-linha">
                                <label className="form-rotulo">Senha *</label>
                                <input
                                    type="password"
                                    name="senha"
                                    className="form-campo"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    required
                                    placeholder="Mínimo 6 caracteres"
                                />
                            </div>

                            <div className="form-linha">
                                <label className="form-rotulo">Confirmar Senha *</label>
                                <input
                                    type="password"
                                    name="confirmarSenha"
                                    className="form-campo"
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    required
                                    placeholder="Confirme a senha"
                                />
                            </div>

                            <div className="form-linha">
                                <label className="form-rotulo">Celular *</label>
                                <input
                                    type="number"
                                    name="perfil"
                                    className="form-campo"
                                    value={formData.perfil}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-linha">
                                <label className="form-rotulo">Setor</label>
                                <select
                                    name="setor"
                                    className="form-campo"
                                    value={formData.setor}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Selecione</option>
                                    {SETORES.map((f) => (
                                        <option key={f.id} value={f.id}>{f.rotulo}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-linha">
                                <label className="form-rotulo">Status</label>
                                <select
                                    name="status"
                                    className="form-campo"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="ativo">Ativo</option>
                                    <option value="inativo">Inativo</option>
                                    <option value="bloqueado">Bloqueado</option>
                                </select>
                            </div>
                        </div>

                        {erro && <p className="login-erro">{erro}</p>}

                        <div className="form-acoes">
                            <button
                                type="button"
                                className="form-botao-secundario"
                                onClick={() => navigate('/ti/controleUsuarios')}
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="form-botao" disabled={salvando}>
                                {salvando ? 'Cadastrando...' : 'Cadastrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </Layout>
    );
}