import React,{useEffect,useState} from 'react';
import UsersAPI from '../services/UsersAPI';
import {Link} from "react-router-dom";
import TableLoader from '../components/loaders/TableLoader';
import { toast } from 'react-toastify';
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';





const UsersPage = (props) => {
    const [role ,setRole] = useState([]);
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(true);
    const fatchUser = async () =>{
        try{
        const data =await UsersAPI.findAll();
        setUsers(data);
        setLoading(false);
        
    }catch(error){
        console.log(error.response);
        
    }

    };

    useEffect(()=>{
        fatchUser();

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
        const originaleUsers =[...users];
        setUsers(users.filter(user => user.id !== id));
        try{
            await UsersAPI.delete(id);
            toast.info("Le compte est supprimer");
 
        }catch(error){
            console.log(error.response);
            setUsers(originaleUsers);
 
        }
 
    };
 
   
    return ( <>
    <div className="container pt-5 haut">
    <div className="mb-3 d-flex justify-content-between align-items-center">
    <h1>Les Utilisateur</h1>
    {role=="ROLE_ADMIN" && <Link to ="/users/new" className="btn btn-primary">Créer un user</Link>}

    </div>
    <table className="table table-hover">
        <thead>
            <tr>
                <th>Prenom</th>
                <th>Nom</th>
                <th>email</th>
                <th>Numero de telephone</th>
                <th>Adress</th>
                <th>Ville</th>
                <th>Code postal</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        {!loading && <tbody>
                {users.map(user => 
                <tr key={user.id}>
                    <td>{user.fName}</td>
                    <td>{user.lName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.adress1}</td>
                    <td>{user.city}</td>
                    <td>{user.zipCode}</td>
                    <td>
                    {role=="ROLE_ADMIN" && <button disabled={user.contracts.length>0 } className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)} >supprimer</button>}
                    </td>
                    <td></td>
                </tr> 
                )}
            
        </tbody>}
        

    </table>
    {loading && <TableLoader/>}
    </div>
    </> );
    
}
 
export default UsersPage;