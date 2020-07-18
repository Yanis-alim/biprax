import React,{useEffect,useState} from 'react';
import AbsencesAPI from "../services/AbsencesAPI";
import { Link } from 'react-router-dom';
import UsersAPI from "../services/UsersAPI";
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';


const AbsencesPage = (props) => {
    const [absenses ,setAbsenses] = useState([]);
    const [role ,setRole] = useState([]);

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
     
            }catch(error){
                console.log(error.response);
                setAbsenses(originaleAbsences);
     
            }
     
        };

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
                   <th>Type</th>
                   <th>Date de debut</th>
                   <th>Date de fin</th>
                   <th>Description</th>
                   <th> Etat</th>
                   <th></th>
                
               </tr>
           </thead>
           <tbody>
               {absenses.map(absense => <tr key={absense.id}>
                   <td>{absense.type}</td>
                   <td>{absense.startDate}</td>
                   <td>{absense.endDate}</td>
                   <td>{absense.description}</td>
                   {absense.etat=="encour" && <td className="text-warning">encour</td>}
                   {absense.etat=="valider" && <td className="text-success">validé</td>}
                   {absense.etat=="refuser" && <td className="text-danger">refusé</td>}
                  
                  <td>
              <button  disabled={role !="ROLE_ADMIN" && absense.etat !="encour"  }
                        onClick={() =>handleDelete(absense.id)}
                        className="btn btn-sm btn-danger"> Supprimer</button>
            </td>
            {<td><Link to={"/absences/"+absense.id}  className="btn btn-sm btn-primary "><button  disabled={role !="ROLE_ADMIN" && absense.etat !="encour"  } className="btn btn-sm btn-primary" >Editer</button></Link></td>}
                   
               </tr>)}
           </tbody>

        </table>
    
    </div>
    
    
    </>
         );
}
 
export default AbsencesPage;