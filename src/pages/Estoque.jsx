import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getTelasAcesso } from '../config/telasAcessoEstoque';
import './Estoque.css';

export default function Estoque() {
    const [telas] = useState(getTelasAcesso());

    return (
        <Layout>
            <main className="admin-conteudo">
                <div className="admin-acoes">
                    <h2 className="admin-secao-titulo">Telas de Acesso</h2>
                </div>

                <div className="tabela-wrapper">
                    <table className="tabela-admin">
                        <thead>
                            <tr>
                                <th>Nome da Tela</th>
                                <th>Ação</th>
                            </tr>
                        </thead>

                        <tbody>
                            {telas.map((tela) => (
                                <tr key={tela.id}>
                                    <td>
                                        <Link to={tela.link} className="admin-link-tela">
                                            {tela.nome}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={tela.link} className="botao-acessar">
                                            Acessar →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </Layout>
    );
}