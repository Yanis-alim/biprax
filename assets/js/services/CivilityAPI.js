import axios from "axios";
import {CIVILITY_URL} from "../config";

function findAll(){

    return axios
    .get(CIVILITY_URL)
    .then(response => response.data['hydra:member']);
}


function deleteCivility(id){
    return  axios
    .delete(CIVILITY_URL+"/"+id);


}
export default {
    findAll: findAll,
    delete: deleteCivility
}