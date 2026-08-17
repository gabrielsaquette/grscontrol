export const TELAS_ACESSO = [
    { id: 1, nome: 'Controle de Estoque', link: '/logistica/estoque' },
    { id: 3, nome: 'Expedição de Pedidos', link: '/logistica/expedicao' },
    { id: 4, nome: 'Roteirização de Entregas', link: '/logistica/roteirizacao' },
    { id: 5, nome: 'Gestão de Frotas', link: '/logistica/frotas' },
    { id: 6, nome: 'Manutenção de Veículos', link: '/logistica/manutencaoVeiculos' },
    { id: 7, nome: 'Controle de Combustível', link: '/logistica/combustivel' },
    { id: 8, nome: 'Gestão de Motoristas', link: '/logistica/motoristas' },
    { id: 9, nome: 'Rastreamento de Cargas', link: '/logistica/rastreamento' },
    { id: 10, nome: 'Gestão de Entregas', link: '/logistica/entregas' },
    { id: 11, nome: 'Controle de Devoluções', link: '/logistica/devolucoes' },
    { id: 12, nome: 'Gestão de Transportadoras', link: '/logistica/transportadoras' },
    { id: 14, nome: 'Tabela de Frete', link: '/logistica/tabelaFrete' },
    { id: 16, nome: 'Inventário Físico', link: '/logistica/inventario' },
    { id: 17, nome: 'Controle de Validade', link: '/logistica/validade' },
    { id: 18, nome: 'Gestão de Lotes', link: '/logistica/lotes' },
    { id: 19, nome: 'Separação e Embalagem', link: '/logistica/selecaoEmbalagem' },
    { id: 20, nome: 'Etiquetagem de Produtos', link: '/logistica/etiquetagem' },
    { id: 25, nome: 'Conferência de Cargas', link: '/logistica/conferenciaCargas' },
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