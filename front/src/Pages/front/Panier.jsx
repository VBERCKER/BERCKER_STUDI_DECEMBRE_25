import React,{useState,useEffect} from "react";
import Footer  from "../../composants/template/footer";
import { getTotalPrice,getTickets,remove} from "../../composants/securite_cookies_token_auth_localstorage/gestionpanier";
import Boutton from "../../composants/bouton";
import { useNavigate} from "react-router-dom";


export default function PanierFront(){

    const [ticket,setTicket]=useState([])
    const [prix,setPrix]=useState([])
    const [panierHeader,setPanierHeader]=useState("")
    const navigate= useNavigate()
    
    const localstorage = getTickets()
   
 console.log(localstorage)

    function panier(){
        const localstorage = getTickets()
        setTicket(localstorage); 
    }

  function headPanier(){
    if(localstorage.length === 0){
        setPanierHeader("Votre panier est vide.");
    } else {
        setPanierHeader("Verifiez votre panier, puis passez au payement.");
    }
}
   

    
  
    function prixTotal(){
        setPrix(getTotalPrice())
    }

    function handleClick(){
       
        navigate("/compte/PanierValider")
    }
    useEffect(()=>{ 
       panier()
       prixTotal()
       headPanier()  
      
       
       },[]);

       const updateQuantity = (id, newQuantity) => {
        const newTickets = ticket.map(item => item.id === id ? { ...item, quantity: newQuantity } : item);
        setTicket(newTickets);
    
        // Mettez à jour le prix total
        prixTotal();
    
        // Enregistrez la nouvelle liste de tickets dans le localStorage
        localStorage.setItem('tickets', JSON.stringify(newTickets));
    }
      
   
    return(<div className="page">
             
             <div className="my-5">
                 <div className="p-5 text-center bg-body-tertiary">
                    <div className="container py-5">
                        <h1 className="text-body-emphasis">Votre Panier</h1>
                         <p className="col-lg-8 mx-auto lead">
                          {panierHeader}
                        </p>
                     </div>
                 </div>
             </div>
               
            <div >
                                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">JO24</th>
                        <th scope="col">Sport</th>
                        <th scope="col">Offre</th>
                        <th scope="col">Places</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                  
                    {ticket.map((items) => {
    return (
        <tr key={items.id}>
            <th scope="row"><img className="panier-img" src={items.image} /></th>
            <td>{items.sport}</td>
            <td>{items.offre}</td>
            <td>
                <input type="number" value={items.quantity} onChange={(e) => updateQuantity(items.id, e.target.value)} />
            </td>
            <td>{items.prix} €</td>
            <td><button onClick={() =>{ remove(items);document.location.reload(false)}}>Supprimer</button></td>
        </tr>
    );
})}
                    </tbody>
                    <tfoot>
                        <tr >
                            <th className="tfooter"  scope="row">Proceder au payement</th>
                            <td><Boutton click={handleClick} btn={"Payer"}/></td>
                            <th className="tfooter" colSpan="3" scope="row">Totals</th>
                            <td>{prix} €</td>
                          
                        </tr>
                        
                    </tfoot>
                    </table>
                   
            </div>
                <Footer/>
            </div>)
};