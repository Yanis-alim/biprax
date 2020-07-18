import React, { useState } from 'react';
import ReactDom from "react-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import '../css/app.css';

import AnnoncesPage from './pages/AnnoncesPage';
import AnnoncePage from './pages/AnnoncePage';
import ActualitesPage from './pages/ActualitesPage';
import LoginPage from './pages/LoginPage';

import {HashRouter ,Switch, Route, withRouter, Redirect} from "react-router-dom";
import AuthAPI from "./services/AuthAPI";
import RaportsPage from './pages/RaportsPage';
import AbsencesPage from './pages/AbsencesPage';
import ActualitePage from './pages/ActualitePage';
import MissionsPage from './pages/MissionsPage';
import RaportPage from './pages/RaportPage';
import MissionPage from './pages/MissionPage';
import CustomersPage from './pages/CustomersPage';
import CustomerPage from './pages/CustomerPage';
import StatusPage from './pages/StatusPage';
import StatusAddPage from './pages/StatusAddPage';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import Compte from './pages/Compte';
import ContratsPage from './pages/ContratsPage';
import ContratPage from './pages/ContratPage';
import RaportM from './pages/RaportM';
import ContratB2BPage from './pages/ContratB2BPage';
import ContratBPage from './pages/ContratBPage';
import SocietiesPage from './pages/SocietiesPage';
import SocietiePage from './pages/SocietiePage';
import Absence from './pages/Absence';
import PostPage from './pages/PostPage';
import PostsPage from './pages/PostsPage';
import TypecontratAdd from './pages/TypecontratAdd';
import TypeContractPage from './pages/TypeContractPage';
import  AproposPage from  './pages/AproposPage';
import  NousContacter from  './pages/NousContacter';
import  ApplicationsPage from  './pages/ApplicationsPage';
import  RapportMensuelActivite from  './pages/RapportMensuelActivite';
import { ToastContainer, toast } from 'react-toastify';
import  'react-toastify/dist/ReactToastify.css' ;




/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)


// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';
AuthAPI.setup();

const PrivateRoute = ({path, isAuthenticated ,component})=>
{
  return isAuthenticated ? < Route path={path} component={component} />: <Redirect to="/login"/>
};


const App = () => {
    
    const [isAuthenticated,setIsAuthenticated]= useState(AuthAPI.isAuthenticated());

    const NavbarWithRouter=withRouter(Navbar);
   
    return <HashRouter>
       <NavbarWithRouter 
       isAuthenticated ={isAuthenticated} 
       onLogout={setIsAuthenticated}
       />

       <main >
       
           <Switch>
              <Route path="/login"  render={props => 
              (<LoginPage onLogin={setIsAuthenticated}{...props}/>)
            }/>
               <PrivateRoute path="/actualites/:id" isAuthenticated={isAuthenticated} component={ActualitePage} />
              <Route path="/actualites" component={ActualitesPage}/>
              <PrivateRoute path="/annonces/:id" isAuthenticated={isAuthenticated} component={AnnoncePage} />
              <Route path="/annonces" component={AnnoncesPage}/>
              
              <Route path="/apropos" component={AproposPage}/>
              <Route path="/contacter"  component={NousContacter} />
              <PrivateRoute path="/absences/:id" isAuthenticated={isAuthenticated} component={Absence} /> 
              <PrivateRoute path="/absences" isAuthenticated={isAuthenticated} component={AbsencesPage} />
              <PrivateRoute path="/rma" isAuthenticated={isAuthenticated} component={RapportMensuelActivite} />
              <PrivateRoute path="/applications" isAuthenticated={isAuthenticated} component={ApplicationsPage} />
              <PrivateRoute path="/contracts/:id" isAuthenticated={isAuthenticated} component={ContratPage} />
              <PrivateRoute path="/contracts" isAuthenticated={isAuthenticated} component={ContratsPage} />
              <PrivateRoute path="/contract_b2_bs/:id" isAuthenticated={isAuthenticated} component={ContratBPage} />
              <PrivateRoute path="/contract_b2_bs" isAuthenticated={isAuthenticated} component={ContratB2BPage} />
              <PrivateRoute path="/customers/:id" isAuthenticated={isAuthenticated} component={CustomerPage} />
              <PrivateRoute path="/customers" isAuthenticated={isAuthenticated} component={CustomersPage} />
              <PrivateRoute path="/statuses/:id" isAuthenticated={isAuthenticated} component={StatusAddPage} />
              <PrivateRoute path="/statuses" isAuthenticated={isAuthenticated} component={StatusPage} />
              <PrivateRoute path="/posts/:id" isAuthenticated={isAuthenticated} component={PostPage} />
              <PrivateRoute path="/posts" isAuthenticated={isAuthenticated} component={PostsPage} />
              <PrivateRoute path="/societies/:id" isAuthenticated={isAuthenticated} component={SocietiePage} />
              <PrivateRoute path="/societies" isAuthenticated={isAuthenticated} component={SocietiesPage} />
              <PrivateRoute path="/type_contracts/:id" isAuthenticated={isAuthenticated} component={TypecontratAdd} /> 
              <PrivateRoute path="/type_contracts" isAuthenticated={isAuthenticated} component={TypeContractPage} /> 
             
              <PrivateRoute path="/raportm" isAuthenticated={isAuthenticated} component={RaportM} /> 
              <PrivateRoute path="/users/:id" isAuthenticated={isAuthenticated} component={UserPage} /> 
              <PrivateRoute path="/compte" isAuthenticated={isAuthenticated} component={Compte} />
              <PrivateRoute path="/users" isAuthenticated={isAuthenticated} component={UsersPage} />
              <PrivateRoute path="/missions/:id" isAuthenticated={isAuthenticated} component={MissionPage} />
              <PrivateRoute path="/missions" isAuthenticated={isAuthenticated} component={MissionsPage} />
              <PrivateRoute path="/raports/:id" isAuthenticated={isAuthenticated} component={RaportPage}/>
              <PrivateRoute path="/raports" isAuthenticated={isAuthenticated} component={RaportsPage}/>

              
              
              
              
              <Route path="/" component={HomePage}/>
              
           </Switch>
          
           </main> 
           <ToastContainer position={toast.POSITION.TOP_CENTER}/>
          
    </HashRouter>
    
  
    

};
const rootElement =document.querySelector('#app');
ReactDom.render(<App/>,rootElement);
