<?php


namespace App\Events;

use App\Entity\Cra;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CraUserSubscriber implements EventSubscriberInterface{
    private $security;
    public function __construct(Security $security){
      $this->security = $security;
    
        
    }





    public static function getSubscribedEvents()

    {
    return [

              KernelEvents::VIEW =>['setUserForCra',EventPriorities::PRE_VALIDATE]  
             ];
    }

    public function setUserForCra(ViewEvent $event ){
         $cra=$event->getControllerResult();
         $method=$event->getRequest()->getMethod();
         
     
         if ($cra instanceof Cra && $method === "POST"){
          $user=$this->security->getUser();
          $cra->setUser($user);

         }
    }


}