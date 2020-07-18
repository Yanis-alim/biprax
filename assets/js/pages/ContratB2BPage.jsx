import React,{useEffect,useState} from 'react';
import ContrartB2BAPI from "../services/ContrartB2BAPI";
import moment from "moment";
import TableLoader from '../components/loaders/TableLoader';
import { Link } from 'react-router-dom';


const ContratB2BPage = (props) => {
    const [contrats,setContrats]=useState([]);
    const [loading,setLoading]=useState(true);

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
 
        }catch(error){
            console.log(error.response);
            setContrats(originalecontrat);
 
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
                 <td><button className="btn btn-sm btn-danger" onClick={() => handleDelete(contrat.id)}>Supprimer</button></td>
             </tr>)}
         </tbody>


    </table>}
    {loading && <TableLoader/>}
    </div>
    </> );
}
 
export default ContratB2BPage;