import { describe, it, expect } from 'vitest';
import formsReducer, { addUser } from '../../store/forms/formsSlice';
import type { FormsHistoryState } from '../../store/forms/types';

const initialState: FormsHistoryState = {
  submissions: [],
};

const mockUser = {
  id: 'test-id-1',
  name: 'Alice',
  age: 25,
  gender: 'female',
  email: 'alice@example.com',
  acceptedTerms: true,
  image: null,
  password: 'Pass1!',
  confirmPassword: 'Pass1!',
  country: 'Germany',
};

describe('formsSlice', () => {
  it('returns initial state', () => {
    expect(formsReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('addUser adds a user to submissions', () => {
    const state = formsReducer(initialState, addUser(mockUser));
    expect(state.submissions).toHaveLength(1);
    expect(state.submissions[0]).toEqual(mockUser);
  });

  it('addUser appends multiple users', () => {
    const secondUser = { ...mockUser, id: 'test-id-2', name: 'Bob' };
    let state = formsReducer(initialState, addUser(mockUser));
    state = formsReducer(state, addUser(secondUser));
    expect(state.submissions).toHaveLength(2);
    expect(state.submissions[1].name).toBe('Bob');
  });

  it('addUser does not mutate previous state', () => {
    const state1 = formsReducer(initialState, addUser(mockUser));
    const state2 = formsReducer(state1, addUser({ ...mockUser, id: 'id-2' }));
    expect(state1.submissions).toHaveLength(1);
    expect(state2.submissions).toHaveLength(2);
  });
});