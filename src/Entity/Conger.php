<?php

namespace App\Entity;

use App\Repository\CongerRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=CongerRepository::class)
 */
class Conger
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $discription;

    public function getId(): ?int
    {
        return $this->id;
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
}
