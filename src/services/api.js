import { TABELA_LANCAMENTOS, TABELA_USUARIOS } from '../config/tabelas';

export function getUsuarios(idUsuario) {
  return request(
    `${TABELA_USUARIOS.endpointListar}?idUsuario=${idUsuario}`,
    {
      method: 'GET',
    }
  );
}

export function criarUsuario(idLancamento) {
  return request(TABELA_LANCAMENTOS.endpointExcluir, {
    method: 'POST',
    body: JSON.stringify({
      id: idLancamento,
    }),
  });
}

export function excluirUsuario(idLancamento) {
  return request(TABELA_LANCAMENTOS.endpointExcluir, {
    method: 'POST',
    body: JSON.stringify({
      id: idLancamento,
    }),
  });
}

export function getLancamentos(idUsuario) {
  return request(
    `${TABELA_LANCAMENTOS.endpointListar}?idUsuario=${idUsuario}`,
    {
      method: 'GET',
    }
  );
}

export function criarLancamento(dados) {
  return request(TABELA_LANCAMENTOS.endpointCriar, {
    method: 'POST',
    body: JSON.stringify(dados),
  });
}

export function excluirLancamento(idLancamento) {
  return request(TABELA_LANCAMENTOS.endpointExcluir, {
    method: 'POST',
    body: JSON.stringify({
      id: idLancamento,
    }),
  });
}

export function atualizarLancamento(id, novoValor) {
  return request(TABELA_LANCAMENTOS.endpointAtualizar, {
    method: 'POST',
    body: JSON.stringify({ id, novoValor }),
  });
}

const BASE_URL = import.meta.env.VITE_API_URL;

async function request(endpoint, options = {}) {
  console.log(`${BASE_URL}${endpoint}`);
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.error || data?.message || 'Erro ao comunicar com o servidor';
    throw new Error(message);
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}

export function login(email, senha) {
  return request('/loginAut.php', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  });
}

export default request;