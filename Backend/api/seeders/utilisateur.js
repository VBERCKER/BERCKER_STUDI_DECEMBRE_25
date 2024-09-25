import bcrypt from 'bcrypt'; 
import env from "dotenv"
env.config();

const randomNumber = () => Math.floor((Math.random() * 999999) * 7);
const randomChar = () => String.fromCharCode(64 + Math.floor((Math.random() * 26) + 1));
const cles = randomChar() + randomChar() + randomNumber() + randomChar() + randomChar() + randomNumber();

//const pwd = process.env.PWD 
//const passHash =  bcrypt.hash(pwd, 10);


const utilisateurs = [
  {
    nom: 'organisaterur',
    prenom: 'admin',
    nom_utilisateur: 'organisateur.admin',
    mail: 'organisateur@gmail.com',
    pwd: '$2b$10$FoCYbHpAJZTS3MXiSOc/ouG8c2wXaknDcM.DxZG2Ht5YCLBG1o/Ze' ,
    cles_utilisateur: cles,
    role: 'false',
    token: 'some_token'
  },
  
];
console.log('utilisateurs:',utilisateurs);

export default utilisateurs;