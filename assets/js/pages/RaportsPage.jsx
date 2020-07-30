import React,{useEffect,useState} from 'react';

import Pagination from '../components/Pagination';

import moment from "moment";
import RaportsAPI from "../services/RaportsAPI";
import {Link} from "react-router-dom";
import TableLoader from '../components/loaders/TableLoader';
import AuthAPI from '../services/AuthAPI'
import { toast } from 'react-toastify';


const RaportsPage = (isAuthenticated) => {
    const [raports ,setRaports]=useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [loading,setLoading]=useState(true);
    const[consult,setConsult]=useState(false);
    const [util,setUtil]=useState([]);
    const [sup,setSup] =useState(false);
    
   
    const supr = (poste)=>{
        setSup(true);
        setUtil(poste);
  
    }

  
   //recuperation des raports 
    const fetchRaports = async ()=>{
        try{
            const data =await RaportsAPI.findAll();
            setRaports(data);
            setLoading(false);
            

        }catch(error){
            console.log(error.response);

        }
        
    };

    useEffect (()=>{
        fetchRaports();

    },[]);
    


      //Gestion du changement de page 
   const handleChangePage =(page)=>{
    setCurrentPage(page);
  }


  const consulet = (raport)=>{
      setConsult(true);
      setUtil(raport);

  }
  // gestion de la supperission
   const handleDelete = async id =>{
       const originaleRaport =[...raports];
       setRaports(raports.filter(raport => raport.id !== id));
       try{
           await RaportsAPI.delete(id);
           setSup(false);
           toast.success("rapport supprimer")

       }catch(error){
           console.log(error.response);
           setRaports(originaleRaport);
           toast.warning("echec de supprission");

       }

   };

  // nombre d'elements par page 
  const itemPerPage =10;
  
    // pagination des données
    const paginatedRaports = Pagination.getData(raports,currentPage,itemPerPage);


    // formater la date 
    const formatDate = (str) => moment (str).format('DD/MM/YYYY');


    return ( <>
    <div className="container pt-5 haut">
       <div className="mb-3 d-flex justify-content-between align-items-center">
       <h1>Liste des Raports</h1>
       <Link to ="/raports/new" className="btn btn-primary">Créer un raport</Link>

       </div>
        
        <table className="table table-hover">
        <thead>
            <tr>
                <th>Référence Raport</th>
                <th>Auteur</th>
                <th>mission</th>
                <th>titre</th>
                <th>date</th>
                <th>commentaire</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        {!loading && <tbody>
            {paginatedRaports.map(raport =>
             <tr key={raport.id}>
             <td>{raport.id}</td>
             <td>
                 <a href="#">{raport.user.fName} {raport.user.lName}</a></td>
             <td>{raport.mission.title}</td>
             <td>{raport.title}</td>
             <td>{formatDate(raport.dateOfIssue)}</td>
             <td>{raport.note}</td>
             <td>
                 <button className="btn btn-sm btn-danger" onClick={() => supr(raport)}>Supprimer</button>
             </td>
             <td><button className="btn btn-sm btn-primary" onClick={() =>consulet(raport)}>consulter</button></td>
              <td>
                  <Link to={"/raports/"+raport.id} className="btn btn-sm btn-primary ">Editer</Link>
              </td>
              <td>
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
                                      <h4>Rapport : {util.title}</h4>
                                      <p>Mission : {util.mission.title}</p>
                                      <p>Auteur : {util.user.fName} {util.user.lName}</p>
                                      <p>Date : {formatDate(util.dateOfIssue)}</p>
                                      <p>Remarque : {util.note}</p>
                                      <p>Discription : {util.discription}</p>
                                </div>
                                <div className="modal-footer">
                                  
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setConsult(false) }>Fermer</button>
                                </div>
                                </div>
                            </div>
                            </div>}


              </td>
             
         </tr>)}
           
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
             <p>voulez vous supprimer le rapport : {util.title} de {util.user.fName} {util.user.lName}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(util.id) }>Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setSup(false) }>Fermer</button>
                                </div>
                                </div>
                            </div>
                            </div>}
        {loading && <TableLoader/>}
        <Pagination currentPage={currentPage} itemPerPage={itemPerPage} onePageChange={handleChangePage} length={raports.length} />
        </div>
    </> );
}
 
export default RaportsPage;
