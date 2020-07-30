import React, { useState, useEffect } from 'react';
import AnnoncesAPI from "../services/AnnoncesAPI";
import Field from './../components/forms/Field';
import Select from './../components/forms/Select';
import { Link } from 'react-router-dom';

import axios from "axios";

import { toast } from 'react-toastify';


const AnnoncePage = ({history, match }) => {
    const [annonce,setAnnonce]=useState({
        title:"",
        type:"",
       
        discription:"",
        profile:"",
        adress1:"",
        adress2:"",
        zipCode:"",
        city:"",
        salary:"",
        flag:true,
        endDate:null
       




    });
    const {id ="new"} = match.params;
    const [editing,setEditing]=useState(false);
    const [errors,setError]=useState({
        title:"",
        type:"",
        discription:"",
        profile:"",
        adress1:"",
        adress2:"",
        zipCode:"",
        city:"",
        salary:"",
        flag:"",
        endDate:""
      

    });
     //Recuperation de d'un raport
     const fetchAnnonce  =async id =>{
        try{
            const {title,type, discription,profile,adress1,adress2,zipCode,city,salary,flag,endDate} = await AnnoncesAPI.find(id);
           
            setAnnonce({title,type, discription,profile,adress1,adress2,zipCode,city,salary,flag,endDate});

        }
        catch(error){
            console.log(error.response);
            

        }

    };
   

    // Recuperation de  bon raport qaund l'identifiant de l'url change
    useEffect(()=> {
        if (id !== "new"){
            setEditing(true);
            fetchAnnonce(id);

        }

    },[id])

    const handleSubmit = async event => {
        event.preventDefault();
        
         try{
             if(annonce.title != "" && annonce.type !="" && annonce.discription !="" && annonce.profile !="" && annonce.adress1 !="" && annonce.zipCode !="" && annonce.city !="" && annonce.salary !=""){
              if(editing){
                 await AnnoncesAPI.update(id,annonce);
                 toast.success("mise a jour effectué");
                 history.replace("/annonces");
              }
              else{
            await AnnoncesAPI.create(annonce);
            toast.success("Annonce ajoutée");
            history.replace("/annonces");}}
            else{
                toast.warning("Annonce non ajoutée il manque des information");
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
        setAnnonce({ ...annonce, [name]: value });
        
    };



    return ( <> 
     <div className="container pt-5 haut">
     {editing && <h3>modification</h3> || <h3>cree une annonce</h3>}
   
   
   
    <form onSubmit={handleSubmit}>
    {editing &&  <Select name="flag" label="flag" value={annonce.flag}  error={errors.flag} onChange={handleChange}>
    <option  >.</option>
          <option  value={true}>Afficher</option>
          <option value={false}>Ne pas Afficher</option> )
        </Select>}
  
  
    <Field 
        name="title" 
        label="Titre" 
        type="text"
        placeholder="le Titre" 
        onChange={handleChange}
        value={annonce.title}
        error= {errors.title}
        />
        
        <Field 
        name="type" 
        label="type" 
        type="text"
        placeholder="le type" 
        onChange={handleChange}
        value={annonce.type}
        error= {errors.type}
        />
        <Field 
        name="discription" 
        label="discription" 
        type="text"
        placeholder="la discription" 
        onChange={handleChange}
        value={annonce.discription}
        error= {errors.discription}
        />
        <Field 
        name="adress1" 
        label="adress" 
        type="text"
        placeholder="l'adress" 
        onChange={handleChange}
        value={annonce.adress1}
        error= {errors.adress1}
        />
        <Field 
        name="adress2" 
        label="compliment d'adress" 
        type="text"
        placeholder="compliment d'adress" 
        onChange={handleChange}
        value={annonce.adress2}
        error= {errors.adress2}
        />
        <Field 
        name="zipCode" 
        label="code postal" 
        type="text"
        placeholder="le code postal" 
        onChange={handleChange}
        value={annonce.zipCode}
        error= {errors.zipCode}
        />
        <Field 
        name="city" 
        label="Ville" 
        type="text"
        placeholder="la ville" 
        onChange={handleChange}
        value={annonce.city}
        error= {errors.city}
        />
         <Field 
        name="profile" 
        label="le profile" 
        type="text"
        placeholder="la profile" 
        onChange={handleChange}
        value={annonce.profile}
        error= {errors.profile}
        />
         <Field 
        name="salary" 
        label="Salaire" 
        type="text"
        placeholder="le salaire" 
        onChange={handleChange}
        value={annonce.salary}
        error= {errors.salary}
        />
         <Field 
        name="endDate" 
        label="Date de fin" 
        type="text"
        placeholder="ex :2022/01/01" 
        onChange={handleChange}
        value={annonce.endDate}
        error= {errors.endDate}
        />
         
         <div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/annonces" className="btn btn-link"> Retour aux annonces</Link>
        </div>

    </form>
    </div>
    
    </> );
}
 
export default AnnoncePage;