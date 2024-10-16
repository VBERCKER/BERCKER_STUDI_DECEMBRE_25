
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';;
import  Utilisateur  from '../models/utilisateurModels.js';


// Middleware passport
 export default passport.use("local", new LocalStrategy(async (username, password, cb) => {
    
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  if (!validateEmail(username)) {
    return res.status(400).json({ message: "Adresse email invalide" });
  }
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

// passport 

passport.serializeUser((user, cb)=>{  //stocker les donne utilisateur en local 
    cb(null,user); 
    
    });
    
    passport.deserializeUser((user, cb)=>{  //a veerif les donnees utilisateur en local 
        cb(null,user); 
        
        });
    
