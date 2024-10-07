
import jwt from 'jsonwebtoken';
import Utilisateur from "../models/utilisateurModels.js";





// Middleware JWT ********************************************
const extractBearer = authorization => {
    if (typeof authorization !== 'string') {
        return false;
    }

    const matches = authorization.match(/(bearer)\s+(\S+)/i);
    return matches && matches[2];
};

/*** Vérification de la présence du token */
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && extractBearer(req.headers.authorization);

    if (!token) {
        return res.status(401).json({ message: 'Token manquant ou invalide' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: 'Mauvais Token !', error: err.message });
        }
    
        try {
          const user = await Utilisateur.findOne({ where: { token } });
    
          if (!user) {
            return res.status(401).json({ message: 'Token invalide' });
          }
    
          console.log(user);
          if (user.mail !== decodedToken.mail) {
            return res.status(401).json({ message: 'Token invalide' });
          }
    
          req.user = decodedToken;
          req.role = user.role;
          next();
        } catch (err) {
          return res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
        }
      });
    ;
};
//******************************************** */
