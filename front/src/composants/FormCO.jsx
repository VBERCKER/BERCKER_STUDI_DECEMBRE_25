import React, { useState } from "react";
import Buton from "./bouton";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import {  useLocation } from 'react-router-dom'
import { useAuth } from './securite_cookies_token_auth_localstorage/auth';
import {userprenom,usernom,usermail,userpwd} from './securite_cookies_token_auth_localstorage/validationForm';
import { setCookie } from "./securite_cookies_token_auth_localstorage/cookies";
import { accountService } from "./securite_cookies_token_auth_localstorage/servicetoken"
import Boutton from "./bouton";
import { useEffect } from "react";




      

function FormRE(){

    const [signin,setsingin]= useState({

        nom :"",
        prenom:"",
        nom_utilisateur: "",
        mail :"", 
        pwd:"",
        confirmpwd :"",
      
    });

 const [nom,setnom]=useState("")
 const [prenom,setprenom]=useState("")
 const [mail,setemail]=useState("")
 const [pwd,setpwd]=useState("")
 const [confirmpwd,setconfirmpwd]=useState("")


const handleChange =async (e)=>{
     
    let verifprenom  ={
        prenom: signin.prenom,
    };
    let verifnom  ={
        nom: signin.nom,
    };
    let verifmail  ={
        mail: signin.mail,
    };
    let verifpwd  ={
        pwd: signin.pwd,
    };

    const validpwd = await userpwd.isValid(verifpwd)
    const validPrenom = await userprenom.isValid(verifprenom)
    const validnom = await usernom.isValid(verifnom)
    const validmail = await usermail.isValid(verifmail)
    
    if(validnom==false){console.log('Entrez votre nom')}else{setnom("")}
    if(validPrenom==false){console.log('Entrez votre prenom')}else{setprenom("")}
   
    if(validmail==false){console.log('Entrez un email valide')}else{setemail("")}
    if(validpwd==false){console.log('Entrez un mot de passe')}else{setpwd("")}


    setsingin((prev)=> ({...prev,[e.target.name]:e.target.value}))
    
};

const handleClick = async e=>{
    e.preventDefault()
     
    let verifprenom  ={
        prenom: signin.prenom,
    };
    let verifnom  ={
        nom: signin.nom,
    };
    let verifmail  ={
        mail: signin.mail,
    };
    let verifpwd  ={
        pwd: signin.pwd,
    };

    const validpwd = await userpwd.isValid(verifpwd)
    const validPrenom = await userprenom.isValid(verifprenom)
    const  validnom = await usernom.isValid(verifnom)
    const validmail = await usermail.isValid(verifmail)

    if(validPrenom ==false ){setprenom('Entrez votre prénom')}
    else if (validnom ==false ){setnom('Entrez votre nom') }else if(validPrenom ==false ){setprenom('Entrez votre prénom')}
else if(validmail ==false ){setemail('Entrez votre email')}
   
   else if(validpwd==false) {setpwd('Entrez un mots de passe valide.') }
   
   else if(signin.pwd !== signin.confirmpwd)(setconfirmpwd('Les mots de passe ne sont pas identiques'))
   
   else{

   
try{
    await axios.post("http://localhost:3000/users/add", signin)
   
    navigate("/connexion")
    setsingin("")

}catch(err){
    console.log(err)
}

}
}
const navigate= useNavigate();

  return(
    <div>
<form className="form">
    <p className="title">S'enregistrer </p>
    <p className="message">Enregister-vous maintenant et achtez vos places ! </p>
        <div className="flex">
        <label>
            <input className="input"  name="prenom" onChange={handleChange} type="text"  />
            <span>Prénom  </span>
            <span style={{color:"red"}}>{prenom}</span>
        </label>

        <label>
            <input className="input" name="nom" onChange={handleChange} type="text"  />
            <span>Nom</span>
            <span style={{color:"red"}}>{nom}</span>
        </label>
    </div>  
            
    <label>
        <input className="input"  type="email" onChange={handleChange} name="mail"  />
        <span>Email </span>
        <span style={{color:"red"}}>{mail}</span>
    </label> 
        
    <label>
        <input className="input" type="password" onChange={handleChange} name="pwd" placeholder=" 8 caractères minimum" />
        <span>Mots de passe</span>
        <span style={{color:"red"}}>{pwd}</span>
    </label>
    <label>
        <input className="input" type="password" onChange={handleChange} name='confirmpwd'  />
        <span>Confirmer le mots de passe</span>
        <span style={{color:"red"}}>{confirmpwd}</span>
    </label>
    <Buton click={handleClick} btn={"Enregistrer"}/>
    <p className="signin">Vous avez deja un compte ? <a href="/connexion">Conectez-vous</a> </p>
</form>
    </div>
  )
}



function LogIN (){
    
    const [login,setlogin]= useState({

        username :"", 
        password :"",
      
    });
    const [erreur,setErreur]= useState("");
    const [isTokenValidated, setIsTokenValidated] = useState(false);

    const handleChange =(e)=>{ 
        setlogin((prev)=> ({...prev,[e.target.name]:e.target.value}))
        
    };
    const navigate= useNavigate();
    const location = useLocation()
    const auth = useAuth() 
    const redirectPath = location.state?.path || '/compte'
    const redirectPathAdmin =  '/admin'

    const handleClick = async e=>{
        e.preventDefault()
     
        try{ const requestOptions = { method: 'POST', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(login) };
        
        const result= await fetch('http://localhost:3000/users/connexion', requestOptions); 
        const response = await result.json();
        console.log(result); 
console.log(response.message);

        if (response.message == 'Authentification réussie') {
            
            if (response.user.role === 'false') {
                accountService.saveToken(response.access_token);
                console.log(response.user.role);
                auth.login({ ...login, role: 'false' }); // Passer le rôle à la fonction login
                setCookie('user', response.user.id, 2);
                navigate(redirectPath, { replace: true });
            } else if (response.user.role === 'true') {
                accountService.saveTokenAdmin(response.access_token);
                console.log(response.access_token);
                auth.login({ ...login, role: 'true' }); // Passer le rôle à la fonction login
                setCookie('admin', response.user.id, 2);
                navigate(redirectPathAdmin, { replace: true });
            }
        } else {
            setErreur(response);
        }
 }catch(error){console.log(error)} }
   
  // token
  async function token1() {
    const token = localStorage.getItem('token');
    const tokenadmin = localStorage.getItem('admin');

    if (!token && !tokenadmin) {
        console.log('Pas de token trouvé');
        return;
    }

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: { 'Authorization': `Bearer ${token || tokenadmin}` },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    };

    try {
        const result = await fetch('http://localhost:3000/users/token', requestOptions);
        const response = await result.json();
        console.log(response);

        if (response === 'ok') {
            auth.login(login);
            setIsTokenValidated(true); 
            if (token) {
                navigate(redirectPath, { replace: true });
            } else if (tokenadmin) {
                navigate(redirectPathAdmin, { replace: true });
            }
        } else {
            console.log('Invalid token response');
        }
    } catch (error) {
        console.log('Error during token validation:', error);
    }
}

useEffect(() => {
    if (!isTokenValidated) {
        token1();
    }
}, [isTokenValidated]);


 
  /***GOOGLE  */


 
  /********* */
  return(
    <div>
    <form action="compte" method="post">
  <p className="logo">PARIS 2024</p>
  <input type="text" onChange={handleChange} placeholder="Email" name="username" />
  <input type="password" onChange={handleChange} placeholder="Password" name="password" />
  <div style={{color:"red"}}> <p>{erreur}</p></div>
  <Buton click={handleClick} btn={"Se connecter"}/>
  <a href="#">Mots de passe oublié ?</a>
  <hr/>

<div className="col-sm-12">
        <div className="card">
          <div className="card-body">
         
         
          <a className="btn btn-block"  href="http://localhost:3000/auth/google" role="button">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
</svg>
               Sign In with Google
            </a>
            
          </div>
        </div>
      </div>
</form>
    

   
    </div>
  )
}



export {FormRE, LogIN}; 