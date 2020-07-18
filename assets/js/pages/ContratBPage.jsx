import React, { useState, useEffect } from 'react';

import CustomersAPI from "../services/CustomersAPI";
import ContrartB2BAPI from "../services/ContrartB2BAPI";
import SocietiesAPI from "../services/SocietiesAPI";
import Select from './../components/forms/Select';
import Field from './../components/forms/Field'
import Compte from './Compte';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ContratBPage = (props) => {


  

    const [contrat,setContrat]=useState({
        starrDate:"",
        endDate:"",
        Ref:"",
        customer:"",
        contactPerson:"",
        signataire:"",
        type:"",
        society:""
        


    });  
    const [errors,setError]=useState({
        starrDate:"",
        endDate:"",
        Ref:"",
        customer:"",
        contactPerson:"",
        signataire:"",
        type:"",
        society:""

    });
 
    
    const [customers,setCustomers]=useState([]);
    const [societys,setSocietys]=useState([]);
   
    const fetchCustomers = async() =>{
        try{
            const data= await CustomersAPI.findAll();
           
            setCustomers(data);
        
        }catch(error){
            
            //TODO : notif
            console.log(error.response);

        }

    }
    useEffect(()=>{
        fetchCustomers();
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
          if(contrat.Ref !="" && contrat.starrDate !="" && contrat.contactPerson !="" && contrat.signataire !="" && contrat.type != ""){
            
            await ContrartB2BAPI.create(contrat);
            toast.success("Contrat ajouté");
        }else{
            toast.warning("contrat non ajouté il manque des information");
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
  
    <Select name="customer" label="client" value={contrat.customer} error={errors.customer}  onChange={handleChange}>
        <option> client</option>
          {customers.map(client => 
          <option key={client.id} value={client.id}>
              {client.customer}</option>)}
        </Select>
        <Field 
        name="signataire" 
        label="signataire" 
        type="text"
        placeholder="signataire " 
        onChange={handleChange}
        value={contrat.signataire}
        error= {errors.signataire}
        />
         
        
        <Select name="society" label="societe" value={contrat.society} error={errors.society}  onChange={handleChange}>
        <option> societe</option>
          {societys.map(société => 
          <option key={société.id} value={société.id}>
              {société.nom}</option>)}
        </Select>
        <Field 
        name="starrDate" 
        label="date de debut" 
        type="text"
        placeholder="yyyy/mm/dd" 
        onChange={handleChange}
        value={contrat.starrDate}
        error= {errors.starrDate}
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
        name="Ref" 
        label="Resference" 
        type="text"
        placeholder="reference" 
        onChange={handleChange}
        value={contrat.Ref}
        error= {errors.Ref}
        />
          <Field 
        name="contactPerson" 
        label="Personne a contacté" 
        type="text"
        placeholder="contact" 
        onChange={handleChange}
        value={contrat.contactPerson}
        error= {errors.contactPerson}
        />
        <Field 
        name="type" 
        label="Type du contrat" 
        type="text"
        placeholder="Type " 
        onChange={handleChange}
        value={contrat.type}
        error= {errors.type}
        />
         
        
        

   
      
        
       
    <div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/contract_b2_bs" className="btn btn-link"> Retour aux contrats</Link>
        </div>
      
      </form>
        </div>
    </> );
}
 
export default ContratBPage;