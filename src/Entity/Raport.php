<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\RaportRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=RaportRepository::class)
 *  @ApiResource(
 *     normalizationContext={ 
 *       "groups"={"raport_read"} 
 *    }
 * 
 * )
 * 
 * @ApiFilter(SearchFilter::class,properties={"mission"})
 */
class Raport
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"raport_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=60)
     *  @Groups({"raport_read"})
     * @Assert\Length(
     *      min = 3
     * 
     * )
     */
    private $title;

    /**
     * @ORM\Column(type="datetime")
     *  @Groups({"raport_read"})
     */
    private $dateOfIssue;

    /**
     * @ORM\Column(type="text")
     *  @Groups({"raport_read"})
     * * @Assert\Length(
     *      min = 3
     * 
     * )
     */
    private $discription;

    /**
     * @ORM\Column(type="string", length=500, nullable=true)
     *  @Groups({"raport_read"})
     * * @Assert\Length(
     *      min = 3
     * 
     * )
     */
    private $note;

    /**
     * @ORM\ManyToOne(targetEntity=User::class)
     * @ORM\JoinColumn(nullable=false)
     * @ApiSubresource
     * @Groups({"raport_read"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Mission::class, inversedBy="raports")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"raport_read"})
     */
    private $mission;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

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

    public function getDiscription(): ?string
    {
        return $this->discription;
    }

    public function setDiscription(string $discription): self
    {
        $this->discription = $discription;

        return $this;
    }

    public function getNote(): ?string
    {
        return $this->note;
    }

    public function setNote(?string $note): self
    {
        $this->note = $note;

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

    public function getMission(): ?Mission
    {
        return $this->mission;
    }

    public function setMission(?Mission $mission): self
    {
        $this->mission = $mission;

        return $this;
    }
}
