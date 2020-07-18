import axios from "axios";
import {ANNONCES_URL} from "../config";

function findAll(){

    return axios
    .get(ANNONCES_URL)
    .then(response => response.data['hydra:member']);
}


function deleteAnnonce(id){
    return  axios
    .delete(ANNONCES_URL+"/"+id);


}
function create(annonce){
    var date = new Date()
            var gsm =date.getTimezoneOffset() / 60;
            date=date.toISOString().slice(0, 19);
    return axios.post(ANNONCES_URL, {...annonce, dateOfIssue: `${date+gsm}:00`});
    
}
export default {
    findAll: findAll,
    delete: deleteAnnonce,
    create
}