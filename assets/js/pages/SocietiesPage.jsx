
import React,{useEffect,useState} from 'react';

import SocietiesAPI from "../services/SocietiesAPI";
import Pagination from '../components/Pagination';


import {Link} from "react-router-dom";
import TableLoader from '../components/loaders/TableLoader';
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';
import UsersAPI from "../services/UsersAPI";

const SocietiesPage = (props) => {
    const [role ,setRole] = useState([]);
    const [societies ,setSocieties]=useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [loading,setLoading]=useState(true);




    const fetchSocieties = async ()=>{
        try{
            const data =await SocietiesAPI.findAll() 
            
            setSocieties(data);
            setLoading(false);
            
           
          

        }catch(error){
            console.log(error.response);

        }
        
    };
    useEffect (()=>{
        fetchSocieties();

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
    const handleChangePage =(page)=>{
        setCurrentPage(page);
      }
    const handleDelete = async id =>{
        const originaleSocieties =[...societies];
        setSocieties(societies.filter(societies => societies.id !== id));
        try{
            await SocietiesAPI.delete(id);
 
        }catch(error){
            console.log(error.response);
            setSocieties(originaleSocieties);
 
        }
 
    };

     // nombre d'elements par page 
  const itemPerPage =10;
  
  // pagination des données
  const paginatedSocieties = Pagination.getData(societies,currentPage,itemPerPage);




    return ( <> 
     <div className="container pt-5 haut">
     <div className="mb-3 d-flex justify-content-between align-items-center">
       <h1>Liste des societies</h1>
       {role=="ROLE_ADMIN" && <Link to ="/societies/new" className="btn btn-primary">Ajouté une societie</Link>}
</div>
    {!loading && <table className="table table-hover">
        <thead>
            <tr>
                <th>nom</th>
                <th>contact</th>
                <th>mail</th>
                <th>numero de telephone</th>
                <th>adress</th>
                <th>compliment d'adress</th>
                <th>code postal</th>
                <th>ville</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {paginatedSocieties.map(societies=> <tr key={societies.id}>
                <td>{societies.nom}</td>
                <td>{societies.contactPerson}</td>
                <td>{societies.email}</td>
                <td>{societies.phoneNumber}</td>
                <td>{societies.adress1}z</td>
                <td>{societies.adress2}</td>
                <td>{societies.zipcode}</td>
                <td>{societies.city}</td>
            <td> {role=="ROLE_ADMIN" && <button disabled={societies.contractB2Bs.length>0 || societies.contracts.length>0} className="btn btn-sm btn-danger" onClick={() => handleDelete(societies.id)}>Supprimer</button>}</td>
            </tr>)}
        </tbody>






    </table>}
    {loading && <TableLoader/>}
    <Pagination currentPage={currentPage} itemPerPage={itemPerPage} onePageChange={handleChangePage} length={societies.length} />
    
    
    
    </div>
    
    
    </> 
        
        
        
        
        );

}
 
export default SocietiesPage;