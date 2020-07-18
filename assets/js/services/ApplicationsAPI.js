import axios from "axios";
import {APPLICATION_URL} from "../config";


function findAll(){

    return axios
    .get(APPLICATION_URL)
    .then(response => response.data['hydra:member']);
}


function deleteApplication(id){
    return  axios
    .delete(APPLICATION_URL+"/"+id);


}
function create(application){
    var date = new Date()
            var gsm =date.getTimezoneOffset() / 60;
            date=date.toISOString().slice(0, 19);
    return axios.post(APPLICATION_URL, {...application, dateOfIssus: `${date+gsm}:00`});
    
}
export default {
    findAll: findAll,
    delete: deleteApplication,
    create
}