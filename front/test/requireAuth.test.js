import { render } from '@testing-library/react';
import { useLocation, useAuth } from 'react-router-dom';
import { RequireAuth } from '../src/composants/securite_cookies_token_auth_localstorage/requireAuth';
import '@testing-library/jest-dom'; 

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useAuth: jest.fn(),
}));

describe('RequireAuth', () => {
  it('redirects to /connexion if the user is not authenticated', () => {
    useLocation.mockReturnValue({ pathname: '/test' });
    useAuth.mockReturnValue({ user: null });

    const { container } = render(<RequireAuth />);

    expect(container.innerHTML).toContain('/connexion');
  });

  it('renders children if the user is authenticated', () => {
    useLocation.mockReturnValue({ pathname: '/test' });
    useAuth.mockReturnValue({ user: { name: 'Test User' } });

    const { getByText } = render(<RequireAuth>Test Child</RequireAuth>);

    expect(getByText('Test Child')).toBeInTheDocument();
  });
});