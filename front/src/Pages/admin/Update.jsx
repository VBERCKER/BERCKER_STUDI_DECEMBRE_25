import React,{useState} from 'react'
import Buton from '../../composants/bouton'





export default function Update () {
const requestOptions = { method: 'GET', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer" };

   
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
    fetch(`http://localhost:3000/offre/offreselection/${sport}`,requestOptions)
  
      .then((response)=>{
        return response=response.json()
      } )
      .then((result)=>{const data =result
        
        setsport({
            sport : data[0].sport,
            Offre :data[0].offre,
            Place_offre:data[0].place_offre,
            Prix_offre:data[0].prix_offre,
            Places_dispo:data[0].places_dispo,
            SPORT_ID :data[0].sport_id, 
            id : data[0].id}
         
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
       const result = await fetch(`http://localhost:3000/offre/update/${sport.id}`,requestOptions1)
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
    <label>
        <input type={hidden} className="input"  onChange={handleChange} name="SPORT_ID" placeholder={sport.sport} required=""/>
        <span>Sport</span>
        
    </label>
      <div className={hiddenbtn}>
         <Buton click={handleClick} btn={"Valider les modifications"}/>
      </div>
     
  
    
</form>
    </div>
  )
}
