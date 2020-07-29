import React,{useEffect,useState} from 'react';
import UsersAPI from '../services/UsersAPI';
import {Link} from "react-router-dom";
import TableLoader from '../components/loaders/TableLoader';
import { toast } from 'react-toastify';
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';






const UsersPage = ({history}) => {
    const [role ,setRole] = useState([]);
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(true);
    const [sup,setSup] =useState(false);
    const [util,setUtil]=useState([]);
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
        
        setRole(data[0].roles);
        };
       
      }
      useEffect(()=>{
      getRole();
      },[]);
    
      const supr = (user)=>{
        setSup(true);
        setUtil(user);
  
    }
    const handleDelete = async id =>{
        const originaleUsers =[...users];
        setUsers(users.filter(user => user.id !== id));
        try{
            

           
             
            await UsersAPI.delete(id);
            
            toast.info("Le compte est supprimer");
            setSup(false);
 
        }catch(error){
            toast.warning("l'utilisateur n'est pas supprimer il'a  des rapports ou missions de l'utilisateur ");
            console.log(error.response);
            setUsers(originaleUsers);
            setSup(false);
 
        }
 
    };
 
   
    return ( <>
    <div className="container pt-5 haut">
    <div className="mb-3 d-flex justify-content-between align-items-center">
    <h1>Les Utilisateur</h1>
     <Link to ="/users/new" className="btn btn-primary">Créer un user</Link>

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
                    {role=="ROLE_ADMIN" && <button disabled={user.contracts.length>0 || user.cras.length>0} className="btn btn-sm btn-danger" onClick={() => supr(user)} >supprimer</button>}
                   
                    </td>
                    
                    <td>  { sup==true && <div className="modal" tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Suppression</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setSup(false)}>
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                      <p>voulez vous supprimer cette utilisateur: {util.fName} {util.lName}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(util.id) }>Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setSup(false) }>Fermer</button>
                                </div>
                                </div>
                            </div>
                            </div>}</td>
                </tr> 
                
                )}
            
        </tbody>}
        

    </table>
  
    {loading && <TableLoader/>}
    </div>
    </> );
    
}
 
export default UsersPage;