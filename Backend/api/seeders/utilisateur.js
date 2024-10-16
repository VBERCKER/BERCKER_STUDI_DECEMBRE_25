
import env from "dotenv"
env.config();

const randomNumber = () => Math.floor((Math.random() * 999999) * 7);
const randomChar = () => String.fromCharCode(64 + Math.floor((Math.random() * 26) + 1));
const cles = randomChar() + randomChar() + randomNumber() + randomChar() + randomChar() + randomNumber();


const utilisateurs = [
  {
    nom: process.env.ADMIN_NOM,
    prenom: process.env.ADMIN_PRENOM,
    nom_utilisateur: process.env.ADMIN_NOM_UTILISATEUR,
    mail: process.env.ADMIN_EMAIL,
    pwd: process.env.ADMIN_PASSWORD,
    cles_utilisateur: cles,
    role: process.env.ADMIN_ROLE,
    token: 'some_token'
  },
  
];
console.log('utilisateurs:',utilisateurs);

export default utilisateurs;