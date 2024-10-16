import React, { useState, useEffect } from "react";
import Buton from "../../composants/bouton";

export default function Vente() {
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

  const [offre, setOffre] = useState([]);
  const [sportfilter, setsportfilter] = useState([]);
  const [filter, setfilter] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  async function sportall() {
    await fetch(`${apiUrl}/achat/vente`, requestOptions)
      .then((response) => {
        return (response = response.json());
      })
      .then((result) => {
        const data = result;
        setOffre(data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    sportall();
  }, []);

  console.log(filter);
  function handleSport(e) {
    setsportfilter(e.target.value);
  }
  async function handleClick(e) {
    e.preventDefault();

    if (sportfilter) {
      try {
        const venteAdmin = { vente: sportfilter };
        const requestOptions1 = {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
           
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(venteAdmin),
        };

        const response = await fetch(
          `${apiUrl}/achat/venteFilter`,
          requestOptions1
        );
        const result = await response.json();
        console.log(result);

        setfilter([result]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
  }

  return (
    <div className="page">
      <div className="container text-center">
        <form style={{ width: "100%" }}>
          <div>
            <label for="sport" style={{ fontSize: "20px" }}>
              Offre:
            </label>
            <select
              style={{ width: "50%", margin: "40px" }}
              name="sport"
              onChange={handleSport}
            >
              <option></option>
              {offre.map((items) => {
                return (
                  <option key={items.offre} value={items.offre}>
                    {items.offre}
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
              <th scope="col">ventes</th>
            </tr>
          </thead>
          <tbody>
            {filter.map((items) => {
              return (
                <tr key={items.total}>
                  <td>{items.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
