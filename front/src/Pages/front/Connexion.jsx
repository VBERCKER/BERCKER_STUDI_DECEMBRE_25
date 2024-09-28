
import React from "react";
import {LogIN} from "../../composants/FormCO";
import Footer from "../../composants/template/footer";
import BannerCookies from "../../composants/template/bannerCookies";



function Connexion(){
   
    return (<div>
  
  
        <div className="login">
            <LogIN/>
        </div>
         
     <Footer/>
     <BannerCookies/>
         
        </div>
      
    )}




export default Connexion;