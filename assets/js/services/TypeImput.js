import axios from "axios";
import {TYPEIMPUT_URL} from "../config";

function findAll(){

    return axios
    .get(TYPEIMPUT_URL)
    .then(response => response.data['hydra:member']);
}

export default {
    findAll: findAll}