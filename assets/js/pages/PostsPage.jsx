import React,{useEffect,useState} from 'react';
import PostsAPI from "../services/PostsAPI";
import { Link } from 'react-router-dom';

const PostsPage = (props) => {

    const [postes ,setPostes]=useState([]);

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
 
        }catch(error){
            console.log(error.response);
            setPostes(originalePostes);
 
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
                     <button disabled={poste.contracts.length>0 } className="btn btn-sm btn-danger" onClick={() => handleDelete(poste.id)}>Supprimer</button>
                     </td>
                 </tr>)}
             </tbody>

    </table>
    </div>
</> );
}
 
export default PostsPage;