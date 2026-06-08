import { describe, it, expect } from 'vitest';
import { getPasswordStrength } from './passwordStrength';
import { getPageCount, getPagesArray } from './pages';

describe('getPasswordStrength', () => {
  it('returns all false for empty string', () => {
    expect(getPasswordStrength('')).toEqual({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: false,
      hasSpecial: false,
    });
  });

  it('detects a number', () => {
    expect(getPasswordStrength('a1').hasNumber).toBe(true);
    expect(getPasswordStrength('abc').hasNumber).toBe(false);
  });

  it('detects uppercase letter', () => {
    expect(getPasswordStrength('A').hasUppercase).toBe(true);
    expect(getPasswordStrength('a').hasUppercase).toBe(false);
  });

  it('detects lowercase letter', () => {
    expect(getPasswordStrength('a').hasLowercase).toBe(true);
    expect(getPasswordStrength('A').hasLowercase).toBe(false);
  });

  it('detects special character', () => {
    expect(getPasswordStrength('a!').hasSpecial).toBe(true);
    expect(getPasswordStrength('abc123').hasSpecial).toBe(false);
  });

  it('detects all criteria for a strong password', () => {
    expect(getPasswordStrength('Abc1!')).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecial: true,
    });
  });
});

describe('getPageCount', () => {
  it('returns correct page count', () => {
    expect(getPageCount(100, 20)).toBe(5);
    expect(getPageCount(101, 20)).toBe(6);
    expect(getPageCount(20, 20)).toBe(1);
  });

  it('returns 0 for 0 total items', () => {
    expect(getPageCount(0, 20)).toBe(0);
  });
});

describe('getPagesArray', () => {
  it('returns array of page numbers', () => {
    expect(getPagesArray(3)).toEqual([1, 2, 3]);
  });

  it('returns empty array for 0 pages', () => {
    expect(getPagesArray(0)).toEqual([]);
  });

  it('returns single-element array for 1 page', () => {
    expect(getPagesArray(1)).toEqual([1]);
  });
});