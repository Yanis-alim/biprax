<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 *  @ApiResource(
 *              attributes={ "pagination_enabled"=true
 * })
 * @ApiFilter(SearchFilter::class,properties={"username"})
 * @UniqueEntity("username",message="Un utilisateur ayant ce username existe déjà" )
 * @UniqueEntity("email",message="Un utilisateur ayant cette adresse mail existe déjà" )
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     *  @Assert\NotBlank(message="le username est obligatoire")
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="le mot de passe est obligatoire")
     */
    private $password;

    /**
     * @ORM\Column(type="date")
     *  @Assert\NotBlank(message="la date de naissance est obligatoire")
     */
    private $dateOfBirth;

    /**
     * @ORM\Column(type="string", length=50)
     *  @Assert\NotBlank(message="l'adresse est obligatoire")
     */
    private $adress1;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     * 
     */
    private $adress2;

    /**
     * @ORM\Column(type="string", length=10)
     *  @Assert\NotBlank(message="le code postal est obligatoire")
     */
    private $zipCode;

    /**
     * @ORM\Column(type="string", length=35)
     *  @Assert\NotBlank(message="la ville est obligatoire")
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=20)
     *  @Assert\NotBlank(message="le numero de telephone  est obligatoire")
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="string", length=50, unique=true)
     *  @Assert\NotBlank(message="le mail est obligatoire")
     * @Assert\Email(message="l'adresse mail doit avoir un format valide!")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=50)
     *  @Assert\NotBlank(message="le prénom est obligatoire")
     * @Groups({"raport_read","contrat_read","cra_read"})
     */
    private $fName;

    /**
     * @ORM\Column(type="string", length=50)
     *  @Assert\NotBlank(message="le nom est obligatoire")
     *  @Groups({"raport_read","contrat_read","cra_read"})
     */
    private $lName;

    

    /**
     * @ORM\ManyToOne(targetEntity=Civility::class)
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="la civilitie est obligatoire")
     */
    private $idcivility;

    /**
     * @ORM\OneToMany(targetEntity=Salaires::class, mappedBy="user")
     */
    private $salaires;

    /**
     * @ORM\OneToMany(targetEntity=Contract::class, mappedBy="user")
     */
    private $contracts;

    /**
     * @ORM\OneToMany(targetEntity=Absence::class, mappedBy="user")
     */
    private $absences;

    /**
     * @ORM\OneToMany(targetEntity=Utilcon::class, mappedBy="user")
     */
    private $utilcons;

   

    /**
     * @ORM\ManyToMany(targetEntity=ContractB2B::class, mappedBy="users")
     */
    private $contractB2Bs;

    /**
     * @ORM\OneToMany(targetEntity=Cra::class, mappedBy="user")
     */
    private $cras;

    public function __construct()
    {
        $this->salaires = new ArrayCollection();
        $this->contracts = new ArrayCollection();
        $this->absences = new ArrayCollection();
        $this->utilcons = new ArrayCollection();
        $this->cras = new ArrayCollection();
        $this->contractB2Bs = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
       

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getDateOfBirth(): ?\DateTimeInterface
    {
        return $this->dateOfBirth;
    }

    public function setDateOfBirth(\DateTimeInterface $dateOfBirth): self
    {
        $this->dateOfBirth = $dateOfBirth;

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

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(string $zipCode): self
    {
        $this->zipCode = $zipCode;

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

    public function getFName(): ?string
    {
        return $this->fName;
    }

    public function setFName(string $fName): self
    {
        $this->fName = $fName;

        return $this;
    }

    public function getLName(): ?string
    {
        return $this->lName;
    }

    public function setLName(string $lName): self
    {
        $this->lName = $lName;

        return $this;
    }

  
    

    

    public function getIdcivility(): ?Civility
    {
        return $this->idcivility;
    }

    public function setIdcivility(?Civility $idcivility): self
    {
        $this->idcivility = $idcivility;

        return $this;
    }

    /**
     * @return Collection|Salaires[]
     */
    public function getSalaires(): Collection
    {
        return $this->salaires;
    }

    public function addSalaire(Salaires $salaire): self
    {
        if (!$this->salaires->contains($salaire)) {
            $this->salaires[] = $salaire;
            $salaire->setUser($this);
        }

        return $this;
    }

    public function removeSalaire(Salaires $salaire): self
    {
        if ($this->salaires->contains($salaire)) {
            $this->salaires->removeElement($salaire);
            // set the owning side to null (unless already changed)
            if ($salaire->getUser() === $this) {
                $salaire->setUser(null);
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
            $contract->setUser($this);
        }

        return $this;
    }

    public function removeContract(Contract $contract): self
    {
        if ($this->contracts->contains($contract)) {
            $this->contracts->removeElement($contract);
            // set the owning side to null (unless already changed)
            if ($contract->getUser() === $this) {
                $contract->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Absence[]
     */
    public function getAbsences(): Collection
    {
        return $this->absences;
    }

    public function addAbsence(Absence $absence): self
    {
        if (!$this->absences->contains($absence)) {
            $this->absences[] = $absence;
            $absence->setUser($this);
        }

        return $this;
    }

    public function removeAbsence(Absence $absence): self
    {
        if ($this->absences->contains($absence)) {
            $this->absences->removeElement($absence);
            // set the owning side to null (unless already changed)
            if ($absence->getUser() === $this) {
                $absence->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Utilcon[]
     */
    public function getUtilcons(): Collection
    {
        return $this->utilcons;
    }

    public function addUtilcon(Utilcon $utilcon): self
    {
        if (!$this->utilcons->contains($utilcon)) {
            $this->utilcons[] = $utilcon;
            $utilcon->setUser($this);
        }

        return $this;
    }

    public function removeUtilcon(Utilcon $utilcon): self
    {
        if ($this->utilcons->contains($utilcon)) {
            $this->utilcons->removeElement($utilcon);
            // set the owning side to null (unless already changed)
            if ($utilcon->getUser() === $this) {
                $utilcon->setUser(null);
            }
        }

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
            $contractB2B->addUser($this);
        }

        return $this;
    }

    public function removeContractB2B(ContractB2B $contractB2B): self
    {
        if ($this->contractB2Bs->contains($contractB2B)) {
            $this->contractB2Bs->removeElement($contractB2B);
            $contractB2B->removeUser($this);
        }

        return $this;
    }

    /**
     * @return Collection|Cra[]
     */
    public function getCras(): Collection
    {
        return $this->cras;
    }

    public function addCra(Cra $cra): self
    {
        if (!$this->cras->contains($cra)) {
            $this->cras[] = $cra;
            $cra->setUser($this);
        }

        return $this;
    }

    public function removeCra(Cra $cra): self
    {
        if ($this->cras->contains($cra)) {
            $this->cras->removeElement($cra);
            // set the owning side to null (unless already changed)
            if ($cra->getUser() === $this) {
                $cra->setUser(null);
            }
        }

        return $this;
    }
}
