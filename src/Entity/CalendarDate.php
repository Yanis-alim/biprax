<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use App\Repository\CalendarDateRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;


/**
 * @ORM\Entity(repositoryClass=CalendarDateRepository::class)
 * @ApiResource
 * 
 *  @ApiFilter(SearchFilter::class,properties={"monthOfYear","idCalendarYears","monthNameFR"})
 */
class CalendarDate
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"cra_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     * @Groups({"cra_read"})
     */
    private $idDatePk;

    /**
     * @ORM\Column(type="string", length=10)
     * @Groups({"cra_read"})
     */
    private $dateNameFR;

    /**
     * @ORM\Column(type="string", length=8)
     * @Groups({"cra_read"})
     */
    private $dayNameOfWeekFR;

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"cra_read"})
     */
    private $dayOfMonth;

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"cra_read"})
     */
    private $dayOfYear;

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"cra_read"})
     */
    private $isWeekend;

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"cra_read"})
     */
    private $weekOfYear;

    /**
     * @ORM\Column(type="string", length=10)
     * @Groups({"cra_read"})
     */
    private $monthNameFR;

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"cra_read"})
     */
    private $monthOfYear;

    /**
     * @ORM\Column(type="string", length=1)
     * @Groups({"cra_read"})
     */
    private $isLastDayOfMonth;

    /**
     * @ORM\Column(type="string", length=11)
     * @Groups({"cra_read"})
     */
    private $calendarQuarterFR;

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"cra_read"})
     */
    private $idCalendarYears;

    /**
     * @ORM\Column(type="smallint")
     * @Groups({"cra_read"})
     */
    private $isDayOff;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"cra_read"})
     */
    private $schoolHolidayFrZoneA;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"cra_read"})
     */
    private $schoolHolidayFrZoneB;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"cra_read"})
     */
    private $schoolHolidayFrZoneC;

    /**
     * @ORM\OneToMany(targetEntity=Cra::class, mappedBy="calendar")
     * 
     * 
     */
    private $cras;

    
    public function __construct()
    {
        $this->cras = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdDatePk(): ?\DateTimeInterface
    {
        return $this->idDatePk;
    }

    public function setIdDatePk(\DateTimeInterface $idDatePk): self
    {
        $this->idDatePk = $idDatePk;

        return $this;
    }

    public function getDateNameFR(): ?string
    {
        return $this->dateNameFR;
    }

    public function setDateNameFR(string $dateNameFR): self
    {
        $this->dateNameFR = $dateNameFR;

        return $this;
    }

    public function getDayNameOfWeekFR(): ?string
    {
        return $this->dayNameOfWeekFR;
    }

    public function setDayNameOfWeekFR(string $dayNameOfWeekFR): self
    {
        $this->dayNameOfWeekFR = $dayNameOfWeekFR;

        return $this;
    }

    public function getDayOfMonth(): ?int
    {
        return $this->dayOfMonth;
    }

    public function setDayOfMonth(int $dayOfMonth): self
    {
        $this->dayOfMonth = $dayOfMonth;

        return $this;
    }

    public function getDayOfYear(): ?int
    {
        return $this->dayOfYear;
    }

    public function setDayOfYear(int $dayOfYear): self
    {
        $this->dayOfYear = $dayOfYear;

        return $this;
    }

    public function getIsWeekend(): ?int
    {
        return $this->isWeekend;
    }

    public function setIsWeekend(int $isWeekend): self
    {
        $this->isWeekend = $isWeekend;

        return $this;
    }

    public function getWeekOfYear(): ?int
    {
        return $this->weekOfYear;
    }

    public function setWeekOfYear(int $weekOfYear): self
    {
        $this->weekOfYear = $weekOfYear;

        return $this;
    }

    public function getMonthNameFR(): ?string
    {
        return $this->monthNameFR;
    }

    public function setMonthNameFR(string $monthNameFR): self
    {
        $this->monthNameFR = $monthNameFR;

        return $this;
    }

    public function getMonthOfYear(): ?int
    {
        return $this->monthOfYear;
    }

    public function setMonthOfYear(int $monthOfYear): self
    {
        $this->monthOfYear = $monthOfYear;

        return $this;
    }

    public function getIsLastDayOfMonth(): ?string
    {
        return $this->isLastDayOfMonth;
    }

    public function setIsLastDayOfMonth(string $isLastDayOfMonth): self
    {
        $this->isLastDayOfMonth = $isLastDayOfMonth;

        return $this;
    }

    public function getCalendarQuarterFR(): ?string
    {
        return $this->calendarQuarterFR;
    }

    public function setCalendarQuarterFR(string $calendarQuarterFR): self
    {
        $this->calendarQuarterFR = $calendarQuarterFR;

        return $this;
    }

    public function getidCalendarYears(): ?int
    {
        return $this->idCalendarYears;
    }

    public function setidCalendarYears(int $idCalendarYears): self
    {
        $this->idCalendarYears = $idCalendarYears;

        return $this;
    }

    public function getIsDayOff(): ?int
    {
        return $this->isDayOff;
    }

    public function setIsDayOff(int $isDayOff): self
    {
        $this->isDayOff = $isDayOff;

        return $this;
    }

    public function getSchoolHolidayFrZoneA(): ?string
    {
        return $this->schoolHolidayFrZoneA;
    }

    public function setSchoolHolidayFrZoneA(string $schoolHolidayFrZoneA): self
    {
        $this->schoolHolidayFrZoneA = $schoolHolidayFrZoneA;

        return $this;
    }

    public function getSchoolHolidayFrZoneB(): ?string
    {
        return $this->schoolHolidayFrZoneB;
    }

    public function setSchoolHolidayFrZoneB(string $schoolHolidayFrZoneB): self
    {
        $this->schoolHolidayFrZoneB = $schoolHolidayFrZoneB;

        return $this;
    }

    public function getSchoolHolidayFrZoneC(): ?string
    {
        return $this->schoolHolidayFrZoneC;
    }

    public function setSchoolHolidayFrZoneC(string $schoolHolidayFrZoneC): self
    {
        $this->schoolHolidayFrZoneC = $schoolHolidayFrZoneC;

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
            $cra->setCalendar($this);
        }

        return $this;
    }

    public function removeCra(Cra $cra): self
    {
        if ($this->cras->contains($cra)) {
            $this->cras->removeElement($cra);
            // set the owning side to null (unless already changed)
            if ($cra->getCalendar() === $this) {
                $cra->setCalendar(null);
            }
        }

        return $this;
    }

    
   
}
