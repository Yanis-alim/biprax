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

function create(mission){
    return axios.post(MISSION_URL,{...mission, customer: `/api/customers/${mission.customer}`})
}
export default {
    findAll: findAll,
    delete: deleteMission,
    create
}