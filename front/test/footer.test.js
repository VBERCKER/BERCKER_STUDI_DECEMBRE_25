import { render, screen } from '@testing-library/react'; 
import Footer from '../src/composants/template/footer';
import '@testing-library/jest-dom';
import React from 'react';

describe('Footer', () => {
  it('should render the expected links', () => {
    render(<Footer />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('billeterie')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('FAQs / manuels')).toBeInTheDocument();
  });
});