import React, { useState, useEffect } from 'react';
import Field from './../components/forms/Field'

import { Link } from 'react-router-dom';


import SocietiesAPI from "../services/SocietiesAPI";
import { toast } from 'react-toastify';




const SocietiePage = (props) => {
    const [societie,setSocietie]=useState({
        nom:"",
        adress1:"",
        adress2:"",
        zipcode:"",
        city:"",
        phoneNumber:"",
        email:"",
        contactPerson:""

    });
    const [errors,setError]=useState({
        nom:"",
        adress1:"",
        adress2:"",
        zipcode:"",
        city:"",
        phoneNumber:"",
        email:"",
        contactPerson:""

    });


    const handleSubmit = async event => {
        event.preventDefault();
        
         try{
             if ( societie.nom !="" && societie.adress1 !="" && societie.zipcode !="" &&  societie.city != "", societie.phoneNumber != ""&& societie.email != "", societie.contactPerson != ""){
           
            await SocietiesAPI.create(societie);
            toast.success("societie ajoutée");
             }
             else{
                toast.warning("Societie non ajouté il manque des information");

             }
        

         }catch({ response }){
             console.log(response);
           const {violations} =response.data;
   
           if(violations){
               
               const apiErrors = {};
               violations.forEach(({propertyPath, message}) =>{
                   apiErrors[propertyPath]= message;
               });
               setError(apiErrors)
           }
         }
         
       };
       const handleChange =({ currentTarget }) =>{
        const { name, value} = currentTarget;
        setSocietie({ ...societie, [name]: value });
        
    };



    return ( <>
    
    <div className="container pt-5 haut">
     <h3>ajouter une societie</h3>

      
      <form onSubmit={handleSubmit}>
      <Field name ="nom" 
        type="text"
        label="Nom de la societie" 
        placeholder="ex : BipRax 1" 
        onChange={handleChange} 
        value={societie.nom}
        error={errors.nom} 
        />
         <Field name ="adress1" 
        type="text"
        label="Adress" 
        placeholder="ex: 1 rue jean le bas" 
        onChange={handleChange} 
        value={societie.adress1}
        error={errors.adress1} 
        />
        <Field name ="adress2" 
        type="text"
        label="compliment d'adress" 
        placeholder="ex: apt 49" 
        onChange={handleChange} 
        value={societie.adress2}
        error={errors.adress2} 
        />
         <Field name ="zipcode" 
        type="text"
        label="Code postal" 
        placeholder="ex: 75018" 
        onChange={handleChange} 
        value={societie.zipcode}
        error={errors.zipcode} 
        />
        <Field name ="city" 
        type="text"
        label="ville" 
        placeholder="ex: Paris" 
        onChange={handleChange} 
        value={societie.city}
        error={errors.city} 
        />
        
        <Field name ="phoneNumber" 
        type="text"
        label="numero de téléphone" 
        placeholder="ex: +33000000000" 
        onChange={handleChange} 
        value={societie.phoneNumber}
        error={errors.phoneNumber} 
        />
         <Field name ="email" 
        type="text"
        label="Adress mail" 
        placeholder="ex: biprax@biprax.fr" 
        onChange={handleChange} 
        value={societie.email}
        error={errors.email} 
        />
           <Field name ="contactPerson" 
        type="text"
        label="personne a contacter" 
        placeholder="ex: biprax@biprax.fr" 
        onChange={handleChange} 
        value={societie.contactPerson}
        error={errors.contactPerson} 
        />

<div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/societies" className="btn btn-link"> Retour aux societies</Link>
        </div>





</form>
    
    
    
    
</div>
    
    </> );
}
 
export default SocietiePage;