import { render, screen } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import {Textebtn, GridSport} from '../src/composants/textbtn';
import '@testing-library/jest-dom';
import React from 'react';

test('renders Textebtn with props', () => {
  const props = {
    textebtn: 'textebtn',
    textebtnp: 'textebtnp',
    textebtnbtn: 'textebtnbtn',
    lien: '/lien'
  };

  render(<Textebtn {...props} />);

  expect(screen.getByText(props.textebtn)).toBeInTheDocument();
  expect(screen.getByText(props.textebtnp)).toBeInTheDocument();
  expect(screen.getByText(props.textebtnbtn)).toBeInTheDocument();

  // Vérifier que le lien est correct
  const bouton = screen.getByRole('link');
  expect(bouton).toHaveAttribute('href', props.lien);
});

test('renders GridSport with Card1 components', () => {
  render(<GridSport />);

  // Vérifiez que les titres des cartes sont présents dans le document
  expect(screen.getByText('Basket 3x3')).toBeInTheDocument();
  expect(screen.getByText('Breaking')).toBeInTheDocument();
  expect(screen.getByText('Rugby à 7')).toBeInTheDocument();
  expect(screen.getByText('Athlétisme')).toBeInTheDocument();

  // Vérifiez que les descriptions des cartes sont présentes dans le document
  expect(screen.getByText(/Le basketball 3×3 se joue par équipes de trois joueurs/)).toBeInTheDocument();
  expect(screen.getByText(/Breaking est un style de danse originaire des États-Unis/)).toBeInTheDocument();
  expect(screen.getByText(/Le sport du rugby peut remonter à l'époque médiévale/)).toBeInTheDocument();
  expect(screen.getByText(/L’athlétisme est le sport le plus ancien dont nous avons des traces/)).toBeInTheDocument();
});