import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Admin from '../src/Pages/admin/admin';
import axios from 'axios';
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('axios');

describe('Admin', () => {
  it('fetches and displays sports', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Test Sport' }] });

    render(<Admin />);

    await waitFor(() => screen.getByText('Test Sport'));

    expect(screen.getByText('Test Sport')).toBeInTheDocument();
  });

  it('filters sports when a filter is entered', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Test Sport' }] });

    render(<Admin />);

    await waitFor(() => screen.getByText('Test Sport'));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test' } });

    expect(screen.getByText('Test Sport')).toBeInTheDocument();
  });

  
});