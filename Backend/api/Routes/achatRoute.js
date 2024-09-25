import express from "express";
import Achat from "../models/achatmodels.js";
import Utilisateur from '../models/utilisateurModels.js';
import OffreRouter from "./offreRouter.js";
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import env from "dotenv"
env.config();

//const stripeClient = stripe('votre_clé_stripe');

let AchatRouter = express.Router()

/** les routes de achat  */
/****stripe */

const endpointSecret = "whsec_7952173a58af1838269545d0fe863256e673ace51c15014d1b4fa42a87b21e7c";
//new Stripe(process.env.STRIPE_KEY);

const stripeClient = new Stripe(process.env.STRIPE_KEY);



/** les routes de achat  */
/****stripe */


AchatRouter.post('/create-checkout-session/:id', async (req, res) => {
    const id = parseInt(req.params.id,10);
    
  
    if (!id) {
        return res.status(400).json({ message: "Il manque un paramètre" });
    }
    
  
    try {
      const utilisateur = await Utilisateur.findOne({ where: { id: id } });
  
      if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
     
      const user = utilisateur.dataValues;
      const { product } = req.body;
     
      
      const customer = await stripeClient.customers.create({
        metadata: {
          userId: user.id,
          mail: user.mail
        }
      });
  
      
  
      const lineItems = product.map((product) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${product.offre} : ${product.sport}`,
            description: `Vous avez sélectionné l'offre : ${product.offre}`,
            images: [encodeURI(product.image)]
          },
          unit_amount: Math.round(product.prix*100),
        },
        quantity: product.quantity,
      }));
  
      const session = await stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.origin}/compte/sucess?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/compte/cancel`,
        //customer: customer.id,
        customer_email: user.mail
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error('Erreur lors de la création de la session de paiement:', error);
      res.status(500).json({ message: 'Erreur lors de la création de la session de paiement', error: error.message });
    }
});

// Route pour gérer les événements de paiement

    AchatRouter.post('/webhook', async (req, res) => {
        const event = req.body;

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      const randomNumber = () => Math.floor((Math.random() * 999999) * 7);
      const randomChar = () => String.fromCharCode(64 + Math.floor((Math.random() * 26) + 1));
      const cles = randomChar() + randomChar() + randomNumber() + randomChar() + randomChar() + randomNumber();

      stripeClient.checkout.sessions.listLineItems(session.id, async (err, lineItems) => {
        if (err) {
          console.log("Erreur de récupération des articles:", err);
        } else {
          for (const item of lineItems.data) {
            const productDescription = item.description;
            const cles_achat = cles;
            const quantity = item.quantity;
            const product = productDescription.split(":");
            const offre = product[0];
            const sport = product[1];
            const email = session.customer_email;
            const now = new Date();
            const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
            const heureNow = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

            //console.log("test: ", email, offre, sport, cles_achat, heureNow, date, quantity);

            try {
              const user = await Utilisateur.findOne({ where: { mail: email } });
              
              if (!user) {
                console.log("Utilisateur non trouvé");
                continue;
              }

              const cles_QR = jwt.sign({
                nom: user.nom,
                prenom: user.prenom,
                cles_achat: cles_achat,
                cles_utilisateur: user.cles_utilisateur
              }, process.env.JWT_SECRET
              );

              for (let i = 0; i < quantity; i++) {
                const productData = {
                  user_mail: email,
                  offre: offre,
                  sport: sport,
                  cles_achat: cles_achat,
                  heure_achat: heureNow,
                  date: date,
                  cles_qr: cles_QR,
                  quantity: quantity
                };

                //console.log(productData);

                await Achat.create(productData);
                console.log("✅ ticket enregistré !");
              }
            } catch (err) {
              console.error('Erreur lors de la création de l\'achat:', err);
            }
          }
        }
      });
      break;
    // ... handle other event types
    default:
      console.log("stripe:", `evenement de type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});


AchatRouter.get("/ebillet/:id", async (req, res) => {  
    const id = parseInt(req.params.id);
   
    if (!id) {
      return res.status(400).json({ message: "Il manque un paramètre" });
    }

    try {
      
      const user1 = await Utilisateur.findOne({ where: { id: id } });
      const user= user1.dataValues;
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      
      
      const tickets = await Achat.findAll({ where: { user_mail: user.mail } });
      const ticketDataValues = tickets.map(ticket => ticket.dataValues);
      console.log("billets:", ticketDataValues);
      return res.json(ticketDataValues);
    } catch (err) {
      console.error('Erreur lors de la récupération des données:', err);
      return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
  });
  

//export {router}
export default AchatRouter;