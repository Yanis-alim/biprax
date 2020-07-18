import React,{ useState, useEffect } from 'react';
import Field from './../components/forms/Field';
import Select from './../components/forms/Select';
import AbsencesAPI from '../services/AbsencesAPI';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';
import UsersAPI from "../services/UsersAPI";


const Absence = ({history,match}) => {
    const {id ="new"} = match.params;
    const [editing,setEditing]=useState(false);
    const [role ,setRole] = useState([]);
    const [absences,setAbsences]=useState({
        etat:"encour",
        discription:"",
        startDate:"",
       
        endDate:"",
        type:""

    });
    const [errors,setError]=useState({
        etat:"",
        discription:"",
        startDate:"",
        endDate:"",
        type:""

    });

    const getRole = async () =>{
        if(AuthAPI.getToken()!=null){
        const tokens = AuthAPI.getToken();
        const decoded = jwt_decode(tokens);
        const data =await UsersAPI.find(decoded.username);
        console.log(data[0].roles)
        setRole(data[0].roles);
        };
       
      }
      useEffect(()=>{
      getRole();
      },[]);
      

    const handleChange =({ currentTarget }) =>{
        const { name, value} = currentTarget;
        setAbsences({ ...absences, [name]: value });
        
    };
    const fetchAbsence  =async id =>{
        try{
            const { etat ,type ,discription ,startDate,endDate} = await AbsencesAPI.find(id);

            setAbsences({ etat ,type ,discription ,startDate,endDate});

        }
        catch(error){
            console.log(error.response);
            

        }

    };
    useEffect(()=>{
        if (id !== "new"){
            setEditing(true);
            fetchAbsence(id);

        }

    },[id])
   
   
    const handleSubmit = async event => {
        event.preventDefault();
        
         try{
            if (editing){
                await AbsencesAPI.update(id, absences);
                toast.success("votre demande  a etait mise a jour");
                history.replace("/absences");
               
            }
            else{
           await AbsencesAPI.create(absences);
           history.replace("/absences");
            toast.success("demande envoyer ")}
           
         }catch({ response }){
             console.log(response);
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

<section className="main-image">
      
      <div className="imagemain">
          <h1 className="titel">
            <span><span>Mes Absences  !! </span></span></h1>
         

          
  

  </div>

  </section>
  <div className="container pt-5">
    
    {editing && <h1>Modifiction d'une Demande</h1> || <h1>Demande de congés</h1> }

    <form onSubmit={handleSubmit}>
                  {role=="ROLE_ADMIN" && <div>      {editing &&
                        <Select name="etat" label="Etat" value={absences.etat} error={errors.etat}  onChange={handleChange}>
                            
                            
                        <option> Etat</option>
                        <option value="encour">encour</option>
                        <option value="valider"> validé</option>
                        <option value="refuser"> refusé</option>


                    
                    </Select>} </div> }
    <Field 
            name="startDate" 
            label="Date de debut" 
            type="text"
            placeholder="yyyy/mm/dd" 
            onChange={handleChange}
            value={absences.startDate}
            error= {errors.startDate}
            />
            <Field 
            name="endDate" 
            label="Date de fin" 
            type="text"
            placeholder="yyyy/mm/dd" 
            onChange={handleChange}
            value={absences.endDate}
            error= {errors.endDate}
            />
          <Select name="type" label="type" value={absences.type} error={errors.type}  onChange={handleChange}>
        
        
                <option> type</option>
                <option value="conger payer">conger payer</option>
                <option value="RTT"> RTT</option>
                <option value="absance"> Absence</option>
          
        
             
           </Select>
           <Field 
            name="discription" 
            label="Discription" 
            type="text"
            placeholder="..." 
            onChange={handleChange}
            value={absences.discription}
            error= {errors.discription}
            />

             <div className="from-group">
            <button type="submit" className="btn btn-success">
                envoyer
                </button>
                <Link to="/absences" className="btn btn-link"> Retour a mes absences</Link>
        </div>

</form>


<table className="table table-hover">
   <thead>
       <tr>
           <th>conger payé</th>
           <th>RTT</th>
           <th></th>
       </tr>
   </thead>
   <tbody>
       <tr>
           <td></td>
           <td></td>
           <td></td>
       </tr>
   </tbody>

</table>

           </div>

    </> );
}
 
export default Absence;