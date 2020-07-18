import React, { useState, useEffect } from 'react';
import TypeContratApi from "../services/TypeContratApi";
import Field from './../components/forms/Field';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TypecontratAdd = (props) => {

    const [typeC,setTypeC]=useState({
        type:""
    });
    const [errors,setError]=useState({
        type:""
    });

    const handleSubmit = async event => {
        event.preventDefault();
        
         try{
           if(typeC.type !=""){
            await TypeContratApi.create(typeC);
            toast.success("Type Contrat ajouté");
        }
        else{
            toast.warning("le type est obligatoire");
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
        setTypeC({ ...typeC, [name]: value });
        
    };
    
    return ( <>
    <div className="container pt-5 haut">
    
    <h3>Ajouté un autre type de contrat</h3>
    <form onSubmit={handleSubmit}>
      <Field name ="type" 
        type="text"
        label="type" 
        placeholder="ex : CDD" 
        onChange={handleChange} 
        value={typeC.type}
        error={errors.type} 
        /> 
        
        
<div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/type_contracts" className="btn btn-link"> Retour aux type de contrat</Link>
        </div>

        </form>
    
    
    </div>
    </> );
}
 
export default TypecontratAdd;