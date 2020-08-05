import {APPLICATION_URL} from "../config";
import React,{useEffect,useState} from 'react';
import axios from "axios";
import Pagination from '../components/Pagination';
import AnnoncesAPI from "../services/AnnoncesAPI";
import UsersAPI from "../services/UsersAPI";
import TableLoader from '../components/loaders/TableLoader';
import { Link } from 'react-router-dom';
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';
import moment from "moment";
import { toast } from 'react-toastify';
import Field from './../components/forms/Field';
import ApplicationsAPI from "../services/ApplicationsAPI";



const AnnoncesPage = ({isAuthenticated}) => {
  const [role ,setRole] = useState([]);
    const [annonces ,setAnnonces] = useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [loading,setLoading]=useState(true);
    const [sup,setSup] =useState(false);
    const [util,setUtil]=useState([]);
    const [post,setPost]=useState([]);
    const[consult,setConsult]=useState(false);
    const [postul,setPostul]=useState(false);
    const [application,setApplication]=useState({
      fname: "",
      lname: "",
      email: "",
      phoneNumbner: "",
      diploma: "",
      adress1: "",
      adress2: "",
      zipcode: "",
      city: "",
      levelStudy: "",
      work: "",
      
      

});
const [errors,setError]=useState({
  fname: "",
  lname: "",
  email: "",
  phoneNumbner: "",
  diploma: "",
  adress1: "",
  adress2: "",
  zipcode: "",
  city: "",
  levelStudy: "",
  work: ""
  

});
    
   
    const consulet = (annonce)=>{
      setConsult(true);
      setUtil(annonce);

  }
  const postuler =(annonce)=>{
    setPostul(true);
    setPost(annonce);
    
    
    
    
  }
  
    // permet d'aller récupérer les annonnces
   const fetchAnnonces= async () => {
    try{
      const data =await AnnoncesAPI.findAll();

      setAnnonces(data);
      setLoading(false);

    }
    catch(error){
      console.log(error.response);

    }
    
   }
    // au chargemet du composant , on vas chercher les annonces
    useEffect(()=>{
      fetchAnnonces();
      },[]);
      
      const getRole = async () =>{
        if(AuthAPI.getToken()!=null){
        const tokens = AuthAPI.getToken();
        const decoded = jwt_decode(tokens);
        const data =await UsersAPI.find(decoded.username);
    
        setRole(data[0].roles);
        };
       
    }
    useEffect(()=>{
      getRole();
      },[]);











      


const handleSubmit = async event => {
event.preventDefault();

 try{
  var date = new Date()
  var gsm =date.getTimezoneOffset() / 60;
  date=date.toISOString().slice(0, 19);
    await axios.post(APPLICATION_URL, {...application, dateOfIssus: `${date+gsm}:00`, annonce: `/api/annonces/${util.id}`});
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


















    
      // gestion de la suppression d'une annonce
        const handleDelete = async id =>{
        const originaleAnnonce = [...annonces];

        setAnnonces(annonces.filter(annonce =>annonce.id !==id));

        try{
         await AnnoncesAPI.delete(id);
         toast.success("l'annonce est supprimer")
         setSup(false);

        }
        catch(error){
          setAnnonces(originaleAnnonce);
           

        }
      
    };
    const supr = (annonce)=>{
      setSup(true);
      setUtil(annonce);

  }

   //Gestion du changement de page 
   const handleChangePage =(page)=>{
      setCurrentPage(page);
    }

    // nombre d'elements par page 
    const itemPerPage =8;
   

    // pagination des données
    const paginatedAnnonces = Pagination.getData(annonces,currentPage,itemPerPage);
    
    
    const formatDate = (str) => moment (str).format('DD/MM/YYYY');
   
    return ( <> 
     <section className="main-image">
      
      <div className="imagemain">
          <h1 className="titel">
            <span><span>NOS OFFRES </span></span></h1>
         

          
  

  </div>

  </section>
    <div className="container pt-5">
    
    <div className="mb-3 d-flex justify-content-between align-items-center">
       <h1>Liste des Annonces</h1>
         {role=="ROLE_ADMIN" &&  <Link to ="/annonces/new" className="btn btn-primary">Ajoutée une annonce</Link>}

       </div>
    <table className="table table-hover">
    <thead>
        <tr>
        <th>référence</th>
        <th>titre</th>
        <th>type</th>
        <th>profile</th>
        
        <th>ville</th>
        <th>salaire</th>
        <th>date</th>
        {( role=="ROLE_ADMIN") &&<td>flag</td>}
        <td></td>


        </tr>
    </thead>
    {!loading && <tbody>
        {paginatedAnnonces.map(annonce =>(
        
        <tr key={annonce.id}>
        {( role=="ROLE_ADMIN" || annonce.flag==1) &&<td className="text-center">{annonce.id}</td>}
        {( role=="ROLE_ADMIN" || annonce.flag==1)&&<td>{annonce.title}</td> }
       {( role=="ROLE_ADMIN" || annonce.flag==1) && <td>{annonce.type} </td>}
       {( role=="ROLE_ADMIN" || annonce.flag==1) && <td>{annonce.profile}</td>}
       {( role=="ROLE_ADMIN" || annonce.flag==1) &&<td>{annonce.city}</td>}
       {( role=="ROLE_ADMIN" || annonce.flag==1) && <td className="text-center">{annonce.salary.toLocaleString()}€</td>}
       {( role=="ROLE_ADMIN" || annonce.flag==1) && <td>{formatDate(annonce.dateOfIssue)}</td>}
        {( role=="ROLE_ADMIN" ) &&<td>{(annonce.flag==1)&&<div>vrai</div>||<div>faut</div>}</td>}
        {( role=="ROLE_ADMIN" || annonce.flag==1) && <td><button className="btn btn-sm btn-primary" onClick={() =>consulet(annonce)}>consulter</button></td>}
        {( role=="ROLE_ADMIN") && <td>
          <button 
           onClick={() =>supr(annonce)}
          className="btn btn-sm btn-danger"> Supprimer</button>
        </td>}
        {( role=="ROLE_ADMIN") &&<td>
                  <Link to={"/annonces/"+annonce.id} className="btn btn-sm btn-primary ">Editer</Link>
              </td>}
        

      </tr>))}


    </tbody>}
    
    
    </table>
    { sup==true && <div className="modal" tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Suppression</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setSup(false)}>
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                      <p>voulez vous supprimer l'annonce: {util.title}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(util.id) }>Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setSup(false) }>Fermer</button>
                                </div>
                                </div>
                            </div>
                            </div>}
                            { consult==true && <div className="modal" tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{util.title}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setConsult(false)}>
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                      <h4> Annonce : {util.title}</h4>
                                      <p>Type : {util.type}</p>
                                      <p>profile recherché : {util.profile} </p>
                                      <p>Ville : {util.city}</p>
                                      <p>Date: {formatDate(util.dateOfIssue)}</p>
                                      <p>Description : {util.discription}</p>
                                </div>
                                <div className="modal-footer">
                                  
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setConsult(false) }>Fermer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => postuler(util) }>postuler</button>
                                </div>
                                </div>
                            </div>
                            </div>}
                            { postul==true && <div className="modal" tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{util.title}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setConsult(false)}>
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                  <div className="row">
                                    <div className="col-6">
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
        <Field name ="phoneNumbner" 
        type="text"
        label="Numéro de téléphone" 
        placeholder="numéro de téléphone" 
        onChange={handleChange} 
        value={application.phoneNumbner}
        error={errors.phoneNumbner} 
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
        </div>
        <div className="col-6">
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
        </div>
        </div>

     </form>
                                </div>
                                <div className="modal-footer">
                                  
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setConsult(false) }>Fermer</button>
                                   
                                </div>
                                </div>
                            </div>
                            </div>}

    {loading && <TableLoader/>}

    <Pagination currentPage={currentPage} itemPerPage={itemPerPage} length={annonces.length} onePageChange={handleChangePage}/>
    </div>
    
</>);
} 
 
export default AnnoncesPage;