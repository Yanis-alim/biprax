<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200709110908 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE calendar_date (id INT AUTO_INCREMENT NOT NULL, id_date_pk DATE NOT NULL, date_name_fr VARCHAR(10) NOT NULL, day_name_of_week_fr VARCHAR(8) NOT NULL, day_of_month SMALLINT NOT NULL, day_of_year SMALLINT NOT NULL, is_weekend SMALLINT NOT NULL, week_of_year SMALLINT NOT NULL, month_name_fr VARCHAR(10) NOT NULL, month_of_year SMALLINT NOT NULL, is_last_day_of_month VARCHAR(1) NOT NULL, calendar_quarter_fr VARCHAR(11) NOT NULL, id_calendar_year SMALLINT NOT NULL, is_day_off SMALLINT NOT NULL, school_holiday_fr_zone_a VARCHAR(50) NOT NULL, school_holiday_fr_zone_b VARCHAR(50) NOT NULL, school_holiday_fr_zone_c VARCHAR(50) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE calendar_date');
    }
}
