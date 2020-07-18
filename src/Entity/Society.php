<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\SocietyRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass=SocietyRepository::class)
 * @ApiResource
 */
class Society
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups({"contrat_read","contratb2b_read"})
     */
    private $nom;

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
     * @ORM\Column(type="string", length=50)
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $contactPerson;

    /**
     * @ORM\OneToMany(targetEntity=ContractB2B::class, mappedBy="society")
     */
    private $contractB2Bs;

    /**
     * @ORM\OneToMany(targetEntity=Contract::class, mappedBy="society")
     */
    private $contracts;

    public function __construct()
    {
        $this->contractB2Bs = new ArrayCollection();
        $this->contracts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

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

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): self
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

    public function getContactPerson(): ?string
    {
        return $this->contactPerson;
    }

    public function setContactPerson(string $contactPerson): self
    {
        $this->contactPerson = $contactPerson;

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
            $contractB2B->setSociety($this);
        }

        return $this;
    }

    public function removeContractB2B(ContractB2B $contractB2B): self
    {
        if ($this->contractB2Bs->contains($contractB2B)) {
            $this->contractB2Bs->removeElement($contractB2B);
            // set the owning side to null (unless already changed)
            if ($contractB2B->getSociety() === $this) {
                $contractB2B->setSociety(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Contract[]
     */
    public function getContracts(): Collection
    {
        return $this->contracts;
    }

    public function addContract(Contract $contract): self
    {
        if (!$this->contracts->contains($contract)) {
            $this->contracts[] = $contract;
            $contract->setSociety($this);
        }

        return $this;
    }

    public function removeContract(Contract $contract): self
    {
        if ($this->contracts->contains($contract)) {
            $this->contracts->removeElement($contract);
            // set the owning side to null (unless already changed)
            if ($contract->getSociety() === $this) {
                $contract->setSociety(null);
            }
        }

        return $this;
    }
}
