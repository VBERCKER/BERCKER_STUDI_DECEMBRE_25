import React from "react";

import Footer from "../../composants/template/footer";
import {Link} from "react-router-dom";




export default function Sucess(){

  function removepanier(){
    localStorage.removeItem("tickets")
  }
  removepanier(); 

    return(<div className="panier">
             
             <div className="my-5">
             
                 <div className="p-5 text-center bg-body-tertiary">
                    <div className="container py-5">
                   
                        <h1 className="text-body-emphasis"> ✅ Votre panier est validé ! </h1>
                         <p className="col-lg-8 mx-auto lead">
                         Reandez-vous dans <Link to="../ebillet">mes e-bilets</Link>  pour accéder à vos tickets. 
                        </p>
                     </div>
                 </div>
             </div>
               
           
                <Footer/>
            </div>)
};

