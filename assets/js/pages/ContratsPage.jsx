import React,{useEffect,useState} from 'react';

import Pagination from '../components/Pagination';

import moment from "moment";
import ContratsAPI from "../services/ContratsAPI";
import {Link} from "react-router-dom";
import TableLoader from '../components/loaders/TableLoader';
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';
import UsersAPI from "../services/UsersAPI";
import { toast } from 'react-toastify';



const ContratsPage = (props) => {
    const [role ,setRole] = useState([]);
    const [contrats,setContrats]=useState([]);
    const [sup,setSup] =useState(false);
    const [util,setUtil]=useState([]);
    const supr = (contrat)=>{
        setSup(true);
        setUtil(contrat);
  
    }




    //recuperation des contrats
    const fetchContracts = async ()=>{
        try{
            const data =await ContratsAPI.findAll();
            setContrats(data);
            //setLoading(false);
            

        }catch(error){
            console.log(error.response);

        }
        
    };

    useEffect (()=>{
        fetchContracts();

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
    const handleDelete = async id =>{
        const originalecontrat =[...contrats];
        setContrats(contrats.filter(contrat => contrat.id !== id));
        try{
            await ContratsAPI.delete(id);
            setSup(false);
            toast.success("contrat supprimer");
 
        }catch(error){
            console.log(error.response);
            setContrats(originalecontrat);
            toast.warning("echec de la supprission");
 
        }
 
    };

        // formater la date 
        const formatDate = (str) => moment (str).format('DD/MM/YYYY');
    return ( <>
     <div className="container pt-5 haut">     
    
    <div className="mb-3 d-flex justify-content-between align-items-center">
    <h3>Liste des contrats</h3>
    {role=="ROLE_ADMIN" && <Link to ="/contracts/new" className="btn btn-primary">Créer un contrat</Link>}

       </div>
    <table className="table table-hover">
      <thead>
          <tr>
              <th>id</th>
              <th>personne</th>

              <th>societie</th>
              <th>type de contrat</th>
              <th>poste</th>
              <th>statut</th>
              <th>date de debut</th>
              <th>date de fin</th>
              <th>discription</th>
              <th>reference</th>
              <th>appartenance</th>
              <th></th>
          </tr>
      </thead>
      <tbody>
          {contrats.map(contrat => <tr key={contrat.id}>
              <td>{contrat.id}</td>
              <td>{contrat.user.fName}  {contrat.user.lName}</td>
              <td>{contrat.society.nom}</td>
              <td>{contrat.typeContract.type}</td>
              <td>{contrat.post.post}</td>
              <td>{contrat.status.status}</td>
              <td>{formatDate(contrat.startdate)}</td>
              <td>{formatDate(contrat.endDate)}</td>
              <td>{contrat.discription}</td>
              <td>{contrat.contractCode}</td>
              <td>{contrat.membership}</td>
              {role=="ROLE_ADMIN" && <td><button className="btn btn-sm btn-danger" onClick={() => supr(contrat)}>Supprimer</button></td>}
          </tr>)}
      </tbody>


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
             <p>voulez vous supprimer le contrat B2B: "{util.contractCode}" entre {util.user.fName} {util.user.lName} et {util.society.nom}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(util.id) }>Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setSup(false) }>Fermer</button>
                                </div>
                                </div>
                            </div>
                            </div>}
    </div>
    </> );
}
 
export default ContratsPage;
