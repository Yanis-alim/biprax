import React, { useState, useEffect } from 'react';
import Field from './../components/forms/Field'
import Select from './../components/forms/Select'
import { Link } from 'react-router-dom';
import CivilityAPI from '../services/CivilityAPI';
import axios from "axios";
import UsersAPI from '../services/UsersAPI';
import { toast } from 'react-toastify';
import AuthAPI from './../services/AuthAPI';
import jwt_decode from 'jwt-decode';

const UserPage = ({history,match}) => {
    const {id ="new"} = match.params;
   const [user ,setUser]= useState({
       
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
   const [editing,setEditing]=useState(false);
   const [errors,setError]=useState({
      
    fName:"",
    lName:"",
    username:"",
    roles:"",
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
   const [role ,setRole] = useState([]);
  

   const handleChange =({ currentTarget }) =>{
    const { name, value} = currentTarget;
    setUser({ ...user, [name]: value });

};
const [idcivilitys, setCivility] = useState([]);

const fatchUser = async () =>{
    try{
        
        const tokens = AuthAPI.getToken();
        const decoded = jwt_decode(tokens);
    
        
        
    const data =await UsersAPI.find(decoded.username);
    const {id,fName,lName,username,roles,password,dateOfBirth,adress1,adress2,zipCode,city,phoneNumber,email, idcivility}=data[0];
    user.id=id;
    user.fName=fName;
    user.lName=lName;
    user.username=username;
    user.roles=roles;
   // user.password=password;
    user.dateOfBirth=dateOfBirth;
    user.adress1=adress1;
    
    user.zipCode=zipCode;
    user.city=city;
    user.phoneNumber=phoneNumber;
    user.email=email;
    user.idcivility=idcivility;
    if(adress2==null){
        user.adress2="";
    }else {user.adress2=adress2;
    }



    
    
   
    
   
    
}catch(error){
    console.log(error.response);
    
}

};
useEffect(()=>{
    if (id !== "new"){
    fatchUser();
    setEditing(true);
}

},[]);
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

const fetchCivility =async() =>{
    try{
       const data = await CivilityAPI.findAll();
       setCivility(data);
       if (!user.idcivility) setUser({...user, idcivility: data[0].id});
       
       

    }catch(error){
       
        console.log(error.response);

    }
}


useEffect(() => {
    fetchCivility();

},[]);
const handleSubmit = async event =>{
    event.preventDefault();
   
    try{
        if (user.lName !== "" && user.fName !== "" && user.phoneNumber !== "" && user.adress1 !=="" && user.email !== "" && user.password !=="" && user.zipCode !== "" && user.city !=="" && user.dateOfBirth !=="" ){
            if (editing){
               
                const response = await axios.put("http://localhost:8001/api/users/" + id,user);
                toast.success("votre compte a été mise a jour veuillez vous reconnecter");
                history.replace("/login");
                
            }
            else{
       
        const response = await axios.post("http://localhost:8001/api/users",{...user, idcivility: `/api/civilities/${user.idcivility}`, roles: [user.roles]});
        console.log(response);
        
        toast.success("compte créé");
        history.replace("/users");}}
        else{
            toast.info("les chmaps sans pas tous rompli");

        }

    
   
}
catch({ response }){
    const {violations} =response.data;
    console.log(response);

    if(violations){
       
        const apiErrors = {};
        violations.forEach(({propertyPath, message}) =>{
        apiErrors[propertyPath]= message;
        setError(apiErrors);
        });
        
        
    }
  }
};
    
    
    
    return ( <> 
    <div className="container pt-5 haut">
     {editing && <h1>Modifiction du profil</h1> || <h1>creation d'un compte</h1>}

    <form onSubmit={handleSubmit}>
    <Select
           name="idcivility" 
          label="civilitie" 
          value={user.idcivility}  
          onChange={handleChange}  
          error={errors.idcivility}>
              
               {idcivilitys.map(idcivility =>( 
               <option key={idcivility.id} value={idcivility.id}>
                   {idcivility.civility}
                   </option>
                   ))}
                   

          </Select>

          
        <Field name="fName" type="text"  placeholder="Prenom " label="Prenom" onChange={handleChange}  value={user.fName} error={errors.fName}/>
        <Field name="lName" type="text"  placeholder="Nom " label="Nom" onChange={handleChange}  value={user.lName} error={errors.lName}/>
        <Field name="username" type="text"  placeholder="Nom d'utilisateur " label="Nom d'utilisateur" onChange={handleChange}  value={user.username} error={errors.username}/>
        <Field name="password" type="password"  placeholder="mot de passe" label="mot de passe" onChange={handleChange}  value={user.password} error={errors.password}/>
        {role=="ROLE_ADMIN" &&  <Select name="roles" label="type de compte" value={user.roles}  onChange={handleChange}  error={errors.roles}>
              
               <option value="">veuillez choisir</option>
               <option  value="ROLE_ADMIN"> admin </option>
                  
               <option  value="ROLE_USER">utilisateur</option>
        
                   

          </Select>}
         
       
        
        <Field name="dateOfBirth" type="text"  placeholder="YYYY/MM/JJ " label="date de naissance" onChange={handleChange}  value={user.dateOfBirth} error={errors.dateOfBirth}/>
        <Field name="adress1" type="text"  placeholder="ex: 1 rue claude debussy" label="Adress 1" onChange={handleChange}  value={user.adress1} error={errors.adress1}/>
        <Field name="adress2" type="text"  placeholder="ex: aprt 49 " label="compliment d'adresse" onChange={handleChange}  value={user.adress2} error={errors.adress2}/>
        <Field name="zipCode" type="text"  placeholder="ex : 75018"  label="code postal" onChange={handleChange}  value={user.zipCode} error={errors.zipCode}/>
        <Field name="city" type="text"  placeholder="ex: paris" label="ville" onChange={handleChange}  value={user.city} error={errors.city}/>
        <Field name="email" type="text"  placeholder="ex : biprax@biprax.fr" label="Email" onChange={handleChange}  value={user.email} error={errors.email}/>
        <Field name="phoneNumber" type="text"  placeholder="numero de telephone" label="Numero de telephone" onChange={handleChange}  value={user.phoneNumber} error={errors.phoneNumber}/>
        <div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/users" className="btn btn-link"> Retour aux utilisateur</Link>
        </div>
    </form>
    </div>
    </> );
};
 
export default UserPage;