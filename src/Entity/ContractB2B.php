<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ContractB2BRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ContractB2BRepository::class)
 * @ApiResource(
 *     normalizationContext={ 
 *       "groups"={"contratb2b_read"} 
 *    }
 * 
 * )
 */
class ContractB2B
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"contratb2b_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"contratb2b_read"})
     */
    private $Ref;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"contratb2b_read"})
     */
    private $starrDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"contratb2b_read"})
     */
    private $endDate;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="contractB2Bs")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"contratb2b_read"})
     */
    private $customer;

    /**
     * @ORM\ManyToOne(targetEntity=Society::class, inversedBy="contractB2Bs")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"contratb2b_read"})
     */
    private $society;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"contratb2b_read"})
     */
    private $contactPerson;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"contratb2b_read"})
     */
    private $signataire;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"contratb2b_read"})
     */
    private $type;

   
    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="contractB2Bs")
     */
    private $users;

    public function __construct()
    {
        $this->cras = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRef(): ?string
    {
        return $this->Ref;
    }

    public function setRef(string $Ref): self
    {
        $this->Ref = $Ref;

        return $this;
    }

    public function getStarrDate(): ?\DateTimeInterface
    {
        return $this->starrDate;
    }

    public function setStarrDate(\DateTimeInterface $starrDate): self
    {
        $this->starrDate = $starrDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(?\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getSociety(): ?Society
    {
        return $this->society;
    }

    public function setSociety(?Society $society): self
    {
        $this->society = $society;

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

    public function getSignataire(): ?string
    {
        return $this->signataire;
    }

    public function setSignataire(string $signataire): self
    {
        $this->signataire = $signataire;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

   
    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
        }

        return $this;
    }
}
