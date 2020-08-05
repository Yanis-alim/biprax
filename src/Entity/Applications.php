<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ApplicationsRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ApplicationsRepository::class)
 * @ApiResource(
 *     normalizationContext={ 
 *       "groups"={"app"} 
 *    }
 * 
 * )
 */
class Applications
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"app"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"app"})
     */
    private $fname;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"app"})
     */
    private $lname;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"app"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * @Groups({"app"})
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"app"})
     */
    private $adress1;

    /**
     * @ORM\Column(type="string", length=150, nullable=true)
     * @Groups({"app"})
     */
    private $adress2;

    /**
     * @ORM\Column(type="string", length=15)
     * @Groups({"app"})
     */
    private $zipcode;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"app"})
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"app"})
     */
    private $diploma;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"app"})
     */
    private $levelStudy;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"app"})
     */
    private $work;

    /**
     * @ORM\ManyToOne(targetEntity=Annonce::class, inversedBy="applications")
     * @Groups({"app"})
     */
    private $annonce;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"app"})
     */
    private $dateOfIssus;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFname(): ?string
    {
        return $this->fname;
    }

    public function setFname(string $fname): self
    {
        $this->fname = $fname;

        return $this;
    }

    public function getLname(): ?string
    {
        return $this->lname;
    }

    public function setLname(string $lname): self
    {
        $this->lname = $lname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getAdress1(): ?string
    {
        return $this->adress1;
    }

    public function setAdress1(string $adress1): self
    {
        $this->adress1 = $adress1;

        return $this;
    }

    public function getAdress2(): ?string
    {
        return $this->adress2;
    }

    public function setAdress2(?string $adress2): self
    {
        $this->adress2 = $adress2;

        return $this;
    }

    public function getZipcode(): ?string
    {
        return $this->zipcode;
    }

    public function setZipcode(string $zipcode): self
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getDiploma(): ?string
    {
        return $this->diploma;
    }

    public function setDiploma(?string $diploma): self
    {
        $this->diploma = $diploma;

        return $this;
    }

    public function getLevelStudy(): ?string
    {
        return $this->levelStudy;
    }

    public function setLevelStudy(string $levelStudy): self
    {
        $this->levelStudy = $levelStudy;

        return $this;
    }

    public function getWork(): ?string
    {
        return $this->work;
    }

    public function setWork(?string $work): self
    {
        $this->work = $work;

        return $this;
    }

    public function getAnnonce(): ?Annonce
    {
        return $this->annonce;
    }

    public function setAnnonce(?Annonce $annonce): self
    {
        $this->annonce = $annonce;

        return $this;
    }

    public function getDateOfIssus(): ?\DateTimeInterface
    {
        return $this->dateOfIssus;
    }

    public function setDateOfIssus(\DateTimeInterface $dateOfIssus): self
    {
        $this->dateOfIssus = $dateOfIssus;

        return $this;
    }
}
