import React,{useState,useEffect} from 'react';
import UsersAPI from '../services/UsersAPI';

 



const Modal = ({user}) => {
  const [users ,setUsers]= useState([]); 
 
 
  const handleDelete = async user =>{
   
    try{
        console.log(user.fName);
        const data=await UsersAPI.delete(user.id);
        console.log(data);
        toast.info("Le compte est supprimer");

    }catch(error){
        console.log(error.response);
        

    }

};
const fatchUser = async () =>{
    try{
    const data =await UsersAPI.findAll();
    setUsers(data);
    
    
}catch(error){
    console.log(error.response);
    
}

};

useEffect(()=>{
    fatchUser();

},[]);
    return ( 
    
    <div className="modal" tabindex="-1" role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Suppression</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>voulez vous supprimer cette utilisateur</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={() => handleDelete(user) }>Supprimer</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setSup(false) }>Fermer</button>
      </div>
    </div>
  </div>
</div>
    )}
 
export default Modal;