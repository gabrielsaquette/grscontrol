export const TELAS_ACESSO = [
    { id: 1, nome: 'Cadastro de Produto', link: '/producao/cadastroProduto' },
    { id: 2, nome: 'Ordem de Serviço', link: '/producao/ordemServico' },
    { id: 3, nome: 'Ordem de Produção', link: '/producao/ordemProducao' },
    { id: 4, nome: 'Apontamento', link: '/producao/apontamento' },
    { id: 5, nome: 'Programação', link: '/producao/programacao' },
];

export function getTelasAcesso() {
    return TELAS_ACESSO;
}

export function adicionarTelaAcesso(nome, link) {
    const novoId = Math.max(...TELAS_ACESSO.map(t => t.id), 0) + 1;
    TELAS_ACESSO.push({ id: novoId, nome, link });
    return TELAS_ACESSO;
}

export function removerTelaAcesso(id) {
    const index = TELAS_ACESSO.findIndex(t => t.id === id);
    if (index !== -1) {
        TELAS_ACESSO.splice(index, 1);
    }
    return TELAS_ACESSO;
}

export function atualizarTelaAcesso(id, nome, link) {
    const tela = TELAS_ACESSO.find(t => t.id === id);
    if (tela) {
        tela.nome = nome;
        tela.link = link;
    }
    return TELAS_ACESSO;
}