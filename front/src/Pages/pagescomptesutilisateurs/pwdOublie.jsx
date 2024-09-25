import React, {  useState } from "react";
import Boutton from "../../composants/bouton";

function Pwd(){

const [email, setemail]=useState({email:""});
const [err, seterr]=useState("");

const handleChange =(e)=>{ 
    setemail((prev)=> ({...prev,[e.target.name]:e.target.value}))
    
};

async function handleClick(e){
    e.preventDefault();
     
    console.log(email)
    try{ const requestOptions = { method: 'POST', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(email) };
        
    const result= await fetch('http://localhost:3000/users/pwd',requestOptions); 
    const response = await result.json();
    console.log(result); 


    if(response =='ok')
     {  // envoie de mail 

        alert ("Un email pour réinitialiser votre mots de passe a été envoyé ! ✅")
     }else {return seterr(" Aucun compte trouvé pour cet email 🤯")}
}catch(error){console.log(error)} }
   
    return (<div className="page pwd">

 
 
  
  <div  >

    <form  action="compte" method="post">
  <p className="logo">Entrez votre email : </p>
  <input type="text" onChange={handleChange} placeholder="Email" name="email" />
 
  <div style={{color:"red"}}> <p>{err}</p></div>
  <Boutton click={handleClick} btn={"Se connecter"}/>
  
  <hr/>
  <div > <p>Vous allez reçevoir un email pour réinitialiser votre mots de passe.</p></div>
    <a href="/connexion">Aller sur la page de connexion.</a>
</form>
    

   
    </div>
        </div>
      
    )}




export default Pwd;