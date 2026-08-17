export function formatarMoeda(valor) {
  const numero = Number(valor) || 0;
  return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarData(valor) {
  if (!valor) return '';

  let data;

  if (typeof valor === 'number' || /^\d+$/.test(valor)) {
    const timestamp = Number(valor);

    data = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
  } else {
    data = new Date(valor);
  }

  if (Number.isNaN(data.getTime())) return valor;

  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}