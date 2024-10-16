import express from "express";
import { verifyDroitToken } from "../midleware/verifierDroit.js";

/**********import du controeleur */
import {
  offreadminfilter,
  addOffre,
  offreSelection,
  updateOffre,
  deleteOffre,
} from "../controleurs/offreControleur.js";

/******************************** */

let OffreRouter = express.Router();

/******************** les routes de offre  */

/**** voir les offre admin par sport ****************************/

OffreRouter.get("/offreadminfilter/:id", offreadminfilter);

/******admin */

//ajouter une offre admin

OffreRouter.post("/add", verifyDroitToken,addOffre);

//selectionner un offre à modifier

OffreRouter.get("/offreselection/:id", offreSelection);

//modifier une offre
OffreRouter.patch("/update/:id",verifyDroitToken, updateOffre);

/*****DELETE */
OffreRouter.delete("/delete/:id",verifyDroitToken, deleteOffre);

//export {router}
export default OffreRouter;
