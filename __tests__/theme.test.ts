import theme from '../src/theme';

describe('Theme system', () => {
  it('devrait exposer les couleurs, espacements et typographies', () => {
    expect(theme.colors).toBeDefined();
    expect(theme.spacing).toBeDefined();
    expect(theme.typography).toBeDefined();
  });
});
