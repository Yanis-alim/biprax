import axios from "axios";
import {MISSION_URL} from "../config";


function findAll(){

    return axios
    .get(MISSION_URL)
    .then(response => response.data['hydra:member']);
}


function deleteMission(id){
    return  axios
    .delete(MISSION_URL+"/"+id);


}
export default {
    findAll: findAll,
    delete: deleteMission
}