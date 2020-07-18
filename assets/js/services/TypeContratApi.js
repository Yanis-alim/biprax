import axios from "axios";
import {TYPECONTRAT_URL} from "../config";


function findAll(){

    return axios
    .get(TYPECONTRAT_URL)
    .then(response => response.data['hydra:member']);
}

function deletetypeC(id){
    return  axios
    .delete(TYPECONTRAT_URL+"/"+id);


}
function create(type){
   
    return axios.post(TYPECONTRAT_URL, type);
    
}
export default {
    findAll: findAll,
    delete: deletetypeC,
    create
}