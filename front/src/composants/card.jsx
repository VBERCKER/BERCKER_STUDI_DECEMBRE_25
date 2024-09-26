import React, { useState } from "react";
import Button from "./bouton";
import { Link } from "react-router-dom";

import { addTickets } from "./securite_cookies_token_auth_localstorage/gestionpanier";
import BoiteDialogue from "../composants/boite_dialogue_qrCode"; 
import ModalAchatBillet from "../composants/ModalAchatBillet.jsx";


function Carte (props){
  return(
    <div className="service">
      <div className="container px-4 py-5" id="hanging-icons">
    <h2 className="police-titre pb-2 border-bottom">Nos services</h2>
    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <svg className="bi" width="1em" height="1em"><use></use></svg>
        </div>
        <div>
          <h3 className=" police-titre fs-2">{props.hsport}</h3>
          <p className="police-p">{props.psport}</p>
          <a className="service-a"  href="#">
            <Button btn={"bouton"}/>
          </a>
        </div>
      </div>
      <div className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <svg className="bi" width="1em" height="1em"><use></use></svg>
        </div>
        <div className="te">
          <h3 className=" police-titre fs-2 text-body-emphasis">{props.hoffre}</h3>
          <p className="police-p">{props.poffre}</p>
          
          <a  href="#" >
           <Button btn={"bouton"}/>
          </a>
        </div>
      </div>
      <div className="col d-flex align-items-start">
        <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
          <svg className="bi" width="1em" height="1em"><use ></use></svg>
        </div>
        <div>
          <h3 className=" police-titre fs-2 text-body-emphasis">{props.hjeu}</h3>
          <p className="police-p">{props.pjeu}</p>
          <a className="police-p" href="#" >
            <Button btn={"bouton"}/>
          </a>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

function Card1(props){
  return(
      <div className="card1">
      <img className="card1 svg" src={props.image}/>
      <div className="card1__content">
        <p className="card1-titre card1__title">{props.titlecard1} </p>
        <p className="card1-text card1__description">{props.pcard1}</p>
      </div>
    </div>
  
)
}

function Card2(props){
  return(
    <div>
      <div className="card2">
  <p className="heading2">
    {props.offre}
  </p>
  <p >
    {props.description}
  </p>
  <Button click={props.click} value={props.value} btn={"cliquez ici !"}/>
  </div>
    </div>
  )
}
function CardOffre(props){
  return(<div>
   <div className="card4">
  <div >
  <p className="header4">
    {props.offre}
  </p>
  <p className="description" >
    {props.description}
  </p>
 
  </div>
     <div className="actions4">
     <Button click={props.click} value={props.value} btn={"cliquez ici !"}/>
    </div>
  </div>
  </div> )
}
function CardEbillet(props){
  return(
    <div className="cardebillet shadowebillet">
    <div >
        <p className="card1__title">{props.titre}</p>
        <p className="card1__description">{props.description}</p>
        
       <BoiteDialogue  title={props.title} content={props.content}/>
      </div>
</div>
  )
}
function CardCompte(props){
  return(
   
 <div className="cardcompte">

    <Link to={props.link}>

    <div className="w3-bar-item w3-button">
   
   <div className="bgcompte">
   <h3 className="cardCompte">{props.titre}</h3>
   </div>

   <div className="blobcompte"></div>

    </div> 
   



    </Link>

  </div>

  )
}

function Cardoffre1(props){
  //Modal pour confirmer le ebillet 


/**********************************/
  const [tickets,setTicket]=useState({
    id:props.id,
    image:props.image,
    offre :props.offre,
    billets :props.description,
    prix:props.prix,
    sport: props.sport,
    quantity : ""
   
  })

const handleInput =(e)=>{
  const value =e.target.value;
  setTicket(value)
}
  function click(e){
    e.preventDefault()
    addTickets(tickets)
   
   
  }

  
  return (
    <div>
    <form className="sport-form"  methode="post">
    <div className="cardoffre1">
<div className="cardoffre1-img">
  <input type="hidden" name="img" value={tickets.image} />
  <img className="cardoffre1-img-contente" src={props.image} alt=""/>
</div>
<div className="cardoffre1-info">
<input type="hidden" name="id"  value={tickets.id} onChange={handleInput}/>
<input type="hidden" name="offre"  value={tickets.offre} onChange={handleInput}/>
<input type="hidden" name="billets" value={tickets.description} />
<input type="hidden" name="sport" value={tickets.sport} />

  <p className="text-title">{props.offre} </p>
  <p className="text-body">Achetez {props.description} Billet(s)</p>
</div>

<div className=" d-flex cardoffre1-footer">
      <input type="hidden" name="prix" value={tickets.prix} />
      <span className=" text-title">{props.prix} €</span>
      <div onClick={click}>
        <ModalAchatBillet title={" ✅ Vous avez ajouté au panier : "} content={
          <div>
          <div  >
               <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">JO24</th>
                        <th scope="col">Sport</th>
                        <th scope="col">Offre</th>
                        <th scope="col">Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        <tr>
                           <th  scope="row"><img className="panier-img" src={tickets.image}/></th>
                           <td >{tickets.sport}</td>
                           <td >{tickets.offre}</td>
                           <td >{tickets.prix} €</td>          
                        </tr>
                    </tbody>
                    </table>
                
            </div>
          </div>
        } />
      </div>
      
      </div>
</div>


    </form>
       
    </div>
  )
 }

export  {Carte, Card1,Card2,CardEbillet,CardCompte,CardOffre,Cardoffre1}; 