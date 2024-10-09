import React,{useState} from 'react'
import Buton from '../../composants/bouton'





export default function Update () {
const requestOptions = { method: 'GET', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer" };
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

function handleSport(e){
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


    const [update,setupdate]= useState({

       
        Offre : "",
        Place_offre:"",
        Prix_offre: "",
        Places_dispo:"",
       
       
      
    });
 
    
 

   function handleChange(e){
      
        setupdate((prev)=> ({...prev,[e.target.name]:e.target.value})
    )
    console.log(update)
    };
    
    const requestOptions1 = { method: 'PATCH', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer", body: JSON.stringify(update) }; 
    
    async function handleClick (e){
        e.preventDefault()
        
        console.log(update.Place_offre)
    try{
       const result = await fetch(`${apiUrl}/offre/update/${sport.id}`,requestOptions1)
       console.log(result)
       console.log(update)
        alert("L'offre est modifiée !")
       

        
    }catch(err){
        console.log(err)
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
    <p className="title">Modifier une offre</p>
    
    <label>
            <input className="input"  onChange={handleSport} name="sport" type="text"  required=""/>
            <span> id de l'offre à modifier </span>
          
        </label>
        <Buton click={handleClickSport} btn={"valider le sport"}/>
       
        <div className="flex-block">
        <label>
        
            <input type={hidden} className="input"   onChange={handleChange} name="Offre" placeholder={sport.Offre} required=""/>
            <span>Nom de l'offre</span>
          
        </label>
        <label>
            <input type={hidden} className="input"   onChange={handleChange} name="Place_offre" placeholder={sport.Place_offre} required=""/>
            <span>Place dans l'offre</span>
           
        </label>

        <label>
            <input type={hidden} className="input"   onChange={handleChange} name="Places_dispo" placeholder={sport.Places_dispo} required=""/>
            <span>Places Disponibles</span>
            
        </label>
        <label>
            <input type={hidden} className="input"  onChange={handleChange} name="Prix_offre" placeholder={sport.Prix_offre} required=""/>
            <span>Prix de l'offre </span>
            
        </label>
    </div>  
    
      <div className={hiddenbtn}>
         <Buton click={handleClick} btn={"Valider les modifications"}/>
      </div>
     
  
    
</form>
    </div>
  )
}
