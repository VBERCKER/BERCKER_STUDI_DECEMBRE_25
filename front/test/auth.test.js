import { render, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../src/composants/securite_cookies_token_auth_localstorage/auth'
import '@testing-library/jest-dom';
import React from 'react';

describe('auth', () => {
  it('provides an auth context with a user, login function, and logout function', () => {
    let result;
    function TestComponent() {
      result = useAuth();
      return null;
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(result.user).toBeNull();
    expect(typeof result.login).toBe('function');
    expect(typeof result.logout).toBe('function');
  });

  it('updates the user when login is called', () => {
    let result;
    function TestComponent() {
      result = useAuth();
      return null;
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      result.login({ name: 'Test User' });
    });

    expect(result.user).toEqual({ name: 'Test User' });
  });

  it('sets the user to null when logout is called', () => {
    let result;
    function TestComponent() {
      result = useAuth();
      return null;
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      result.login({ name: 'Test User' });
      result.logout();
    });

    expect(result.user).toBeNull();
  });
});