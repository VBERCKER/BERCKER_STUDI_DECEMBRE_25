import React, { useState ,useContext} from "react";
import Buton from "../../composants/bouton";
import { UserContext } from "../../composants/informationsUser/AdminContext.jsx";

export default function Ajouter() {
  const user = useContext(UserContext);
    const apiUrl = import.meta.env.VITE_API_URL;
  const [offre, setoffre] = useState({
    offre: "",
    place_offre: "",
    prix_offre: "",
    places_dispo: "",
    sport_id: "",
  });

  function handleChange(e) {
    
    setoffre((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const requestOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
     Authorization: `Bearer ${user.token }` 
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(offre),
  };
  async function handleClick(e) {
    e.preventDefault();

    try {
      const result = await fetch(
        `${apiUrl}/offre/add`,
        requestOptions
      );
      
      alert("L'offre est ajoutée !");
      setoffre({
        Offre: "",
        Place_offre: "",
        Prix_offre: "",
        Places_dispo: "",
        SPORT_ID: "",
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      Welcome
      <form className="form">
        <p className="title">Ajouter une offre</p>

        <div className="flex-block">
          <label>
            <input
              className="input"
              value={offre.offre}
              onChange={handleChange}
              name="offre"
              type="text"
              placeholder=""
              required=""
            />
            <span>Nom de l'offre </span>
          </label>
          <label>
            <input
              className="input"
              value={offre.place_offre}
              onChange={handleChange}
              name="place_offre"
              type="text"
              placeholder=""
              required=""
            />
            <span>Place dans l'offre</span>
          </label>

          <label>
            <input
              className="input"
              value={offre.places_dispo}
              onChange={handleChange}
              name="places_dispo"
              type="text"
              placeholder=""
              required=""
            />
            <span>Places Disponibles</span>
          </label>
          <label>
            <input
              className="input"
              value={offre.prix_offre}
              onChange={handleChange}
              name="prix_offre"
              type="text"
              placeholder=""
              required=""
            />
            <span>Prix de l'offre </span>
          </label>
        </div>
        <label>
          <input
            className="input"
            value={offre.sport_id}
            onChange={handleChange}
            name="sport_id"
            type="text"
            placeholder=""
            required=""
          />
          <span>id du Sport ou ajouter l'offre</span>
        </label>

        <Buton click={handleClick} btn={"Valider les modifications"} />
      </form>
    </div>
  );
}
