import React , {useState}from 'react';
import AuthAPI from '../services/AuthAPI';
import Field from '../components/forms/Field';
import { toast } from 'react-toastify';
import tel from "./../../image/logo-biprax.png";

const LoginPage = ({ onLogin, history }) => {
    
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""

    });
    const [error, setError]=useState("");

    //gestion des champs
    const handlechange =({currentTarget})=> {
        const {value,name} =currentTarget;

        setCredentials({...credentials, [name]: value});
    };
    //gestion du submit
    const handleSubmit = async event =>{
        event.preventDefault();
        try{
          await AuthAPI.authenticate(credentials);
          setError("");
          onLogin(true);
          toast.success("Vous etes désormais connecté !")
          history.replace("/compte");

       
            

        }
        catch(error){
            
            setError("Aucun compte avec ce nom d'utilisateur ou les information ne correspondent pas !");


        }

        
    }
    return ( <>
    <div className="logimage">

    <div className="container pt-5 haut">
   
    <div className="titrecon">
       
        <img src={tel} className="logo"/>
        <h1>BIPAX CONSULTING</h1>
        </div>
       
       
        <div id="div" className="card bg-light mb-3 log casecon" >
        <h4> Connexion </h4>

        
   
    <form onSubmit={handleSubmit}>
        
            <Field label="Nom d'utilisateur :" name="username" value={credentials.username} onChange={handlechange} placeholder="Nom d'utilisateur" error={error}/>          
            <Field label="Mot de passe :" name="password" value={credentials.password} onChange={handlechange} type="password" placeholder="mot de passe" error=""/>
        
        <div className="from-group">
            <button type="submit" className="btn btn-success">
                je me connecte</button>
                </div>



    </form>
    </div>
    </div>
    </div>
    </> );
};
 
export default LoginPage ;