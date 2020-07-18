<?php

namespace App\Repository;

use App\Entity\ContractB2B;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ContractB2B|null find($id, $lockMode = null, $lockVersion = null)
 * @method ContractB2B|null findOneBy(array $criteria, array $orderBy = null)
 * @method ContractB2B[]    findAll()
 * @method ContractB2B[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContractB2BRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ContractB2B::class);
    }

    // /**
    //  * @return ContractB2B[] Returns an array of ContractB2B objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ContractB2B
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
