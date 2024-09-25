import React, { useState } from "react";
import Boutton from "../../composants/bouton";
import { getCookie } from "../../composants/securite_cookies_token_auth_localstorage/cookies";


export default function Utilisateur(){
const [pwd,setpwd]= useState({
    pwd: "",
    pwd2:""
})

    
function handleChange(e){
    
   

    setpwd((prev)=> ({...prev,[e.target.name]:e.target.value}))
    
}

 function handleClik(e){
   e.preventDefault()


   if(pwd.pwd === pwd.pwd2){
    const requestOptions = { method: 'PATCH', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer",body: JSON.stringify(pwd) };

    try{
        const cookie= getCookie('user')
       const result= fetch(`http://localhost:3000/users/pwd/${cookie}`,requestOptions)
     
       console.log(result)
       alert("Mots de passe modifiée !")
    
    } catch(err){
    console.log(err)}
    
   }else{
    console.log("non")
   }

 }


    return (<div >

<div>

    <div className="login">
    
    <div>
<form className="form">
    <p className="title">Mofier mon mot de passe </p>
      
    <label>
        <input className="input" name="pwd" type="password" onChange={handleChange} required=""/>
        <span>Mots de passe</span>
    </label>
    <label>
        <input className="input" name="pwd2" type="password" onChange={handleChange} required=""/>
        <span>Confirmer le mots de passe</span>
    </label>
    <Boutton click={handleClik} btn={"Valider les modifications"}/>
    
</form>
    </div>
 

</div>
<div>


</div>

</div>



    </div>
        
    )
}