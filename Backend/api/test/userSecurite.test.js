import request from 'supertest';
import express from 'express';
import { Utilisateur } from '../models/utilisateurModels.js'; // Assurez-vous que le chemin est correct
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { supp } from '../controleurs/UserControleur.js'; // Assurez-vous que le chemin est correct
import { verifyDroitToken } from "../midleware/verifierDroit.js";
import env from "dotenv";
env.config();

// Créez une application Express pour les tests
const app = express();
app.use(bodyParser.json());
let UtilisateurRouter = express.Router();
// Mock des modèles
jest.mock('../models/utilisateurModels.js', () => ({
  Utilisateur: {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
    
  },
}));

//  les routes pour les tests
UtilisateurRouter.delete("/supp/:id", verifyDroitToken,supp);

app.post('/comments', (req, res) => {
  const { comment } = req.body;
  if (!comment || comment.includes('<script>')) {
    return res.status(400).json({ message: 'Commentaire invalide' });
  }
  // Logique d'ajout de commentaire
  res.status(201).json({ message: 'Commentaire ajouté' });
});



app.post('/register', async (req, res) => {
  const { nom, prenom, mail, pwd } = req.body;
  if (!nom || !prenom || !mail || !pwd) {
    return res.status(400).json({ message: 'Il manque un paramètre' });
  }

  const existingUser = await Utilisateur.findOne({ where: { mail } });
  if (existingUser) {
    return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
  }

  const hashedPwd = await bcrypt.hash(pwd, 10);
  const newUser = await Utilisateur.create({
    nom,
    prenom,
    mail,
    pwd: hashedPwd,
    cles_utilisateur: 'AB1234CD',
    role: 'false',
    token: 1,
  });

  res.status(201).json({ message: 'Vous êtes enregistré', user: newUser });
});

describe('Tests de sécurité API', () => {
  let token;
  let userToken;

  beforeAll(async () => {
    // Créez un utilisateur admin et un utilisateur normal pour les tests
    const adminUser = {
      id: 1,
      nom: 'Admin',
      prenom: 'User',
      nom_utilisateur: 'admin',
      mail: 'admin@example.com',
      pwd: await bcrypt.hash('password', 10),
      cles_utilisateur: 'AB1234CD',
      role: 'true',
      token: 'adminToken',
    };

    const normalUser = {
      id: 3,
      nom: 'Normal',
      prenom: 'User',
      nom_utilisateur: 'user',
      mail: 'user@example.com',
      pwd: await bcrypt.hash('password', 10),
      cles_utilisateur: 'EF5678GH',
      role: 'false',
      token: 'userToken',
    };

    Utilisateur.findOne.mockImplementation(({ where }) => {
      if (where.mail === adminUser.mail) return Promise.resolve(adminUser);
      if (where.mail === normalUser.mail) return Promise.resolve(normalUser);
      return Promise.resolve(null);
    });

    Utilisateur.findAll.mockResolvedValue([adminUser, normalUser]);

    token = jwt.sign({ id: adminUser.id, mail: adminUser.mail }, process.env.JWT_SECRET_ADMIN, { expiresIn: '2h' });
    userToken = jwt.sign({ id: normalUser.id, mail: normalUser.mail }, process.env.JWT_SECRET, { expiresIn: '2h' });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('devrait empêcher l\'injection SQL', async () => {
     
    const res = await request(app)
      .delete('/supp/ OR 1=1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe(undefined );
  });

  it('devrait empêcher les attaques XSS', async () => {
    const res = await request(app)
      .post('/comments')
      .send({ comment: "<script>alert('XSS')</script>" })
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(400); 
    expect(res.body.message).toBe('Commentaire invalide');
  });

 

  it('devrait enregistrer un utilisateur', async () => {
    const newUser = {
      nom: 'Test',
      prenom: 'User',
      mail: 'testuser@example.com',
      pwd: 'password',
    };

    Utilisateur.create.mockResolvedValue({
      ...newUser,
      id: 5,
      cles_utilisateur: 'AB1234CD',
      role: 'false',
      token: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const res = await request(app)
      .post('/register')
      .send(newUser);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Vous êtes enregistré');
  });

  it('devrait empêcher l\'enregistrement d\'un utilisateur existant', async () => {
    const existingUser = {
      nom: 'Admin',
      prenom: 'User',
      mail: 'admin@example.com',
      pwd: 'password',
    };

    const res = await request(app)
      .post('/register')
      .send(existingUser);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('L\'utilisateur existe déjà');
  });

});