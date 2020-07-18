<?php

namespace App\DataFixtures;

use App\Entity\Actualite;
use App\Entity\Annonce;
use App\Entity\Civility;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use App\Entity\Customer;
use App\Entity\Mission;
use App\Entity\Raport;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{   

    /**
     * Lencodeur de mots de passe
     *
     * @var UserPasswordEncoderInterface
     */
    private $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder){
       $this->encoder=$encoder;

    }
    public function load(ObjectManager $manager)
    {

         
        $faker = Factory::create('fr_FR');
        for ($ci=0;$ci<1;$ci++){
            $civility=new Civility();
            $civility->setCivility('Mr');
            $manager->persist($civility);  }
            
            for ($u=0;$u< 10 ; $u++){
                 $user=new User();
                 $hash = $this->encoder->encodePassword($user,$user->getPassword());
                 $user->setUsername($faker->email)
                      ->setPassword($hash)
                      ->setDateOfBirth($faker->dateTimeBetween($faker->startDate ='-60 years',$endDate ='-18 years', $timezone=null))
                      ->setAdress1($faker->address)
                      ->setAdress2($faker->secondaryAddress)
                      ->setZipCode($faker->postcode)
                      ->setCity($faker->city)
                      ->setPhoneNumber($faker->phoneNumber)
                      ->setEmail($faker->email)
                      ->setFName($faker->firstNameMale)
                      ->setLName($faker->lastName)
                      ->setIdCivility($civility);
                 $manager->persist($user); 

                 for ($a=0;$a<2;$a++){
                     $annonce=new Annonce();
                     $annonce->setTitle($faker->company)
                             ->setType($faker->realText($maxNbChars = 10, $indexSize = 2))
                             ->setDiscription($faker->realText($maxNbChars = 100, $indexSize = 2))
                             ->setDateOfIssue($faker->dateTimeBetween('-6 months'))
                             ->setProfile($faker->realText($maxNbChars = 10, $indexSize = 2))
                             ->setAdress1($faker->address)
                             ->setAdress2($faker->secondaryAddress)
                             ->setZipCode($faker->postcode)
                             ->setCity($faker->city)
                             ->setSalary('10K')
                             ->setUser($user)
                             ->setEndDate($faker->dateTimeBetween('-6 months'))
                             ->setFlag(true);
                      $manager->persist($annonce);




                 }
                 for($a=0;$a<2;$a++){
                    $actualite =new Actualite();
                    $actualite->setTitle($faker->company)
                              ->setDiscription($faker->realText($maxNbChars = 100, $indexSize = 2))
                              ->setImgurl($faker->realText($maxNbChars = 10, $indexSize = 2))
                              ->setDateofissue($faker->dateTimeBetween('-6 months'))
                              ->setType($faker->realText($maxNbChars = 10, $indexSize = 2))
                              ->setIdUser($user)
                              ->setEndDate($faker->dateTimeBetween('-6 months'))
                              ->setFlag(true);
                    $manager->persist($actualite);          


                 }
                 for($c=0;$c < 3 ; $c++ ){
                    $costumer =new Customer();
                    $costumer->setCustomer($faker->company)
                             ->setAdress1($faker->address)
                             ->setAdress2($faker->secondaryAddress)
                             ->setZipCode($faker->postcode)
                             ->setCity($faker->city)
                             ->setPhone($faker->phoneNumber)
                             ->setPhoneNumber($faker->phoneNumber)
                             ->setEmail($faker->email)
                             ->setActivity($faker->realText($maxNbChars = 10, $indexSize = 2))
                             ->setEffectif("22")
                             ->setSiege($faker->address)
                             ->setCa("10k");
    
                    $manager->persist($costumer);
    
                    for($i=0 ;$i<2;$i++){
                        $mission = new Mission();
                        $mission->setTitle($faker->company)
                                -> setStartDate($faker->dateTimeBetween('-6 months'))
                                ->setEndDate ($faker->dateTimeBetween('-1 months'))
                                ->setDiscription ($faker->realText($maxNbChars = 100, $indexSize = 2))
                                ->setCustomer($costumer)
                                ->addUser($user);
                        $manager->persist($mission);             
           
            for($r=0;$r<2;$r++){
                $raport=new Raport();
                $raport->setTitle($faker->company)
                       ->setDateOfIssue($faker->dateTimeBetween('-6 months'))
                       ->setDiscription ($faker->realText($maxNbChars = 100, $indexSize = 2))
                       ->setNote ($faker->realText($maxNbChars = 50, $indexSize = 2))
                       ->setUser ($user)
                       ->setMission ($mission);
                       $manager->persist($raport);  


            }
            }}
            

                            }
                        

                    
       

        $manager->flush();
    }
}
