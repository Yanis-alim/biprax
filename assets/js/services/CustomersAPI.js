import axios from "axios";
import {CUSTOMERS_URL} from "../config";

function findAll(){

    return axios
    .get(CUSTOMERS_URL)
    .then(response => response.data['hydra:member']);
}


function deleteCustomer(id){
    return  axios
    .delete(CUSTOMERS_URL+"/"+id);


}
function create(customer){
   
    return axios.post(CUSTOMERS_URL, customer);
    
}
export default {
    findAll: findAll,
    delete: deleteCustomer,
    create
}