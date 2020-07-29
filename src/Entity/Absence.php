<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\AbsenceRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=AbsenceRepository::class)
 *  @ApiResource(
 *     normalizationContext={ 
 *       "groups"={"ab_read"} 
 *    }
 * 
 * )
 */
class Absence
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *  @Groups({"ab_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     *   @Groups({"ab_read"})
     */
    private $etat;

    /**
     * @ORM\Column(type="datetime")
     *   @Groups({"ab_read"})
     */
    private $startDate;

    /**
     * @ORM\Column(type="datetime")
     *   @Groups({"ab_read"})
     */
    private $endDate;

    /**
     * @ORM\Column(type="string", length=150)
     *   @Groups({"ab_read"})
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *   @Groups({"ab_read"})
     */
    private $discription;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="absences")
     * @ORM\JoinColumn(nullable=false)
     *   @Groups({"ab_read"})
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEtat(): ?string
    {
        return $this->etat;
    }

    public function setEtat(string $etat): self
    {
        $this->etat = $etat;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

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

    public function getDiscription(): ?string
    {
        return $this->discription;
    }

    public function setDiscription(?string $discription): self
    {
        $this->discription = $discription;

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
}
