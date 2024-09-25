import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event' ;
import {FormRE, LogIN} from '../src/composants/FormCO';
import '@testing-library/jest-dom';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';


describe('FormRE Component', () => {
    test('renders FormRE component', () => {
        render(
          <MemoryRouter initialEntries={['/initial/path']}>
            <FormRE />
          </MemoryRouter>
        );
    
        // Vérifiez que les champs de formulaire sont présents
        const prenomInput = document.querySelector('input[name="prenom"]');
        expect(prenomInput).toBeDefined();
        expect(prenomInput).toBeInTheDocument();
    
        const nomInput = document.querySelector('input[name="nom"]');
        expect(nomInput).toBeDefined();
        expect(nomInput).toBeInTheDocument();
    
        const emailInput = document.querySelector('input[name="mail"]');
        expect(emailInput).toBeDefined();
        expect(emailInput).toBeInTheDocument();
    
        const pwdInput = document.querySelector('input[name="pwd"]');
        expect(pwdInput).toBeDefined();
        expect(pwdInput).toBeInTheDocument();
    
        const confirmPwdInput = document.querySelector('input[name="confirmpwd"]');
        expect(confirmPwdInput).toBeDefined();
        expect(confirmPwdInput).toBeInTheDocument();
    
        fireEvent.change(nomInput, { target: { value: 'Test Nom' } });
        expect(nomInput.value).toBe('Test Nom');
        
        // Utilisation de userEvent.type
        userEvent.type(nomInput, 'Test Nom');
        expect(nomInput.value).toBe('Test Nom');
    });
  });

  test('renders FormCO component and simulates login', () => {
    const { getByPlaceholderText, getByText } = render(<MemoryRouter initialEntries={['/initial/path']}><LogIN /></MemoryRouter>);
  
    const usernameInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Se connecter');
  
    fireEvent.change(usernameInput, { target: { value: 'Test Username' } });
    fireEvent.change(passwordInput, { target: { value: 'Test Password' } });
    fireEvent.click(submitButton);
  
    expect(usernameInput.value).toBe('Test Username');
    expect(passwordInput.value).toBe('Test Password');
  });

  // Simuler la réponse de l'API de connexion
global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ token: 'test_token' }),
    })
  );

  
  test('renders FormCO component, simulates login and checks token', async () => {
    const { getByPlaceholderText, getByText } = render(<MemoryRouter initialEntries={['/initial/path']}><LogIN /></MemoryRouter>);
  
    const usernameInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Se connecter');
  
    fireEvent.change(usernameInput, { target: { value: 'Test Username' } });
    fireEvent.change(passwordInput, { target: { value: 'Test Password' } });
    fireEvent.click(submitButton);
  
    // Attendre que la promesse de fetch soit résolue
    await new Promise((r) => setTimeout(r, 2000));
  
    // Vérifier que fetch a été appelé avec l'URL correcte
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/token", expect.any(Object));
  
    
  });