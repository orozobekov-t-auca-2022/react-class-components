import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const handlers = [
  http.get(`${API_BASE_URL}/pokemon`, () => {
    return HttpResponse.json({
      count: 1,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur/',
        },
      ],
    });
  }),

  http.get(`${API_BASE_URL}/pokemon/:pokemonId`, ({ params }) => {
    const pokemonId = String(params.pokemonId);

    return HttpResponse.json({
      id: Number(pokemonId) || 1,
      name: pokemonId,
      sprites: {
        front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
      },
      abilities: [],
      height: 1,
      forms: [],
    });
  }),

  http.get(
    `${API_BASE_URL}/pokemon-species/:pokemonSpeciesId`,
    ({ params }) => {
      const pokemonSpeciesId = String(params.pokemonSpeciesId);

      return HttpResponse.json({
        flavor_text_entries: [
          {
            flavor_text: `${pokemonSpeciesId} description`,
            language: { name: 'en' },
          },
        ],
      });
    }
  ),

  http.get(`${API_BASE_URL}/error`, () => {
    return HttpResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }),
];
