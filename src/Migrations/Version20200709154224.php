<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200709154224 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE cra_type_imput');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE cra_type_imput (cra_id INT NOT NULL, type_imput_id INT NOT NULL, INDEX IDX_840561C7A62AE3BC (cra_id), INDEX IDX_840561C7CA5527B7 (type_imput_id), PRIMARY KEY(cra_id, type_imput_id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE cra_type_imput ADD CONSTRAINT FK_840561C7A62AE3BC FOREIGN KEY (cra_id) REFERENCES cra (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cra_type_imput ADD CONSTRAINT FK_840561C7CA5527B7 FOREIGN KEY (type_imput_id) REFERENCES type_imput (id) ON DELETE CASCADE');
    }
}
