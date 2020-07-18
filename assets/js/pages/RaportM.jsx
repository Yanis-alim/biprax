import React,{useEffect,useState}  from 'react';
import CalendarAPI from '../services/CalendarAPI';
import TypeImput from '../services/TypeImput';
import CraAPI from '../services/CraAPI';
import UsersAPI from '../services/UsersAPI';
import Select from './../components/forms/Select';
import Field from './../components/forms/Field';

const RaportM = (props) => {
  const [days ,setdays] = useState([]);
  const [imputs ,setImputs] = useState([]);
  const [day ,setday] = useState({
    monthOfYear:""
  });
  const [cra ,setCra]= useState({
    calendar:"",
    imputation:"",
    nbimput:0

 });

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

  var annee =new Date();
  annee=annee.getFullYear();
  var date = new Date()
  date =date.getMonth();
  var tab_mois=new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");

  const handleSubmit = async event => {
    event.preventDefault();
    
    try{
           
            
              
              


           
        const data =await CalendarAPI.find(day.monthOfYear,annee);
       setdays(data);
      
        
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
   const handleSubmitc = async event => {
    event.preventDefault();
    
    try{    
      console.log(cra);
        const data =await CraAPI.create(cra);
       console.log(data);
      
        
}

     catch(error){
      console.log(error.response);}
     
   };

   const handleChange =({ currentTarget }) =>{
    const { name, value} = currentTarget;
    setday({ ...day, [name]: value });
    
};
const handleChangec =({ currentTarget }) =>{
  const { name, value} = currentTarget;
  setCra({ ...cra, [name]: value });
  
};

  return (
  
  
  <div className="boddy">
    <div className="tete">
    <h3>Rapport mensuel activite</h3>
    <div className="form-group">
    <form onSubmit={handleSubmit}>
    <Select
           name="monthOfYear" 
          label="Mois" 
          value={day.monthOfYear}  
          onChange={handleChange}  
          >
              <option>Mois</option>
               
               <option  value={date}>
              {tab_mois[date-1]} 
                   </option>
                   <option  value={date+1}>
               {tab_mois[date]}
                   </option>
                   

          </Select>
          <button type="submit" className="btn btn-success">
                envoyer
                </button>
   </form>
   </div>
  
  
  
   <div >
   { days.map (day=> <div  key={day.id}>
   
    
   
    <form   onSubmit={handleSubmitc}  >
     {(day.isDayOff==1 || day.isWeekend==1 ) &&  <div className="cra redd">
      <h4>{day.dayNameOfWeekFR} ,{day.dateNameFR}</h4>
    <Select  name="calendar" label="date" value={cra.calendar}  onChange={handleChangec}>
        
        <option>date</option>
        <option value={day.id}>{day.dateNameFR}</option>
        
 

    
  </Select>
    <Select  name="imputation" label="type d'imputation" value={cra.imputation}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   <Select  name="nbimput" label="nombre" value={cra.nbimput}  onChange={handleChangec}>
        
   <option>nombre de fois</option>
         <option value={0}>0</option>
         <option value={0.5}>0.5</option>
         <option value={1}>1</option>
  

     
   </Select>
   <button type="submit" className="btn btn-success">
                envoyer
                </button>
     </div> ||
     
     
     
     
     
     
     <div className="cra">
    <h4 >{day.dayNameOfWeekFR} , {day.dateNameFR}</h4>
    <Select  name="calendar" label="date" value={cra.calendar}  onChange={handleChangec}>
        
        <option>date</option>
        <option value={day.id}>{day.dateNameFR}</option>
        
 

    
  </Select>
    <Select  name="imputation" label="type d'imputation" value={cra.imputation}  onChange={handleChangec}>
        
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   <Select  name="nbimput" label="nombre" value={cra.nbimput}  onChange={handleChangec}>
        
         <option>nombre de fois</option>
         <option value={0}>0</option>
         <option value={0.5}>0.5</option>
         <option value={1}>1</option>
  

     
   </Select>
   <button type="submit" className="btn btn-success">
                envoyer
                </button>
                </div>}
    </form>
    </div>
)}
          </div>
          </div>
     </div>
  
  
 );
}
 
export default RaportM;
 