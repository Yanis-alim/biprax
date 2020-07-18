import React, { useState, useEffect } from 'react';
import TypeContratApi from "../services/TypeContratApi";
import PostsAPI from "../services/PostsAPI";
import StatusAPI from "../services/StatusAPI";
import UsersAPI from "../services/UsersAPI";
import ContratsAPI from "../services/ContratsAPI";
import SocietiesAPI from "../services/SocietiesAPI";
import Select from './../components/forms/Select';
import Field from './../components/forms/Field'
import Compte from './Compte';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ContratPage = (props) => {


  

    const [contrat,setContrat]=useState({
        startdate:"",
        salaire:0,
        endDate:"",
        discription:"",
        typeContract:"",
        post:"",
        status:"",
        contractCode:"",
        membership:"",
        user:"",
        society:""
        


    });  
    const [errors,setError]=useState({
        startdate:"",
        salaire:"",
        endDate:"",
        discription:"",
        typeContract:"",
        post:"",
        status:"",
        contractCode:"",
        membership:"",
        user:"",
        society:""

    });
    const [typeContracts,setTypeContracts]=useState([]);
    const [posts,setPosts]=useState([]);
    const [status,setStatus]=useState([]);
    const [users,setUsers]=useState([]);
    const [societys,setSocietys]=useState([]);


    const fetchtypeContract = async() =>{
        try{
            const data= await TypeContratApi.findAll();
           
            setTypeContracts(data);
            
        
        }catch(error){
            
            //TODO : notif
            console.log(error.response);

        }

    }
    useEffect(()=>{
        fetchtypeContract();
    }, [])


    

    const fetchPosts = async() =>{
        try{
            
            
            const data= await PostsAPI.findAll();
           
            setPosts(data);
  

        }catch(error){
            
            //TODO : notif
            console.log(error.response);

        }

    }
    useEffect(()=>{
        fetchPosts();
    }, [])

    const fetchStatus = async() =>{
        try{
            const data= await StatusAPI.findAll();
            
           
            setStatus(data);
   
        }catch(error){
            
            //TODO : notif
            console.log(error.response);

        }

    }
    useEffect(()=>{
        fetchStatus();
    }, [])
    const fetchUsers = async() =>{
        try{
            const data= await UsersAPI.findAll();
           
            setUsers(data);

        }catch(error){
            
            //TODO : notif
            console.log(error.response);

        }

    }
    useEffect(()=>{
        fetchUsers();
    }, [])
    const fetchSocietys = async() =>{
        try{
            const data= await SocietiesAPI.findAll();
           
            setSocietys(data);
            
           
           
           
          

        }catch(error){
            
            //TODO : notif
            console.log(error.response);

        }

    }
    useEffect(()=>{
        fetchSocietys();
    }, [])

 // gestion des changment des inputs dans le formulaire
 const handleChange =({ currentTarget }) =>{
    const { name, value} = currentTarget;
    setContrat({ ...contrat, [name]: value });
    
};
    const handleSubmit = async event => {
        event.preventDefault();
     
      try{
          if (contrat.contractCode!="" && contrat.post!="" && contrat.salaire!="" && contrat.society!="" && contrat.status!="" && contrat.typeContract!="" && contrat.user!="" && contrat.startdate!=""){
            await ContratsAPI.create(contrat);
            toast.success("le contrat a etait crée");
          }
          else{
       
        
            toast.warning("le formulaire n'ai pas roumpler");
        
        
       
      
        
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
    <h3>création de contrat</h3>
    <form onSubmit={handleSubmit}>
  
    <Select name="user" label="Personne" value={contrat.user} error= {errors.user}  onChange={handleChange}>
    <option> personne</option>
          {users.map(user => 
          <option key={user.id} value={user.id}>
              {user.fName}{user.lName}</option>)}
        </Select>
        <Select name="society" label="societe" value={contrat.society} error={errors.society}  onChange={handleChange}>
        <option> societe</option>
          {societys.map(société => 
          <option key={société.id} value={société.id}>
              {société.nom}</option>)}
        </Select>
        <Field 
        name="startdate" 
        label="date de debut" 
        type="text"
        placeholder="yyyy/mm/dd" 
        onChange={handleChange}
        value={contrat.startdate}
        error= {errors.startdate}
        />
        
        <Field 
        name="endDate" 
        label="date de fin" 
        type="text"
        placeholder="yyyy/mm/dd" 
        onChange={handleChange}
        value={contrat.endDate}
        error= {errors.endDate}
        />
        <Field 
        name="salaire" 
        label="salaire" 
        type="number"
        placeholder="salaire" 
        onChange={handleChange}
        value={contrat.salaire}
        error= {errors.salaire}
        />

    <Select name="post" label="poste" value={contrat.post} error={errors.post}  onChange={handleChange}>
    <option> poste</option>
          {posts.map(post => 
          <option key={post.id} value={post.id}>
              {post.post}</option>)}
        </Select>

        <Select name="typeContract" label="type de contrat" value={contrat.typeContract} error={errors.typeContract}  onChange={handleChange}>
        <option> type de contrat</option>
          {typeContracts.map(type => 
          <option key={type.id} value={type.id}>
              {type.type}</option>)}
        </Select>
      
        <Select name="status" label="status" value={contrat.status} error={errors.status}  onChange={handleChange}>
        <option> status</option>
          {status.map(stat => 
          <option key={stat.id} value={stat.id}>
              {stat.status}</option>)}
        </Select>
        <Field 
        name="discription" 
        label="discription" 
        type="text"
        placeholder="discription" 
        onChange={handleChange}
        value={contrat.discription}
        error= {errors.discription}
        />
          <Field 
        name="membership" 
        label="appartenance" 
        type="text"
        placeholder="ex : interne" 
        onChange={handleChange}
        value={contrat.membership}
        error= {errors.membership}
        />
         <Field 
        name="contractCode" 
        label="reference" 
        type="text"
        placeholder="ex : cdi1112020" 
        onChange={handleChange}
        value={contrat.contractCode}
        error= {errors.contractCode}
        />

    <div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/contracts" className="btn btn-link"> Retour aux contrats</Link>
        </div>
      
      </form>
        </div>
    </> );
}
 
export default ContratPage;