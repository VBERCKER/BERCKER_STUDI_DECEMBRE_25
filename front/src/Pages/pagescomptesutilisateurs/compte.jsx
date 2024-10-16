import React, { useEffect, useState, useContext } from "react";
import Sidebar from "../../composants/template/sidebar";

import { UserProvider, UserContext } from "../../composants/informationsUser/UserContext.jsx";

function Compte() {
  const {user} = useContext(UserContext);
  const { nom, prenom, mail, token, role } = user;
 
  return (
    <UserProvider>
      <div  style={{marginTop : "2%"}}className="page">
        <Sidebar
          lienTItre2={"ebillet"}
          lienTItre3={"paniervalider"}
          lienTItre1={"utilisateur"}
          lienmenuP={"/compte"}
          menuP={"Menu principal"}
          menuTitre1={"Mes informations utilisateur"}
          menuTitre2={"Mes E-billets"}
          menuTitre3={"Mon panier"}
          titrem={"Mon compte"}
          content={
            <div style={{marginTop : "2%"}}className="container text-center">
              <h1 >Bienvenue {prenom}</h1>
              <p >Utiliser le menu de gauche pour naviguer. </p>
            </div>
          }
        />
      </div>
    </UserProvider>
  );
}



export default Compte;


