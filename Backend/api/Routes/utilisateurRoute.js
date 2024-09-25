import express from "express";
import Utilisateur from "../models/utilisateurModels.js";
import bcrypt from 'bcrypt'; 
import { verifyToken } from "../midleware/token.js";
import env from "dotenv"
env.config();

//import passport from "passport"; 
import passport from "../midleware/passport.js"
import jwt from 'jsonwebtoken';


let UtilisateurRouter = express.Router()

const app=express();
app.use(passport.initialize());
app.use(passport.session());
/** les routes de user  */


UtilisateurRouter.get('')

UtilisateurRouter.get("/test",(req,res)=>{

     User.findAll()
         .then(users =>res.json({data:users}))
         .catch(err =>res.status(500).json({message : "Ereur data base :",error: err})) //err a supp secu 
    
    })


    UtilisateurRouter.get('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
    
        if (!id) {
            return res.status(400).json({ message: "Il manque un paramètre" });
        }
    
        try {
            const utilisateur = await Utilisateur.findOne({ where: { id: id }, raw: true });
            if (!utilisateur) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            return res.json(utilisateur);
        } catch (err) {
            return res.status(500).json({ message: "Erreur serveur", error: err.message });
        }
    });

UtilisateurRouter.post("/add", async (req, res) => {
    try {
        // Génération de la clé utilisateur
        const randomNumber = () => Math.floor((Math.random() * 999999) * 7);
        const randomChar = () => String.fromCharCode(64 + Math.floor((Math.random() * 26) + 1));
        const cles = randomChar() + randomChar() + randomNumber() + randomChar() + randomChar() + randomNumber();
        
        const { nom, prenom, mail, pwd } = req.body;
        
        // Validation des données reçues
        if (!nom || !prenom || !mail || !pwd) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }

        // Vérifier si l'utilisateur existe déjà
        const utilisateurExistant = await Utilisateur.findOne({ where: { mail: mail }, raw: true });
        if (utilisateurExistant) {
            return res.status(400).json({ message: "L'utilisateur existe déjà" });
        }

        // Hash du mot de passe
        const passHash = await bcrypt.hash(pwd, 10);
        const role = "false";

        // Enregistrement de l'utilisateur
        const utilisateur = await Utilisateur.create({
            nom: nom,
            prenom: prenom,
            nom_utilisateur: `${nom}.${prenom}`,
            mail: mail,
            pwd: passHash,
            cles_utilisateur: cles,
            role: role,
            token: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Réponse avec statut 201 et message de succès
        res.status(201).json({ message: "Vous êtes enregistré" });
    } catch (err) {
        // Réponse avec statut 500 et message d'erreur
        console.error(err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
    })

    //modifier mots de passe


   UtilisateurRouter.patch("/pwd",async (req,res)=>{

    console.log(req.body.email)
    const email= req.body.email;

    if(!email){return res.status(400).json({message:"il manque un parametre"})}
    Utilisateur.findOne({where:{mail:email},raw:true})
        .then(utilisateur =>{if((utilisateur === null)){return res.status(404).json({message:"non"})}else{return res.json({message:"ok"})}})
        .catch(err => res.status(500).json({message:"erreur serveur",error:err}))
    
    })
       


    UtilisateurRouter.patch("/pwd/:id",async (req,res)=>{

    const id  = parseInt(req.params.id) ; 
    const pwd = req.body.pwd; 
    console.log(pwd)
    const passHash = await bcrypt.hash(pwd,10)
   
    //verifier si Id est present et coherent 

    if(!id){return res.status(400).
        json({message:"il manque un parametre"})}

    //mise à jour du mot de passe

    Utilisateur.findOne({where:{id:id},raw:true})
        .then(utilisateur =>{if((utilisateur === null)){return res.status(404).json({message:"utilisateur non trouvé"})}
        //mise à jour du mot de passe
        utilisateur.update({pwd:passHash},{where:{id:id}})
        .then(data => res.json({message:"ok"},data))
        .catch(err => res.status(500).json({message:"erreur serveur",error:err}))
        })
        .catch(err => res.status(500).json({message:"erreur serveur",error:err}))
    })

    UtilisateurRouter.delete("/supp/:id",(req,res)=>{
const id  = parseInt(req.params.id) ; 
 //verifier si Id est present et coherent 

 if(!id){return res.status(400).
    json({message:"il manque un parametre"})}

    
    //suppression de l'utilisateur
    Utilisateur.destroy({where:{id:id},force:true})
    .then(() => res.status(204).json({message:"utilisateur supprimé"}))
    .catch(err => res.status(500).json({message:"erreur serveur",error:err}))
    })

    UtilisateurRouter.delete("/suppTrash/:id",(req,res)=>{
    const id  = parseInt(req.params.id) ; 
     //verifier si Id est present et coherent 
    
     if(!id){return res.status(400).
        json({message:"il manque un parametre"})}
    
        //suppression de l'utilisateur
        Utilisateur.destroy({where:{id:id}})
        .then(() => res.status(204).json({message:"utilisateur supprimé"}))
        .catch(err => res.status(500).json({message:"erreur serveur",error:err}))
        })
       
//loggin utilisateur

UtilisateurRouter.post("/token",verifyToken,async(req,res)=>{
    if(req.user){
        res.json('ok')
    }
    else res.json('non o')
});

UtilisateurRouter.post("/connexion", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur serveur', error: err });
      }
      if (!user) {
        return res.status(401).json({ message: 'Échec de l\'authentification', info });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la connexion', error: err });
        }
        try {
            const id = user.id;
            console.log('ID utilisateur:', id);
            const tokensign = jwt.sign({
              id: user.id,
              mail: user.mail
            }, process.env.JWT_SECRET, { expiresIn: "2h" });
      
            // Mise à jour du token dans la base de données avec Sequelize
         Utilisateur.update({ token: tokensign }, { where: { id: id } });
         return res.status(200).json({ message: 'Authentification réussie', user , access_token: tokensign });       
    
          } catch (err) {
            console.error('Erreur lors de la génération du jeton ou de la mise à jour de la base de données:', err);
            res.status(500).json({ message: 'Erreur interne du serveur' });
          }

       
      });
    })(req, res, next);
  });


    UtilisateurRouter.get("/nonautorisation",(_,res)=>{
        res.json("Email ou mots de passe incorect");
    }
    );
    




//export {router}
export default UtilisateurRouter;