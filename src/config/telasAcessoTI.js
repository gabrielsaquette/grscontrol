export const TELAS_ACESSO = [
    { id: 1, nome: 'Controle de Usuários', link: '/ti/controleUsuarios' },
    { id: 2, nome: 'Controle de Estoque', link: '/ti/controleEstoque' },
    { id: 3, nome: 'Permissões', link: '/ti/permissoes' },
    { id: 4, nome: 'Chamados', link: '/ti/chamados' },
    { id: 5, nome: 'Controle de Máquinas', link: '/ti/controleMaquinas' },
    { id: 6, nome: 'Controle de Dispositivos Móveis', link: '/ti/controleDispositivosMoveis' },
    { id: 7, nome: 'Controle de Servidores', link: '/ti/controleServidores' },
    { id: 8, nome: 'Controle de Contas', link: '/ti/controleContas' },
    { id: 9, nome: 'Controle de Impressoras', link: '/ti/controleImpressoras' },
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