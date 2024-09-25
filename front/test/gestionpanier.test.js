import { saveuser, getuser, saveTickets, getTickets, addTickets } from '../src/composants/securite_cookies_token_auth_localstorage/gestionpanier';
import '@testing-library/jest-dom';


describe('gestionpanier', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and gets a user', () => {
    const user = { name: 'Test User' };

    saveuser(user);

    expect(getuser()).toEqual(user);
  });

  it('returns an empty array if no user is saved', () => {
    expect(getuser()).toEqual([]);
  });

  it('saves and gets tickets', () => {
    const tickets = [{ id: 1, name: 'Test Ticket' }];

    saveTickets(tickets);

    expect(getTickets()).toEqual(tickets);
  });

  it('returns an empty array if no tickets are saved', () => {
    expect(getTickets()).toEqual([]);
  });

  it('adds a ticket', () => {
    const ticket = { id: 1, name: 'Test Ticket' };

    addTickets(ticket);

    expect(getTickets()).toEqual([{ ...ticket, quantity: 1 }]);
  });

  it('increments the quantity of a ticket if it is already added', () => {
    const ticket = { id: 1, name: 'Test Ticket' };

    addTickets(ticket);
    addTickets(ticket);

    expect(getTickets()).toEqual([{ ...ticket, quantity: 2 }]);
  });
});