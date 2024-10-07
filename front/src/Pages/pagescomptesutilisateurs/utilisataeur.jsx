import React, { useState, useContext } from "react";
import Boutton from "../../composants/bouton";
import { getCookie } from "../../composants/securite_cookies_token_auth_localstorage/cookies";
import { UserContext } from "../../composants/informationsUser/UserContext.jsx";
import { useAuth } from '../../composants/securite_cookies_token_auth_localstorage/auth'
import { useNavigate } from 'react-router-dom'

export default function Utilisateur() {
  const user = useContext(UserContext);

  const [pwd, setpwd] = useState({
    pwd: "",
    pwd2: "",
  });
  const [nom, setnom] = useState({
    nom: "",
    prenom: "",
  });
  const [userRole, setuserRole] = useState(false);
  const [error, seterror] = useState("");
  const [passError, setPassError] = useState("");
  const navigate = useNavigate()
  const auth = useAuth();
  
  function handleChange(e) {
    setpwd((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setnom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleClik(e) {
    e.preventDefault();
    
    if (pwd.pwd && pwd.pwd2) {
      console.log("ok");
      if (pwd.pwd === pwd.pwd2) {
        const requestOptions = {
          method: "PATCH",
          mode: "cors",
          cache: "no-cache",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(pwd),
        };
        try {
          const cookie = getCookie("user");
          const result = fetch(
            `http://localhost:3000/users/pwd/${cookie}`,
            requestOptions
          );
          console.log(result);
          alert("Mots de passe modifiée !");
        } catch (err) {
          console.log(err);
        }
      } else {
        setPassError("Les mots de pas ne sont pas identiques");
      }
    } else if (nom.nom && nom.prenom) {
      const requestOptions1 = {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(nom),
      };
      try {
        const cookie = getCookie("user");
        const result = fetch(
          `http://localhost:3000/users/utilisateur/${cookie}`,
          requestOptions1
        );
        console.log(result);
        alert("Nom et prénom modifiés !");
      } catch (err) {
        console.log(err);
      }
    } else {
      seterror("Nom ou prénom vide");
    }
  }

  function handleClikSupp(e) {
    e.preventDefault();
    
    if (userRole ==="true") {
      setuserRole(true);}

    const requestOptions = {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${user.token }` 
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({"role":userRole}),
    };
    try {
      
      const cookie = getCookie("user");
      const result = fetch(
        `http://localhost:3000/users/supp/${cookie}`,
        requestOptions
      );
      console.log(requestOptions);
      alert("Compte supprimé !");
        auth.logout();
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        navigate("/");
      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div>
        <div className="SuppUtilisateur">
          <div className="suppBox">
            <h3>Supprimer mon compte utilisateur ?</h3>
            <Boutton click={handleClikSupp} btn={"Valider "} />
          </div>
        </div>
        <div className="login">
          <div>
            <form className="form">
              <p className="title">Mofier mon nom et prénom </p>

              <label>
                <input
                  className="input"
                  name="prenom"
                  placeholder={user.prenom}
                  onChange={handleChange}
                  required=""
                />
                <span>Prénom</span>
              </label>
              <label>
                <input
                  className="input"
                  name="nom"
                  placeholder={user.nom}
                  onChange={handleChange}
                  required=""
                />
                <span>Nom</span>
              </label>
              <span style={{ color: "red" }}>{error}</span>
              <Boutton click={handleClik} btn={"Valider "} />
            </form>
          </div>
          <div>
            <form className="form">
              <p className="title">Mofier mon mot de passe </p>

              <label>
                <input
                  className="input"
                  name="pwd"
                  type="password"
                  onChange={handleChange}
                  required=""
                />
                <span>Mots de passe</span>
              </label>
              <label>
                <input
                  className="input"
                  name="pwd2"
                  type="password"
                  onChange={handleChange}
                  required=""
                />
                <span>Confirmer le mots de passe</span>
              </label>
              <span style={{ color: "red" }}>{passError}</span>
              <Boutton click={handleClik} btn={"Valider "} />
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
