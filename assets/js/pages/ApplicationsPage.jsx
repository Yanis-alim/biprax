import React,{useEffect,useState} from 'react';

import Pagination from '../components/Pagination';
import ApplicationsAPI from "../services/ApplicationsAPI";

import TableLoader from '../components/loaders/TableLoader';
import { Link } from 'react-router-dom';
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';
import UsersAPI from "../services/UsersAPI";



const ApplicationsPage = (props) => {
    const [role ,setRole] = useState([]);



    const [applications ,setApplications] = useState([]);

    // permet d'aller récupérer les condidateurs
   const fetchApplications= async () => {
    try{
      const data =await ApplicationsAPI.findAll();

      setApplications(data);
      

    }
    catch(error){
      console.log(error.response);

    }
    
   }
    // au chargemet du composant , on vas chercher les condidateurs
    useEffect(()=>{
        fetchApplications();
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
        const originaleApplications = [...applications];
      
        setApplications(applications.filter(application =>application.id !==id));
      
        try{
         await ApplicationsAPI.delete(id)
      
        }
        catch(error){
          setApplications(originaleApplications);
           
      
        }
      
      };





    return ( <>
    <div className="container pt-5 haut">

    <h3>liste des condidateurs</h3>
    <table className="table table-hover">
        <thead>
            <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Adress mail</th>
                <th>Téléphone</th>
                <th>Adress</th>
                <th>compliment d'Adress</th>
                <th>code postal</th>
                <th>ville</th>
                <th>dernier diplome</th>
                <th>niveau d'etude</th>
                <th>travaille</th>

                <th>date de condidateurs</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {applications.map(application => <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.fname}</td>
                <td>{application.lname}</td>
                <td>{application.email}</td>
                <td>{application.phoneNumber}</td>
                <td>{application.adress1}</td>
                <td>{application.adress2}</td>
                <td>{application.zipcode}</td>
                <td>{application.city}</td>
                <td>{application.diploma}</td>
                <td>{application.levelStudy}</td>
                <td>{application.work}</td>
              
                <td>{application.dateOfIssus}</td>
                {role=="ROLE_ADMIN" && <td>
          <button 
           onClick={() =>handleDelete(application.id)}
          className="btn btn-sm btn-danger"> Supprimer</button>
        </td>}
            </tr>)}
        </tbody>


    </table>
    </div>
    
    </> );
}
 
export default ApplicationsPage;