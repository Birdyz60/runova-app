import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App'; // point d’entrée

describe('MainScreen', () => {
  it(`devrait afficher l'écran principal de Runova`, () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('main-screen')).toBeTruthy();
  });
});
