import axios from "axios";
import {USER_URL} from "../config";

function findAll(){

    return axios
    .get(USER_URL)
    .then(response => response.data['hydra:member']);
}
function find(username){
    return axios.get(USER_URL+"?username=" + username)
    .then(response => response.data['hydra:member']);
}


function deleteUser(id){
    return  axios
    .delete(USER_URL+"/"+id);


}
function update(id){
    
    return axios.put(USER_URL+"/" + id,{...user, idcivility: `/api/civilities/${user.idcivility}`, roles: [user.roles]});


}
export default {
    findAll: findAll,
    delete: deleteUser,
    find,
    update
}