<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CraRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\ArrayCollection;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=CraRepository::class)
 * @ApiResource(
 *     normalizationContext={ 
 *       "groups"={"cra_read"} 
 *    }
 * 
 * )
 * @ApiFilter(SearchFilter::class,properties={"user","calendar","calendar.monthNameFR","calendar.idCalendarYears"})
 */
class Cra
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"cra_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="cras")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"cra_read"})
     */
    private $user;

   
    /**
     * @ORM\Column(type="date")
     * @Groups({"cra_read"})
     */
    private $dateOfIssue;

    /**
     * @ORM\ManyToOne(targetEntity=CalendarDate::class, inversedBy="cras")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"cra_read"})
     */
    private $calendar;

    
    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"cra_read"})
     */
    private $nbimput;

    /**
     * @ORM\ManyToOne(targetEntity=TypeImput::class, inversedBy="cras")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"cra_read"})
     */
    private $imputation;

    

    public function getId(): ?int
    {
        return $this->id;
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

   

    public function getDateOfIssue(): ?\DateTimeInterface
    {
        return $this->dateOfIssue;
    }

    public function setDateOfIssue(\DateTimeInterface $dateOfIssue): self
    {
        $this->dateOfIssue = $dateOfIssue;

        return $this;
    }

    public function getCalendar(): ?CalendarDate
    {
        return $this->calendar;
    }

    public function setCalendar(?CalendarDate $calendar): self
    {
        $this->calendar = $calendar;

        return $this;
    }

    

    public function getNbimput(): ?float
    {
        return $this->nbimput;
    }

    public function setNbimput(?float $nbimput): self
    {
        $this->nbimput = $nbimput;

        return $this;
    }

    public function getImputation(): ?TypeImput
    {
        return $this->imputation;
    }

    public function setImputation(?TypeImput $imputation): self
    {
        $this->imputation = $imputation;

        return $this;
    }
}
