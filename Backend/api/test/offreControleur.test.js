import request from 'supertest';
import { Offre } from '../models/offreModels.js';
import { offreadminfilter, addOffre, offreSelection, updateOffre, deleteOffre } from '../controleurs/offreControleur.js';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

// Définir les routes pour les tests
app.get('/offres/admin/filter/:id?', offreadminfilter);
app.post('/offres/admin/add', addOffre);
app.get('/offres/admin/select/:id?', offreSelection);
app.put('/offres/admin/update/:id?', updateOffre);
app.delete('/offres/admin/delete/:id?', deleteOffre);

// Mock des modèles
jest.mock('../models/offreModels.js', () => ({
  Offre: {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe('Offre Controller', () => {
  describe('offreadminfilter', () => {
    it('should return 400 if id is not provided', async () => {
      const res = await request(app).get('/offres/admin/filter/');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Il manque un paramètre');
    });

    it('should return 500 if there is an error', async () => {
      Offre.findAll.mockRejectedValue(new Error('Database error'));

      const res = await request(app).get('/offres/admin/filter/1');
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Erreur lors de la récupération des offres");
    });
  });

  describe('addOffre', () => {
    it('should return 400 if any parameter is missing', async () => {
      const res = await request(app).post('/offres/admin/add').send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Il manque un paramètre');
    });


    it('should return 500 if there is an error', async () => {
      Offre.create.mockRejectedValue(new Error('Database error'));

      const res = await request(app).post('/offres/admin/add').send({
        offre: 'Offre 1',
        place_offre: 'Place 1',
        prix_offre: 100,
        places_dispo: 10,
        sport_id: 1,
      });
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Erreur lors de la création de l'offre");
    });
  });

  describe('offreSelection', () => {
    it('should return 400 if id is not provided', async () => {
      const res = await request(app).get('/offres/admin/select/');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Il manque un paramètre');
    });

    it('should return 500 if there is an error', async () => {
      Offre.findOne.mockRejectedValue(new Error('Database error'));

      const res = await request(app).get('/offres/admin/select/1');
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Erreur serveur");
    });
  });

  describe('updateOffre', () => {
    it('should return 400 if id is not provided', async () => {
      const res = await request(app).put('/offres/admin/update/');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Il manque un paramètre');
    });

    it('should return 500 if there is an error', async () => {
      Offre.update.mockRejectedValue(new Error('Database error'));

      const res = await request(app).put('/offres/admin/update/1').send({ offre: 'Updated Offre' });
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Erreur serveur");
    });
  });

  describe('deleteOffre', () => {
    it('should return 400 if id is not provided', async () => {
      const res = await request(app).delete('/offres/admin/delete/');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Il manque un paramètre');
    });

    it('should return 500 if there is an error', async () => {
      Offre.destroy.mockRejectedValue(new Error('Database error'));

      const res = await request(app).delete('/offres/admin/delete/1');
      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Erreur serveur");
    });
  });
});