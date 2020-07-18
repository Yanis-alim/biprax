import axios from "axios";
import {SOCIETIES_URL} from "../config";


function findAll(){

    return axios
    .get(SOCIETIES_URL)
    .then(response => response.data['hydra:member']);
}


function deleteSocietie(id){
    return  axios
    .delete(SOCIETIES_URL+"/"+id);


}
function create(societie){
   
    return axios.post(SOCIETIES_URL, societie);
    
}
export default {
    findAll: findAll,
    delete: deleteSocietie,
    create
}