import request from 'supertest';
import express from 'express';
import { user, register, oubliePwd, modifPwd, modifUtilisateur, supp, suppTrash, connexionToken, connexion, nonautorisation } from '../controleurs/UserControleur.js';
import Utilisateur from '../models/utilisateurModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
 

const app = express();

app.use(express.json());
app.get('/user/:id', user);
app.post('/register', register);
app.post('/oubliePwd', oubliePwd);
app.put('/modifPwd/:id', modifPwd);
app.put('/modifUtilisateur/:id', modifUtilisateur);
app.delete('/supp/:id', supp);
app.delete('/suppTrash/:id', suppTrash);
app.get('/connexionToken', connexionToken);
app.post('/connexion', connexion);
app.get('/nonautorisation', nonautorisation);

jest.mock('../models/utilisateurModels.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('passport');


describe('UserControleur', () => {
  

    describe('user', () => {
        it('should return user by id', async () => {
            Utilisateur.findOne.mockResolvedValue({ id: 1, name: 'John Doe' });
            const res = await request(app).get('/user/1');
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ id: 1, name: 'John Doe' });
        });

        it('should return 404 if user not found', async () => {
            Utilisateur.findOne.mockResolvedValue(null);
            const res = await request(app).get('/user/1');
            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Utilisateur non trouvé');
        });

        it('should handle errors', async () => {
            Utilisateur.findOne.mockRejectedValue(new Error('Server error'));
            const res = await request(app).get('/user/1');
            expect(res.status).toBe(500);
            expect(res.body.message).toBe('Erreur serveur');
        });
    });

    describe('register', () => {
        it('should register a new user', async () => {
            Utilisateur.findOne.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue('hashedpassword');
            Utilisateur.create.mockResolvedValue({ id: 1, name: 'John Doe' });

            const res = await request(app)
                .post('/register')
                .send({ nom: 'John', prenom: 'Doe', mail: 'john.doe@example.com', pwd: 'password' });

            expect(res.status).toBe(201);
            expect(res.body.message).toBe('Vous êtes enregistré');
        });

        it('should return 400 if user already exists', async () => {
            Utilisateur.findOne.mockResolvedValue({ id: 1, name: 'John Doe' });

            const res = await request(app)
                .post('/register')
                .send({ nom: 'John', prenom: 'Doe', mail: 'john.doe@example.com', pwd: 'password' });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe("L'utilisateur existe déjà");
        });

        it('should handle errors', async () => {
            Utilisateur.findOne.mockRejectedValue(new Error('Server error'));

            const res = await request(app)
                .post('/register')
                .send({ nom: 'John', prenom: 'Doe', mail: 'john.doe@example.com', pwd: 'password' });

            expect(res.status).toBe(500);
            expect(res.body.message).toBe('Erreur serveur');
        });
    });

    describe('oubliePwd', () => {
      it('should return 400 if email is not provided', async () => {
          const response = await request(app).post('/oubliePwd').send({});
          expect(response.status).toBe(400);
          expect(response.body.message).toBe('il manque un parametre');
      });
  
      it('should return 404 if user is not found', async () => {
          Utilisateur.findOne.mockResolvedValue(null);
          const response = await request(app).post('/oubliePwd').send({ email: 'test@example.com' });
          expect(response.status).toBe(404);
          expect(response.body.message).toBe('non');
      });
  
      it('should return 200 if user is found', async () => {
          Utilisateur.findOne.mockResolvedValue({ id: 1, mail: 'test@example.com' });
          const response = await request(app).post('/oubliePwd').send({ email: 'test@example.com' });
          expect(response.status).toBe(200);
          expect(response.body.message).toBe('ok');
      });
  
      it('should return 500 if there is a server error', async () => {
          Utilisateur.findOne.mockRejectedValue(new Error('Server error'));
          const response = await request(app).post('/oubliePwd').send({ email: 'test@example.com' });
          expect(response.status).toBe(500);
          expect(response.body.message).toBe('erreur serveur');
      });
  });
    
  describe('modifPwd', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: { id: '1' },
            body: { pwd: 'newpassword' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if id is not present', async () => {
        req.params.id = undefined;
        await modifPwd(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'il manque un parametre' });
    });

    it('should return 404 if user is not found', async () => {
        Utilisateur.findOne.mockResolvedValue(null);
        await modifPwd(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'utilisateur non trouvé' });
    });

});

describe('modifUtilisateur', () => {
  let req, res;

  beforeEach(() => {
      req = {
          params: { id: '1' },
          body: { nom: 'John', prenom: 'Doe' }
      };
      res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
      };
  });

  it('should return 400 if id is not present', async () => {
      req.params.id = undefined;
      await modifUtilisateur(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Il manque un paramètre' });
  });

  it('should return 400 if nom or prenom is not present', async () => {
      req.body.nom = undefined;
      await modifUtilisateur(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Les champs nom et prenom sont requis' });
  });

  it('should return 404 if user is not found', async () => {
      Utilisateur.findOne = jest.fn().mockResolvedValue(null);
      await modifUtilisateur(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur non trouvé' });
  });

  it('should update user and return success message', async () => {
      Utilisateur.findOne = jest.fn().mockResolvedValue({ id: 1 });
      Utilisateur.update = jest.fn().mockResolvedValue([1]);
      await modifUtilisateur(req, res);
      expect(Utilisateur.update).toHaveBeenCalledWith({ nom: 'John', prenom: 'Doe' }, { where: { id: 1 } });
      expect(res.json).toHaveBeenCalledWith({ message: 'Mise à jour réussie' });
  });

});

describe('connexionToken', () => {
  let req, res;

  beforeEach(() => {
      req = {};
      res = {
          json: jest.fn()
      };
  });


  it('should respond with "non o" if req.user is not defined', async () => {
      req.user = undefined;

      await connexionToken(req, res);

      expect(res.json).toHaveBeenCalledWith("non o");
  });
});


describe('UserControleur', () => {
  describe('nonautorisation', () => {
      it('should return a JSON response with the message "Email ou mots de passe incorect"', () => {
          const req = {};
          const res = {
              json: jest.fn()
          };

          nonautorisation(req, res);

          expect(res.json).toHaveBeenCalledWith("Email ou mots de passe incorect");
      });
  });
});

});