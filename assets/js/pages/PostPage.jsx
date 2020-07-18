import React, { useState, useEffect } from 'react';
import PostsAPI from "../services/PostsAPI";
import Field from './../components/forms/Field';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TypecontratAdd = (props) => {

    const [post,setPost]=useState({
        post:"",
        description:""
    });
    const [errors,setError]=useState({
        post:"",
        description:""
    });

    const handleSubmit = async event => {
        event.preventDefault();
        
         try{
             if(post.post != "" ){
           
            await PostsAPI.create(post);
            toast.success("Poste Ajouté");
        }else{
            toast.warning("le poste est obligatoire");
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
        setPost({ ...post, [name]: value });
        
    };

    return ( <>
    <div className="container pt-5 haut">
    
    <h3>Ajouté un autre type de contrat</h3>
    <form onSubmit={handleSubmit}>
      <Field name ="post" 
        type="text"
        label="Nom du poste:" 
        placeholder="ex : consultant bi" 
        onChange={handleChange} 
        value={post.post}
        error={errors.post} 
        /> 
        <Field name ="description" 
        type="text"
        label="Description:" 
        placeholder="description" 
        onChange={handleChange} 
        value={post.description}
        error={errors.description} 
        /> 
        
        
<div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/posts" className="btn btn-link"> Retour aux type de post</Link>
        </div>

        </form>
    
    
    </div>
    </> );
}
 
export default TypecontratAdd;