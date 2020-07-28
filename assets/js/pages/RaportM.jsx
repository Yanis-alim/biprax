import React,{useEffect,useState}  from 'react';
import CalendarAPI from '../services/CalendarAPI';
import TypeImput from '../services/TypeImput';
import CraAPI from '../services/CraAPI';
import UsersAPI from '../services/UsersAPI';
import Select from './../components/forms/Select';
import  AuthAPI from "../services/AuthAPI";
import jwt_decode from 'jwt-decode';
import Field from './../components/forms/Field';
import MissionsAPI from '../services/MissionsAPI';
import CustomersAPI from '../services/CustomersAPI';

const RaportM = (props) => {
  const [user ,setUser] = useState();
  const [missions,setMissions]=useState([]);
  const [custmers ,setCustomers]=useState([]);

  const [days ,setdays] = useState([]);
  const [imputs ,setImputs] = useState([]);
  const [day ,setday] = useState({
    monthOfYear:""
  });
  const [jourO,setJourO]=useState();
  const [jourT,setJourT]=useState();
  const [cra ,setCra]= useState({
    calendar:"",
    imputation1:"",
    imputation2:"",
    imputation3:"",
    imputation4:"",
    imputation5:"",
    imputation6:"",
    imputation7:"",
    imputation8:"",
    imputation9:"",
    imputation10:"",
    imputation11:"",
    imputation12:"",
    imputation13:"",
    imputation14:"",
    imputation15:"",
    imputation16:"",
    imputation17:"",
    imputation18:"",
    imputation19:"",
    imputation20:"",
    imputation21:"",
    imputation22:"",
    imputation23:"",
    imputation24:"",
    imputation25:"",
    imputation26:"",
    imputation27:"",
    imputation28:"",
    imputation29:"",
    imputation30:"",
    imputation31:"",
    nbimput1:0,
    nbimput2:0,
    nbimput3:0,
    nbimput4:0,
    nbimput5:0,
    nbimput6:0,
    nbimput7:0,
    nbimput8:0,
    nbimput9:0,
    nbimput10:0,
    nbimput11:0,
    nbimput12:0,
    nbimput13:0,
    nbimput14:0,
    nbimput15:0,
    nbimput16:0,
    nbimput17:0,
    nbimput18:0,
    nbimput19:0,
    nbimput20:0,
    nbimput21:0,
    nbimput22:0,
    nbimput23:0,
    nbimput24:0,
    nbimput25:0,
    nbimput26:0,
    nbimput27:0,
    nbimput28:0,
    nbimput29:0,
    nbimput30:0,
    nbimput31:0,
    mission1:"",
    mission2:"",
    mission3:"",
    mission4:"",
    mission5:"",
    mission6:"",
    mission7:"",
    mission8:"",
    mission9:"",
    mission10:"",
    mission11:"",
    mission12:"",
    mission13:"",
    mission14:"",
    mission15:"",
    mission16:"",
    mission17:"",
    mission18:"",
    mission19:"",
    mission20:"",
    mission21:"",
    mission22:"",
    mission23:"",
    mission24:"",
    mission25:"",
    mission26:"",
    mission27:"",
    mission28:"",
    mission29:"",
    mission30:"",
    mission31:"",
    client1:"",
    client2:"",
    client3:"",
    client4:"",
    client5:"",
    client6:"",
    client7:"",
    client8:"",
    client9:"",
    client10:"",
    client11:"",
    client12:"",
    client13:"",
    client14:"",
    client15:"",
    client16:"",
    client17:"",
    client18:"",
    client19:"",
    client20:"",
    client21:"",
    client22:"",
    client23:"",
    client24:"",
    client25:"",
    client26:"",
    client27:"",
    client28:"",
    client29:"",
    client30:"",
    client31:"",



 });
 const [cras,setCras]=useState([]);
 
 
 
 var joursaise =0;

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
const fetchMissions = async ()=>{
  try{
      const data =await MissionsAPI.findAll();
  setMissions(data);
  

  }catch(error){
      console.log(error.response);

  }
  
};

useEffect (()=>{
 fetchMissions();

},[]);
const fetchCustomers = async ()=>{
  try{
      const data =await CustomersAPI.findAll();
      setCustomers(data);
      
      

  }catch(error){
      console.log(error.response);

  }
  
};

useEffect (()=>{
  fetchCustomers();

},[]);
const getuser =  () =>{
  if(AuthAPI.getToken()!=null){
  const tokens = AuthAPI.getToken();
  const decoded = jwt_decode(tokens);
  
  
  setUser(decoded.username);
  console.log(user);
  };
 
}
useEffect(()=>{
  getuser();
},[]);


  var annee =new Date();
  annee=annee.getFullYear();
  var date = new Date()
  date =date.getMonth();
  var tab_mois=new Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");

  const handleSubmit = async event => {
    event.preventDefault();
    
    try{
      var a=0;
      var b=0;
        const data =await CalendarAPI.find(day.monthOfYear,annee);
       setdays(data);
       
       const jours =data.map(jour =>(jour.isDayOff==0 && jour.isWeekend==0)&& (a=a+1) )
       setJourO(a);
     
       const dat =await CraAPI.findC(tab_mois[day.monthOfYear-1],annee);
       setCras(dat);
      
      
      dat.map(j=>(b=b+j.nbimput));
      setJourT(b);

      
       
       
      

      
        
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
      
        const data =await CraAPI.create(cra);
      
      
        
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
   <div>
  <h4>nombre de jour ouvret :{jourO}</h4>
      <h4>nobre de jour enregstré :{jourT} </h4>
    </div>
    <form   onSubmit={handleSubmitc}  >
    <table className="table table-hover">
      <thead>
        <tr>
          {days.map (day=><th key={day.id}>
            {day.dayNameOfWeekFR} ,{day.dateNameFR}
          </th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
        <td >

          <Select  name="nbimput1" label="nombre" value={cra.nbimput1}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput2" label="nombre" value={cra.nbimput2}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput3" label="nombre" value={cra.nbimput3}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput4" label="nombre" value={cra.nbimput4}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput5" label="nombre" value={cra.nbimput5}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput6" label="nombre" value={cra.nbimput6}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput7" label="nombre" value={cra.nbimput7}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput8" label="nombre" value={cra.nbimput8}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput9" label="nombre" value={cra.nbimput9}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput10" label="nombre" value={cra.nbimput10}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput11" label="nombre" value={cra.nbimput11}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput12" label="nombre" value={cra.nbimput12}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput13" label="nombre" value={cra.nbimput13}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput14" label="nombre" value={cra.nbimput14}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput15" label="nombre" value={cra.nbimput15}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput16" label="nombre" value={cra.nbimput16}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput17" label="nombre" value={cra.nbimput17}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput18" label="nombre" value={cra.nbimput18}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput19" label="nombre" value={cra.nbimput19}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput20" label="nombre" value={cra.nbimput20}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput21" label="nombre" value={cra.nbimput21}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput22" label="nombre" value={cra.nbimput22}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput23" label="nombre" value={cra.nbimput23}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput24" label="nombre" value={cra.nbimput24}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput25" label="nombre" value={cra.nbimput25}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput26" label="nombre" value={cra.nbimput26}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput27" label="nombre" value={cra.nbimput27}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput28" label="nombre" value={cra.nbimput28}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput29" label="nombre" value={cra.nbimput29}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput30" label="nombre" value={cra.nbimput30}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        <td >

          <Select  name="nbimput31" label="nombre" value={cra.nbimput31}  onChange={handleChangec}>
        
        <option>nombre de fois</option>
              <option value={0}>0</option>
              <option value={0.5}>0.5</option>
              <option value={1}>1</option>
       
     
          
        </Select>

        </td>  
        

       
        </tr>
        <tr>
   <td>
     <Select  name="imputation1" label="type d'imputation" value={cra.imputation1}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation2" label="type d'imputation" value={cra.imputation2}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>

   <td>
     <Select  name="imputation3" label="type d'imputation" value={cra.imputation3}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation4" label="type d'imputation" value={cra.imputation4}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation5" label="type d'imputation" value={cra.imputation5}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation6" label="type d'imputation" value={cra.imputation6}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation7" label="type d'imputation" value={cra.imputation7}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td><td>
     <Select  name="imputation8" label="type d'imputation" value={cra.imputation8}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation9" label="type d'imputation" value={cra.imputation9}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation10" label="type d'imputation" value={cra.imputation10}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation11" label="type d'imputation" value={cra.imputation11}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation12" label="type d'imputation" value={cra.imputation12}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation13" label="type d'imputation" value={cra.imputation13}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation14" label="type d'imputation" value={cra.imputation14}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation15" label="type d'imputation" value={cra.imputation15}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation16" label="type d'imputation" value={cra.imputation16}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation17" label="type d'imputation" value={cra.imputation17}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation18" label="type d'imputation" value={cra.imputation18}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation19" label="type d'imputation" value={cra.imputation19}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation20" label="type d'imputation" value={cra.imputation20}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation21" label="type d'imputation" value={cra.imputation21}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation22" label="type d'imputation" value={cra.imputation22}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation23" label="type d'imputation" value={cra.imputation23}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation24" label="type d'imputation" value={cra.imputation24}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation25" label="type d'imputation" value={cra.imputation25}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation26" label="type d'imputation" value={cra.imputation26}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation27" label="type d'imputation" value={cra.imputation27}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation28" label="type d'imputation" value={cra.imputation28}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   <td>
     <Select  name="imputation29" label="type d'imputation" value={cra.imputation29}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation30" label="type d'imputation" value={cra.imputation30}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
     <Select  name="imputation31" label="type d'imputation" value={cra.imputation31}  onChange={handleChangec}>
    <option>type</option>
         {imputs.map(imputs =><option value={imputs.id}>
          {imputs.activity}
         </option>)}
        
  

     
   </Select>
   </td>
   
   
   
        </tr>
        <tr>
   <td>
   <Select  name="mission1" label="Mission" value={cra.mission1}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission2" label="Mission" value={cra.mission2}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission3" label="Mission" value={cra.mission3}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission4" label="Mission" value={cra.mission4}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission5" label="Mission" value={cra.mission5}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission6" label="Mission" value={cra.mission6}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission7" label="Mission" value={cra.mission7}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission8" label="Mission" value={cra.mission8}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission9" label="Mission" value={cra.mission9}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission10" label="Mission" value={cra.mission10}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission11" label="Mission" value={cra.mission11}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission12" label="Mission" value={cra.mission12}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission13" label="Mission" value={cra.mission13}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission14" label="Mission" value={cra.mission14}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission15" label="Mission" value={cra.mission15}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
  
   <td>
   <Select  name="mission16" label="Mission" value={cra.mission16}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission17" label="Mission" value={cra.mission17}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission18" label="Mission" value={cra.mission18}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission19" label="Mission" value={cra.mission19}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission20" label="Mission" value={cra.mission20}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission21" label="Mission" value={cra.mission21}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission22" label="Mission" value={cra.mission22}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission23" label="Mission" value={cra.mission23}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission24" label="Mission" value={cra.mission24}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission25" label="Mission" value={cra.mission25}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission26" label="Mission" value={cra.mission26}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td><td>
   <Select  name="mission27" label="Mission" value={cra.mission27}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission28" label="Mission" value={cra.mission28}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission29" label="Mission" value={cra.mission29}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission30" label="Mission" value={cra.mission30}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="mission31" label="Mission" value={cra.mission31}  onChange={handleChangec}>
    <option>type</option>
         {missions.map(mission =><option value={mission.id}>
          {mission.title}
         </option>)}
        
  

     
   </Select>
   </td>

 
   </tr>
   <tr>
   <td>
   <Select  name="client1" label="clients" value={cra.client1}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client2" label="clients" value={cra.client2}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client3" label="clients" value={cra.client3}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client4" label="clients" value={cra.client4}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client5" label="clients" value={cra.client5}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client6" label="clients" value={cra.client6}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client7" label="clients" value={cra.client7}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client8" label="clients" value={cra.client8}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client9" label="clients" value={cra.client9}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client10" label="clients" value={cra.client10}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client11" label="clients" value={cra.client11}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client12" label="clients" value={cra.client12}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client13" label="clients" value={cra.client13}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client14" label="clients" value={cra.client14}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client15" label="clients" value={cra.client15}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client16" label="clients" value={cra.client16}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client17" label="clients" value={cra.client17}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client18" label="clients" value={cra.client18}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client19" label="clients" value={cra.client19}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client20" label="clients" value={cra.client20}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client21" label="clients" value={cra.client21}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client22" label="clients" value={cra.client22}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client23" label="clients" value={cra.client23}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client24" label="clients" value={cra.client24}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client25" label="clients" value={cra.client25}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client26" label="clients" value={cra.client26}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client27" label="clients" value={cra.client27}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client28" label="clients" value={cra.client28}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client29" label="clients" value={cra.client29}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client30" label="clients" value={cra.client30}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   <td>
   <Select  name="client31" label="clients" value={cra.client31}  onChange={handleChangec}>
    <option>type</option>
         {custmers.map(client =><option value={client.id}>
          {client.customer}
         </option>)}
        
  

     
   </Select>
   </td>
   </tr>
      </tbody>
      </table>
      </form>
  
   {/* <div >
   { days.map (day=> <div  key={day.id}>
    
    
   
    <form   onSubmit={handleSubmitc}  >
     {(day.isDayOff==1 || day.isWeekend==1 ) &&  <div className="cra redd">
      <h4>{day.dayNameOfWeekFR} ,{day.dateNameFR}</h4>
      {joursaise=0}
      
      
      {day.cras.map(cra => ((cra.user.username ==user ) && (joursaise=joursaise+cra.nbimput)
      ))}
      
      
      <p>nombre d'impuation deja saisé : {joursaise}</p>

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
    
    
    
    {joursaise=0}
      
      <div>
      {day.cras.map(cra => ((cra.user.username ==user ) && (joursaise=joursaise+cra.nbimput)
      ))}
      </div>
      
      <p>nombre d'impuation deja saisé : {joursaise}</p>
      
      
     


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
          </div> */}
         
          </div>
     </div>
  
  
 );
}
 
export default RaportM;
 