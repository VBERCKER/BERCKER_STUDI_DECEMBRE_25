import express from "express";
import { verifyToken } from "../midleware/token.js";
import { verifyDroitToken } from "../midleware/verifierDroit.js";
import {logInLimiter,generalLimiter,registerLimiter} from "../midleware/limiter.js";

let UtilisateurRouter = express.Router();

/********function utilisateur import */

import {
  test,
  user,
  register,
  modifPwd,
  oubliePwd,
  modifUtilisateur,
  supp,
  suppTrash,
  connexionToken,
  connexion,
  nonautorisation,
} from "../controleurs/userControleur.js";

/** les routes de user  */

//test
UtilisateurRouter.get("");
UtilisateurRouter.get("/test", test);

// recuperer les infos utilisateurs
UtilisateurRouter.get("/:id",verifyDroitToken, user);
//enregistrer un utilisateur
UtilisateurRouter.post("/add", registerLimiter,register);

//oublie mots de pass

UtilisateurRouter.patch("/pwd",verifyDroitToken, oubliePwd);

//mise à jour du mot de passe

UtilisateurRouter.patch("/pwd/:id",verifyDroitToken, modifPwd);

//mise à jour des informations de l'utilisateur
UtilisateurRouter.patch("/utilisateur/:id",verifyDroitToken, modifUtilisateur);

//supprimer un utilisateur
UtilisateurRouter.delete("/supp/:id", verifyDroitToken,supp);

UtilisateurRouter.delete("/suppTrash/:id", verifyDroitToken,suppTrash);

//loggin utilisateur

//token
UtilisateurRouter.post("/token", verifyToken, connexionToken);

//connexion utilisateur
UtilisateurRouter.post("/connexion",logInLimiter, connexion);

// acces refusé
UtilisateurRouter.get("/nonautorisation", nonautorisation);

//export {router}
export default UtilisateurRouter;
