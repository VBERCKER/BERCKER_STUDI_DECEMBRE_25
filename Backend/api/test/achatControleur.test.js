import request from 'supertest';
import { createCheckoutSession, stripeWebhook, usersEbillet, venteOffre, venteFilter } from '../controleurs/achatControleur.js';
import Achat from '../models/achatmodels';
import Utilisateur from '../models/utilisateurModels.js';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import express from 'express';


const app = express();
app.use(express.json());
app.post('/create-checkout-session/:id', createCheckoutSession);
app.post('/stripe-webhook', stripeWebhook);
app.get('/users-ebillet/:id', usersEbillet);
app.get('/vente-offre', venteOffre);
app.post('/vente-filter', venteFilter);

jest.mock('../models/achatmodels.js'), () => ({
    Achat: {
      findOne: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      destroy: jest.fn(),
      
    },
  });
jest.mock('../models/utilisateurModels.js'), () => ({
    Utilisateur: {
      findOne: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      destroy: jest.fn(),
      
    },
  });
jest.mock('jsonwebtoken');
jest.mock('stripe');

describe('Achat Controller', () => {
    let stripeClient;

    beforeAll(() => {
        stripeClient = new Stripe(process.env.STRIPE_KEY);
    });

    describe('createCheckoutSession', () => {
        it('should return 400 if id is not provided', async () => {
            const res = await request(app).post('/create-checkout-session/abc');
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Il manque un paramètre');
        });
    });


    describe('usersEbillet', () => {
        it('should return 400 if id is not provided', async () => {
            const res = await request(app).get('/users-ebillet/abc');
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Il manque un paramètre');
        });

    });

    describe('venteFilter', () => {
        it('should return 400 if vente is not provided', async () => {
            const res = await request(app).post('/vente-filter').send({});
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Il manque un paramètre');
        });

    });
});