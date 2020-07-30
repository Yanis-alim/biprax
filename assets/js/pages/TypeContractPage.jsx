import React,{useEffect,useState} from 'react';
import TableLoader from '../components/loaders/TableLoader';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


import TypeContratAPI from "../services/TypeContratApi";
const TypeContractPage = (props) => {

    const [contrats ,setContrats]=useState([]);
    const [loading,setLoading]=useState(true);
    const [sup,setSup] =useState(false);
    const [util,setUtil]=useState([]);
   
    const supr = (poste)=>{
        setSup(true);
        setUtil(poste);
  
    }

    //recuperation des raports 
    const fetchtype = async ()=>{
        try{
            const data =await TypeContratAPI.findAll();
            setContrats(data);
            setLoading(false);
         
            

        }catch(error){
            console.log(error.response);

        }
        
    };

    useEffect (()=>{
        fetchtype();

    },[]);
   
   
    const handleDelete = async id =>{
        const originaleType = [...contrats];

        setContrats(contrats.filter(contrat =>contrat.id !==id));

        try{
         await TypeContratAPI.delete(id);
         toast.success("type de contart supprimer");
         setSup(false);

        }
        catch(error){
            setContrats(originaleType);
            console.log(error.response);
           toast.warning("echec de la supprission");

        }
      
    };




    return ( <>
     <div className="container pt-5 haut">
     <div className="mb-3 d-flex justify-content-between align-items-center">
       <h1>Liste des types de contart</h1>
       <Link to ="/type_contracts/new" className="btn btn-primary">Ajouté un type de contrat</Link>

       </div>
    {!loading &&  <table className="table table-hover">
        <thead>
          <tr>
                <th>id</th>
                <th>type de contrat</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {contrats.map( contrat=> <tr key={contrat.id}>
                <td>{contrat.id}</td>
                <td>{contrat.type}</td>
               <td> <button 
           onClick={() =>supr(contrat)}
          className="btn btn-sm btn-danger" disabled={contrat.contract.length>0 }> Supprimer</button>
        </td>
            </tr>)}
        </tbody>


    </table>}
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
             <p>voulez vous supprimer ce type de contrat  : {util.type}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(util.id) }>Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setSup(false) }>Fermer</button>
                                </div>
                                </div>
                            </div>
                            </div>}
    {loading && <TableLoader/>}


    </div>
    
    
    </> );
}
 
export default TypeContractPage;