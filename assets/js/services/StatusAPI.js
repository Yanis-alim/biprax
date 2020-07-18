import axios from "axios";
import {STATUS_URL} from "../config";

function findAll(){

    return axios
    .get(STATUS_URL)
    .then(response => response.data['hydra:member']);
}
function deleteStatus(id){
    return  axios
    .delete(STATUS_URL+"/"+id);


}
function create(status){
   
    return axios.post(STATUS_URL, status);
    
}



export default {
    findAll: findAll,
    delete: deleteStatus,
    create
}