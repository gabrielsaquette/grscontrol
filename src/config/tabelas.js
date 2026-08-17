export const TABELA_LANCAMENTOS = {
  endpointListar: '/listarA1.php',
  endpointCriar: '/criarA1.php',
  endpointAtualizar: '/alteraA1.php',
  campos: {
    id: 'ID_A_1',
    status: 'STATUS_A_1',
    data: 'DATA_A_1',
    usuario: 'USER_A_1',
    tipo: 'AA_1',
    categoria: 'BA_1',
    setor: 'CA_1',
    valor: 'FA_1',
    descricao: 'KA_1',
    observacao: 'LA_1',
  },
};

export const TABELA_USUARIOS = {
  endpointListar: '/listarUsuarios.php',
  endpointCriar: '/criarUsuario.php',
  endpointAtualizar: '/alterarUsuario.php',
  endpointExcluir: '/excluirUsuario.php',
  campos: {
    id: 'ID_USUARIO',
    nome: 'NOME_USUARIO',
    email: 'EMAIL_USUARIO',
    senha: 'SENHA_USUARIO',
    perfil: 'PERFIL_USUARIO',
    setor: 'SETOR_USUARIO',
    status: 'STATUS_USUARIO',
    dataCriacao: 'DATA_CRIACAO',
    dataAtualizacao: 'DATA_ATUALIZACAO',
    ultimoAcesso: 'ULTIMO_ACESSO',
  },
};