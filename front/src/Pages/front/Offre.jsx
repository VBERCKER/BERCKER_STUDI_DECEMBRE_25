
import React from "react";

import OffreGrid from "../../composants/offregrid";

import Footer from "../../composants/template/footer";
import BannerCookies from "../../composants/template/bannerCookies";


function Offrepage(){
    return (<div>
    
    <div className="headeroffre">
      <h1 className="police-titre titreoffre fw-bold text-body-emphasis"> Découvrez nos offres ! </h1>
    </div>
       
        <OffreGrid />
       <Footer/>
       <BannerCookies/>
    </div>
      
    )}

export default Offrepage;