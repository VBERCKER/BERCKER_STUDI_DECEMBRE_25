import { render, screen } from '@testing-library/react';
import Float from '../src/composants/float'; 
import React from 'react';
import '@testing-library/jest-dom';

describe('Float Component', () => {
  test('renders Float component', () => {
    render(<Float />);

    // Vérifiez que le titre est présent
    const title = screen.getByText(/Selectionnez une offres !/i);
    expect(title).toBeInTheDocument();

    // Vérifiez que les boutons sont présents
    const soloButton = screen.getByText(/Offre Solo/i);
    expect(soloButton).toBeInTheDocument();

    const duoButton = screen.getByText(/Offre Duo/i);
    expect(duoButton).toBeInTheDocument();

    const familyButton = screen.getByText(/Offre Familiale/i);
    expect(familyButton).toBeInTheDocument();

    // Vérifiez que les descriptions sont présentes
    const soloDescription = screen.getByText(/Assister en "solo" aux épreuves olympiques ?/i);
    expect(soloDescription).toBeInTheDocument();

    const duoDescription = screen.getByText(/L'option "Duo" permet aux visiteurs,/i);
    expect(duoDescription).toBeInTheDocument();
  });
});