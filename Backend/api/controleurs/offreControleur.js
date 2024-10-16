/* Import des dépendances */
import Offre from "../models/offreModels.js";

/**** Voir les offres admin par sport ****************************/

export async function offreadminfilter(req, res) {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Il manque un paramètre" });
  }

  try {
    const offres = await Offre.findAll({
      attributes: [
        "id",
        "offre",
        "place_offre",
        "prix_offre",
        "places_dispo",
        "sport_id",
      ],
      where: {
        sport_id: id,
      },
    });
    
    const offresData = offres.map((offre) => offre.dataValues);
   

    // Envoyer les données au client
    res.status(200).json(offresData);
  } catch (err) {
    
    res.status(500).json({ message: "Erreur lors de la récupération des offres" });
      
  }
}

/* Ajouter une offre = admin */

export async function addOffre(req, res) {
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
      sport_id,
    });

    res.status(200).json({ message: "Offre créée avec succès"});
  } catch (err) {
    
    res.status(500).json({ message: "Erreur lors de la création de l'offre" });
  }
}

/* Sélectionner une offre à modifier ****************/

export async function offreSelection(req, res) {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Il manque un paramètre" });
  }

  try {
    const offre = await Offre.findOne({
      where: { id: id },
      attributes: [
        "id",
        "offre",
        "place_offre",
        "prix_offre",
        "places_dispo",
        "sport_id",
      ],
    });

    if (!offre) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }

    console.log("offre filter:", offre.dataValues);
    return res.status(200).json(offre);
  } catch (err) {
    console.log("Erreur lors de la récupération de l'offre:", err);
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
}

/************* Modifier une offre ******************/

export async function updateOffre(req, res) {
  const id = parseInt(req.params.id);
  console.log("id:", id);
  if (!id) {
    return res.status(400).json({ message: "Il manque un paramètre" });
  }
console.log("req.body:", req.body);
  const updateData = {};
  if (req.body.offre && req.body.offre.length > 0) {
    updateData.offre = req.body.offre;
  }
  if (req.body.place_offre && req.body.place_offre.length > 0) {
    updateData.place_offre = req.body.place_offre;
  }
  if (req.body.prix_offre) {
    updateData.prix_offre = req.body.prix_offre;
  }
  if (req.body.places_dispo) {
    updateData.places_dispo = req.body.places_dispo;
  }
console.log("updateData:", updateData);
  try {
    const [updated] = await Offre.update(updateData, {
      where: { id: id },
    });

    if (updated) {
      const updatedOffre = await Offre.findOne({ where: { id: id } });
      return res.status(200).json(updatedOffre);
    }

    throw new Error("Offre non trouvée");
  } catch (err) {
    console.log("Erreur lors de la mise à jour de l'offre:", err);
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
}

/************* Supprimer une offre ******************/
/***** DELETE */
export async function deleteOffre(req, res) {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Il manque un paramètre" });
  }

  try {
    const deleted = await Offre.destroy({
      where: { id: id },
    });

    if (deleted) {
      return res.status(204).send();
    }

    throw new Error("Offre non trouvée");
  } catch (err) {
    console.log("Erreur lors de la suppression de l'offre:", err);
    return res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message });
  }
}