import React, { createContext, useState, useEffect } from 'react';
import { getCookie } from "../../composants/securite_cookies_token_auth_localstorage/cookies";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  // Initialiser l'état utilisateur à partir du localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {
      nom: "",
      prenom: "",
      mail: "", 
      token: "",
      role: ""
    };
  });
console.log("user1:", user);
  const [reload, setReload] = useState(false);
  const reloadUser = () => {
    setReload(!reload);
  };

  useEffect(() => {
    // Sauvegarder les données utilisateur dans le localStorage chaque fois qu'elles changent
    if (user.token) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    const cookieToken = getCookie('token');
    const cookie = getCookie('user');
    if (cookieToken && cookie) {
      const requestOptions = { 
        method: 'GET', 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "include", 
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${cookieToken}` }, 
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
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [reload, apiUrl]);

  return (
    <UserContext.Provider value={{ user, setUser, reloadUser }}>
      {children}
    </UserContext.Provider>
  );
};