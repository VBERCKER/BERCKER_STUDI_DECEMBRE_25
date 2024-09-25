import React, { useState,useEffect } from 'react'
import Buton from '../../composants/bouton'




export default function Vente () {
  const requestOptions = { method: 'GET', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer" };
  
  const [sport,setsport]=useState([])
  const [sportfilter,setsportfilter]=useState([])
  const [filter,setfilter]=useState([])

async function sportall(){
   await fetch(`http://localhost:3000/offre/vente`,requestOptions)
  
  .then((response)=>{
    return response=response.json()
  } )
  .then((result)=>{const data =result
 setsport(data)
}
)
  .catch(err=>console.log(err));

}
useEffect(()=>{ 
    
    
      sportall()
  },[])
  
  useEffect(() => {
    async function fetchData() {
        if (sportfilter) {
            try {
                const response = await fetch(`http://localhost:3000/offre/ventefilter/${sportfilter}`);
                const result = await response.json();
                console.log(sportfilter);
                // Vérifiez que result est un tableau
                if (Array.isArray(result)) {
                    setfilter(result);
                } else {
                    console.error("Invalid data format", result);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
    }

    fetchData();
}, [sportfilter]);

  

console.log(filter)
function handleSport(e){
  setsportfilter(e.target.value)
  
}


  async function handleClick(e){
    e.preventDefault()

  }
  



    
  return (
    <div className='page' >
    
    <div className="container text-center">
  
    <form style={{width:"100%"}}>
    <div >
    <label for="sport" style={{fontSize:"20px"}}>Offre:</label>
  <select style={{width:"50%", margin:"40px"}} name="sport" onChange={ handleSport}>
    <option></option>
    {sport.map((items)=>{return(<option key= {items.offre} value={items.offre}>{items.offre}</option>)})}
   
  </select>
 
    <Buton click={handleClick} btn={"filtrer"}/> 
    </div>
    
    
    </form>
    
   
    <table className="table caption-top">
  <caption>Offres JO 2024</caption>
  <thead>
    <tr>
      
      
      <th scope="col">ventes</th>
  
    </tr>
  </thead>
  <tbody>
  {filter.map((items)=>{return(

    <tr key={items.total}>
      
      <td>{items.total}</td>
    
    </tr>

  )})}
   
   
  </tbody>
</table>

        </div>

     
   
    </div>
  )
}
