import React, { useState, useEffect } from "react";
import Buton from "../../composants/bouton";
import Sidebar from "../../composants/template/sidebar";

export default function Admin() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const requestOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  const [sport, setSport] = useState([]);
  const [sportfilter, setSportFilter] = useState([]);
  const [filter, setfilter] = useState([]);

  function sportall() {
    fetch(`${apiUrl}/sport/offreadminall`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSport(result);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    sportall();
  }, []); 

  function handleSport(e) {
    setSportFilter(e.target.value);
  }

  function handleSport(e) {
    setSportFilter(e.target.value);
  }

  async function handleClick(e) {
    e.preventDefault();
    await fetch(
      `${apiUrl}/offre/offreadminfilter/${sportfilter}`,
      requestOptions
    )
    
      .then((response) => {
        return (response = response.json());
      })
      .then((result) => {
        const data = result;

        setfilter(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <Sidebar
        lienTItre2={"modifier"}
        lienTItre3={"supprimer"}
        lienTItre4={"vente"}
        lienTItre1={"ajouter"}
        lienmenuP={"/admin"}
        menuP={"Home"}
        menuTitre1={"Ajouter une offre"}
        menuTitre4={" Les ventes"}
        menuTitre2={"Modifier une offre"}
        menuTitre3={"Supprimer une offre"}
        titrem={"Compte admin"}
        content={
          <div className="container text-center">
            <h2>Compte administrateur </h2>
            <p>
              Selectionner une option dans le menu latéral de gauche pour :
              Ajouter, supprimer , modifier une offre et voir les ventes.{" "}
            </p>
            <form style={{ width: "100%" }}>
              <div>
                <label for="sport" style={{ fontSize: "20px" }}>
                  sport:
                </label>
                <select
                  style={{ width: "50%", margin: "40px" }}
                  name="sport"
                  onChange={handleSport}
                >
                  <option></option>
                  {sport.map((items) => {
                    return (
                      <option key={items.id} value={items.id}>
                        {items.sport}
                      </option>
                    );
                  })}
                </select>

                <Buton click={handleClick} btn={"filtrer"} />
              </div>
            </form>

            <table className="table caption-top">
              <caption>Offres JO 2024</caption>
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Nom de l'offre</th>
                  <th scope="col">Places disponibles</th>
                  <th scope="col">Prix de l'offre</th>
                  <th scope="col">identifiant du Sport</th>
                </tr>
              </thead>
              <tbody>
                {filter.map((items) => {
                  return (
                    <tr>
                      <th key={items.id} scope="row">
                        {items.id}
                      </th>
                      <td>{items.offre}</td>
                      <td>{items.places_dispo}</td>
                      <td>{items.prix_offre}</td>
                      <td>{items.sport_id}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        }
      />
    </div>
  );
}
