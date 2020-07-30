import React,{useEffect,useState} from 'react';

import Pagination from '../components/Pagination';
import AnnoncesAPI from "../services/AnnoncesAPI";
import UsersAPI from "../services/UsersAPI";
import TableLoader from '../components/loaders/TableLoader';
import { Link } from 'react-router-dom';
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';
import moment from "moment";
import { toast } from 'react-toastify';



const AnnoncesPage = ({isAuthenticated}) => {
  const [role ,setRole] = useState([]);
    const [annonces ,setAnnonces] = useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [loading,setLoading]=useState(true);
    const [sup,setSup] =useState(false);
    const [util,setUtil]=useState([]);
   
  
  
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
         await AnnoncesAPI.delete(id);
         toast.success("l'annonce est supprimer")
         setSup(false);

        }
        catch(error){
          setAnnonces(originaleAnnonce);
           

        }
      
    };
    const supr = (annonce)=>{
      setSup(true);
      setUtil(annonce);

  }

   //Gestion du changement de page 
   const handleChangePage =(page)=>{
      setCurrentPage(page);
    }

    // nombre d'elements par page 
    const itemPerPage =8;
   

    // pagination des données
    const paginatedAnnonces = Pagination.getData(annonces,currentPage,itemPerPage);
    
    
    const formatDate = (str) => moment (str).format('DD/MM/YYYY');
   
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
         {role=="ROLE_ADMIN" &&  <Link to ="/annonces/new" className="btn btn-primary">Ajoutée une annonce</Link>}

       </div>
    <table className="table table-hover">
    <thead>
        <tr>
        <th>référence</th>
        <th>titre</th>
        <th>type</th>
        <th>profile</th>
        
        <th>ville</th>
        <th>salaire</th>
        <th>date</th>
        {( role=="ROLE_ADMIN") &&<td>flag</td>}
        <td></td>


        </tr>
    </thead>
    {!loading && <tbody>
        {paginatedAnnonces.map(annonce =>(
        
        <tr key={annonce.id}>
        {( role=="ROLE_ADMIN" || annonce.flag==1) &&<td className="text-center">{annonce.id}</td>}
        {( role=="ROLE_ADMIN" || annonce.flag==1)&&<td>{annonce.title}</td> }
       {( role=="ROLE_ADMIN" || annonce.flag==1) && <td>{annonce.type} </td>}
       {( role=="ROLE_ADMIN" || annonce.flag==1) && <td>{annonce.profile}</td>}
       {( role=="ROLE_ADMIN" || annonce.flag==1) &&<td>{annonce.city}</td>}
       {( role=="ROLE_ADMIN" || annonce.flag==1) && <td className="text-center">{annonce.salary.toLocaleString()}€</td>}
       {( role=="ROLE_ADMIN" || annonce.flag==1) && <td>{formatDate(annonce.dateOfIssue)}</td>}
        {( role=="ROLE_ADMIN" ) &&<td>{(annonce.flag==1)&&<div>vrai</div>||<div>faut</div>}</td>}

        {( role=="ROLE_ADMIN") && <td>
          <button 
           onClick={() =>supr(annonce)}
          className="btn btn-sm btn-danger"> Supprimer</button>
        </td>}
        {( role=="ROLE_ADMIN") &&<td>
                  <Link to={"/annonces/"+annonce.id} className="btn btn-sm btn-primary ">Editer</Link>
              </td>}
        

      </tr>))}


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
                                      <p>voulez vous supprimer l'annonce: {util.title}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(util.id) }>Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setSup(false) }>Fermer</button>
                                </div>
                                </div>
                            </div>
                            </div>}
    {loading && <TableLoader/>}

    <Pagination currentPage={currentPage} itemPerPage={itemPerPage} length={annonces.length} onePageChange={handleChangePage}/>
    </div>
    
</>);
} 
 
export default AnnoncesPage;