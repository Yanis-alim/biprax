import axios from "axios";
import {POST_URL} from "../config";

function findAll(){

    return axios
    .get(POST_URL)
    .then(response => response.data['hydra:member']);
}
function deletePost(id){
    return  axios
    .delete(POST_URL+"/"+id);


}
function create(post){
   
    return axios.post(POST_URL, post);
    
}

export default {
    findAll: findAll,
    delete: deletePost,
    create

}