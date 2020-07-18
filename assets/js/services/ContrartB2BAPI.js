import axios from "axios";
import {CONTRAT_B2B_URL} from "../config";

function findAll(){

    return axios
    .get(CONTRAT_B2B_URL)
    .then(response => response.data['hydra:member']);
}
function create(contrat){
    
    return axios.post(CONTRAT_B2B_URL,{...contrat,society: `api/societies/${contrat.society}` ,customer: `api/customers/${contrat.customer}`});
    
}
function deleteContrat(id){
    return  axios
    .delete(CONTRAT_B2B_URL+"/"+id);


}

export default {
    findAll: findAll,
    delete: deleteContrat,
    create
}