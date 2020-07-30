import React,{useEffect,useState} from 'react';

import Pagination from '../components/Pagination';

import moment from "moment";
import MissionsAPI from "../services/MissionsAPI";
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';

import TableLoader from '../components/loaders/TableLoader';





const MissionPage = (props) => {

    const [missions,setMissions]=useState([]);
   
    const [currentPage, setCurrentPage]=useState(1);
    const [loading,setLoading]=useState(true);
    const[consult,setConsult]=useState(false);
    const [sup,setSup] =useState(false);
    const [util,setUtil]=useState([]);
   
    const supr = (client)=>{
        setSup(true);
        setUtil(client);
  
    }

  
    //recuperation des missions
     const fetchMissions = async ()=>{
         try{
             const data =await MissionsAPI.findAll();
         setMissions(data);
         setLoading(false);
 
         }catch(error){
             console.log(error.response);
 
         }
         
     };
 
     useEffect (()=>{
        fetchMissions();
 
     },[]);
     
     const consulet = (raport)=>{
        setConsult(true);
        setUtil(raport);
  
    }
 
       //Gestion du changement de page 
    const handleChangePage =(page)=>{
     setCurrentPage(page);
   }
   // gestion de la supperission
    const handleDelete = async id =>{
        const originaleRaport =[...missions];
        setMissions(missions.filter(mission => mission.id !== id));
        try{
            await MissionsAPI.delete(id);
            setSup(false);
            toast.success("mission supprimer");
 
        }catch(error){
            console.log(error.response);
            setMissions(originaleRaport);
            toast.warning("echec de la supprission");
 
        }
 
    };
 
   // nombre d'elements par page 
   const itemPerPage =10;
   
     // pagination des données
     const paginatedMissions = Pagination.getData(missions,currentPage,itemPerPage);
    
 
     // formater la date 
     const formatDate = (str) => moment (str).format('DD/MM/YYYY');
    return ( <>
     <div className="container pt-5 haut" >

     <div className="mb-3 d-flex justify-content-between align-items-center">
     <h1>liste de missions</h1>
       <Link to ="/missions/new" className="btn btn-primary">Créer une mission</Link>
       </div>
    
    
    <table className="table table-hover">
        <thead>
            <tr>
                <th>Référence Mission</th>
                <th>titre</th>
                
                <th>Date de debut </th>
                <th>Date de fin</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        {!loading && <tbody>
            {paginatedMissions.map (mission => 
            <tr key={mission.id}>
                <td>{mission.id}</td>
                <td>{mission.title}</td>
                
                <td>{formatDate(mission.startDate)}</td>
                <td>{formatDate(mission.endDate)}</td>
                <td><button disabled={mission.raports.length > 0} className="btn btn-sm btn-danger" onClick={() =>supr(mission)}>supprimer</button></td>
                <td><button  className="btn btn-sm btn-primary" onClick={() =>consulet(mission)}>consulter</button></td>

            </tr>)}
        </tbody>}



    
    </table>
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
                                      <h4>Mission : {util.title}</h4>
                                      
                                      <p>Date de debut : {formatDate(util.startDate)} </p>
                                      <p>Date de fin  : {formatDate(util.endDate)}</p>
                                      <p>Discription : {util.discription}</p>
                                      <p>liste des intervenants : </p>
                                      {util.user.map(use =><p key={use.id}> - {use.lName} {use.fName}</p>)}
                                </div>
                                <div className="modal-footer">
                                  
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setConsult(false) }>Fermer</button>
                                </div>
                                </div>
                            </div>
                            </div>}
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
             <p>voulez vous supprimer la mission : {util.title}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(util.id) }>Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setSup(false) }>Fermer</button>
                                </div>
                                </div>
                            </div>
                            </div>}
    {loading && <TableLoader/>}
    <Pagination currentPage={currentPage} itemPerPage={itemPerPage} onePageChange={handleChangePage} length={missions.length} />
    </div>
    </> );
}
 
export default MissionPage;