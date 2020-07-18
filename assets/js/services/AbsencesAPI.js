import axios from "axios";
import {ABSENCES_URL} from "../config";

function findAll(){

    return axios
    .get(ABSENCES_URL)
    .then(response => response.data['hydra:member']);
}
function find(id){
    return axios.get(ABSENCES_URL+"/" + id)
    .then(response => response.data);
}

function deleteAbsence(id){
    return  axios
    .delete(ABSENCES_URL+"/"+id);


}
function update(id,absence){
    var date = new Date()
            var gsm =date.getTimezoneOffset() / 60;
            date=date.toISOString().slice(0, 19);
    return axios.put(ABSENCES_URL+"/" +id , absence);}

function create(absence){
    
    
    return axios.post(ABSENCES_URL, absence);
    
}
export default {
    findAll: findAll,
    delete: deleteAbsence,
    create,
    find,
    update
}