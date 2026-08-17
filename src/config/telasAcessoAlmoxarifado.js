export const TELAS_ACESSO = [
    { id: 1, nome: 'Compras', link: '/almoxarifado/controleCompras' },
    { id: 2, nome: 'Matéria Prima', link: '/almoxarifado/controleArea' },
    { id: 3, nome: 'Requisição de Material Interno', link: '/almoxarifado/planejamento' },
    { id: 4, nome: 'Requisição de Serviço Externo', link: '/almoxarifado/inventario' },
    { id: 5, nome: 'Equipamentos', link: '/almoxarifado/equipamentos' },
    { id: 6, nome: 'Controle de Estoque', link: '/almoxarifado/controleEstoque' },

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