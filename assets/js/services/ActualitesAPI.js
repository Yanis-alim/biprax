import axios from "axios";
import {ACTUALITES_URL} from "../config";

function findAll(){

    return axios
    .get(ACTUALITES_URL)
    .then(response => response.data['hydra:member']);
}


function deleteActualite(id){
    return  axios
    .delete(ACTUALITES_URL+"/"+id);


}
function create(actualite){
    var date = new Date()
            var gsm =date.getTimezoneOffset() / 60;
            date=date.toISOString().slice(0, 19);
    return axios.post(ACTUALITES_URL, {...actualite, dateofissue: `${date+gsm}:00`});
    
}
export default {
    findAll: findAll,
    delete: deleteActualite,
    create

}