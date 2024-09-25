//import { sequelize } from '../config/connectionDb.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
//import pkg from 'pg';
import jwt from 'jsonwebtoken';
import  Utilisateur  from '../models/utilisateurModels.js';


// Configuration de la connexion à la base de données


// Clé secrète pour JWT
const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète';

// Middleware passport
 export default passport.use("local", new LocalStrategy(async (username, password, cb) => {
    console.log('Username:', username);
  
    try {
      // Utiliser Sequelize pour récupérer l'utilisateur par email
      const utilisateur = await Utilisateur.findOne({ where: { mail: username } });
      const user = utilisateur.dataValues;
  
      if (!user) {
        return cb(null, false, { message: 'Utilisateur non trouvé' });
      }
  
      const bdPwd = user.pwd;
   
      // Vérification du mot de passe
      bcrypt.compare(password, bdPwd, (err, result) => {
        if (err) {
          return cb(err);
        }
        if (result) {
         
          return cb(null, user); // Retourner l'utilisateur et le jeton
        } else {
          return cb(null, false, { message: 'Mot de passe incorrect' });
        }
      });
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', err);
      return cb(err);
    }
  }));

// Fonction pour récupérer un utilisateur par email
/*async function getUserByEmail(email) {
    const query = 'SELECT * FROM utilisateur WHERE mail = $1';
    const values = [email];

    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Erreur lors de la récupération de l\'utilisateur', err);
        throw err;
    }
// Gestionnaire d'événements pour fermer le pool de connexions lorsque le processus se termine
process.on('exit', () => {
    pool.end().then(() => console.log('Pool de connexions fermé.'));
});

process.on('SIGINT', () => {
    pool.end().then(() => {
        console.log('Pool de connexions fermé.');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    pool.end().then(() => {
        console.log('Pool de connexions fermé.');
        process.exit(0);
    });
});

// Exemple d'utilisation de la fonction
(async () => {
    try {
        const email = 'exemple@domaine.com';
        const user = await getUserByEmail(email);

        if (user) {
            console.log('Utilisateur récupéré:', user);
        } else {
            console.log('Aucun utilisateur trouvé.');
        }
    } catch (err) {
        console.error('Erreur:', err);
    }
})();

/*
export const passportG = passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret : process.env.GOOGLE_SECRET,
    callbackURL: "http://localhost:5173/compte",
    userProfileURL : "https://www.googleapi.com/oauth2/v3/userinfo",
}, async (acessToken, refreshToken,profile,cb)=>{
    
  console.log(profile)

   const result ="SELECT * FROM utilisateur WHERE mail =(?)";
   const email =[profile.email,];

   try {
       
       db.query(result,[email],async (err,data)=>{
        console.log(data.length + "result")
       if (data.length === 0) {

         const newUser ="INSERT INTO utilisateur (nom,prenom,nom_utilisateur,mail,pwd,cles_utilisateur,role,token) VALUES (?)";
          const user =  [
           profile.family_name,
           profile.given_name,
           profile.family_name +'.'+ profile.given_name,
           profile.email,
            "google",
           profile.id,
           "false",
           1
       ] 
           db.query(newUser,[user])

          cb(null, newUser[0]);
       } else {
         cb(null, data[0]);
       }})
     } catch (err) {
       cb(err);
     }
}))
*/

// passport 

passport.serializeUser((user, cb)=>{  //stocker les donne utilisateur en local 
    cb(null,user); 
    
    });
    
    passport.deserializeUser((user, cb)=>{  //a veerif les donnees utilisateur en local 
        cb(null,user); 
        
        });
    
