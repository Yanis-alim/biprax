import axios from "axios";
import {CALANDER_URL} from "../config";

function findAll(){

    return axios
    .get(CALANDER_URL)
    .then(response => response.data['hydra:member']);
}



function find(mois,annee){
    return axios.get(CALANDER_URL+"?monthOfYear=" + mois+"&&idCalendarYears="+annee)
    .then(response => response.data['hydra:member']);
}



export default {
    findAll: findAll,
    find
}
