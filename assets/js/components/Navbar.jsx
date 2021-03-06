import React,{useEffect,useState} from 'react';
import AuthAPI from '../services/AuthAPI'
import { NavLink,NavDropdown } from 'react-router-dom';
import { toast } from 'react-toastify';

import jwt_decode from 'jwt-decode';
import UsersAPI from "../services/UsersAPI";




const  Navbar  = ({isAuthenticated, onLogout, history}) => {
  const [role ,setRole] = useState([]);
 
 
 
  const handelLogout =() =>{
    AuthAPI.logout();
    onLogout(false);
    toast.info("vous etes déconnecté");

    history.push("/login");

  };
  const getRole = async () =>{
    if(AuthAPI.getToken()!=null){
    const tokens = AuthAPI.getToken();
    const decoded = jwt_decode(tokens);
    const data =await UsersAPI.find(decoded.username);
    
    setRole(data[0].roles);
    };
   
  }
  useEffect(()=>{
  getRole();
  },[]);
    return (
      <div>
      <nav className="navbar fixed-top navbar-expand-xl navbar-light bg-light  ">
     <NavLink className="navbar-brand " to="/"> BIPRAX</NavLink>
    
     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
    <div className="collapse navbar-collapse labarre" id="navbarSupportedContent">
      <ul className="navbar-nav">
       
        <li className="nav-item">
          <NavLink className="nav-link" to="/annonces">OFFRES</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/actualites">ACTUALITÉS</NavLink>
        </li>
        {!isAuthenticated && <li className="nav-item">
          <NavLink className="nav-link" to="contacter">NOUS REJOINDRES</NavLink>
        </li>}
      
    

      

        {isAuthenticated && <> <li className="nav-item">
        <NavLink className="nav-link" to="/raports">RAPPORTS</NavLink>
        </li></>}
        {role=="ROLE_ADMIN" && <div>
        {isAuthenticated && <> <li className="nav-item">
        <NavLink className="nav-link" to="/societies">SOCIÉTÉS</NavLink>
        </li></>}</div>}
        
        {(role=="ROLE_ADMIN" && isAuthenticated) &&<li className="nav-item">
        <NavLink className="nav-link" to="/users">UTILISATEURS</NavLink>
        </li>}
       
        
        {(role=="ROLE_ADMIN" &&isAuthenticated) && <> <li className="nav-item">
        <NavLink className="nav-link" to="/missions">MISSIONS</NavLink>
        </li></>}
        {role=="ROLE_ADMIN" && <div>
        {isAuthenticated && <> <li className="nav-item">
        <NavLink className="nav-link" to="customers">CLIENTS</NavLink>
        </li></>}</div>}
       
        {isAuthenticated && <> <li className="nav-item">
        <NavLink className="nav-link" to="/raportm">CRA</NavLink>
        </li></>}
        

          <li className="nav-item">
        <NavLink className="nav-link" to="/apropos">À PROPOS</NavLink>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto  ">
        {isAuthenticated && <> <li className="nav-item"><NavLink to="/compte"  className="btn btn-outline-success btt" >Mon Compte</NavLink></li></>}
        {!isAuthenticated && <> 
          <li className="nav-item"><NavLink to="/login" className="btn btn-outline-success">Connexion !</NavLink> </li>
         </> ||  <li className="nav-item"><button onClick={handelLogout} className="btn btn-outline-danger btt">Déconnexion !</button> </li> }
      
     
          </ul>
    </div>
  </nav> 
  </div>);
}
 
export default Navbar ;