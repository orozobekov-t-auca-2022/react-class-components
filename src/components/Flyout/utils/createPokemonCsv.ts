import type { IPokemon } from '../../../type';

const escapeCsvValue = (value: string) => {
  return `"${value
    .replace(/"/g, '""')
    .replace(/\r/g, ' ')
    .replace(/\n/g, ' ')}"`;
};

export const createPokemonCsv = async (
  selectedPokemons: IPokemon[],
  selectedAmount: number
): Promise<void> => {
  const rows: string[][] = [];
  rows.push(['id', 'name', 'description', 'api_url']);

  for (const p of selectedPokemons) {
    rows.push([String(p.id), p.name, p.description ?? '', p.url]);
  }

  const csvContent = rows
    .map((row) => row.map((v) => escapeCsvValue(String(v))).join(','))
    .join('\r\n');

  const bom = '\uFEFF';
  const blob = new Blob([bom + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${selectedAmount}_items.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
