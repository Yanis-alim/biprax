<?php

namespace App\Doctrine;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;

use App\Entity\Raport;
use App\Entity\Absence;
use App\Entity\User;
use App\Entity\Cra;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class CurrentUserExtension implements QueryCollectionExtensionInterface ,QueryItemExtensionInterface{




     private $security;
     private $auth;

     public function __construct(Security $security, AuthorizationCheckerInterface $checker)
    {
         $this->security=$security;
         $this->auth=$checker;
    }

    private function addWhere(QueryBuilder $queryBuilder ,string $resourceClass){
        $user= $this->security->getUser();
        if ($resourceClass === Raport::class && !$this->auth->isGranted('ROLE_ADMIN') && $user instanceof User){
            $rootAlias=$queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere("$rootAlias.user = :user");

            $queryBuilder->setParameter("user",$user);
         }
         if ($resourceClass === Absence::class && !$this->auth->isGranted('ROLE_ADMIN') && $user instanceof User){
          $rootAlias=$queryBuilder->getRootAliases()[0];
          $queryBuilder->andWhere("$rootAlias.user = :user");

          $queryBuilder->setParameter("user",$user);
       }
       if ($resourceClass === Cra::class && !$this->auth->isGranted('ROLE_ADMIN') && $user instanceof User){
         $rootAlias=$queryBuilder->getRootAliases()[0];
         $queryBuilder->andWhere("$rootAlias.user = :user");

         $queryBuilder->setParameter("user",$user);
      }



    }
     public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
      {
          $this->addWhere($queryBuilder,$resourceClass);
       }

     public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
      {
        $this->addWhere($queryBuilder,$resourceClass);
    
      }

}