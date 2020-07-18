import React,{useEffect,useState} from 'react';

import Pagination from '../components/Pagination';

import moment from "moment";
import RaportsAPI from "../services/RaportsAPI";
import {Link} from "react-router-dom";
import TableLoader from '../components/loaders/TableLoader';
import AuthAPI from '../services/AuthAPI'


const RaportsPage = (isAuthenticated) => {
    const [raports ,setRaports]=useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [loading,setLoading]=useState(true);

  
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
  // gestion de la supperission
   const handleDelete = async id =>{
       const originaleRaport =[...raports];
       setRaports(raports.filter(raport => raport.id !== id));
       try{
           await RaportsAPI.delete(id);

       }catch(error){
           console.log(error.response);
           setRaports(originaleRaport);

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
             {!isAuthenticated && <td>
                 <button className="btn btn-sm btn-danger" onClick={() => handleDelete(raport.id)}>Supprimer</button>
             </td>}
             <td><button className="btn btn-sm btn-primary">consulter</button></td>
              <td>
                  <Link to={"/raports/"+raport.id} className="btn btn-sm btn-primary ">Editer</Link>
              </td>
             
         </tr>)}
           
        </tbody>}
        </table>
        {loading && <TableLoader/>}
        <Pagination currentPage={currentPage} itemPerPage={itemPerPage} onePageChange={handleChangePage} length={raports.length} />
        </div>
    </> );
}
 
export default RaportsPage;
