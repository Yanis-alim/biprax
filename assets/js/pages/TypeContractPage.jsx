import React,{useEffect,useState} from 'react';
import TableLoader from '../components/loaders/TableLoader';
import { Link } from 'react-router-dom';


import TypeContratAPI from "../services/TypeContratApi";
const TypeContractPage = (props) => {

    const [contrats ,setContrats]=useState([]);
    const [loading,setLoading]=useState(true);

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
         await TypeContratAPI.delete(id)

        }
        catch(error){
            setContrats(originaleType);
            console.log(error.response);
           

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
           onClick={() =>handleDelete(contrat.id)}
          className="btn btn-sm btn-danger" disabled={contrat.contract.length>0 }> Supprimer</button>
        </td>
            </tr>)}
        </tbody>


    </table>}
    {loading && <TableLoader/>}

    </div>
    
    
    </> );
}
 
export default TypeContractPage;