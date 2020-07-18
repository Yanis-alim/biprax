<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\TypeContractRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TypeContractRepository::class)
 * @ApiResource
 */
class TypeContract
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=150)
     * @Groups({"contrat_read"})
     */
    private $type;

    /**
     * @ORM\OneToMany(targetEntity=Contract::class, mappedBy="typeContract")
     */
    private $contract;

    public function __construct()
    {
        $this->contract = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
     * @return Collection|Contract[]
     */
    public function getContract(): Collection
    {
        return $this->contract;
    }

    public function addContract(Contract $contract): self
    {
        if (!$this->contract->contains($contract)) {
            $this->contract[] = $contract;
            $contract->setTypeContract($this);
        }

        return $this;
    }

    public function removeContract(Contract $contract): self
    {
        if ($this->contract->contains($contract)) {
            $this->contract->removeElement($contract);
            // set the owning side to null (unless already changed)
            if ($contract->getTypeContract() === $this) {
                $contract->setTypeContract(null);
            }
        }

        return $this;
    }
}
