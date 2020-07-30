import React,{useEffect,useState} from 'react';
import AbsencesAPI from "../services/AbsencesAPI";
import { Link } from 'react-router-dom';
import UsersAPI from "../services/UsersAPI";
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import moment from "moment";


const AbsencesPage = (props) => {
    const [absenses ,setAbsenses] = useState([]);
    const [role ,setRole] = useState([]);
    const [sup,setSup] =useState(false);
    const [util,setUtil]=useState([]);

    const fetchAbsences= async () => {
        try{
            var a =0;
          const data =await AbsencesAPI.findAll();
           
          setAbsenses(data);
          
    
        }
        catch(error){
          console.log(error.response);
    
        }
        
       }
       useEffect(()=>{
        fetchAbsences();
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
            const originaleAbsences =[...absenses];
            setAbsenses(absenses.filter(absense => absense.id !== id));
            try{
                await AbsencesAPI.delete(id);
                toast.info("La demande est supprimer");
                setSup(false);
     
            }catch(error){
                console.log(error.response);
                setAbsenses(originaleAbsences);

     
            }
     
        };
        const supr = (absence)=>{
            setSup(true);
            setUtil(absence);
      
        }
        const formatDate = (str) => moment (str).format('DD/MM/YYYY');
    return ( <>
    <section className="main-image">
      
      <div className="imagemain">
          <h1 className="titel">
            <span><span>Mes Absences  !! </span></span></h1>
         

          
  

  </div>

  </section>
     <div className="container pt-5">
    
    <div className="mb-3 d-flex justify-content-between align-items-center">
       <h1>Liste des demande d'absence</h1>
        <Link to ="/absences/new" className="btn btn-primary">Demande d'une absence</Link>

       </div>
        
        <table className="table table-hover">
           <thead>
               <tr>
                   <th>nom </th>
                   <th>Type</th>
                   <th>Date de debut</th>
                   <th>Date de fin</th>
                   <th>Description</th>
                   <th> Etat</th>
                   <th></th>
                   <th></th>
                
               </tr>
           </thead>
           <tbody>
               {absenses.map(absense => <tr key={absense.id}>
                   <td> {absense.user.lName}  {absense.user.fName}   </td>
                   <td>{absense.type}</td>
                   <td>{formatDate(absense.startDate)}</td>
                   <td>{formatDate(absense.endDate)}</td>
                   <td>{absense.description}</td>
                   {absense.etat=="en cours de traitement" && <td className="text-warning">en cours de traitement</td>}
                   {absense.etat=="valider" && <td className="text-success">validé</td>}
                   {absense.etat=="refuser" && <td className="text-danger">refusé</td>}
                  
                  <td>
              <button  disabled={role !="ROLE_ADMIN" && absense.etat !="en cours de traitement"  }
                        onClick={() =>supr(absense)}
                        className="btn btn-sm btn-danger"> Supprimer</button>
            </td>
            {<td><Link to={"/absences/"+absense.id}  className="btn btn-sm btn-primary "><button  disabled={role !="ROLE_ADMIN" && absense.etat !="en cours de traitement"  } className="btn btn-sm btn-primary" >Editer</button></Link></td>}
                   
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
                                      <p>voulez vous supprimer l'absence: {util.user.fName} {util.user.lName}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(util.id) }>Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setSup(false) }>Fermer</button>
                                </div>
                                </div>
                            </div>
                            </div>}
    
    </div>
    
    
    </>
         );
}
 
export default AbsencesPage;