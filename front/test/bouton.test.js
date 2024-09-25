import { render, fireEvent, screen } from '@testing-library/react';
import Boutton from '../src/composants/bouton'; // Assurez-vous que le chemin d'importation est correct
import React from 'react';
import '@testing-library/jest-dom';


describe('Boutton Component', () => {
  test('renders Boutton component and checks click', () => {
    const handleClick = jest.fn();

    render(<Boutton btn="Test Button" click={handleClick} lien="http://example.com" />);

    // Vérifiez que le bouton est présent
    const buttonElement = screen.getByText(/Test Button/i);
    expect(buttonElement).toBeInTheDocument();

   

    // Simulez un clic sur le bouton et vérifiez si la fonction de clic a été appelée
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});