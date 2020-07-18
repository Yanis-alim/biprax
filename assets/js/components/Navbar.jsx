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
    console.log(data[0].roles)
    setRole(data[0].roles);
    };
   
  }
  useEffect(()=>{
  getRole();
  },[]);
    return (
      <div  className="navfix">
      <nav className="navbar navbar-expand-sm bg-light ">
     <NavLink className="nav-link " to="/">BipRax</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarColor03">
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
        {role=="ROLE_ADMIN" && <div>
        {isAuthenticated && <> <li className="nav-item">
        <NavLink className="nav-link" to="/users">UTILISATEURS</NavLink>
        </li></>}</div> }
        {role=="ROLE_ADMIN" && <div>
        {isAuthenticated && <> <li className="nav-item">
        <NavLink className="nav-link" to="/missions">MISSIONS</NavLink>
        </li></>}</div> }
        {role=="ROLE_ADMIN" && <div>
        {isAuthenticated && <> <li className="nav-item">
        <NavLink className="nav-link" to="customers">CLIENTS</NavLink>
        </li></>}</div>}
        {role=="ROLE_ADMIN" && <div>
        {isAuthenticated && <> <li className="nav-item">
        <NavLink className="nav-link" to="/contracts">CONTRATS</NavLink>
        </li></>}</div>}
        {isAuthenticated && <> <li className="nav-item">
        <NavLink className="nav-link" to="/raportm">CRA</NavLink>
        </li></>}
        {role=="ROLE_ADMIN" && <div>
        {isAuthenticated && <> <li className="nav-item">
        <NavLink className="nav-link" to="/contract_b2_bs">CONTRATS B2B</NavLink>
        </li></>}</div>}
        {role=="ROLE_ADMIN" && <div>
        {isAuthenticated && <> <li className="nav-item">
        <NavLink className="nav-link" to="/applications">CANDIDATURES</NavLink>
        </li></>}</div>}

          <li className="nav-item">
        <NavLink className="nav-link" to="/apropos">A PROPOS</NavLink>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto  ">
        {isAuthenticated && <> <li className="nav-item"><NavLink to="/compte"  className="btn btn-success" >Mon Compte</NavLink></li></>}
        {!isAuthenticated && <> 
          <li className="nav-item"><NavLink to="/login" className="btn btn-success">Connexion !</NavLink> </li>
         </> ||  <li className="nav-item"><button onClick={handelLogout} className="btn btn-danger">Déconnexion !</button> </li> }
      
     
          </ul>
    </div>
  </nav> 
  </div>);
}
 
export default Navbar ;