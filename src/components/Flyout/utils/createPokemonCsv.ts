import type { IPokemon } from '../../../type';

const escapeCsvValue = (value: string) => {
  return `"${value
    .replace(/"/g, '""')
    .replace(/\r/g, ' ')
    .replace(/\n/g, ' ')}"`;
};

const fetchDescription = async (pokemon: IPokemon) => {
  if (pokemon.description) {
    return pokemon.description;
  }

  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`
    );
    if (!res.ok) {
      return '';
    }

    const data = await res.json();

    const entry = data.flavor_text_entries.find(
      (t: { language: { name: string } }) => t.language.name === 'en'
    );

    return entry?.flavor_text ?? '';
  } catch {
    return '';
  }
};

export const createPokemonCsv = async (
  selectedPokemons: IPokemon[],
  selectedAmount: number
): Promise<void> => {
  const rows: string[][] = [];
  rows.push(['id', 'name', 'description', 'api_url']);

  for (const p of selectedPokemons) {
    const description = await fetchDescription(p);
    rows.push([String(p.id), p.name, description ?? '', p.url]);
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
