import {http, HttpResponse} from 'msw';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const handlers = [
  http.get(`${API_BASE_URL}/pokemon`, () => {
    return HttpResponse.json({
      count: 1,
      results: [
        {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur'}
      ]
    })
  }),

  http.get(`${API_BASE_URL}/error`, () => {
    return HttpResponse.json(
      {message: 'Internal server error'},
      {status: 500},
    )
  })
]