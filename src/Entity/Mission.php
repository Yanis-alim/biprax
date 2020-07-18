<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MissionRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=MissionRepository::class)
 *  @ApiResource(
 * attributes={
 *            "order":{"startDate":"desc"}},
 *  normalizationContext={ 
 *       "groups"={"mission_read"} 
 *    }
 *             
 * 
 *             
 * )
 * @ApiFilter(SearchFilter::class, properties={"title":"partial"})
 */
class Mission
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"mission_read","raport_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     *  @Groups({"raport_read","mission_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"mission_read"})
     */
    private $startDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"mission_read"})
     */
    private $endDate;

    /**
     * @ORM\Column(type="string", length=500)
     * @Groups({"mission_read"})
     */
    private $discription;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="missions")
     * @ORM\JoinColumn(nullable=false)
     *  @Groups({"mission_read"})
     * 
     */
    private $customer;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="missions")
     * @ApiSubresource
     *  @Groups({"mission_read"})
     * 
     */

    private $user;

    /**
     * @ORM\OneToMany(targetEntity=Raport::class, mappedBy="mission")
     *  @Groups({"mission_read"})
     */
    private $raports;

    public function __construct()
    {
        $this->user = new ArrayCollection();
        $this->raports = new ArrayCollection();
    }

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

    public function setEndDate(?\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

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

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUser(): Collection
    {
        return $this->user;
    }

    public function addUser(User $user): self
    {
        if (!$this->user->contains($user)) {
            $this->user[] = $user;
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->user->contains($user)) {
            $this->user->removeElement($user);
        }

        return $this;
    }

    /**
     * @return Collection|Raport[]
     */
    public function getRaports(): Collection
    {
        return $this->raports;
    }

    public function addRaport(Raport $raport): self
    {
        if (!$this->raports->contains($raport)) {
            $this->raports[] = $raport;
            $raport->setMission($this);
        }

        return $this;
    }

    public function removeRaport(Raport $raport): self
    {
        if ($this->raports->contains($raport)) {
            $this->raports->removeElement($raport);
            // set the owning side to null (unless already changed)
            if ($raport->getMission() === $this) {
                $raport->setMission(null);
            }
        }

        return $this;
    }
}
