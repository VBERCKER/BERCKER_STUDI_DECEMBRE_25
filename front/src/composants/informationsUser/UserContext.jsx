import React, { createContext, useState, useEffect } from 'react';
import { getCookie } from "../../composants/securite_cookies_token_auth_localstorage/cookies";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    mail: "", 
    token: "",
    role: ""
  });
  const [reload, setReload] = useState(false);
  const reloadUser = () => {
    setReload(!reload);
  };
  useEffect(() => {
   
    const cookie = getCookie('user');
    if (cookie) {
      console.log(cookie);
      const requestOptions = { 
        method: 'GET', 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "include", 
        headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, 
        redirect: "follow", 
        referrerPolicy: "no-referrer" 
      };

      fetch(`http://localhost:3000/users/${cookie}`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((result) => {
          setUser({
            nom: result.nom,
            prenom: result.prenom,
            mail: result.mail,
            token: result.token,
            role: result.role
          });
          console.log(result);
        })
        .catch(err => console.error('Fetch error:', err));
    } else {
      console.error('No user cookie found');
    }
  }, [reload]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};