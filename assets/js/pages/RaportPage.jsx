import React, { useState, useEffect } from 'react';
import Field from './../components/forms/Field'
import Select from './../components/forms/Select'
import { Link } from 'react-router-dom';
import MissionsAPI from '../services/MissionsAPI';
import axios from "axios";
import RaportsAPI from "../services/RaportsAPI";
import { toast } from 'react-toastify';

const RaportPage = ({history, match }) => {

    const {id ="new"} = match.params;

    const [raport,setRaport]=useState({
        title:"",
        discription:"",
        note:"",
        mission:""


    });
    const [missions,setMissions]=useState([]);
    const [editing,setEditing]=useState(false);

    const [errors,setError]=useState({
        title:"",
        discription:"",
        mission:""

    });
    //Recuperation de des mission
    const fetchMission = async() =>{
        try{
            const data= await MissionsAPI.findAll();
           
            setMissions(data);
           
            if (!raport.mission ) {
                setRaport({...raport, mission: data[0].id});
            }
           
          

        }catch(error){
            
            //TODO : notif
            console.log(error.response);

        }

    };
    //Recuperation de d'un raport
    const fetchRaport  =async id =>{
        try{
            const { title ,note ,discription , mission} = await RaportsAPI.find(id);

            setRaport({title,note,discription,mission: mission.id});

        }
        catch(error){
            console.log(error.response);
            

        }

    };
   // Recuperation de la liste des mission a chaque chargement
    useEffect(()=>{
        fetchMission();
    }, [])


    // Recuperation de  bon raport qaund l'identifiant de l'url change
    useEffect(()=> {
        if (id !== "new"){
            setEditing(true);
            fetchRaport(id);

        }

    },[id])
    // gestion des changment des inputs dans le formulaire
    const handleChange =({ currentTarget }) =>{
        const { name, value} = currentTarget;
        setRaport({ ...raport, [name]: value });
        
    };


    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
     event.preventDefault();
     
      try{
         if (raport.title != "" && raport.discription != ""){
            
             if (editing){
                await RaportsAPI.update(id, raport);
                toast.success("votre raport a etait mise a jour");
                history.replace("/raports");
               


             }else{
        
     
        await RaportsAPI.create(raport);
        toast.success("votre raport est ajouté")
         
         //TODO : flash notifiction succes
         history.replace("/raports");}
        }else{
            toast.warning("raport non envoyer il manque des information");
            return false;

        }
       

      }catch({ response }){
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
    return ( <>
    <div className="container pt-5 haut">
   {editing && <h1>Modifiction d'un rapport</h1> || <h1>création de Raport</h1> }

    <form onSubmit={handleSubmit}>

        <Field 
        name="title" 
        label="Titre" 
        type="text"
        placeholder="le Titre" 
        onChange={handleChange}
        value={raport.title}
        error= {errors.title}
        />

        <Field name ="note" 
        type="text"
        label="Remarque" 
        placeholder="la Remarque" 
        onChange={handleChange} 
        value={raport.note}
        error={errors.note} 
        />
       
        <Field name ="discription" 
        type="text"
        label="Discription" 
        placeholder="la Discription" 
        onChange={handleChange} 
        value={raport.discription}
        error={errors.discription} 
        />

      
        

        <Select name="mission" label="Mission" value={raport.mission}  error={errors.mission} onChange={handleChange}>
          {missions.map(mission => 
          <option key={mission.id} value={mission.id}>
              {mission.title}</option>)}
        </Select>

        <div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/raports" className="btn btn-link"> Retour aux raports</Link>
        </div>

        


    </form>
    </div>
    
    </>);
}
 
export default RaportPage;