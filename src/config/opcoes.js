export const CATEGORIAS = [
  { id: 1, rotulo: 'Reuniões' },
  { id: 2, rotulo: 'Tarefas e entregas' },
  { id: 3, rotulo: 'Projetos' },
  { id: 4, rotulo: 'Feedbacks' },
  { id: 5, rotulo: 'Treinamentos e capacitações' },
  { id: 6, rotulo: 'Documentações' },
  { id: 7, rotulo: 'Comunicações internas' },
  { id: 8, rotulo: 'Metas e objetivos' },
  { id: 9, rotulo: 'Processos e procedimentos' },
  { id: 10, rotulo: 'Ideias e inovações' },
  { id: 11, rotulo: 'Outros' },
];

export const SETORES = [
  { id: 1, rotulo: 'Administrativo' },
  { id: 2, rotulo: 'Recursos Humanos' },
  { id: 3, rotulo: 'Financeiro' },
  { id: 4, rotulo: 'Contabilidade' },
  { id: 5, rotulo: 'Jurídico' },
  { id: 6, rotulo: 'Marketing' },
  { id: 7, rotulo: 'Vendas' },
  { id: 8, rotulo: 'Suporte ao Cliente' },
  { id: 9, rotulo: 'Tecnologia da Informação (TI)' },
  { id: 10, rotulo: 'Operações' },
  { id: 11, rotulo: 'Logística' },
  { id: 12, rotulo: 'Compras' },
  { id: 13, rotulo: 'Produção' },
  { id: 14, rotulo: 'Qualidade' },
  { id: 15, rotulo: 'Pesquisa e Desenvolvimento (P&D)' },
  { id: 16, rotulo: 'Outros' },
];

export const MENUS = [
  { id: 1, rotulo: 'Administração' },
  { id: 2, rotulo: 'Produção' },
  { id: 3, rotulo: 'Estoque' },
  { id: 4, rotulo: 'Almoxarifado' },
  { id: 5, rotulo: 'Manutenção' },
  { id: 6, rotulo: 'T.I.' },
  { id: 7, rotulo: 'RH' },
  { id: 8, rotulo: 'Logística' },
  { id: 9, rotulo: 'Relatórios' },
];

export function rotuloCategoria(id) {
  return CATEGORIAS.find((c) => c.id === Number(id))?.rotulo || '-';
}

export function rotuloSetor(id) {
  return SETORES.find((f) => f.id === Number(id))?.rotulo || '-';
}

export function rotuloMenu(id) {
  return SETORES.find((m) => m.id === Number(id))?.rotulo || '-';
}