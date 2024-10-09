import React, { useState, useEffect } from 'react';
import {Cardoffre1} from './card'

const OffreGrid = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [sport, setSport] = useState([]);
  const [offre, setOffre] = useState([]);
  const [error, setError] = useState(null);

  const requestOptions = {
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
    redirect: "follow",
    referrerPolicy: "no-referrer"
  };

  const bdSport = async () => {
    try {
      console.log(apiUrl)
      const response = await fetch(`${apiUrl}/sport`, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Résultat de la requête sport:', result.sportsData); 
      setSport(result.sportsData);
    } catch (error) {
      console.error('Erreur lors de la récupération des sports:', error);
      setError(error);
    }
  };

  const bdoffre = async () => {
    try {
      const response = await fetch(`${apiUrl}/sport/offre`, requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Résultat de la requête offre:', result); 
      setOffre(result);
    } catch (error) {
      console.error('Erreur lors de la récupération des offres:', error);
      setError(error);
    }
  };



  useEffect(() => { 
    bdSport();
    bdoffre();
  }, []);

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  if (!Array.isArray(sport)) {
    return <div>Les données sportives ne sont pas disponibles.</div>;
  }

  if (!Array.isArray(offre)) {
    return <div>Les données des offres ne sont pas disponibles.</div>;
  }

  return (
    <div>
      <h2 className="police-titre text-center border-bottom ">Billeteries</h2>
      
      <div className="sport">
      {offre.map((sportItem, sportIndex) => (
          <div className="sport-tit" key={sportIndex}>
            <h3 className="police-titre display-6  text-body-emphasis lh-1 mb-3 text-pop-up-top sport-titre">
              {sportItem.sport}
            </h3>
            
            <div className="container text-center">
            
            <div className="row g-4 row-cols-1 row-cols-sm-1 row-cols-md-3 ">
            { sportItem.offres.map((offreItem, offreIndex) => (
                  <div className="col" key={offreIndex}>
                    <Cardoffre1
                    id={offreItem.id}
                      sport={sportItem.sport}
                      offre={offreItem.offre}
                      description={offreItem.place_offre}
                      prix={offreItem.prix_offre}
                      image={sportItem.sport_img}
                    />
                  </div>
                ))}
              </div>
              <div className='border-bottom mt-5'></div>
            </div>
          </div>
        ))}
      </div>
      
      
    </div>
  );
};

export default OffreGrid;