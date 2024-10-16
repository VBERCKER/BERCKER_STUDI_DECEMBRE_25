import React, { useState, useContext } from "react";
import Boutton from "../../composants/bouton";
import { getCookie } from "../../composants/securite_cookies_token_auth_localstorage/cookies";
import { UserContext } from "../../composants/informationsUser/UserContext.jsx";
import { useAuth } from '../../composants/securite_cookies_token_auth_localstorage/auth.jsx'
import { useNavigate } from 'react-router-dom'
import passwordValidator from "password-validator";

export default function Utilisateur() {
  const {user} = useContext(UserContext);
  const { nom, prenom, mail, token, role } = user;
  const apiUrl = import.meta.env.VITE_API_URL;
  const [pwd, setpwd] = useState({
    pwd: "",
    pwd2: "",
  });
  const [nomModif, setnom] = useState({
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

    //verifier entree utilisateur
    // verfier les champs envoyé du front 
  const schemaPasword = new passwordValidator();
  schemaPasword
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces()
  .has().symbols()
  .is().not().oneOf(["Passw0rd", "Password123","Azerty123"]);

  if (schemaPasword.validate(pwd.pwd)=== false) {
    setPassError("Le mots de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial 🤯");
  }
   else{
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
            Authorization: `Bearer ${token }` 
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(pwd),
        };
        try {
          const cookie = getCookie("user");
          console.log(cookie);
           fetch(
            `${apiUrl}/users/pwd/${cookie}`,
            requestOptions
          );
          
          alert("Mots de passe modifiée !");
        } catch (err) {
          console.log(err);
        }
      } else {
        setPassError("Les mots de pas ne sont pas identiques");
      }
    } else if (nomModif.nom && nomModif.prenom) {
      const requestOptions1 = {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token }` 
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(nomModif),
      };
      try {
        const cookie = getCookie("user");
        fetch(
          `${apiUrl}/users/utilisateur/${cookie}`,
          requestOptions1
        );
     
        alert("Nom et prénom modifiés !");
      } catch (err) {
        console.log(err);
      }
    } else {
      seterror("Nom ou prénom vide");
    }
  }}

  function handleClikSupp(e) {
    e.preventDefault();
    
    if (role ==="true") {
      setuserRole(true);}

    const requestOptions = {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token }` 
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({"role":role}),
    };
    try {
      
      const cookie = getCookie("user");
       fetch(
        `${apiUrl}/users/supp/${cookie}`,
        requestOptions
      );
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
                  placeholder={prenom}
                  onChange={handleChange}
                  required=""
                />
                <span>Nouveau Prénom</span>
              </label>
              <label>
                <input
                  className="input"
                  name="nom"
                  placeholder={nom}
                  onChange={handleChange}
                  required=""
                />
                <span>Nouveau Nom</span>
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
                <span>Nouveau Mots de passe</span>
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
