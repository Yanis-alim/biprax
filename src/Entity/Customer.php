<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CustomerRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;


/**
 * @ORM\Entity(repositoryClass=CustomerRepository::class)
 *  @ApiResource
 */
class Customer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"contratb2b_read"})
     */
    private $customer;

    /**
     * @ORM\OneToMany(targetEntity=ContractB2B::class, mappedBy="customer")
     */
    private $contractB2Bs;

    /**
     * @ORM\Column(type="string", length=150)
     */
    private $adress1;

    /**
     * @ORM\Column(type="string", length=150, nullable=true)
     */
    private $adress2;

    /**
     * @ORM\Column(type="string", length=15)
     */
    private $zipcode;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $ca;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $activity;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $effectif;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $siege;

    public function __construct()
    {
        $this->contractB2Bs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCustomer(): ?string
    {
        return $this->customer;
    }

    public function setCustomer(string $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * @return Collection|ContractB2B[]
     */
    public function getContractB2Bs(): Collection
    {
        return $this->contractB2Bs;
    }

    public function addContractB2B(ContractB2B $contractB2B): self
    {
        if (!$this->contractB2Bs->contains($contractB2B)) {
            $this->contractB2Bs[] = $contractB2B;
            $contractB2B->setCustomer($this);
        }

        return $this;
    }

    public function removeContractB2B(ContractB2B $contractB2B): self
    {
        if ($this->contractB2Bs->contains($contractB2B)) {
            $this->contractB2Bs->removeElement($contractB2B);
            // set the owning side to null (unless already changed)
            if ($contractB2B->getCustomer() === $this) {
                $contractB2B->setCustomer(null);
            }
        }

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

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCa(): ?string
    {
        return $this->ca;
    }

    public function setCa(?string $ca): self
    {
        $this->ca = $ca;

        return $this;
    }

    public function getActivity(): ?string
    {
        return $this->activity;
    }

    public function setActivity(?string $activity): self
    {
        $this->activity = $activity;

        return $this;
    }

    public function getEffectif(): ?string
    {
        return $this->effectif;
    }

    public function setEffectif(?string $effectif): self
    {
        $this->effectif = $effectif;

        return $this;
    }

    public function getSiege(): ?string
    {
        return $this->siege;
    }

    public function setSiege(?string $siege): self
    {
        $this->siege = $siege;

        return $this;
    }
}
