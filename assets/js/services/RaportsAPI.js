import axios from "axios";
import {RAPORT_URL} from "../config";

function findAll(){

    return axios
    .get(RAPORT_URL)
    .then(response => response.data['hydra:member']);
}


function deleteRaport(id){
    return  axios
    .delete(RAPORT_URL+"/"+id);


}
function find(id){
    return axios.get(RAPORT_URL+"/" + id)
    .then(response => response.data);
}
function update(id,raport){
    var date = new Date()
            var gsm =date.getTimezoneOffset() / 60;
            date=date.toISOString().slice(0, 19);
    return axios.put(RAPORT_URL+"/" +id , {...raport, mission: `api/missions/${raport.mission}`,dateOfIssue: `${date+gsm}:00`});


}
function findWithMission(idMission){
    return axios.get(RAPORT_URL+"?mission=" + idMission)
    .then(response => response.data);
}
function create(raport){
    var date = new Date()
            var gsm =date.getTimezoneOffset() / 60;
            date=date.toISOString().slice(0, 19);
    return axios.post(RAPORT_URL, {...raport, mission: `api/missions/${raport.mission}`,dateOfIssue: `${date+gsm}:00`});
    
}
export default {
    findAll: findAll,
    delete: deleteRaport,
    find :find,
    findM :findWithMission,
    update,
    create
  
}