import React,{useEffect,useState} from 'react';
import AuthAPI from './../services/AuthAPI'
import jwt_decode from 'jwt-decode';
import axios from "axios";
import UsersAPI from '../services/UsersAPI';
import {Link} from "react-router-dom";
import tel from "./../../image/logo-biprax.png";








const Compte = (props) => {
    const [role ,setRole] = useState([]);
    const [users,setUsers]=useState({
        id:"",
        fName:"",
       lName:"",
       username:"",
       roles:[],
       password:"",
       dateOfBirth:"",
       adress1:"",
       adress2:"",
       zipCode:"",
       city:"",
       phoneNumber:"",
       email:"",
       idcivility:""

    });
   
    const [loading,setLoading]=useState(true);

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
   
   
    const fatchUser = async () =>{
        try{
            const tokens = AuthAPI.getToken();
            const decoded = jwt_decode(tokens);
            
        const data =await UsersAPI.find(decoded.username);
        const {id,fName,lName,username,roles,password,dateOfBirth,adress1,adress2,zipCode,city,phoneNumber,email, idcivility}=data[0];
        console.log(data);
        console.log(fName);
        users.id=id;
        users.fName=fName;
        
        users.lName=lName;
        users.username=username;
        users.roles=roles;
        users.password=password;
        users.dateOfBirth=dateOfBirth;
        users.adress1=adress1;
        users.adress2=adress2;
        users.zipCode=zipCode;
        users.city=city;
        users.phoneNumber=phoneNumber;
        users.email=email;
        users.idcivility=idcivility;
        
        
        setLoading(false);
       
        
    }catch(error){
        console.log(error.response);
        
    }

    };

    useEffect(()=>{
        fatchUser();

    },[]);




    
      
     
    return ( <>
    <div className="compte">

      
        <div className="comptehead">
        <img src={tel} className="logo"/>
         <h1>BipRax Consulting ,</h1>   
        <h3>Bonjour , {users.fName} {users.lName} </h3>
        <p> Ceci est votre  profil. Vous pouvez voir les progrès que vous avez réalisés dans votre travail <br/>et gérer vos projets ou tâches assignées</p>
        <div><Link to={"/users/"+users.id} className="btn btn-md btn-primary ">Editer</Link></div>

       
        </div>
        <div className="reste">
    <div className=" bodycompte">
    
    <div className="titrecompte">
     <h3>Mon Compte</h3>
       
       
    </div>
    <div id="div" className="card bg-light mb-3 " >
        <div className="row">
        
        <div className="col-md-6">
            <ul className="list-group list-group-flush">
            <li className="list-group-item"><Link to="/absences" className="btn btn-sm btn-primary ">Mes Absences</Link> </li>
            <li className="list-group-item"> <Link to="/absence" className="btn btn-sm btn-primary ">Demander une Absence</Link></li>
            <li className="list-group-item"> <Link to="/raports" className="btn btn-sm btn-primary ">Mes rapports</Link></li>
            <li className="list-group-item"> <Link to="/raports/new" className="btn btn-sm btn-primary ">Ajouté un rapport</Link></li>
            <li className="list-group-item"> <Link to="/rma" className="btn btn-sm btn-primary ">Rapport mensuel activite</Link></li>

            </ul>





        </div>
        
        <div className="col-md-6">
          <div id="div"  className="card-header">information personnel</div>
        
            <div id="div"  className="card-body">
                        <h4 className="card-title">{users.fName} {users.lName}</h4>
                        <p className="card-text">Nom d'uilisateur :    {users.username}</p>
                        <h5 className="card-title">Adress:</h5>
                        <p className="card-text">    {users.adress2} </p>
                        <p className="card-text">     {users.adress1} </p>
                        <p className="card-text">     {users.zipCode} {users.city}</p>
                        <h5 className="card-title">Contact:</h5>
                        <p className="card-text">Adress mail:    {users.email}</p>
                        <p className="card-text">numero de telephone:    {users.phoneNumber}</p>
             </div>

             </div>
             </div>
   </div>
   {role=="ROLE_ADMIN" && <nav className="navbar navbar-expand-lg navbar-dark bg-primary nav2" >
  
   <Link to="/type_contracts" className="btn btn-sm btn-primary ">type de contrat</Link>
   <Link to="/posts" className="btn btn-sm btn-primary ">les Postes</Link>
   <Link to="/statuses" className="btn btn-sm btn-primary ">status</Link>
   </nav>}

    
    
    
    
    

   </div>
   </div>
   </div>
    </> );
}
 
export default Compte;