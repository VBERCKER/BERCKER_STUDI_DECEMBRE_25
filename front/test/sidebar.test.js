import { render, screen } from '@testing-library/react';
import Sidebar from '../src/composants/template/sidebar';
import '@testing-library/jest-dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

test('renders Sidebar with links', () => {
  const props = {
    lienmenuP: '/lienmenuP',
    menuP: 'Menu Principal',
    lienTItre1: '/lienTitre1',
    menuTitre1: 'Titre 1',
    lienTItre2: '/lienTitre2',
    menuTitre2: 'Titre 2',
    lienTItre3: '/lienTitre3',
    menuTitre3: 'Titre 3',
    lienTItre4: '/lienTitre4',
    menuTitre4: 'Titre 4',
  };

  render(<MemoryRouter><Sidebar {...props} /></MemoryRouter>);

  // Vérifiez que les liens sont présents dans le document
  expect(screen.getByText(props.menuP)).toBeInTheDocument();
  expect(screen.getByText(props.menuTitre1)).toBeInTheDocument();
  expect(screen.getByText(props.menuTitre2)).toBeInTheDocument();
  expect(screen.getByText(props.menuTitre3)).toBeInTheDocument();
  expect(screen.getByText(props.menuTitre4)).toBeInTheDocument();

  // Vérifiez que les liens ont les bonnes URLs
  expect(screen.getByText(props.menuP).closest('a')).toHaveAttribute('href', props.lienmenuP);
  expect(screen.getByText(props.menuTitre1).closest('a')).toHaveAttribute('href', props.lienTItre1);
  expect(screen.getByText(props.menuTitre2).closest('a')).toHaveAttribute('href', props.lienTItre2);
  expect(screen.getByText(props.menuTitre3).closest('a')).toHaveAttribute('href', props.lienTItre3);
  expect(screen.getByText(props.menuTitre4).closest('a')).toHaveAttribute('href', props.lienTItre4);
});