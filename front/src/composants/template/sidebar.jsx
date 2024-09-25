import React from 'react';
import {Link, Outlet } from 'react-router-dom';
import Footer from './footer';



function Sidebar(props){
  function w3_open() {
    document.getElementById("mySidebar").style.display = "block"
    
  }
  
  function w3_close() {
    document.getElementById("mySidebar").style.display = "none"
  }
  return(
    <div className='menu'>
     
<div className=" burger-menu w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left" style={{width:"200px"}} id="mySidebar">
  <button className=" w3-bar-item w3-button w3-large w3-hide-large" onClick={w3_close}>Close &times;</button>
  <h3 className="w3-bar-item">Menu</h3>
  <nav>
 
  <div style={{margin : "30px" ,fontSize:"20px" }}><Link to={props.lienmenuP}> {props.menuP}</Link></div>
 <div style={{margin : "30px" ,fontSize:"20px"}}><Link to={props.lienTItre1}>{props.menuTitre1} </Link></div>
 <div style={{margin : "30px" ,fontSize:"20px"}}><Link to={props.lienTItre2}>{props.menuTitre2}</Link></div>
 <div style={{margin : "30px" ,fontSize:"20px"}}><Link to={props.lienTItre3}>{props.menuTitre3}</Link></div>
 <div style={{margin : "30px" ,fontSize:"20px"}}><Link to={props.lienTItre4}>{props.menuTitre4}</Link></div>
 


  </nav>
 
  
  
</div>

<div className="w3-main " style={{marginLeft:"200px"}}>
<div className="w3-teal">
  <button className="w3-button w3-teal w3-xlarge w3-hide-large" onClick={w3_open}>&#9776;</button>
  <div className="w3-container">
  <h1>{props.titrem}</h1>
  </div>
</div>
<div>
{props.content} 

</div>
<div className="w3-container contente-menu ">
<Outlet/>


</div>
   
</div>
<Footer/>
    </div> 
  )
}

export default Sidebar;