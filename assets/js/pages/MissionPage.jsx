
import React, { useState, useEffect } from 'react';
import Field from './../components/forms/Field'
import Select from './../components/forms/Select'
import { Link } from 'react-router-dom';
import CustomersAPI from '../services/CustomersAPI';
import axios from "axios";
import { toast } from 'react-toastify';


const MissionPage = ({history}) => {
    const [mission,setMission]=useState({
        title:"",
        discription:"",
        
        customer:"",
        startDate:"",
        endDate:""


    });
    const [errors,setError]=useState({
        title:"",
        discription:"",
        
        customer:"",
        startDate:"",
        endDate:""
    });
    
    const [customers, setCustomer] = useState([]);
   
    const fetchCustomers =async() =>{
        try{
           const data = await CustomersAPI.findAll();
           setCustomer(data);
           if (!mission.customer) setMission({...mission, customer: data[0].id});
           

        }catch(error){
            console.log(error.response);

        }
    }
    

    useEffect(() => {
        fetchCustomers();

    },[])


    const handleChange =({ currentTarget }) =>{
        const { name, value} = currentTarget;
        setMission({ ...mission, [name]: value });
        
        
    };
    const handleSubmit = async event =>{
        event.preventDefault();
        
        try{
            if (mission.title != "" && mission.discription != "" && mission.startDate !=""  ){
            await axios.post("http://localhost:8001/api/missions",{...mission, customer: `/api/customers/${mission.customer}`});
            toast.success("mission ajouté");
            
            history.replace("/missions");

        
        }
    else {
        toast.warning("mission non ajouté il manque des information");
        
    }

     }
        catch(error){
            console.log(error.response);

        }
    };

    return ( <>
    <div className="container pt-5 haut">
    <h1>Ajouter une mission</h1>
     <form onSubmit={handleSubmit}>
         <Field name="title" type="text" placeholder="Titre" label ="Titre" onChange={handleChange} value={mission.title} error={errors.title}/>
         <Field name="discription" 
         type="text" 
         placeholder="discription"
          label ="discription" 
          onChange={handleChange} 
          value={mission.discription} 
          error={errors.discription}/>
         
         
          <Select
           name="customer" 
          label="Clien" 
          value={mission.customer}  
          onChange={handleChange}  
          error={errors.customer}>
              
               {customers.map(customer =>( 
               <option key={customer.id} value={customer.id}>
                   {customer.customer}
                   </option>
                   ))}
                   

          </Select>

          <Field name="startDate" type="text" placeholder="AAAA/MM/JJ" label ="Date du debut" onChange={handleChange} value={mission.startDate} error={errors.startDate}/>
          <Field name="endDate" type="text" placeholder="AAAA/MM/JJ" label ="Date du fin" onChange={handleChange} value={mission.endDate} error={errors.endDate}/>
          <div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/missions" className="btn btn-link"> Retour aux raports</Link>
        </div>
         
     </form>
     </div>
     </>);
}
 
export default MissionPage;