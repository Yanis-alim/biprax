<?php

namespace App\Repository;

use App\Entity\TypeImput;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TypeImput|null find($id, $lockMode = null, $lockVersion = null)
 * @method TypeImput|null findOneBy(array $criteria, array $orderBy = null)
 * @method TypeImput[]    findAll()
 * @method TypeImput[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TypeImputRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TypeImput::class);
    }

    // /**
    //  * @return TypeImput[] Returns an array of TypeImput objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TypeImput
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
