import React,{useEffect,useState} from 'react';
import PostsAPI from "../services/PostsAPI";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostsPage = (props) => {

    const [postes ,setPostes]=useState([]);
    const [sup,setSup] =useState(false);
    const [util,setUtil]=useState([]);
   
    const supr = (poste)=>{
        setSup(true);
        setUtil(poste);
  
    }

    //recuperation des raports 
    const fetchPosts = async ()=>{
        try{
            const data =await PostsAPI.findAll();
            setPostes(data);
           
            

        }catch(error){
            console.log(error.response);

        }
        
    };

    useEffect (()=>{
        fetchPosts();

    },[]);
    const handleDelete = async id =>{
        const originalePostes =[...postes];
        setPostes(postes.filter(poste=> poste.id !== id));
        try{
            await PostsAPI.delete(id);
            setSup(false);
            toast.success("poste supprimer");
 
        }catch(error){
            console.log(error.response);
            setPostes(originalePostes);
            toast.warning("echec de la supprission");
 
        }
 
    };


    
    return ( <>
     <div className="container pt-5 haut">
    < div className="mb-3 d-flex justify-content-between align-items-center">
    <h3>Liste des Posts</h3>
       <Link to ="/posts/new" className="btn btn-primary">Ajouté un type de Poste</Link>

       </div>
    
   
    <table className="table table-hover">
             <thead>
                 <tr>
                     <th>id</th>
                     <th>poste</th>
                     <th>description</th>
                     <th></th>
                 </tr>
             </thead>
             <tbody>
                 {postes.map (poste =>  <tr key={poste.id}>
                     <td>{poste.id}</td>
                     <td>{poste.post}</td>
                     <td>{poste.description}</td>
                     <td>
                     <button disabled={poste.contracts.length>0 } className="btn btn-sm btn-danger" onClick={() => supr(poste)}>Supprimer</button>
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
             <p>voulez vous supprimer ce poste  : {util.post}</p>
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
 
export default PostsPage;