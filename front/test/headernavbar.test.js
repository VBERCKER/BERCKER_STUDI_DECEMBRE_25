import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';

// Mockez useAuth avant de l'importer
jest.mock('../src/composants/securite_cookies_token_auth_localstorage/auth', () => ({
    __esModule: true, // this property makes it work
    useAuth: jest.fn(),
  }));

import {useAuth} from '../src/composants/securite_cookies_token_auth_localstorage/auth';
import {Nav, Header, Header1} from '../src/composants/template/headerNavbar'

test('renders Nav with logo and logout button', () => {
  const mockLogout = jest.fn();
  useAuth.mockReturnValue({
    logout: mockLogout,
  });

  render(
    <Router>
      <Nav />
    </Router>
  );

  // Vérifiez que le logo est présent dans le document
  const logo = screen.getByRole('img');
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute('src', './public/img/origine-logo-JO-Paris-2024-870x600.jpg');

 
  });

  describe('Header', () => {
    it('should render the expected elements', () => {
      const props = {
        src: 'test.jpg',
        alt: 'Test Image',
        h1: 'Test Header',
        p: 'Test Paragraph',
        lien1: '/test1',
        btn1: 'Test Button 1',
        lien2: '/test2',
        btn2: 'Test Button 2',
      };
  
      render(<Header {...props} />);
  
      expect(screen.getByAltText(props.alt)).toBeInTheDocument();
      expect(screen.getByText(props.h1)).toBeInTheDocument();
      expect(screen.getByText(props.p)).toBeInTheDocument();
      expect(screen.getByText(props.btn1)).toBeInTheDocument();
      expect(screen.getByText(props.btn2)).toBeInTheDocument();
    });
  });
  describe('Header1', () => {
    it('should render the expected elements', () => {
      const props = {
        src: 'test.jpg',
        alt: 'Test Image',
        h1: 'Test Header',
        p: 'Test Paragraph',
      };
  
      render(<Header1 {...props} />);
  
      expect(screen.getByAltText(props.alt)).toBeInTheDocument();
      expect(screen.getByText(props.h1)).toBeInTheDocument();
      expect(screen.getByText(props.p)).toBeInTheDocument();
    });
  });