//express
import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";

/***************** Import de la database */

import { sequelize } from "./config/connectionDb.js";

import UtilisateurRouter from "./Routes/utilisateurRoute.js";
import SportRouter from "./Routes/sportRoute.js";
import OffreRouter from "./Routes/offreRouter.js";
import AchatRouter from "./Routes/achatRoute.js";

/************************************** */
// import des models
import Utilisateur from "./models/utilisateurModels.js";
import Sport from "./models/sportModels.js";
import Offre from "./models/offreModels.js";
// importation des données tables

import utilisateurs from "./seeders/utilisateur.js";
import sports from "./seeders/sport.js";
import offres from "./seeders/offre.js";

/********import le limiter **************** */
import { generalLimiter } from "./midleware/limiter.js";

/****** Helmet ******************************* */ 
import helmet from "helmet";

// Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "example.com"],// les police de caractere et les script//
      },
    },
  }),
);


// Cors ******************************
const whitelist = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://checkout.stripe.com/",
  "https://bercker-studi-decembre-25-slgc.vercel.app/connexion"/** other domains if any */,
];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS et oui "));
    }
  },
};

//app.use(express.urlencoded({limit:'30mb'}))    /// non non
app.use(express.json());
app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rowBody = buf;
    },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; style-src 'self' 'unsafe-inline';"
  );
  next();
});

//session ********************************************
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Assurez-vous que 'secure' est false si vous n'utilisez pas HTTPS
  })
);
/*******use generle limiter */
app.use(generalLimiter);

//******************************* */
app.get("/", (req, res) => {
  res.send("hello");
});

//route utilisateur ****************************************

app.use("/users", UtilisateurRouter);

/*************Pages offres billeteries *********************** */
// voir les offres / sports pages offres/billeteries **********************************

app.use("/sport", SportRouter);

// ajouter une offres, voir les ventes par offres, filtrer une ventes, filter les offres, modifier une offre, selectionner une offre  ***************************************************
app.use("/offre", OffreRouter);

//Achat de billets *********************************************
app.use("/achat", AchatRouter);

// Fonction pour insérer les données si elles n'existent pas
const insertDataIfNotExists = async () => {
  for (const utilisateur of utilisateurs) {
    await Utilisateur.findOrCreate({
      where: { mail: utilisateur.mail }, 
      defaults: utilisateur,
    });
  }

  for (const sport of sports) {
    await Sport.findOrCreate({
      where: { sport: sport.sport }, 
      defaults: sport,
    });
  }

  for (const offre of offres) {
    await Offre.findOrCreate({
      where: {
        offre: offre.offre,
        sport_id: offre.sport_id,
      },
      defaults: offre,
    });
  }
};

/*******Satrt Serveur avec test database */
const PORTS = process.env.SERVER_PORT || PORT || 3000;
sequelize
  .authenticate()
  .then(() => {
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    return insertDataIfNotExists();
  })
  .then(() => {
    app.listen(process.env.SERVER_PORT || 3000 || PORTS, () => {
      console.log(`Server is running on port ${PORTS}`);
    });
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });

  export default app;