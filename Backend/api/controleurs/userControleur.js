import express from "express";
import Utilisateur from "../models/utilisateurModels.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../midleware/token.js";
import env from "dotenv";
env.config();

import fs from 'fs'; 
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/*******fs import */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/**** cles  */
const privateKey = fs.readFileSync(path.resolve(__dirname, '../.certs/private.key'), 'utf8');
const publicKEY = fs.readFileSync(path.resolve(__dirname, '../.certs/public.key'), 'utf8');

//import passport from "passport";
import passport from "../midleware/passport.js";
import jwt from "jsonwebtoken";
import utilisateurs from "../seeders/utilisateur.js";

const app = express();
//app.use(passport.initialize());
//app.use(passport.session());

// function des routes de user
export function test(req, res) {
  Utilisateur.findAll()
    .then((Utilisateur) => res.json({ data: Utilisateur }))
    .catch((err) =>
      res.status(500).json({ message: "Ereur data base :", error: err })
    ); //err a supp secu
}
// recuperer les infos utilisateurs

export async function user(req, res) {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Il manque un paramètre" });
  }

  try {
    const utilisateur = await Utilisateur.findOne({
      where: { id: id },
      raw: true,
    });
    
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    return res.json(utilisateur);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
}

//enregistrer un utilisateur

export async function register(req, res) {
  try {
    // Génération de la clé utilisateur
    const randomNumber = () => Math.floor(Math.random() * 999999 * 7);
    const randomChar = () =>
      String.fromCharCode(64 + Math.floor(Math.random() * 26 + 1));
    const cles =
      randomChar() +
      randomChar() +
      randomNumber() +
      randomChar() +
      randomChar() +
      randomNumber();

    const { nom, prenom, mail, pwd } = req.body;

    // Validation des données reçues
    if (!nom || !prenom || !mail || !pwd) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires" });
    }

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await Utilisateur.findOne({
      where: { mail: mail },
      raw: true,
    });
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
      updatedAt: new Date(),
    });

    // Réponse avec statut 201 et message de succès
    res.status(201).json({ message: "Vous êtes enregistré" });
  } catch (err) {
    // Réponse avec statut 500 et message d'erreur
   
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}
//mots de passe oublié
export async function oubliePwd(req, res) {
  
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ message: "il manque un parametre" });
  }
  Utilisateur.findOne({ where: { mail: email }, raw: true })
    .then((utilisateur) => {
      if (utilisateur === null) {
        return res.status(404).json({ message: "non" });
      } else {
        return res.json({ message: "ok" });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "erreur serveur", error: err })
    );
}

//modifier mots de passe
export async function modifPwd(req, res) {
  const id = parseInt(req.params.id);
  const pwd = req.body.pwd;
  
  const passHash = await bcrypt.hash(pwd, 10);

  //verifier si Id est present et coherent

  if (!id) {
    return res.status(400).json({ message: "il manque un parametre" });
  }

  //mise à jour du mot de passe

  Utilisateur.findOne({ where: { id: id }, raw: true })
    .then((utilisateur) => {
      if (utilisateur === null) {
        return res.status(404).json({ message: "utilisateur non trouvé" });
      }
      //mise à jour du mot de passe
      utilisateur
        .update({ pwd: passHash }, { where: { id: id } })
        .then((data) => res.json({ message: "ok" }, data))
        .catch((err) =>
          res.status(500).json({ message: "erreur serveur", error: err })
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "erreur serveur", error: err })
    );
}

//mise a jour des informations de l'utilisateur

export async function modifUtilisateur(req, res) {
  const id = parseInt(req.params.id);
  const { nom, prenom } = req.body;

  // Vérifier si l'ID est présent et cohérent
  if (!id) {
    return res.status(400).json({ message: "Il manque un paramètre" });
  }

  // Vérifier si les champs nom et prenom sont présents
  if (!nom || !prenom) {
    return res
      .status(400)
      .json({ message: "Les champs nom et prenom sont requis" });
  }

  try {
    // Trouver l'utilisateur par ID
    const utilisateur = await Utilisateur.findOne({ where: { id }, raw: true });

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mettre à jour les informations de l'utilisateur
    await Utilisateur.update({ nom, prenom }, { where: { id } });

    return res.json({ message: "Mise à jour réussie" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur", error: err });
  }
}

//suppression de l'utilisateur
export async function supp(req, res) {
  const id = parseInt(req.params.id, 10);

  // Vérifier si l'ID est présent et cohérent
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "Il manque un paramètre ou l'ID est invalide" });
  }

  try {
    // Vérifier si l'utilisateur existe
    const user = await Utilisateur.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Suppression de l'utilisateur
    await Utilisateur.destroy({ where: { id }, force: true });

    return res.status(200).json({ message: "Utilisateur supprimé " });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

export async function suppTrash(req, res) {
  const id = parseInt(req.params.id);
  //verifier si Id est present et coherent

  if (!id) {
    return res.status(400).json({ message: "il manque un parametre oh" });
  }

  //suppression de l'utilisateur
  Utilisateur.destroy({ where: { id: id } })
    .then(() => res.status(204).json({ message: "utilisateur supprimé oh" }))
    .catch((err) =>
      res.status(500).json({ message: "erreur serveur", error: err })
    );
}

//connexion token
export async function connexionToken(req, res) {
  if (req.user) {
    res.json({token:"ok", role: req.role});
  } else res.json("non o");
}

//connexion utilisateur

export async function connexion(req, res,next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Email inconu, créer un compte utilisateur. ", error: err });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mots de passe incorect 🤯 !", info });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la connexion", error: err });
      }
      try {
        const id = user.id;
        
        const tokensign = jwt.sign(
          {
            id: user.id,
            mail: user.mail,
          },
          privateKey,
          { expiresIn: "2h" , algorithm: "RS256"}
        );

        // Mise à jour du token dans la base de données avec Sequelize
        Utilisateur.update({ token: tokensign }, { where: { id: id } });
        return res
          .status(200)
          .json({
            message: "Authentification réussie",
            user,
            access_token: tokensign,
          });
      } catch (err) {
        console.error(
          "Erreur lors de la génération du jeton ou de la mise à jour de la base de données:",
          err
        );
        res.status(500).json({ message: "Erreur interne du serveur " });
      }
    });
  })(req, res, next);
}

// acces refusé
export async function nonautorisation(req, res) {
  res.json("Email ou mots de passe incorect");
}
