import React, { useState } from "react";
import Buton from "./bouton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "./securite_cookies_token_auth_localstorage/auth";
import {
  userprenom,
  usernom,
  usermail,
  userpwd,
} from "./securite_cookies_token_auth_localstorage/validationForm";
import { setCookie } from "./securite_cookies_token_auth_localstorage/cookies";
import { accountService } from "./securite_cookies_token_auth_localstorage/servicetoken";
import Boutton from "./bouton";
import { useEffect } from "react";

function FormRE() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [signin, setsingin] = useState({
    nom: "",
    prenom: "",
    nom_utilisateur: "",
    mail: "",
    pwd: "",
    confirmpwd: "",
  });

  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [mail, setemail] = useState("");
  const [pwd, setpwd] = useState("");
  const [confirmpwd, setconfirmpwd] = useState("");
  const [erreur, setErreur] = useState("");

  const handleChange = async (e) => {
    let verifprenom = {
      prenom: signin.prenom,
    };
    let verifnom = {
      nom: signin.nom,
    };
    let verifmail = {
      mail: signin.mail,
    };
    let verifpwd = {
      pwd: signin.pwd,
    };

    const validpwd = await userpwd.isValid(verifpwd);
    const validPrenom = await userprenom.isValid(verifprenom);
    const validnom = await usernom.isValid(verifnom);
    const validmail = await usermail.isValid(verifmail);

    if (validnom == false) {
      console.log("Entrez votre nom");
    } else {
      setnom("");
    }
    if (validPrenom == false) {
      console.log("Entrez votre prenom");
    } else {
      setprenom("");
    }

    if (validmail == false) {
      console.log("Entrez un email valide");
    } else {
      setemail("");
    }
    if (validpwd == false) {
      console.log("Entrez un mot de passe");
    } else {
      setpwd("");
    }

    setsingin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let verifprenom = {
      prenom: signin.prenom,
    };
    let verifnom = {
      nom: signin.nom,
    };
    let verifmail = {
      mail: signin.mail,
    };
    let verifpwd = {
      pwd: signin.pwd,
    };

    const validpwd = await userpwd.isValid(verifpwd);
    const validPrenom = await userprenom.isValid(verifprenom);
    const validnom = await usernom.isValid(verifnom);
    const validmail = await usermail.isValid(verifmail);

    if (validPrenom == false) {
      setprenom("Entrez votre prénom");
    } else if (validnom == false) {
      setnom("Entrez votre nom");
    } else if (validPrenom == false) {
      setprenom("Entrez votre prénom");
    } else if (validmail == false) {
      setemail("Entrez votre email");
    } else if (validpwd == false) {
      setpwd("Entrez un mots de passe valide.");
    } else if (signin.pwd !== signin.confirmpwd)
      setconfirmpwd("Les mots de passe ne sont pas identiques");
    else {
      try {
        await axios.post(`${apiUrl}/users/add`, signin);

        navigate("/connexion");
        setsingin("");
      } catch (err) {
        if (err.response.data.message === "L'utilisateur existe déjà") {
          setErreur("L'utilisateur existe déjà. Connectez-vous 😉");
        }
        console.log(err);
      }
    }
  };
  const navigate = useNavigate();

  return (
    <div>
      <form className="form">
        <p className="title">S'enregistrer </p>
        <p className="message">
          Enregister-vous maintenant et achtez vos places !{" "}
        </p>
        <div className="flex">
          <label>
            <input
              className="input"
              name="prenom"
              onChange={handleChange}
              type="text"
            />
            <span>Prénom </span>
            <span style={{ color: "red" }}>{prenom}</span>
          </label>

          <label>
            <input
              className="input"
              name="nom"
              onChange={handleChange}
              type="text"
            />
            <span>Nom</span>
            <span style={{ color: "red" }}>{nom}</span>
          </label>
        </div>

        <label>
          <input
            className="input"
            type="email"
            onChange={handleChange}
            name="mail"
          />
          <span>Email </span>
          <span style={{ color: "red" }}>{mail}</span>
        </label>

        <label>
          <input
            className="input"
            type="password"
            onChange={handleChange}
            name="pwd"
            placeholder=" 8 caractères minimum"
          />
          <span>Mots de passe</span>
          <span style={{ color: "red" }}>{pwd}</span>
        </label>
        <label>
          <input
            className="input"
            type="password"
            onChange={handleChange}
            name="confirmpwd"
          />
          <span>Confirmer le mots de passe</span>
          <span style={{ color: "red" }}>{confirmpwd}</span>
        </label>
        <span style={{ color: "red" }}>{erreur}</span>
        <Buton click={handleClick} btn={"Enregistrer"} />
        <p className="signin">
          Vous avez deja un compte ? <a href="/connexion">Conectez-vous</a>{" "}
        </p>
      </form>
    </div>
  );
}

function LogIN() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [login, setlogin] = useState({
    username: "",
    password: "",
    role: false,
  });
  const [erreur, setErreur] = useState("");
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  const handleChange = (e) => {
    setlogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const redirectPath = location.state?.path || "/compte";
  const redirectPathAdmin =  "/admin";

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const requestOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(login),
      };

      const result = await fetch(
        `${apiUrl}/users/connexion`,
        requestOptions
      );
      const response = await result.json();
      console.log(result);
      console.log(response.message);

      if (response.message == "Authentification réussie") {
        if (response.user.role === "false") {
          accountService.saveToken(response.access_token);
          console.log(response.user.role);
          auth.login({ ...login, role: "false" }); 
          setCookie("user", response.user.id, 2);
          navigate(redirectPath, { replace: true });
        } else if (response.user.role === "true") {
          
          console.log(response.access_token);
          auth.login({ ...login, role: "true" }); 
          setCookie("admin", response.user.id, 2);
          navigate(redirectPathAdmin, { replace: true });
        }
      } else {
        setErreur(response.message);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // token
  async function token1() {
    const token = localStorage.getItem("token");
    //const tokenadmin = localStorage.getItem("admin");

    if (!token ) {
      console.log("Pas de token trouvé");
      return;
    }

    const requestOptions = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: { Authorization: `Bearer ${token }` },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

     try {
      const result = await fetch(`${apiUrl}/users/token`, requestOptions);
      const response = await result.json();
      console.log(response);

      if (response.token === "ok") {
        auth.login(login);
        setIsTokenValidated(true);

        if (response.role === "false") {
          navigate(redirectPath, { replace: true });
        } else if (response.role === "true") {
          navigate(redirectPathAdmin, { replace: true });
        } else {
          console.log("Invalid role in token response");
        }
      } else {
        console.log("Invalid token response");
      }
    } catch (error) {
      console.log("Error during token validation:", error);
    }
  };

  useEffect(() => {
    if (!isTokenValidated) {
      token1();
    }
  }, [isTokenValidated]);

  /********* */
  return (
    <div>
      <form action="compte" method="post">
        <p className="logo">PARIS 2024</p>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Email"
          name="username"
        />
        <input
          type="password"
          onChange={handleChange}
          placeholder="Password"
          name="password"
        />
        <div style={{ color: "red" }}>
          <p>{erreur}</p>
        </div>
        <Buton click={handleClick} btn={"Se connecter"} />
        <a href="#">Mots de passe oublié ?</a>
      </form>
    </div>
  );
}

export { FormRE, LogIN };
