import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BoiteDialogue from "../src/composants/boite_dialogue_qrCode"

describe('BoiteDialogue Component', () => {
  test('renders BoiteDialogue component and checks modal', () => {
    render(<BoiteDialogue title="Test Title" content="Test Content" />);

    // Vérifiez que le bouton est présent
    const buttonElement = screen.getByText(/QR-code/i);
    expect(buttonElement).toBeInTheDocument();

    // Simulez un clic sur le bouton
    fireEvent.click(buttonElement);

    // Vérifiez que le modal est affiché avec le bon titre et contenu
    const modalTitle = screen.getByText(/Test Title/i);
    const modalContent = screen.getByText(/Test Content/i);
    expect(modalTitle).toBeInTheDocument();
    expect(modalContent).toBeInTheDocument();
  });
});