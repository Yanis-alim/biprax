import axios from "axios";
import {CONTRAT_URL} from "../config";

function findAll(){

    return axios
    .get(CONTRAT_URL)
    .then(response => response.data['hydra:member']);
}
function create(contrat){
    const salaire =parseFloat(contrat.salaire);
   
    return axios.post(CONTRAT_URL, {...contrat,salaire: salaire , user: `api/users/${contrat.user}`,status: `api/statuses/${contrat.status}`,typeContract: `api/type_contracts/${contrat.typeContract}`,post: `api/posts/${contrat.post}`,society: `api/societies/${contrat.society}` });
    
}
function deleteContrat(id){
    return  axios
    .delete(CONTRAT_URL+"/"+id);


}

export default {
    findAll: findAll,
    delete: deleteContrat,
    create
}