<?php

namespace App\Entity;

use App\Repository\UtilconRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UtilconRepository::class)
 */
class Utilcon
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $congerP;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $rtt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="utilcons")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCongerP(): ?float
    {
        return $this->congerP;
    }

    public function setCongerP(?float $congerP): self
    {
        $this->congerP = $congerP;

        return $this;
    }

    public function getRtt(): ?float
    {
        return $this->rtt;
    }

    public function setRtt(?float $rtt): self
    {
        $this->rtt = $rtt;

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
