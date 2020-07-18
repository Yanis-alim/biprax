<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ContractRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ContractRepository::class)
 * @ApiResource(
 *     normalizationContext={ 
 *       "groups"={"contrat_read"} 
 *    }
 * 
 * )
 */
class Contract
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"contrat_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"contrat_read"})
     * @Assert\NotBlank(message="le date de debut est obligatoire")
     */
    private $startdate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"contrat_read"})
     */
    private $endDate;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"contrat_read"})
     */
    private $discription;

    /**
     * @ORM\ManyToOne(targetEntity=TypeContract::class, inversedBy="contract")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"contrat_read"})
     * @Assert\NotBlank(message="le type de contrat est obligatoire")
     */
    private $typeContract;

    /**
     * @ORM\ManyToOne(targetEntity=Post::class, inversedBy="contracts")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"contrat_read"})
     * @Assert\NotBlank(message="le poste est obligatoire")
     */
    private $post;

    /**
     * @ORM\ManyToOne(targetEntity=Status::class, inversedBy="contracts")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"contrat_read"})
     * @Assert\NotBlank(message="le status est obligatoire")
     */
    private $status;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups({"contrat_read"})
     * @Assert\NotBlank(message="la reference est obligatoire")
     */
    private $contractCode;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Groups({"contrat_read"})
     */
    private $membership;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="contracts")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"contrat_read"})
     * @Assert\NotBlank(message="la personne est obligatoire")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Society::class, inversedBy="contracts")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"contrat_read"})
     * @Assert\NotBlank(message="la socitie est obligatoire")
     */
    private $society;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotBlank(message="le salaire est obligatoire")
     */
    private $salaire;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartdate(): ?\DateTimeInterface
    {
        return $this->startdate;
    }

    public function setStartdate(\DateTimeInterface $startdate): self
    {
        $this->startdate = $startdate;

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

    public function getDiscription(): ?string
    {
        return $this->discription;
    }

    public function setDiscription(?string $discription): self
    {
        $this->discription = $discription;

        return $this;
    }

    public function getTypeContract(): ?TypeContract
    {
        return $this->typeContract;
    }

    public function setTypeContract(?TypeContract $typeContract): self
    {
        $this->typeContract = $typeContract;

        return $this;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(?Post $post): self
    {
        $this->post = $post;

        return $this;
    }

    public function getStatus(): ?Status
    {
        return $this->status;
    }

    public function setStatus(?Status $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getContractCode(): ?string
    {
        return $this->contractCode;
    }

    public function setContractCode(string $contractCode): self
    {
        $this->contractCode = $contractCode;

        return $this;
    }

    public function getMembership(): ?string
    {
        return $this->membership;
    }

    public function setMembership(?string $membership): self
    {
        $this->membership = $membership;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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

    public function getSalaire(): ?float
    {
        return $this->salaire;
    }

    public function setSalaire(float $salaire): self
    {
        $this->salaire = $salaire;

        return $this;
    }
}
