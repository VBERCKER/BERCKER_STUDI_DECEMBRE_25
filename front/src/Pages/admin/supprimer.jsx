import React,{useState,useContext} from 'react'
import Buton from '../../composants/bouton'
import { UserContext } from "../../composants/informationsUser/AdminContext.jsx";





export default function Supprimer() {
const user = useContext(UserContext);
const requestOptions = { method: 'GET', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token }`  }, redirect: "follow", referrerPolicy: "no-referrer" };
const apiUrl = import.meta.env.VITE_API_URL;

   
const [sport, setsport]=useState({
    sport : "",
    Offre :"",
    Place_offre:"",
    Prix_offre:"",
    Places_dispo: "",
    SPORT_ID :"", 
    id:""
 
})

function handleChange(e){
    setsport(e.target.value)
    
}

function handleClickSport(e){
    e.preventDefault()
    fetch(`${apiUrl}/offre/offreselection/${sport}`,requestOptions)
  
      .then((response)=>{
        return response=response.json()
      } )
      .then((result)=>{const data =result
        
        setsport({
            sport : data.sport,
            Offre :data.offre,
            Place_offre:data.place_offre,
            Prix_offre:data.prix_offre,
            Places_dispo:data.places_dispo,
            SPORT_ID :data.sport_id, 
            id : data.id}
         
        )
        hiddenform()
        cahcerLeBtn()
      
    }
    )
      .catch(err=>console.log(err));
 
}

 
   
    const requestOptions1 = { method: 'DELETE', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token }` }, redirect: "follow", referrerPolicy: "no-referrer" }; 
    
    async function handleClick (e){
        e.preventDefault()
        
          
    try{
       const result =  await fetch(`${apiUrl}/offre/delete/${sport.id}`,requestOptions1)
       
       

       if (result.ok) {
           console.log('Sport supprimé');
           alert("L'offre est supprimée !");
           setsport({
               sport: "",
               Offre: "",
               Place_offre: "",
               Prix_offre: "",
               Places_dispo: "",
               SPORT_ID: "",
               id: ""
           });
       } else {
           console.log('erreur de suppression:', result.statusText);
       }
   } catch (err) {
       console.log('Error:', err);
   }
}

    const [hidden,setForm]=useState("hidden") 

    function hiddenform(){
        
        setForm("text")
    }
    const [hiddenbtn,sethiddenbtn]=useState("hidden-btn-compteadmin-modifier")
    function cahcerLeBtn(){
        sethiddenbtn("")
    }

  return (
    <div >
     
      <form className="form">
    <p className="title">Supprimer une offre</p>
    
    <label>
            <input className="input"  onChange={handleChange} name="sport" type="text"  required=""/>
            <span> id de l'offre à supprimer </span>
          
        </label>
        <Buton click={handleClickSport} btn={"valider le sport"}/>
       
        <div className="flex-block">
        <label>
        
            <input type={hidden} className="input" value={sport.Offre} onChange={handleChange} name="Offre" placeholder={sport.Offre} required=""/>
            <span>Nom de l'offre</span>
          
        </label>
        <label>
            <input type={hidden} className="input" value={sport.Place_offre}  onChange={handleChange} name="Place_offre" placeholder={sport.Place_offre} required=""/>
            <span>Place dans l'offre</span>
           
        </label>

        <label>
            <input type={hidden} className="input"  value={sport.Places_dispo} onChange={handleChange} name="Places_dispo" placeholder={sport.Places_dispo} required=""/>
            <span>Places Disponibles</span>
            
        </label>
        <label>
            <input type={hidden} className="input" value={sport.Prix_offre} onChange={handleChange} name="Prix_offre" placeholder={sport.Prix_offre} required=""/>
            <span>Prix de l'offre </span>
            
        </label>
    </div>  
   
      <div className={hiddenbtn}>
         <Buton click={handleClick} btn={"Supprimer"}/>
      </div>
     
  
    
</form>
    </div>
  )
}
