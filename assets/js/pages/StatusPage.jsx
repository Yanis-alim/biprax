import React,{useEffect,useState} from 'react';
import StatusAPI from "../services/StatusAPI";
import { Link } from 'react-router-dom';



const StatusPage = (props) => {
    const [statuses ,setStatuses]=useState([]);



    const fetchStatus = async ()=>{
        try{
            const data =await StatusAPI.findAll();
            
            setStatuses(data);
            //setLoading(false);
            

        }catch(error){
            console.log(error.response);

        }
        
    };

    useEffect (()=>{
        fetchStatus();

    },[]);

    const handleDelete = async id =>{
        const originaleStatus =[...statuses];
        setStatuses(statuses.filter(status => status.id !== id));
        try{
            await StatusAPI.delete(id);
 
        }catch(error){
            console.log(error.response);
            setStatuses(originaleStatus);
 
        }
 
    };
    


    return ( <>
    <div className="container pt-5 haut">
    <div className="mb-3 d-flex justify-content-between align-items-center">
       <h1>Liste des types de status</h1>
       <Link to ="/statuses/new" className="btn btn-primary">Ajouté un status</Link>

       </div>
    <table className="table table-hover">
        <thead>
            <tr>
                <th>id </th>
                <th>status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {statuses.map (status => <tr key={status.id}>
                <td>{status.id}</td>
                <td>{status.status}</td>
                <td>
                <button disabled={status.contracts.length>0 } className="btn btn-sm btn-danger" onClick={() => handleDelete(status.id)}>Supprimer</button>
                </td>
            </tr>)}
        </tbody>





    </table>
    
    
    </div>
    </> );
}
 
export default StatusPage;