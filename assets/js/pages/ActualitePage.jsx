import React, { useState, useEffect } from 'react';
import Field from './../components/forms/Field';
import Select from './../components/forms/Select';
import { Link } from 'react-router-dom';

import axios from "axios";
import ActualitesAPI from "../services/ActualitesAPI";
import { toast } from 'react-toastify';

const ActualitePage = (props) => {

    const [actualite,setActualite]=useState({
        title:"",
        discription:"",
        imgurl:"",
      
        type:"",
        flag:true

    });
    const [errors,setError]=useState({
        title:"",
        discription:"",
        imgurl:"",
      
        type:"",
        flag:""

    });
    const handleSubmit = async event => {
        event.preventDefault();
        
         try{
            if (actualite.title !="" && actualite.discription !="" ){
            await ActualitesAPI.create(actualite);
            toast.success("Actualité ajoutée")}
            else{
                toast.warning("Actualité non ajouté il manque des information");
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
        setActualite({ ...actualite, [name]: value });
        
    };



    return ( <>
     <div className="container pt-5 haut">
    
     
       

<form onSubmit={handleSubmit}>
    <Field 
            name="title" 
            label="Titre" 
            type="text"
            placeholder="le Titre" 
            onChange={handleChange}
            value={actualite.title}
            error= {errors.title}
            />
            <Field 
            name="type" 
            label="Le type" 
            type="text"
            placeholder="Le type" 
            onChange={handleChange}
            value={actualite.type}
            error= {errors.type}
            />
             <Field 
            name="discription" 
            label="discription :" 
            type="text"
            placeholder="discription " 
            onChange={handleChange}
            value={actualite.discription}
            error= {errors.discription}
            />
              <Field 
            name="imgurl" 
            label="lien pour l'image :" 
            type="text"
            placeholder="lien pour l'image " 
            onChange={handleChange}
            value={actualite.imgurl}
            error= {errors.imgurl}
            />
             <div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/actualites" className="btn btn-link"> Retour aux actualites</Link>
        </div>


</form>
</div>

</> );
}
 
export default ActualitePage;