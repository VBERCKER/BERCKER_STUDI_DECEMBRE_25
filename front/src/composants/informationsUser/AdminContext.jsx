import React, { createContext, useState, useEffect } from 'react';
import { getCookie } from "../../composants/securite_cookies_token_auth_localstorage/cookies";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
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
   
    const cookieToken = getCookie('token');
    const cookie = getCookie('admin');
    if (cookieToken) {
    if (cookie) {
      
      const requestOptions = { 
        method: 'GET', 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "include", 
        headers: { "Content-Type": "application/json" , Authorization: `Bearer ${cookieToken}`}, 
        redirect: "follow", 
        referrerPolicy: "no-referrer" 
      };

      fetch(`${apiUrl}/users/${cookie}`, requestOptions)
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
          
        })
        .catch(err => console.error('Fetch error:', err));
    } else {
      console.error('No user cookie found');
    }
  }}, [reload]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};