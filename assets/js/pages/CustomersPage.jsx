import React,{useEffect,useState} from 'react';
import CustomersAPI from "../services/CustomersAPI";
import Pagination from '../components/Pagination';
import TableLoader from '../components/loaders/TableLoader';
import {Link} from "react-router-dom";
const CustomersPage = (props) => {
    const [custmers ,setCustomers]=useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [loading,setLoading]=useState(true);


    const fetchCustomers = async ()=>{
        try{
            const data =await CustomersAPI.findAll();
            setCustomers(data);
            setLoading(false);
            

        }catch(error){
            console.log(error.response);

        }
        
    };

    useEffect (()=>{
        fetchCustomers();

    },[]);

    // gestion de la supperission
   const handleDelete = async id =>{
    const originaleCustomers =[...custmers];
    setCustomers(custmers.filter(custmer => custmer.id !== id));
    try{
        await CustomersAPI.delete(id);

    }catch(error){
        console.log(error.response);
        setCustomers(originaleCustomers);

    }

};

     //Gestion du changement de page 
   const handleChangePage =(page)=>{
    setCurrentPage(page);
  }
  // nombre d'elements par page 
  const itemPerPage =10;
  
    // pagination des données
    const paginatedCustomer = Pagination.getData(custmers,currentPage,itemPerPage);

    
    
    
    return ( <>
     <div className="container pt-5 haut">
     <div className="mb-3 d-flex justify-content-between align-items-center">
       <h1>Liste des clients</h1>
       <Link to ="/customers/new" className="btn btn-primary">Ajouté un client</Link>

       </div>

    {!loading && <table className="table table-hover">
    <thead>
        <tr>
            <th>id</th>
            <th>client</th>
            <th>adress</th>
            <th>ville</th>
            <th> numero fix </th>
            <th> numero portable</th>
            <th> mail</th>
            <th> chiffre d'affire</th>
            <th>activiter</th>
            <th> effectif</th>
            <th>siege</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {paginatedCustomer.map(customer => <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.customer}</td>
            <td>{customer.adress1} / {customer.adress2}</td>
            <td>{customer.city},{customer.zipcode}</td>
            <td>{customer.phone}</td>
            <td>{customer.phoneNumber}</td>
            <td>{customer.email}</td>
            <td>{customer.ca}</td>
            <td>{customer.activity}</td>
            <td>{customer.effectif}</td>
            <td>{customer.siege}</td>
            <td> 
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(customer.id)}>Supprimer</button>
            </td>
        </tr>)}
    </tbody>


    </table>}
    {loading && <TableLoader/>}
    <Pagination currentPage={currentPage} itemPerPage={itemPerPage} onePageChange={handleChangePage} length={custmers.length} />
    </div>
    </> );
}
 
export default CustomersPage;