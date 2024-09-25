import React from "react"; 
import { AuthProvider } from "./composants/securite_cookies_token_auth_localstorage/auth";
import Offrepage from "./Pages/front/Offre";
import Home from "./Pages/front/Home";
import Connexion from "./Pages/front/Connexion";
import Compte from "./Pages/pagescomptesutilisateurs/compte"; 
import Enregistrement from "./Pages/front/Enregistrement";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Utilisateur from "./Pages/pagescomptesutilisateurs/utilisataeur";
import Ebillet from "./Pages/pagescomptesutilisateurs/ebillet";
import PanierFront from "./Pages/front/Panier";
import Admin from "./Pages/admin/admin"
import Ajouter from "./Pages/admin/Ajouter";
import OffreVisuel from "./Pages/admin/offresVisu";
import Supprimer from "./Pages/admin/supprimer";
import Update from "./Pages/admin/Update";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RequireAuth , PrivateRoute} from "./composants/securite_cookies_token_auth_localstorage/requireAuth"
import { Nav } from "./composants/template/headerNavbar";
import PanierValider from "./Pages/pagescomptesutilisateurs/paniervalider"
import Sucess from "./Pages/pagescomptesutilisateurs/sucess";
import Cancel from "./Pages/pagescomptesutilisateurs/cancel"
import Pwd from "./Pages/pagescomptesutilisateurs/pwdOublie"
import Vente from "./Pages/admin/vente";



 

function App(){
   
    return(
        
       <AuthProvider>

       <Router>
       <Nav/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/offre" element={<Offrepage/>}/>
                <Route path="/connexion" element={<Connexion/>}/>
                <Route path="/register" element={<Enregistrement/>}/>
                <Route path="/panier" element={<PanierFront/>}/>
                <Route path="/pwd" element={<Pwd/>}/>

                                { /*route protégées*/}
                                
                     <Route path="/compte" element={<RequireAuth><Compte/></RequireAuth>}>
                         <Route path="utilisateur" element={<Utilisateur/>}/>
                        <Route path="ebillet" element={<Ebillet/>}/>
                        <Route path="paniervalider" element={<PanierValider/>}/>
                        <Route path="sucess" element={<Sucess/>}/>
                        <Route path="cancel" element={<Cancel/>}/>

                     </Route>

                    <Route path="/admin" element={ <PrivateRoute><Admin/></PrivateRoute>}>
                    <Route path="ajouter" element={<Ajouter/>}/>
                    <Route path="visuel" element={<OffreVisuel/>}/>
                    <Route path="supprimer" element={<Supprimer/>}/>
                    <Route path="modifier" element={<Update/>}/>
                    <Route path="vente" element={<Vente/>}/>
                    
                    </Route>

                                 { /*test et autre*/}
               
                <Route path="*" element ={<h1>Page iouvable !</h1>}/>
               
            </Routes>
        </Router>

       </AuthProvider>
    
    )
}

export default App;