
import jwt from 'jsonwebtoken';
import pkg from 'pg';

const { Pool } = pkg;

// Configuration de la connexion à la base de données
const db = new Pool({
    host: "localhost",
    user: "postgres",
    password: "valentin.6",
    database: "JO24",
    port: 5434,
});

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

    jwt.verify(token, process.env.JWT_SECRET || "jesuis", (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Mauvais Token !', error: err.message });
        }

        const sql = "SELECT mail FROM utilisateur WHERE token = $1";
        db.query(sql, [token], (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
            }

            if (!data.rows.length) {
                return res.status(401).json({ message: 'Token invalide' });
            }

            const user = data.rows[0];
            if (user.mail !== decodedToken.mail) {
                return res.status(401).json({ message: 'Token invalide' });
            }

            req.user = decodedToken;
            next();
        });
    });
};
//******************************************** */
