<?php

namespace App\Repository;

use App\Entity\Utilcon;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Utilcon|null find($id, $lockMode = null, $lockVersion = null)
 * @method Utilcon|null findOneBy(array $criteria, array $orderBy = null)
 * @method Utilcon[]    findAll()
 * @method Utilcon[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UtilconRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Utilcon::class);
    }

    // /**
    //  * @return Utilcon[] Returns an array of Utilcon objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Utilcon
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
