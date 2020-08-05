import React, { useState, useEffect } from 'react';
import Field from './../components/forms/Field';
import ApplicationsAPI from "../services/ApplicationsAPI";
import { Link } from 'react-router-dom';
import tel from "./../../image/tel.jpg";
import mail from "./../../image/mail.jpg";
import pos from "./../../image/pos.jpg"
import { toast } from 'react-toastify';


const NousContacter = (props) => {
    const [application,setApplication]=useState({
            fname: "",
            lname: "",
            email: "",
            phoneNumber: "",
            diploma: "",
            adress1: "",
            adress2: "",
            zipcode: "",
            city: "",
            levelStudy: "",
            work: ""
            

    });
    const [errors,setError]=useState({
        fname: "",
        lname: "",
        email: "",
        phoneNumber: "",
        diploma: "",
        adress1: "",
        adress2: "",
        zipcode: "",
        city: "",
        levelStudy: "",
        work: ""
        

});

const handleSubmit = async event => {
    event.preventDefault();
    
     try{
       
        await ApplicationsAPI.create(application);
        toast.success("Candidature envoyer");
    

     }catch({ response }){
         toast.warning("error")
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
    setApplication({ ...application, [name]: value });
    
};

    return ( <> 
     <section className="main-image">
      
      <div className="imagemain">
          <h1 className="titel">
            <span><span> NOUS REJOINDRE </span></span></h1>
          <div className="citation">
              <h3 className="titel">Le futur a été créé pour être changé, le futur est entre vos mains </h3>
          
  </div>
  <div className="alaune">
         <Link to ="/annonces" className="btn btn-primary">NOS OFFRES</Link>
          
  </div>
          
  

  </div>

  </section>
    <div className="container pt-5">
    <div >
    
    <div className="mb-3 d-flex justify-content-between align-items-center">
    <div >
    <section className="contacter ">

        
<h2> NOUS CONTACTER </h2>
<p>Nous vous invitons à nous contacter pour plus d’informations :</p>


<div className="row card-body">

<div className="col-md-4">
<svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-telephone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"/>
</svg>
<h3>Téléphone : </h3>
<p>06 67 96 84 32</p>
</div>

<div className="col-md-4">
<svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
</svg>
<h3>Adresse mail: </h3>
<p>contact@biprax.fr</p>
</div>

<div className="col-md-4">
<svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-map" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" d="M15.817.613A.5.5 0 0 1 16 1v13a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 14.51l-4.902.98A.5.5 0 0 1 0 15V2a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0l4.902.98 4.902-.98a.5.5 0 0 1 .415.103zM10 2.41l-4-.8v11.98l4 .8V2.41zm1 11.98l4-.8V1.61l-4 .8v11.98zm-6-.8V1.61l-4 .8v11.98l4-.8z"/>
</svg>
<h3>Adresse:</h3>
<p>	Biprax Consulting
50 Rue Du Simplon 75018 PARIS</p>
</div>


</div>
</section>
        
    </div>
    <div className="formuc">
    <form onSubmit={handleSubmit}>
      <Field name ="fname" 
        type="text"
        label="Nom " 
        placeholder="nom" 
        onChange={handleChange} 
        value={application.fname}
        error={errors.fname} 
        />
        <Field name ="lname" 
        type="text"
        label="Prénom" 
        placeholder=" prénom" 
        onChange={handleChange} 
        value={application.lname}
        error={errors.lname} 
        />
        <Field name ="email" 
        type="text"
        label="Adresse mail" 
        placeholder=" adresse mail" 
        onChange={handleChange} 
        value={application.email}
        error={errors.email} 
        />
        <Field name ="phoneNumber" 
        type="text"
        label="Numéro de téléphone" 
        placeholder="numéro de téléphone" 
        onChange={handleChange} 
        value={application.phoneNumber}
        error={errors.phoneNumber} 
        />
        <Field name ="adress1" 
        type="text"
        label="Adresse" 
        placeholder="adress" 
        onChange={handleChange} 
        value={application.adress1}
        error={errors.adress1} 
        />
        <Field name ="adress2" 
        type="text"
        label="Complément d'adresse" 
        placeholder="complément d'adresse" 
        onChange={handleChange} 
        value={application.adress2}
        error={errors.adress2} 
        />
        <Field name ="zipcode" 
        type="text"
        label="Code postal" 
        placeholder=" code postal" 
        onChange={handleChange} 
        value={application.zipcode}
        error={errors.zipcode} 
        />
        <Field name ="city" 
        type="text"
        label="Ville" 
        placeholder="ville" 
        onChange={handleChange} 
        value={application.city}
        error={errors.city} 
        />
         <Field name ="diploma" 
        type="text"
        label="Dernier diplôme" 
        placeholder=" Dernier diplôme" 
        onChange={handleChange} 
        value={application.diploma}
        error={errors.diploma} 
        />
         <Field name ="levelStudy" 
        type="text"
        label="Niveau d'études" 
        placeholder="niveau d'études" 
        onChange={handleChange} 
        value={application.levelStudy}
        error={errors.levelStudy} 
        />
         <Field name ="work" 
        type="text"
        label="Poste actuel" 
        placeholder="poste actuel" 
        onChange={handleChange} 
        value={application.work}
        error={errors.work} 
        />
        <div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/annonces" className="btn btn-link"> Retour aux annonces</Link>
        </div>
       
     </form>
     </div>
     </div>
    </div>
    <div>
        






    </div>
    </div>
    
    </> );
}
 
export default NousContacter;