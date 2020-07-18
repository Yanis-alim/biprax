import React,{useEffect,useState} from 'react';
import CalendarAPI from '../services/CalendarAPI';
import TypeImput from '../services/TypeImput';
import CraAPI from '../services/CraAPI';
import UsersAPI from '../services/UsersAPI';
import Select from './../components/forms/Select'


const RapportMensuelActivite = (props) => {


        
        const [imputs ,setImputs] = useState([]);
        const [cras ,setCras] = useState([]);
        const [users ,setUsers]= useState([]);
        const [cra ,setCra]= useState({
           user:"",
           monthNameFR:"",
           idCalendarYears:0
        });
       

       
        
            
            const fatchUsers = async () =>{
                try{
                       
                       
                const data =await UsersAPI.findAll();
                setUsers(data);
               
                
            }catch(error){
                console.log(error.response);
                
            }
        
            };
        
            useEffect(()=>{
                fatchUsers();
        
            },[]);
            const fatchImput = async () =>{
                try{
                       
                       
                       
                        
                const data =await TypeImput.findAll();
                setImputs(data);
               
                
            }catch(error){
                console.log(error.response);
                
            }
        
            };
        
            useEffect(()=>{
                fatchImput();
        
            },[]);
            const handleChange =({ currentTarget }) =>{
                const { name, value} = currentTarget;
                setCra({ ...cra, [name]: value });
                
            };
            
            const handleSubmit = async event => {
                event.preventDefault();
                
                try{
                       
                        
                          
                          
           
           
                       console.log(cra.user);
                       console.log(cra.monthNameFR);
                    const data =await CraAPI.find(cra.user,cra.monthNameFR,cra.idCalendarYears);
                   setCras(data);
                  
                    
            }
           
                 catch({ response }){
                   const {violations} =response.data;
           
                   if(violations){
                       
                       const apiErrors = {};
                       violations.forEach(({propertyPath, message}) =>{
                           apiErrors[propertyPath]= message;
                       });
                       setError(apiErrors)
                   }
                 }
                 
               };
        return ( <>
         <div className="container pt-5 haut">
    
    <h3>Rapport mensuel activite</h3>
    <div className="form-group">
    <form onSubmit={handleSubmit}>
    <Select
           name="user" 
          label="nom " 
          value={cra.user}  
          onChange={handleChange}  
          >
              
               {users.map(use =>( 
               <option key={use.id} value={use.id}>
                   {use.fName}  {use.lName}
                   </option>
                   ))}
                   

          </Select>
          <Select
           name="monthNameFR" 
          label="Mois" 
          value={cra.monthNameFR}  
          onChange={handleChange}  
          >
              
               <option>tout l'année</option>
               <option  value="Janvier   ">
               Janvier   
                   </option>
                   <option  value="Février  ">
               Février  
                   </option>
                   <option  value="Mars      ">
               Mars 
                   </option>
                   <option  value="Avril     ">
               Avril 
                   </option>
                   <option  value="Mai       ">
               Mai  
                   </option>
                   <option  value="Juin      ">
               Juin  
                   </option>
                   <option  value="Juillet   ">
                   Juillet
                   </option>
                   <option  value="Aout     ">
               Aout
                   </option>
                   <option  value="Septembre ">
                   Septembre
                   </option>
                   <option  value="Octobre   ">
                   Octobre
                   </option>
                   <option  value="Novembre  ">
                   Novembre
                   </option>
                   <option  value="Décembre ">
                   Décembre   
                   </option>
                 

          </Select>
          <Select
           name="idCalendarYears" 
          label="Année" 
          value={cra.idCalendarYears}  
          onChange={handleChange}  
          >
              
               <option>tout l'année</option>
               <option  value="2018">
               2018 
                   </option>
                   <option  value="2019">
               2019
                   </option>
                   <option  value="2020">
               2020
                   </option>
                   <option  value="2021">
               2021
                   </option>
                   <option  value="2022">
               2022
                   </option>
                   <option  value="2023">
               2023
                   </option>
                   <option  value="2024">
               2024
                   </option>
                   <option  value="2025">
               2025
                   </option>
                   <option  value="2026">
               2026
                   </option>

                   <option  value="2027">
               2027
                   </option>
                   <option  value="2028">
               2028
                   </option>
                   <option  value="2029">
               2029
                   </option>
                   

          </Select>
          
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
               
        
          </form>


    </div>
    <table className="table table-hover">
           <thead>
                  <tr>
                          
                 <th>jour</th>
                 <th>type d'activity</th>
                 <th>nombre d'imputation</th>
                   </tr>
           </thead>
           <tbody>
           { cras.map (cra => <tr  key={cra.id}>
                  <td key={cra.id}> <h4> {cra.calendar.dayNameOfWeekFR}</h4>  {cra.calendar.dateNameFR}</td>
                  <td>{cra.imputation.activity}</td>
                  <td>{cra.nbimput} </td>
                   </tr>)}
           </tbody>

    </table>
    </div>
        
        
        
        </> );
}
 
export default RapportMensuelActivite;