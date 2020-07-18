import React, { useState, useEffect } from 'react';
import CustomersAPI from "../services/CustomersAPI";
import Field from './../components/forms/Field';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CustomerPage = (props) => {


    const [customer,setCustomer]=useState({
        customer:"",
        adress1:"",
        adress2:"",
        zipcode:"",
        city:"",
        phone:"",
        phoneNumber:"",
        email:"",
        ca:"",
        activity:"",
        effectif:"",
        siege:""
    });
    const [errors,setError]=useState({
        customer:"",
        adress1:"",
        adress2:"",
        zipcode:"",
        city:"",
        phone:"",
        phoneNumber:"",
        email:"",
        ca:"",
        activity:"",
        effectif:"",
        siege:""
    });
    const handleSubmit = async event => {
        event.preventDefault();
        
         try{
             if(customer.customer !="" && customer.adress1 !="" && customer.zipcode !="" && customer.city !="" && customer.email !="" ){
           
            await CustomersAPI.create(customer);
            toast.success("Client ajouté");}
            else{
                toast.warning("client non ajouté il manque des information");
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
        setCustomer({ ...customer, [name]: value });
        
    };




    return ( <>
     <div className="container pt-5 haut">
     <h3>crée un client</h3>
     <form onSubmit={handleSubmit}>
     <Field name ="customer" 
        type="text"
        label="Nom de client" 
        placeholder="ex : fnac" 
        onChange={handleChange} 
        value={customer.customer}
        error={errors.customer} 
        />
         <Field name ="adress1" 
        type="text"
        label="Adress" 
        placeholder="ADRESS" 
        onChange={handleChange} 
        value={customer.adress1}
        error={errors.adress1} 
        />
         <Field name ="adress2" 
        type="text"
        label="compliment d'adress" 
        placeholder="ex : aprt 45" 
        onChange={handleChange} 
        value={customer.adress2}
        error={errors.adress2} 
        />
         <Field name ="zipcode" 
        type="text"
        label="Code postal" 
        placeholder="ex : 75018" 
        onChange={handleChange} 
        value={customer.zipcode}
        error={errors.zipcode} 
        />
        <Field name ="city" 
        type="text"
        label="ville" 
        placeholder="ex : paris" 
        onChange={handleChange} 
        value={customer.city}
        error={errors.city} 
        />
        <Field name ="phone" 
        type="text"
        label="téléphone fix" 
        placeholder="fix" 
        onChange={handleChange} 
        value={customer.phone}
        error={errors.phone} 
        />
        <Field name ="phoneNumber" 
        type="text"
        label="téléphone portable" 
        placeholder="téléphone portable" 
        onChange={handleChange} 
        value={customer.phoneNumber}
        error={errors.phoneNumber} 
        />
        <Field name ="email" 
        type="text"
        label="Adress mail" 
        placeholder="email" 
        onChange={handleChange} 
        value={customer.email}
        error={errors.email} 
        />
         <Field name ="ca" 
        type="text"
        label="chiffre d'affaire" 
        placeholder="ex 150k" 
        onChange={handleChange} 
        value={customer.ca}
        error={errors.ca} 
        />
        <Field name ="activity" 
        type="text"
        label="l'activeté du client" 
        placeholder="ex vente " 
        onChange={handleChange} 
        value={customer.activity}
        error={errors.activity} 
        />
        <Field name ="effectif" 
        type="text"
        label="effectif" 
        placeholder="ex 45 " 
        onChange={handleChange} 
        value={customer.effectif}
        error={errors.effectif} 
        />
        <Field name ="siege" 
        type="text"
        label="siege" 
        placeholder="ex paris 8eme " 
        onChange={handleChange} 
        value={customer.siege}
        error={errors.siege} 
        />

<div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/customers" className="btn btn-link"> Retour aux clients</Link>
        </div>




     </form>
     
     
     </div>
     </> );
}
 
export default CustomerPage;