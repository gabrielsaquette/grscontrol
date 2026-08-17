export const TELAS_ACESSO = [
    { id: 1, nome: 'Financeiro', link: '/administracao/financeiro' },
    { id: 2, nome: 'Reuniões', link: '/administracao/reunioes' },
    { id: 3, nome: 'Organograma', link: '/administracao/organograma' },
    { id: 4, nome: 'Marketing', link: '/administracao/marketing' },
    { id: 5, nome: 'Auditoria', link: '/administracao/auditoria' },
    { id: 6, nome: 'Segurança do Trabalho', link: '/administracao/segurancaTrabalho' },
    { id: 7, nome: 'Informações Gerais', link: '/administracao/informacoesGerais' },
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