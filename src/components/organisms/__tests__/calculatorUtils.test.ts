import { calculateExpression, normalizeNumberString } from '../calculatorUtils';

describe('calculatorUtils', () => {
  describe('normalizeNumberString', () => {
    it('trims trailing zeros', () => {
      expect(normalizeNumberString(12.340000)).toBe('12.34');
    });

    it('returns 0 for non-finite values', () => {
      expect(normalizeNumberString(Number.NaN)).toBe('0');
    });
  });

  describe('calculateExpression', () => {
    it('calculates addition', () => {
      expect(calculateExpression('1+2')).toBe('3');
    });

    it('supports left-to-right calculation', () => {
      expect(calculateExpression('1+2×3')).toBe('7');
    });

    it('supports decimals and division', () => {
      expect(calculateExpression('1÷2.5')).toBe('0.4');
    });

    it('returns 0 for invalid expressions', () => {
      expect(calculateExpression('(')).toBe('0');
      expect(calculateExpression('1÷0')).toBe('0');
    });
  });
});
