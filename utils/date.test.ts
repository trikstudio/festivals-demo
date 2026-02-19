import { formatDate } from './date';

describe('formatDate', () => {
  it('returns readable date for ISO input', () => {
    expect(formatDate('2026-07-24')).toBe('Jul 24, 2026');
  });

  it('falls back for invalid input', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });
});
