import express from "express";

/********import acaht controleur******* */

import {
  createCheckoutSession,
  stripeWebhook,
  usersEbillet,
  venteOffre,
  venteFilter,
} from "../controleurs/achatControleur.js";

let AchatRouter = express.Router();

/** les routes de achat  */

/****stripe */

// route achat checkout session
AchatRouter.post("/create-checkout-session/:id", createCheckoutSession);

// Route pour gérer les événements de paiement

AchatRouter.post("/webhook", stripeWebhook);

// Route pour récupérer les achats d'un utilisateur
AchatRouter.get("/ebillet/:id", usersEbillet);

// récupérer offre vendus
AchatRouter.get("/vente", venteOffre);

// récupérer le nombre d'achats pour une offre

AchatRouter.post("/venteFilter", venteFilter);

//export {router}
export default AchatRouter;
