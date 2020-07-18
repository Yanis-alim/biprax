<?php


namespace App\Events;


use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Actualite;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ActualiteUserSubscriber implements EventSubscriberInterface{
    private $security;
    public function __construct(Security $security){
      $this->security = $security;
    
        
    }





    public static function getSubscribedEvents()

    {
    return [

              KernelEvents::VIEW =>['setUserForActualite',EventPriorities::PRE_VALIDATE]  
             ];
    }

    public function setUserForActualite(ViewEvent $event ){
         $actualite=$event->getControllerResult();
         $method=$event->getRequest()->getMethod();
         
     
         if ($actualite instanceof Actualite && $method === "POST"){
          $user=$this->security->getUser();
          $actualite->setIdUser($user);

         }
    }


}