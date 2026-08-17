export const TELAS_ACESSO = [
    { id: 1, nome: 'Controle de Colaboradores', link: '/rh/controleColaboradores' },
    { id: 2, nome: 'Admissão de Colaboradores', link: '/rh/admissao' },
    { id: 3, nome: 'Rescisão de Contrato', link: '/rh/rescisao' },
    { id: 4, nome: 'Gestão de Benefícios', link: '/rh/beneficios' },
    { id: 5, nome: 'Folha de Pagamento', link: '/rh/folhaPagamento' },
    { id: 6, nome: 'Ponto Eletrônico', link: '/rh/pontoEletronico' },
    { id: 7, nome: 'Gestão de Férias', link: '/rh/ferias' },
    { id: 8, nome: 'Afastamentos e Licenças', link: '/rh/afastamentos' },
    { id: 9, nome: 'Treinamentos e Desenvolvimento', link: '/rh/treinamentos' },
    { id: 10, nome: 'Avaliação de Desempenho', link: '/rh/avaliacaoDesempenho' },
    { id: 11, nome: 'Plano de Carreira', link: '/rh/planoCarreira' },
    { id: 12, nome: 'Recrutamento e Seleção', link: '/rh/recrutamento' },
    { id: 13, nome: 'Currículos', link: '/rh/curriculos' },
    { id: 14, nome: 'Gestão de Vagas', link: '/rh/vagas' },
    { id: 15, nome: 'Entrevistas', link: '/rh/entrevistas' },
    { id: 16, nome: 'Integração de Novos Colaboradores', link: '/rh/integracao' },
    { id: 17, nome: 'Políticas e Normas Internas', link: '/rh/politicas' },
    { id: 24, nome: 'Cargos e Salários', link: '/rh/cargosSalarios' },
    { id: 25, nome: 'Estrutura Organizacional', link: '/rh/estruturaOrganizacional' },
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