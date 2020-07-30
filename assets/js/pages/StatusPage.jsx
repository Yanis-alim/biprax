import React,{useEffect,useState} from 'react';
import StatusAPI from "../services/StatusAPI";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';



const StatusPage = (props) => {
    const [statuses ,setStatuses]=useState([]);
    const [sup,setSup] =useState(false);
    const [util,setUtil]=useState([]);
   
    const supr = (poste)=>{
        setSup(true);
        setUtil(poste);
  
    }



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
            toast.success("status supprimer");
            setSup(false);
 
        }catch(error){
            console.log(error.response);
            setStatuses(originaleStatus);
            toast.warning("echec de la supprission");
 
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
                <button disabled={status.contracts.length>0 } className="btn btn-sm btn-danger" onClick={() => supr(status)}>Supprimer</button>
                </td>
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
             <p>voulez vous supprimer ce status  : {util.status}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(util.id) }>Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setSup(false) }>Fermer</button>
                                </div>
                                </div>
                            </div>
                            </div>}
    
    
    </div>
    </> );
}
 
export default StatusPage;