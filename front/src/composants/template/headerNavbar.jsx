import  React from 'react';
import Boutton from "../bouton";
import { NavLink,Link } from 'react-router-dom';
import { useAuth } from '../securite_cookies_token_auth_localstorage/auth'
import { useNavigate } from 'react-router-dom';
import { deleteCookie } from '../securite_cookies_token_auth_localstorage/cookies';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';





function Nav(){
  const navigate = useNavigate()
  const auth = useAuth()
  const handleLogout = () => {
    auth.logout()
    localStorage.removeItem('token')
    localStorage.removeItem('admin')
    localStorage.removeItem('accepter-cookie')
    deleteCookie('user')
    deleteCookie('admin')
    navigate('/')
  }
  
 
    const handleButtonClick = () => {
      const navbar = document.getElementById('navbarSupportedContent');
      if (navbar) {
        const bsCollapse = new bootstrap.Collapse(navbar, {
          toggle: true
        });
      }
    };
  
  
 
  
  
  return (<div className="navbar1">
  <div className="flex-container">
    <div className="flex-items">
    <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <a className="navbar-brand" href="/"><img src="/static/images/origine-logo-JO-Paris-2024-870x600.jpg" width="50" height="35"/></a>
    <button className="navbar-toggler"   onClick={handleButtonClick} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <div className="nav-link active" aria-current="page">
        <NavLink className={"navcolor"}to='/' >Acceuil</NavLink>
        </div>
        </li>

        <li className="nav-item ">
        <div className="nav-link">
        <NavLink className={"navcolor"} to="/offre" >Offres / Billeterie</NavLink>
        </div>
        </li>

        <li className="nav-item">
        <div className="nav-link">
        <NavLink className={"navcolor"} to="/compte" >Mon compte</NavLink>
        </div>
        </li>

        <li className="nav-item">
        <div className="nav-link">
        <NavLink className={"navcolor"} to="/panier">
       Panier
       <i className="bi bi-cart"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg></i>
  
       </NavLink> 
        </div>
       

        
        </li>
      
      </ul>
    </div>
   
  </div>
</nav> 
    </div>
    <div className="flex-items2">
<ul>
{!auth.user && (<div>
  <li> <Link to='connexion'>Connexion</Link></li>
  <li><Link to='register'>S'enregistrer</Link> </li>
</div>
 
      )}
{auth.user && (
  <li> <a className="nav-link" onClick={handleLogout} href=''>Déconnexion</a> </li>
)}
  
</ul>
    </div>
  </div>
  
</div>
 )
};









function Nav1(props){

  return (<div className="navbar1">
  <div className="flex-container">
    <div className="flex-items">
    <nav className="navbar navbar-expand-lg ">
  <div className="container-fluid">
    <a className="navbar-brand" href="/"><img src="/static/images/origine-logo-JO-Paris-2024-870x600.jpg" width="50" height="35"/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Acceuil</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/offre">Offres / Billeterie</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#sport">Les sports</a>
        </li>
        <li>
        <i className="bi bi-cart"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg></i>
  <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">
    0
  </span>

        </li>
      </ul>
    </div>
   
  </div>
</nav> 
    </div>
    <div className="flex-items2">
<ul>
<li> <a className="nav-link" onClick={props.click} href=''>Déconnexion</a> </li>
</ul>
    </div>
  </div>
  
</div>
 )
}

function Header(props) {
  return (
    <div id="header" className="row img-container flex-lg-row-reverse align-items-center g-5 py-5">
      <div className=" imgMin col-10 col-sm-7 col-lg-6 mb-4">
        <img src={props.src} className="d-block mx-lg-auto img-fluid" alt={props.alt} loading="lazy" />
      </div>
      <div className=" headerMin col-lg-6">
        <h1 className=" police-titre display-5 fw-bold text-body-emphasis lh-1 mb-3 text-pop-up-top header-titre">{props.h1}</h1>
        <p className="police-p lead text">{props.p}</p>
        <div className="bouton d-grid gap-4 d-sm-flex justify-content-md-start">
          <Boutton lien={props.lien1} btn={props.btn1} />
          <Boutton lien={props.lien2} btn={props.btn2} />
        </div>
      </div>
    </div>
  );
}
    
    function Header1(props)

    { return (<div id="header" className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src= {props.src} className="d-block mx-lg-auto img-fluid" alt={props.alt} width="800" height="600" loading="lazy"/>
          </div>
          <div className="col-lg-6">
         
            <h1 className=" police-titre display-5 fw-bold text-body-emphasis lh-1 mb-3 text-pop-up-top">{props.h1}</h1>
            <p className="police-p police-plead">{props.p}</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            </div>
          </div>
        </div>)}

    export {Header,Nav,Header1,Nav1}; 