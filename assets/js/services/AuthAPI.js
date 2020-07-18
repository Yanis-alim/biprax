import axios from "axios";
import jwtDecode from "jwt-decode";
import {AUTH_URL} from "../config";

/**
 * Deconnexion (supprission du token du localStorage et sur Axios)
 */
function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"]
    

}
/**
 * Requete HTTP d'authentification et stokage du token dans le storage et Axiose
 * @param {object} credentials 
 */
function authenticate(credentials){
  return  axios
    .post(AUTH_URL,credentials)
    .then(response => response.data.token)
    .then(token => {
         // je stocke le token dans mon localStorage
    window.localStorage.setItem("authToken", token);
    //on previent Axios qu'on a maintenant un header par defaut sur toutes nos futures requetes HTTP
    axios.defaults.headers["Authorization"] = "Bearer " + token;


     
    });
   
 
   
    
}
/**
 * mise en place lors de chargement de l'application
 */
function setup(){
    //1 voir si on a un token
    const token = window.localStorage.getItem("authToken");
    //2 si le token est valide
    if(token){
    const jwtData =jwtDecode(token);
    if (jwtData.exp *1000 > new Date().getTime()){
        axios.defaults.headers["Authorization"] = "Bearer " + token;
        
    }
    }
    
    

}

function getToken(){
    const token = window.localStorage.getItem("authToken");
    if(token!=null){
    return token.toString();
    }
}
/**
 * permet de savoir si on est autentifie ou pas
 * @returns boolean
 */
function isAuthenticated(){
     //1 voir si on a un token
     const token = window.localStorage.getItem("authToken");
     //2 si le token est valide
     if(token){
        const jwtData =jwtDecode(token);
        if (jwtData.exp *1000 > new Date().getTime()){
            return true;}
            return false;
        }
        return false;

}

export default{
    authenticate,
    logout,
    setup,
    isAuthenticated,
    getToken
};