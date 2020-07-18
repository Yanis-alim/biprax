import React,{useEffect,useState} from 'react';

import Pagination from '../components/Pagination';
import AnnoncesAPI from "../services/AnnoncesAPI";
import UsersAPI from "../services/UsersAPI";
import TableLoader from '../components/loaders/TableLoader';
import { Link } from 'react-router-dom';
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';



const AnnoncesPage = ({isAuthenticated}) => {
  const [role ,setRole] = useState([]);
    const [annonces ,setAnnonces] = useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [loading,setLoading]=useState(true);
   
  
  
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
        console.log(data[0].roles)
        setRole(data[0].roles);
        };
       
    }
    useEffect(()=>{
      getRole();
      },[]);

    
      // gestion de la suppression d'une annonce
        const handleDelete = async id =>{
        const originaleAnnonce = [...annonces];

        setAnnonces(annonces.filter(annonce =>annonce.id !==id));

        try{
         await AnnoncesAPI.delete(id)

        }
        catch(error){
          setAnnonces(originaleAnnonce);
           

        }
      
    };

   //Gestion du changement de page 
   const handleChangePage =(page)=>{
      setCurrentPage(page);
    }

    // nombre d'elements par page 
    const itemPerPage =8;
   

    // pagination des données
    const paginatedAnnonces = Pagination.getData(annonces,currentPage,itemPerPage);
   
   
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
       {isAuthenticated && <div>  {role=="ROLE_ADMIN" &&  <Link to ="/annonces/new" className="btn btn-primary">Ajoutée une annonce</Link>}</div>}

       </div>
    <table className="table table-hover">
    <thead>
        <tr>
        <th>ref</th>
        <th>titre</th>
        <th>type</th>
        <th>profile</th>
        
        <th>ville</th>
        <th>salaire</th>
        <th>date</th>


        </tr>
    </thead>
    {!loading && <tbody>
        {paginatedAnnonces.map(annonce =>(<tr key={annonce.id}>
        <td className="text-center">{annonce.id}</td>
        <td>{annonce.title}</td>
        <td>{annonce.type} </td>
        <td>{annonce.profile}</td>
        <td>{annonce.city}</td>
        <td className="text-center">{annonce.salary.toLocaleString()}€</td>
        <td>{annonce.dateOfIssue}</td>
        {isAuthenticated && <div> {role=="ROLE_ADMIN" && <td>
          <button 
           onClick={() =>handleDelete(annonce.id)}
          className="btn btn-sm btn-danger"> Supprimer</button>
        </td>}</div>}
        

      </tr>))}


    </tbody>}
    
    
    </table>
    {loading && <TableLoader/>}

    <Pagination currentPage={currentPage} itemPerPage={itemPerPage} length={annonces.length} onePageChange={handleChangePage}/>
    </div>
    
</>);
} 
 
export default AnnoncesPage;