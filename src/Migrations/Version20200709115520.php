<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200709115520 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE cra DROP FOREIGN KEY FK_926CE6D1CA5527B7');
        $this->addSql('DROP INDEX IDX_926CE6D1CA5527B7 ON cra');
        $this->addSql('ALTER TABLE cra DROP type_imput_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE cra ADD type_imput_id INT NOT NULL');
        $this->addSql('ALTER TABLE cra ADD CONSTRAINT FK_926CE6D1CA5527B7 FOREIGN KEY (type_imput_id) REFERENCES type_imput (id)');
        $this->addSql('CREATE INDEX IDX_926CE6D1CA5527B7 ON cra (type_imput_id)');
    }
}
