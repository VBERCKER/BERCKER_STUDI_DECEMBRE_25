import React,{useState} from 'react'
import Buton from '../../composants/bouton'




export default function Ajouter () {


    const [offre,setoffre]= useState({

        Offre :"",
        Place_offre:"",
        Prix_offre:"",
        Places_dispo: "",
        SPORT_ID :"", 
       
      
    });

   
 

   function handleChange(e){
     console.log(offre)
        setoffre((prev)=> ({...prev,[e.target.name]:e.target.value}))
    };
    const requestOptions = { method: 'POST', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(offre) }; 
 async function handleClick  (e){
        e.preventDefault()
          
    try{
       const result= await fetch("http://localhost:3000/offre/add",requestOptions)
       console.log(result)
        alert("L'offre est ajoutée !")
        setoffre({
            Offre :"",
            Place_offre:"",
            Prix_offre:"",
            Places_dispo: "",
            SPORT_ID :"", 

        })
    }catch(err){
        console.log(err)
    }
    
    }

  return (
    <div >
      Welcome 
      <form className="form">
    <p className="title">Ajouter une offre</p>
        
       
        <div className="flex-block">
        <label>
            <input className="input" value={offre.Offre} onChange={handleChange} name="Offre" type="text" placeholder="" required=""/>
            <span>Nom de l'offre </span>
          
        </label>
        <label>
            <input className="input"  value={offre.Place_offre} onChange={handleChange} name="Place_offre" type="text" placeholder="" required=""/>
            <span>Place dans l'offre</span>
           
        </label>

        <label>
            <input className="input" value={offre.Places_dispo} onChange={handleChange} name="Places_dispo" type="text" placeholder="" required=""/>
            <span>Places Disponibles</span>
            
        </label>
        <label>
            <input className="input" value={offre.Prix_offre} onChange={handleChange} name="Prix_offre" type="text" placeholder="" required=""/>
            <span>Prix de l'offre </span>
            
        </label>
    </div>  
    <label>
        <input className="input" value={offre.SPORT_ID} onChange={handleChange} name="SPORT_ID" type="text" placeholder="" required=""/>
        <span>id du Sport ou ajouter l'offre</span>
        
    </label>
   
   
    <Buton click={handleClick} btn={"Valider les modifications"}/>
    
</form>
    </div>
  )
}
