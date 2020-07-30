import React from 'react';
import { Link } from 'react-router-dom';


import logo from "./../../image/logo-biprax.png";

const HomePage = (props) => {
    return ( <>
  
    <div>
   
    <section className="main-image">
      
      <div className="imagemain">
          <h1 className="titel">
            <span><span> <img src={logo} className="logo"/> BIPRAX CONSULTING ensemble vers le futur </span></span></h1>
          <div className="citation">
              <h3 className="titel">Le futur a été créé pour être changé, le futur est entre vos mains </h3>
          
  </div>
  
  <div className="alaune">
   
    <Link to="/actualites" aria-pressed="true" className="btn btn-secondary btn-lg  ">  Â la une</Link>
  </div>
          
  

  </div>

  </section>
  <div className="container pt-5">
  <div>
  <section className="valeur" >
    
     <div className="valeurT">
    <h2> Nos Valeurs  </h2>
    </div>



    <div className="valeur1">
            <div className="row ">
                    <div className="col-md-6">
                    
                        <h4 className="titrev">Etude préalable technique et fonctionnelle.</h4>
                        <p>Afin de vous proposer les meilleures solutions, nous analysons au préalable votre demande.</p> 
                        <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-book-fill log" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.261 13.666c.345.14.739-.105.739-.477V2.5a.472.472 0 0 0-.277-.437c-1.126-.503-5.42-2.19-7.723.129C5.696-.125 1.403 1.56.277 2.063A.472.472 0 0 0 0 2.502V13.19c0 .372.394.618.739.477C2.738 12.852 6.125 12.113 8 14c1.875-1.887 5.262-1.148 7.261-.334z"/>
</svg>
                        
                    </div>
                    <div className="col-md-6">
                        <h4>Accompagnement dans le choix de la solution et la réalisation.</h4>
                        <p>Lorsque vous voulez lancer votre projet, nous vous accompagnons sur toutes vos problématiques.</p>
                        <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-easel log" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.473.337a.5.5 0 0 0-.946 0L6.954 2h2.092L8.473.337zM12.15 11h-1.058l1.435 4.163a.5.5 0 0 0 .946-.326L12.15 11zM8.5 11h-1v2.5a.5.5 0 0 0 1 0V11zm-3.592 0H3.85l-1.323 3.837a.5.5 0 1 0 .946.326L4.908 11z"/>
  <path fill-rule="evenodd" d="M14 3H2v7h12V3zM2 2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
</svg>
                    </div>
            </div>
          
            <div className=" row">
                    <div className="col-md-6">
                        <h4>Intégration des solutions et développements spécifiques.</h4>
                        <p>Nous vous assurons une maîtrise parfaite des pratiques et technologies de développement.</p>
                        <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-laptop log" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M13.5 3h-11a.5.5 0 0 0-.5.5V11h12V3.5a.5.5 0 0 0-.5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11z"/>
  <path d="M0 12h16v.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5V12z"/>
</svg>
                    </div>
                    <div className=" col-md-6">
                        <h4>Recette fonctionnelle et technique /Transfert de compétences</h4>
                        <p>Nous vous proposons une solution adaptée à vos besoins avec une recette alliant les compétences fonctionnelles et techniques.</p>
                        <svg width="5em" height="5em" viewBox="0 0 16 16" className="bi bi-diagram-3-fill log" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M8 5a.5.5 0 0 1 .5.5V7H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V5.5A.5.5 0 0 1 8 5zm-8 6.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1z"/>
  <path fill-rule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6h-1A1.5 1.5 0 0 1 6 4.5v-1z"/>
</svg>
                    </div>
            </div>  
        
    </div>    



  </section>
</div>
<section className="mission">
   <div className="valeurT">
  <h2> Nos Missions</h2>
  </div>
  <div className="row card-body">
      <div className="col-md-4">
      <h5>Analyser les besoins fonctionnels et techniques,</h5>

      </div>
      
  
  <div className="col-md-4">
   <h5>Développer l’ensemble des processus d’intégration,</h5>
  </div>
   <div className="col-md-4">
    <h5>Accompagner le client tout au long de la réalisation du projet</h5>
   </div>

   </div>
</section>

<section className="equipe hov"></section>
 <div></div>
 <div></div>
 <div></div>
 <div></div>
<section className="client"></section>

<section className="contacter">

        
        <h2> NOUS CONTACTER </h2>
        <p>Nous vous invitons à nous contacter pour plus d’informations :</p>
        
       
        <div className="row card-body">

        <div className="col-md-4">
        <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-telephone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"/>
</svg>
        <h3>Téléphone : </h3>
        <p>06 67 96 84 32</p>
        </div>

        <div className="col-md-4">
        <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
</svg>
        <h3>Adresse mail: </h3>
        <p>contact@biprax.fr</p>
        </div>

        <div className="col-md-4">
        <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-map" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M15.817.613A.5.5 0 0 1 16 1v13a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 14.51l-4.902.98A.5.5 0 0 1 0 15V2a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0l4.902.98 4.902-.98a.5.5 0 0 1 .415.103zM10 2.41l-4-.8v11.98l4 .8V2.41zm1 11.98l4-.8V1.61l-4 .8v11.98zm-6-.8V1.61l-4 .8v11.98l4-.8z"/>
</svg>
        <h3>Adresse: </h3>
        <p>	Biprax Consulting
             50 Rue Du Simplon 75018 PARIS</p>
        </div>
        
    
    </div>
</section>

<section className="card-body hov">

</section>




</div>
  
</div>
 </>  );
}

 
export default HomePage;