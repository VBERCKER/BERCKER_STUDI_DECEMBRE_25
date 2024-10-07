import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Admin from '../src/Pages/admin/admin';
import axios from 'axios';
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('axios');

describe('Admin', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

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

  it('displays no sports when filter does not match', async () => {
    axios.get.mockResolvedValue({ data: [{ id: 1, name: 'Test Sport' }] });

    render(<Admin />);

    await waitFor(() => screen.getByText('Test Sport'));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Nonexistent' } });

    expect(screen.queryByText('Test Sport')).not.toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    render(<Admin />);

    await waitFor(() => screen.getByText('Error loading sports'));

    expect(screen.getByText('Error loading sports')).toBeInTheDocument();
  });
});