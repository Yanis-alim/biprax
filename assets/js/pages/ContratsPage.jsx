import React,{useEffect,useState} from 'react';

import Pagination from '../components/Pagination';

import moment from "moment";
import ContratsAPI from "../services/ContratsAPI";
import {Link} from "react-router-dom";
import TableLoader from '../components/loaders/TableLoader';
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';
import UsersAPI from "../services/UsersAPI";



const ContratsPage = (props) => {
    const [role ,setRole] = useState([]);
    const [contrats,setContrats]=useState([]);




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
        console.log(data[0].roles)
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
 
        }catch(error){
            console.log(error.response);
            setContrats(originalecontrat);
 
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
              {role=="ROLE_ADMIN" && <td><button className="btn btn-sm btn-danger" onClick={() => handleDelete(contrat.id)}>Supprimer</button></td>}
          </tr>)}
      </tbody>


    </table>
    </div>
    </> );
}
 
export default ContratsPage;
