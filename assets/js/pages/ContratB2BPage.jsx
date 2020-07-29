import React,{useEffect,useState} from 'react';
import ContrartB2BAPI from "../services/ContrartB2BAPI";
import moment from "moment";
import TableLoader from '../components/loaders/TableLoader';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const ContratB2BPage = (props) => {
    const [contrats,setContrats]=useState([]);
    const [loading,setLoading]=useState(true);
    const [sup,setSup] =useState(false);
    const [util,setUtil]=useState([]);
    const supr = (contrat)=>{
        setSup(true);
        setUtil(contrat);
  
    }

     //recuperation des contrats
     const fetchContracts = async ()=>{
        try{
            const data =await ContrartB2BAPI.findAll();
            setContrats(data);
            setLoading(false);
            

        }catch(error){
            console.log(error.response);

        }
        
    };

    useEffect (()=>{
        fetchContracts();

    },[]);
    const handleDelete = async id =>{
        const originalecontrat =[...contrats];
        setContrats(contrats.filter(contrat => contrat.id !== id));
        try{
            await ContrartB2BAPI.delete(id);
            setSup(false);
            toast.success("contrat supprimer");
 
        }catch(error){
            console.log(error.response);
            setContrats(originalecontrat);
            toast.success("echec de la supprission");
 
        }
 
    };

        // formater la date 
        const formatDate = (str) => moment (str).format('DD/MM/YYYY');




    return ( <>  <div className="container pt-5 haut">
    <div className="mb-3 d-flex justify-content-between align-items-center">
    <h3>Liste des contrats</h3>
       <Link to ="/contract_b2_bs/new" className="btn btn-primary">Créer un contrat</Link>

       </div>
    {!loading && <table className="table table-hover">
         <thead>
             <tr>
                 <th>id</th>
                 <th>client</th>
                 <th>societe</th>
                 <th>reference</th>
                 <th>date de debut</th>
                 <th>date de fin</th>
                 <th>personne a contacté</th>
                 <th>signataire</th>
                 <th>type</th>
                 <th></th>
             </tr>
         </thead>
         <tbody>
             {contrats.map(contrat => <tr key={contrat.id}>
                 <td>{contrat.id}</td>
                 <td>{contrat.customer.customer}</td>
                 <td>{contrat.society.nom}</td>
                 <td>{contrat.Ref}</td>
                 <td>{formatDate(contrat.starrDate)}</td>
                 <td>{formatDate(contrat.endDate)}</td>
                 <td>{contrat.contactPerson}</td>
                 <td>{contrat.signataire}</td>
                 <td>{contrat.type}</td>
                 <td><button className="btn btn-sm btn-danger" onClick={() => supr(contrat)}>Supprimer</button></td>
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
             <p>voulez vous supprimer le contrat B2B: "{util.Ref}" entre {util.customer.customer} et {util.society.nom}</p>
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
 
export default ContratB2BPage;