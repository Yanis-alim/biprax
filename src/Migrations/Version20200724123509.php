<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200724123509 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE cra ADD mission_id INT DEFAULT NULL, ADD client_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE cra ADD CONSTRAINT FK_926CE6D1BE6CAE90 FOREIGN KEY (mission_id) REFERENCES mission (id)');
        $this->addSql('ALTER TABLE cra ADD CONSTRAINT FK_926CE6D119EB6921 FOREIGN KEY (client_id) REFERENCES customer (id)');
        $this->addSql('CREATE INDEX IDX_926CE6D1BE6CAE90 ON cra (mission_id)');
        $this->addSql('CREATE INDEX IDX_926CE6D119EB6921 ON cra (client_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE cra DROP FOREIGN KEY FK_926CE6D1BE6CAE90');
        $this->addSql('ALTER TABLE cra DROP FOREIGN KEY FK_926CE6D119EB6921');
        $this->addSql('DROP INDEX IDX_926CE6D1BE6CAE90 ON cra');
        $this->addSql('DROP INDEX IDX_926CE6D119EB6921 ON cra');
        $this->addSql('ALTER TABLE cra DROP mission_id, DROP client_id');
    }
}
