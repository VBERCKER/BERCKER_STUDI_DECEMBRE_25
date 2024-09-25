import React, { useEffect, useState } from "react";
import Sidebar from "../../composants/template/sidebar";
import { getCookie } from "../../composants/securite_cookies_token_auth_localstorage/cookies";






  function Compte (){

   const cookie= getCookie('user')
   const requestOptions = { method: 'GET', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer" };
   
   const [user,setuser]=useState("")
 console.log(cookie)

   useEffect(()=>{ 
    
    fetch(`http://localhost:3000/users/${cookie}`,requestOptions)
  
      .then((response)=>{
        return response=response.json()
      } )
      .then((result)=>{const data =result
        
        setuser(data.prenom)
        console.log(data)
        

        }
    )
      .catch(err=>console.log(err));
  },[])
  


    return (<div className="page">
        
        <Sidebar  lienTItre2={"ebillet"} lienTItre3={"paniervalider"} lienTItre1={"utilisateur"} lienmenuP={"/compte"} menuP={"Menu principal"} menuTitre1={"Mes informations utilisateur"} menuTitre2={"Mes E-billets"}  menuTitre3={"Mon panier"}  titrem={"Mon compte"} content={  <div className="container text-center">
    <h1>Bienvenue {user}</h1>
    <p> Selectionnez une option dans le menu pour commencer. </p>
     </div>} />

      </div>)}


export default Compte;


