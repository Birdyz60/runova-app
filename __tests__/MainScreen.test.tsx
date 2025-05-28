import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import App from '../App'; // point d’entrée
import MainScreen from '../src/screens/MainScreen';

describe('MainScreen', () => {
  it(`devrait afficher l'écran principal de Runova`, () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('main-screen')).toBeTruthy();
  });

  it(`devrait afficher une popup quand on appuie sur le bouton des options`, () => {
    const { getByTestId, queryByText } = render(<MainScreen />);
    expect(queryByText(/options.*bientôt/i)).toBeNull();

    fireEvent.press(getByTestId('settings-button'));

    expect(queryByText(/options.*bientôt/i)).toBeTruthy();
  });

  it('devrait afficher une popup quand on appuie sur le bouton profil', () => {
    const { getByTestId, queryByText } = render(<MainScreen />);
    expect(queryByText(/profil.*bientôt/i)).toBeNull();

    fireEvent.press(getByTestId('profile-button'));

    expect(queryByText(/profil.*bientôt/i)).toBeTruthy();
  });
});
