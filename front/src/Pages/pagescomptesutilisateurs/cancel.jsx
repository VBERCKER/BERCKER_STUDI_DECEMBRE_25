import React from "react";

import Footer from "../../composants/template/footer";
import {Link} from "react-router-dom";


export default function Cancel(){

   
      
      
   
    return(<div className="panier">
             
             <div className="my-5">
                 <div className="p-5 text-center bg-body-tertiary">
                    <div className="container py-5">
                    
                        <h1 className="text-body-emphasis"> 🤯 Payement refusé ! </h1>
                         <p className="col-lg-8 mx-auto lead">
                         Reandez-vous dans <Link to="../paniervalider">mon panier</Link> pour essayer de nouveau.  
                        </p>
                     </div>
                 </div>
             </div>
               
           
                <Footer/>
            </div>)
};
