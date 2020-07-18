import React,{useEffect,useState} from 'react';
import ActualitesAPI from "../services/ActualitesAPI";
import moment from "moment";
import Pagination from '../components/Pagination';
import TableLoader from '../components/loaders/TableLoader';
import { Link } from 'react-router-dom';
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';
import UsersAPI from "../services/UsersAPI";




const ActualitesPage = (isAuthenticated) => {
  const [role ,setRole] = useState([]);

  const [actualites ,setActualites]=useState([]);
  const [currentPage, setCurrentPage]=useState(1);
  const [loading,setLoading]=useState(true);

   //recuperation des Actualites 
   const fetchActualites = async ()=>{
    try{
        const data =await ActualitesAPI.findAll();
        setActualites(data);
        setLoading(false);
        

    }catch(error){
        console.log(error.response);

    }
    
};

useEffect (()=>{
  fetchActualites();

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


//Gestion du changement de page 
const handleChangePage =(page)=>{
  setCurrentPage(page);
}
const handleDelete = async id =>{
  const originaleActualites = [...actualites];

  setActualites(actualites.filter(actualite =>actualite.id !==id));

  try{
   await ActualitesAPI.delete(id)

  }
  catch(error){
    setActualites(originaleActualites);
     

  }

};


// nombre d'elements par page 
const itemPerPage =4;
  
// pagination des données
const paginatedActualites = Pagination.getData(actualites,currentPage,itemPerPage);



// formater la date 
const formatDate = (str) => moment (str).format('DD/MM/YYYY');
  
return ( <> 
 <section className="main-image">
      
      <div className="imagemain">
          <h1 className="titel">
            <span><span>L'actualites  !! </span></span></h1>
         

          
  

  </div>

  </section>
  {!loading &&  <div className="container pt-5">
  <div className="mb-3 d-flex justify-content-between align-items-center">
       <h1>Liste des actualites</h1>
       {!isAuthenticated && <div>  {role=="ROLE_ADMIN" &&  <Link to ="/actualites/new" className="btn btn-primary">ajoutée une actualité</Link>}</div>}
</div>

{paginatedActualites.map( actualite => <div  className="actu">
  <h3 className="card-header">{actualite.title}</h3>
  <div className="card-body">
    <h5 className="card-title">{actualite.type}</h5>
    <h6 className="card-subtitle text-muted">{formatDate(actualite.dateofissue)}</h6>
  </div>
  <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Card image"></img>
  <div className="card-body">
    <p className="card-text">{actualite.discription}</p>
    {!isAuthenticated &&<div>  {role=="ROLE_ADMIN" && 
          <button 
           onClick={() =>handleDelete(actualite.id)}
          className="btn btn-sm btn-danger"> Supprimer</button>
        }
  </div>}
  </div>

  </div>)}

  <Pagination currentPage={currentPage} itemPerPage={itemPerPage} onePageChange={handleChangePage} length={actualites.length} />
</div>}
{loading && <TableLoader/>}
</>
);
} 
 
export default ActualitesPage;