import React, { useState, useEffect } from "react";
import { CardEbillet } from "../../composants/card";
import { getCookie } from "../../composants/securite_cookies_token_auth_localstorage/cookies";
import QRCode from "qrcode"
import Boutton from "../../composants/bouton";





 export default function Ebillet(){
     
        const [ticket,setTicket]=useState([]);
        const[qrcode,setQrcode]=useState([]);
       
        const cookie= getCookie('user')

        const requestOptions = { method: 'GET', mode: "cors", cache: "no-cache", credentials: "include", headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }, redirect: "follow", referrerPolicy: "no-referrer" };

        const billets = ()=>{
                fetch (`http://localhost:3000/achat/ebillet/${cookie}`,requestOptions)
                .then((response)=>{
                        return response= response.json()
                        
                })
                .then((result)=>{setTicket(result) })
                .catch(err=>console.log(err)); } 
                
              
        useEffect(()=>{ 
                billets()
                 
               },[])

               console.log(ticket)

              function qrCode (cles){
                
                QRCode.toDataURL(cles,{ width:800, margin: 2, color:{dark: '#335383ff'} }, function (err, Array) {
                       if(err)return console.log(err)
                        setQrcode(Array)
                      })   }

                     

    return(<div>
   
                
   <div >
  
            <div className="container text-center ">
               
                
         <div className="row row-cols-3 g-5  ">
  
 {ticket.map((items)=>{ return(<div className="col "  key={items.id} > <CardEbillet  titre={items.sport} title={items.sport} description={items.offre} content={ <div><Boutton btn={"mon QR Code !"} click={()=>{qrCode(items.cles_qr)}}/>
 <img style={{display:"block", with:"100%", height :"450px" ,margin:"2rem auto"}} src={qrcode}></img>
                <a href={qrcode} download="qrcode.png">Télécharger votre billets !</a></div>} /></div>)})}
         </div>
  
  
            </div>
         
        </div> 
    
        </div>)
};

