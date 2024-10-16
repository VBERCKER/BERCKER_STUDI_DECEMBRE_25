import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import Utilisateur from '../models/utilisateurModels.js'; // Assurez-vous que le chemin est correct

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicKEY = fs.readFileSync(path.resolve(__dirname, '../.certs/public.key'), 'utf8');

const extractBearer = (authorization) => {
  if (typeof authorization !== 'string') {
    return false;
  }

  const matches = authorization.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

export const verifyDroitToken = async (req, res, next) => {
  const token = req.headers.authorization && extractBearer(req.headers.authorization);
  console.log('tokent:', req.body);
  if (!token) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, publicKEY);
      const user = await Utilisateur.findOne({ where: { token } });
  
      if (!user) {
        return res.status(401).json({ message: 'Token invalide' });
      }

      req.user = decodedToken;
      req.role = user.role;
      next();
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Mauvais Token !', error: err.message });
      }
      return res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
    }
  } else {
    next();
  }
};