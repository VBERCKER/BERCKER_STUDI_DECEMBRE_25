import React from "react"; 
import {Header} from "../../composants/template/headerNavbar";
import {Carte} from "../../composants/card"; 
import {Textebtn, GridSport} from "../../composants/textbtn";
import Float from "../../composants/float";
import Footer from "../../composants/template/footer";
import { useEffect,useRef } from "react";

function Home(){
   const newslettterref=useRef(); 
   

   useEffect(()=>{
  
    
    const observer= new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
            newslettterref.current.classList.add("active");
            
        }
    })
    observer.observe(newslettterref.current);
   },[]);
    return(
        <div>
   
        <div className="headercharg titre-header">
        <span className="police letter">Jeux</span>
        <span className="police letter">Olympique</span>
        <span className="police letter">Paris </span>
        <span className="police letter">2024 !</span>

        </div>
       
        <Header src = {"/static/images/1200x680_sc_f1yhtk6wcamaltg.jpg"}
         alt={"dessin du champs de mars avec une foule popualire"} 
         h1={"Paris 2024"}
           p= {"En 2024, Paris accueillera le plus grand évènement de son histoire. 100 ans après, les Jeux Olympiques et Paralympiques sont de retour pour vous faire vibrer dans la plus belle ville du monde, aux quatre coins de la France et sur des sites de compétition iconiques, pour des Jeux qui s’annoncent inoubliables. Pour assister au plus grand évènement sportif au monde, Paris 2024 propose une offre de services à la hauteur de l’évènement. Plusieurs solutions clés en main : de l’achat du billet en solo, duo ou familiale, optez pour l’offre la plus adaptée à vos besoins."} 
           btn1= {"Les sports"}
           btn2= {"Billeterie"}
           lien1={"#sport"}
           lien2={"/offre"}
         />
         <div ref={newslettterref} className="home-card" >
       
        <Carte 
        hsport={"Les sports"} psport={"Pour les Jeux Olympique 2024 ! La France presente 3 nouvelles activités sportives."}
        hoffre={"Nos offres."} poffre={"Pour Paris 2024, nous proposons 3 offres pour acheter vos billets. Seul, a deux ou en famille, venez souteznir nos athlètes !"}
        hjeu={"L'histoire des jeux Olympique."} pjeu={"128 ans d'histoire depuis la création des jeux olympique en 1896."}
        sport={"/static/images/design-sans-titre-7.png"} sportalt={"image de sportif"}
            offre={"/static/images/billets-Jeux-olympiques-Tokyo-2020-tickets.jpg"} offrealt={"image de billet"}
            jeu={"/static/images/63da3a7e85f00_modele-brouillon.jpg"} jeualt={"logo paris 2024"}
        />
        </div>
        <div >
        <Textebtn lien={"#offre"} textebtn={"Les sports olympiques Paris 2024."}   textebtnp={"Pour les jeux olymppique 2024, la France va proposer 41 sports olympique avec 4 sports additonnels. Athlétisme, aviron, badminton, basketball, basketball 3×3, boxe, canoë sprint, canoë-kayak slalom, cyclisme sur piste, cyclisme sur route, BMX freestyle, BMX racing, Mountain bike (VTT), escrime, football, golf, gymnastique artistique, gymnastique rythmique, trampoline, haltérophilie, handball, hockey, judo, lutte, pentathlon moderne, rugby, natation, natation artistique, natation marathon, plongeon, waterpolo, sports équestres, taekwondo, tennis, tennis de table, tir, tir à l’arc, triathlon, voile, volleyball, volleyball de plage."} textebtnbtn={"Nos offres"}/>
        </div>
       
       <GridSport/>
      <Float/>
     <Footer/>
 

        </div>
    )
}

export default Home;