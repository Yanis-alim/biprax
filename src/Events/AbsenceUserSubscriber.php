<?php


namespace App\Events;

use App\Entity\Absence;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class AbsenceUserSubscriber implements EventSubscriberInterface{
    private $security;
    public function __construct(Security $security){
      $this->security = $security;
    
        
    }





    public static function getSubscribedEvents()

    {
    return [

              KernelEvents::VIEW =>['setUserForAbsence',EventPriorities::PRE_VALIDATE]  
             ];
    }

    public function setUserForAbsence(ViewEvent $event ){
         $absence=$event->getControllerResult();
         $method=$event->getRequest()->getMethod();
         
     
         if ($absence instanceof Absence && $method === "POST"){
          $user=$this->security->getUser();
          $absence->setUser($user);

         }
    }


}