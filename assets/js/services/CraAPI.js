import axios from "axios";
import {CRA_URL} from "../config";

function findAll(){

    return axios
    .get(CRA_URL)
    .then(response => response.data['hydra:member']);
}


function find(user,mois,annee){
    return axios.get(CRA_URL+"?user=api/users/" + user+"&&calendar.monthNameFR="+mois+"&&calendar.idCalendarYears="+annee)
    .then(response => response.data['hydra:member']);
}

function create(cra){
    var date = new Date()
            var gsm =date.getTimezoneOffset() / 60;
            date=date.toISOString().slice(0, 19);
    return axios.post(CRA_URL, {...cra,nbimput: parseFloat(cra.nbimput), calendar: `api/calendar_dates/${cra.calendar}`,imputation: `api/type_imputs/${cra.imputation}`, dateOfIssue: `${date+gsm}:00`});
    
}

export default {
    findAll: findAll,
    find,
    create
}