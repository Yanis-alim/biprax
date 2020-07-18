import React from 'react';
import equipe1 from './../../image/equipe1.jpg';
import tel from "./../../image/tel.jpg";
import mail from "./../../image/mail.jpg";
import pos from "./../../image/pos.jpg";
import map from "./../../image/map.png"
import logo from "./../../image/logo-biprax.png";

const HomePage = (props) => {
    return ( <>
  
    <div>
   
    <section className="main-image">
      
      <div className="imagemain">
          <h1 className="titel">
            <span><span> <img src={logo} className="logo"/> BIPRAX CONSULTING ensemble vers le future </span></span></h1>
          <div className="citation">
              <h3 className="titel">Le futur a été créé pour être changé le futur est entre vos mains </h3>
          
  </div>
  <div className="alaune">
    <a href ="./html/actualites.html">  <button   type="button" aria-pressed="true" className="btn btn-secondary btn-lg  ">  Â la une   </button></a>
          
  </div>
          
  

  </div>

  </section>
  <div>
  <section className="valeur hov " >
    
     <div className="valeurT">
    <h2> NOS VALEUR  </h2>
    </div>



    <div className="valeur1">
            <div className="row ">
                    <div className="col-md-6">
                    
                        <h4 className="titrev">Etude préalable technique et fonctionnelle.</h4>
                        <p>Afin de vous proposer les meilleures solutions, nous analysons au préalable votre demande.</p> 
                        <svg width="5em" height="5em" viewBox="0 0 16 16" class="bi bi-laptop" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M13.5 3h-11a.5.5 0 0 0-.5.5V11h12V3.5a.5.5 0 0 0-.5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11z"/>
  <path d="M0 12h16v.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5V12z"/>
</svg>
                    </div>
                    <div className="col-md-6">
                        <h4>Accompagnement dans le choix de la solution et la réalisation.</h4>
                        <p>Lorsque vous voulez lancer votre projet, nous vous accompagnons sur toutes vos problématiques.</p>
                    </div>
            </div>
          
            <div className=" row">
                    <div className="col-md-6">
                        <h4>Intégration des solutions et développements spécifiques.</h4>
                        <p>Nous vous assurons une maîtrise parfaite des pratiques et technologies de développement.</p>
                    </div>
                    <div className=" col-md-6">
                        <h4>Recette fonctionnelle et technique /Transfert de compétences</h4>
                        <p>Nous vous proposons une solution adaptée à vos besoins avec une recette alliant les compétences fonctionnelles et techniques.</p>
                    </div>
            </div>  
        
    </div>    



  </section>
</div>
<section className="mission  hov">
   <div className="valeurT">
  <h2>Nos Mission</h2>
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

<section className="contacter hov ">

        
        <h2> NOUS CONTACTER </h2>
        <p>Nous vous invitons à nous contacter pour plus d’informations :</p>
        
       
        <div className="row card-body">

        <div className="col-md-4">
        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-telephone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z"/>
</svg>
        <h3>Téléphone : </h3>
        <p>06 67 96 84 32</p>
        </div>

        <div className="col-md-4">
        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
</svg>
        <h3>Adress mail: </h3>
        <p>ferhat.kasmi@biprax.fr</p>
        </div>

        <div className="col-md-4">
        <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-map" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M15.817.613A.5.5 0 0 1 16 1v13a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 14.51l-4.902.98A.5.5 0 0 1 0 15V2a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0l4.902.98 4.902-.98a.5.5 0 0 1 .415.103zM10 2.41l-4-.8v11.98l4 .8V2.41zm1 11.98l4-.8V1.61l-4 .8v11.98zm-6-.8V1.61l-4 .8v11.98l4-.8z"/>
</svg>
        <h3>Adress: </h3>
        <p>	50 RUE DU SIMPLON 75018 PARIS</p>
        </div>
        
    
    </div>
</section>

<section className="card-body hov">
<img src={map}  class="rounded mx-auto d-block" alt="..."/>
</section>




</div>
  

 </>  );
}
 
export default HomePage;