import { render, screen } from '@testing-library/react';
import { Table } from '../src/composants/table'
import React from 'react';  
import '@testing-library/jest-dom';

test('renders Table with props', () => {
    const props = {
      image: 'JO24',
      sport: 'Football',
      offre: 'Offre 1',
      quantité: 10,
      prix: 100,
    };
  
    render(<Table {...props} />);
  
    const images = screen.getAllByText(props.image);
    expect(images.length).toBeGreaterThan(0);
    images.forEach(image => expect(image).toBeInTheDocument());
  
    expect(screen.getByText(props.sport)).toBeInTheDocument();
    expect(screen.getByText(props.offre)).toBeInTheDocument();
    expect(screen.getByText(props.quantité.toString())).toBeInTheDocument();
    expect(screen.getByText(props.prix.toString())).toBeInTheDocument();
  });