import React, { useState } from "react";
import Button from "./bouton";
import { Link } from "react-router-dom";

import { addTickets } from "./securite_cookies_token_auth_localstorage/gestionpanier";
import BoiteDialogue from "../composants/boite_dialogue_qrCode"; 


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

<button onClick={click} className="btn-sport-card" type="submit">
<div  className="cardoffre1-button">
<svg  viewBox="0 0 20 20">
    <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
    <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
    <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
  </svg>
</div>
</button>

</div>
</div>


    </form>
       
    </div>
  )
 }

export  {Carte, Card1,Card2,CardEbillet,CardCompte,CardOffre,Cardoffre1}; 