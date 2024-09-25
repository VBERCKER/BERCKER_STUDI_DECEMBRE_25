import { render, waitFor } from '@testing-library/react';
import OffreGrid from '../src/composants/offregrid'
import React from 'react';
import '@testing-library/jest-dom';

import fetch from 'jest-fetch-mock';

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ id: 1, name: 'Sport 1' }, { id: 2, name: 'Sport 2' }]),
    })
  );
  
  test('fetches data for OffreGrid component', async () => {
    render(<OffreGrid />);
  
    // Attendre que les promesses de fetch soient résolues
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  
    // Vérifier que les bonnes URL ont été appelées avec les bonnes options
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/sport', {
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/offre', {
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
  });