import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';

import { createPokemonCsv } from './createPokemonCsv';

describe('createPokemonCsv', () => {
  let createObjectUrlSpy: ReturnType<typeof vi.spyOn>;
  let revokeSpy: ReturnType<typeof vi.spyOn>;
  let appendSpy: ReturnType<typeof vi.spyOn>;
  let removeSpy: ReturnType<typeof vi.spyOn>;
  const originalCreateElement = document.createElement.bind(document);

  beforeEach(() => {
    createObjectUrlSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
    revokeSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    appendSpy = vi.spyOn(document.body, 'appendChild');
    removeSpy = vi.spyOn(document.body, 'removeChild');

    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      const el = originalCreateElement(tagName) as HTMLAnchorElement;
      if (tagName === 'a') {
        el.click = () => {};
      }
      return el;
    });
  });

  afterEach(() => {
    createObjectUrlSpy.mockRestore();
    revokeSpy.mockRestore();
    appendSpy.mockRestore();
    removeSpy.mockRestore();
    (document.createElement as unknown as jest.Mock)?.mockRestore?.();
    vi.restoreAllMocks();
  });

  it('downloads CSV using existing descriptions', async () => {
    const selected = [
      { id: 1, name: 'pikachu', url: 'url1', description: 'pika' },
      { id: 2, name: 'bulbasaur', url: 'url2', description: 'bulba' },
    ];

    await createPokemonCsv(selected, selected.length);

    expect(createObjectUrlSpy).toHaveBeenCalled();
    expect(appendSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(revokeSpy).toHaveBeenCalled();
  });

  it('uses empty descriptions when they are missing', async () => {
    const selected = [
      { id: 1, name: 'pikachu', url: 'url1' },
      { id: 2, name: 'bulbasaur', url: 'url2' },
    ];

    await createPokemonCsv(selected, selected.length);

    expect(createObjectUrlSpy).toHaveBeenCalled();
    expect(appendSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(revokeSpy).toHaveBeenCalled();
  });
});
