import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { server } from './mocks/server';

vi.stubEnv('VITE_POKE_API_KEY', 'https://pokeapi.co/api/v2/pokemon');
vi.stubEnv(
  'VITE_POKE_SPECIE_API_KEY',
  'https://pokeapi.co/api/v2/pokemon-species'
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => {
  server.resetHandlers();
  cleanup();
  localStorage.clear();
});

afterAll(() => server.close());

afterAll(() => {
  vi.unstubAllEnvs();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
