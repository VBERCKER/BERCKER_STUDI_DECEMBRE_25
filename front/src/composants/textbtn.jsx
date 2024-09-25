import React from "react"; 
import {Card1} from "./card";
import Boutton from "./bouton";

function Textebtn (props){
    return( 
   <div id="sport" className="textebtn">
    <h2 className="police-titre" > {props.textebtn}</h2>
    <p className="police-p ptextbtn"> {props.textebtnp}  </p>
    <a href={props.lien}><Boutton  btn={props.textebtnbtn}/></a>
   
   </div>
    );
}

function GridSport(){
    return(
        <div>
        <div className="container text-center">
  <div className="row">
    <div className=" p-3 col-sm ">

     <Card1 titlecard1= {"Basket 3x3"} pcard1={"Le basketball 3×3 se joue par équipes de trois joueurs, sur un demi-terrain ; les deux équipes attaquent et défendent le même panier, en fonction de qui a la possession. L’équipe en tête au bout de dix minutes de jeu, ou la première à atteindre 21 points, remporte le match. "} image={"/static/images/sports-collectifs-aux-jo.jpg"}/>

      </div>
    <div className="p-3 col">
    <Card1 titlecard1= {"Breaking"} pcard1={"Breaking est un style de danse originaire des États-Unis dans les années 1970. Il a pris forme dans les fêtes de bloc animées du Bronx, émergeant de la culture hip hop, et se caractérise par des mouvements acrobatiques, un jeu de jambes stylisé et le rôle clé joué par le DJ et le MC (maître de cérémonie) pendant les batailles. "} image={"/static/images/breaking-dance-hihop.jpg"}/>
    </div>
    <div className=" p-3 col">
    <Card1 titlecard1= {"Rugby à 7"} pcard1={"Le sport du rugby peut remonter à l'époque médiévale dans un certain nombre de pays européens, mais c'est entre 1845 et 1848 que les codes de rugby modernes ont été établis par des élèves d'une école de la ville anglaise de Rugby et de l'Université de Cambridge. "} image={"/static/images/MjAyNDAyNmFjNjU4ZGQyNTUzZjNjYzU5NTc5ODMyNWI2NzYxNWQ.avif"}/>
    </div>
    <div className="p-3 col">
    <Card1 titlecard1= {"Athlétisme"} pcard1={"L’athlétisme est le sport le plus ancien dont nous avons des traces, puisqu’il apparaît dès les Jeux Olympiques de l’Antiquité. Il est possible de trouver les champions d’athlétisme depuis 776 avant J-C.  "} image={"/static/images/02544.jpg"}/>
    </div>
  </div>
</div>
          
        </div>
    )
}




export {Textebtn,GridSport}; 

