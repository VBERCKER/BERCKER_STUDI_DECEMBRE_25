import express from "express";
import Sport from "../models/sportModels.js";
import Offre from "../models/offreModels.js";
import SportRouter from "./sportRoute.js";




let OffreRouter = express.Router()

/** les routes de offre  */




//voir les offre admin par sport ****************************
OffreRouter.get('offreadminfilter/:id', async (req, res) => {
            const id = parseInt(req.params.id);
        
            if (!id) {
                return res.status(400).json({ message: "Il manque un paramètre" });
            }
        
            try {
                const offres = await Offre.findAll({
                  attributes: ['id', 'offre', 'place_offre', 'prix_offre', 'places_dispo', 'sport_id'],
                  include: [{
                    model: Sport,
                    attributes: ['sport'],
                    where: { id: id }
                  }]
                });
                console.log(offres);
              } catch (err) {
                console.error('Erreur lors de la récupération des offres:', err);
              }
            });

    /******admin */
    // voir les sports avec les offres

    OffreRouter.get('/offreadminall', async (req, res) => {
        try {
            try {
                const sports = await Sport.findAll({
                  attributes: ['id', 'sport']
                });
                console.log(sports);
                res.json(sports);
              } catch (err) {
                console.error('Erreur lors de la récupération des sports:', err);
              }
            } catch (err) {
              console.error('Erreur lors de la récupération des sports avec offres:', err);
            }
        });

      //ajouter une offre admin

      OffreRouter.post('/add', async (req, res) =>  {
        const { offre, place_offre, prix_offre, places_dispo, sport_id } = req.body;
        if (!offre || !place_offre || !prix_offre || !places_dispo || !sport_id) {
            return res.status(400).json({ message: "Il manque un paramètre" });
        }
        try {
            const newOffre = await Offre.create({
                offre,
                place_offre,
                prix_offre,
                places_dispo,
                sport_id
            });
            res.json({message: "Offre créée avec succès", data: newOffre});
        } catch (err) {
            console.error('Erreur lors de la création de l\'offre:', err);
            res.status(500).json({ message: "Erreur lors de la création de l'offre" });
        }
    });

// reueprere les ventes
 OffreRouter.get('/vente', async (req, res) => {
  try {
    const offres = await Offre.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('offre')), 'offre']]
    });
    console.log(offres);
    res.json(offres);
  } catch (err) {
    console.error('Erreur lors de la récupération des offres distinctes:', err);
  }
});

// récupérer le nombre d'achats pour une offre

OffreRouter.get('/ventefilter/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
      return res.status(400).json({ message: "Il manque un paramètre" });
  }

  try {
    const total = await Achat.count({
      where: {
        offre: {
          [Op.iLike]: id
        }
      }});
    console.log(`Total: ${total}`);
    res.json({total});
  } catch (err) {
    console.error('Erreur lors de la récupération du nombre d\'achats:', err);
  }
});

//selectionner un offre à modifier 

OffreRouter.get('/offreselection/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Il manque un paramètre" });
}

  try {
    const offre = await Offre.findOne({
      where: { id: id },
      attributes: ['id', 'offre', 'place_offre', 'prix_offre', 'places_dispo', 'sport_id'],
      include: [{
        model: Sport,
        attributes: ['sport']
      }]
    });

    if (!offre) {
      return res.status(404).json({ message: 'Offre non trouvée' });
    }

    console.log('offre filter:', offre);
    return res.json(offre);
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'offre:', err);
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

//modifier une offre
OffreRouter.patch('/update/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Il manque un paramètre" });
}

  const updateData = {};
  if (req.body.Offre && req.body.Offre.length > 0) {
    updateData.offre = req.body.Offre;
  }
  if (req.body.Place_offre && req.body.Place_offre.length > 0) {
    updateData.place_offre = req.body.Place_offre;
  }
  if (req.body.Prix_offre) {
    updateData.prix_offre = req.body.Prix_offre;
  }
  if (req.body.Places_dispo) {
    updateData.places_dispo = req.body.Places_dispo;
  }

  try {
    const [updated] = await Offre.update(updateData, {
      where: { id: id }
    });

    if (updated) {
      const updatedOffre = await Offre.findOne({ where: { id: id } });
      return res.status(200).json(updatedOffre);
    }

    throw new Error('Offre non trouvée');
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'offre:', err);
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});
OffreRouter.delete('/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Il manque un paramètre" });
}

  try {
    const deleted = await Offre.destroy({
      where: { id: id }
    });

    if (deleted) {
      return res.status(204).send();
    }

    throw new Error('Offre non trouvée');
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'offre:', err);
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

//export {router}
export default OffreRouter;