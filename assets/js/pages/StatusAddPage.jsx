import React, { useState, useEffect } from 'react';
import StatusAPI from "../services/StatusAPI";
import Field from './../components/forms/Field';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TypecontratAdd = (props) => {

    const [status,setStatus]=useState({
        status:""
    });
    const [errors,setError]=useState({
        status:""
    });

    const handleSubmit = async event => {
        event.preventDefault();
        
         try{
           if (status.status != ""){
            await StatusAPI.create(status);
            toast.success("status ajouté");}
            else{
                toast.warning("le status est obligatoire");
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
        setStatus({ ...status, [name]: value });
        
    };

    return ( <>
    <div className="container pt-5 haut">
    
    <h3>Ajouté un autre type de status</h3>
    <form onSubmit={handleSubmit}>
      <Field name ="status" 
        type="text"
        label="Type de status" 
        placeholder="ex : Cadre" 
        onChange={handleChange} 
        value={status.status}
        error={errors.status} 
        /> 
        
        
<div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/statuses" className="btn btn-link"> Retour aux type de status</Link>
        </div>

        </form>
    
    
    </div>
    </> );
}
 
export default TypecontratAdd;