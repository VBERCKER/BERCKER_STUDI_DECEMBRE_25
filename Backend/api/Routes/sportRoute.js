import express from "express";
import Sport from "../models/sportModels.js";
import Offre from "../models/offreModels.js";




let SportRouter = express.Router()

/** les routes de user  */


SportRouter.get('/',(req,res)=>{

     Sport.findAll()
     .then(sports => {
      // Vérifiez les données avec console.log
      const sportsData = sports.map(sport => sport.dataValues);
      console.log('Données récupérées:', sportsData);
      res.json({ sportsData });
  })
         .catch(err =>res.status(500).json({message : "Ereur data base :",error: err})) //err a supp secu 
    
    })


    SportRouter.get('/offre', async (req, res) => {
      try {
          const sportsWithOffres = await Sport.findAll({
              include: [{
                  model: Offre,
                  as: 'offres',
              }],
            
          });
          
          // Récupérer les dataValues
          const sportsWithOffresData = sportsWithOffres.map(sport => {
              const sportData = sport.dataValues;
              sportData.offres = sport.offres ? sport.offres.map(offre => offre.dataValues) : [];
              console.log('Données récupérées avec offres:', sportData);
              return sportData;
          });
         
          res.json(sportsWithOffresData);
      } catch (err) {
          console.error('Erreur lors de la récupération des sports avec offres:', err);
          res.status(500).json({ message: "Erreur de la base de données", error: err });
      }
  });

    /******admin */
    // voir les sports avec les offres

    SportRouter.get('/offreadminall', async (req, res) => {
        try {
            try {
                const sports = await Sport.findAll({
                  attributes: ['id', 'sport']
                });
                
                res.json(sports);
              } catch (err) {
                console.error('Erreur lors de la récupération des sports:', err);
              }
            } catch (err) {
              console.error('Erreur lors de la récupération des sports avec offres:', err);
            }
        });


//export {router}
export default SportRouter;