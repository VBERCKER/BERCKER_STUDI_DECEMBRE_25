import {User} from '../userModels.js'
import bcrypt from 'bcrypt'; 


(async()=>{

const test = await User.create({

    nom: "test",
    prenom: "test",
    nom_utilisateur: "ttest",
    mail: "test",
    pwd: bcrypt.hashSync("test", 10), // process.env.SALT
    cles_utilisateur: "test",
    role: "test",

})



})()