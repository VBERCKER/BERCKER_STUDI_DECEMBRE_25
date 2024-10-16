import React, { useState } from "react";
import Buton from "./bouton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "./securite_cookies_token_auth_localstorage/auth";
import { usermail} from "./securite_cookies_token_auth_localstorage/validationForm";
import { setCookie } from "./securite_cookies_token_auth_localstorage/cookies";
import { accountService } from "./securite_cookies_token_auth_localstorage/servicetoken";
import { useEffect } from "react";
import passwordValidator from "password-validator";


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
const schemaPasword = new passwordValidator();
schemaPasword
.is().min(8)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.has().symbols()
.is().not().oneOf(["Passw0rd", "Password123","Azerty123"]);

const schemaNomPrenom= new passwordValidator();
schemaNomPrenom
.has().not().digits()
.has().not().symbols()
.has().not().spaces()
.is().min(2);

      
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [mail, setemail] = useState("");
  const [pwd, setpwd] = useState("");
  const [confirmpwd, setconfirmpwd] = useState("");
  const [erreur, setErreur] = useState("");

  const handleChange = async (e) => {
   
    let verifmail = {
      mail: signin.mail,
    };
    
  
    const validmail = await usermail.isValid(verifmail);

    if (schemaNomPrenom.validate(signin.nom) === false) {
      console.log("Entrez votre nom");
    } else {
      setnom("");
    }
    if (schemaNomPrenom.validate(signin.prenom) === false) {
      console.log("Entrez votre prenom");
    } else {
      setprenom("");
    }

    if (validmail == false) {
      console.log("Entrez un email valide");
    } else {
      setemail("");
    }
    if (schemaPasword.validate(signin.pwd)=== false) {
      console.log("Entrez un mot de passe");
    } else {
      setpwd("");
    }

    setsingin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let verifmail = {
      mail: signin.mail,
    };

    const validmail = await usermail.isValid(verifmail);

    
    if (schemaNomPrenom.validate(signin.prenom) === false) {
      setprenom("Entrez un prénom valide.");
    } else if (schemaNomPrenom.validate(signin.nom) === false) {
      setnom("Entrez un nom valide.");
    } else if (validmail == false) {
      setemail("Entrez un email valide");
    } else if (schemaPasword.validate(signin.pwd)=== false) {
      setpwd("Le mots de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial");
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
      

      if (response.message == "Authentification réussie") {
        if (response.user.role === "false") {
          accountService.saveToken(response.access_token);
          auth.login({ ...login, role: "false" }); 
          setCookie("user", response.user.id, 2);
          setCookie("token", response.access_token, 2);
          navigate(redirectPath, { replace: true });
        } else if (response.user.role === "true") {
          auth.login({ ...login, role: "true" }); 
          setCookie("admin", response.user.id, 2);
          setCookie("token", response.access_token, 2);
          navigate(redirectPathAdmin, { replace: true });
        }
      } else {
        setErreur(response.message);
      }
    } catch (error) {
      console.log("error :", "erreur de connexion");
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
      console.log("Error during token validation:", "error");
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
