import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAirQualityTable1696187787243 implements MigrationInterface {
  name = 'CreateAirQualityTable1696187787243';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`air_quality\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ts\` varchar(255) NOT NULL, \`aqius\` int NOT NULL, \`mainus\` varchar(255) NOT NULL, \`aqicn\` int NOT NULL, \`maincn\` varchar(255) NOT NULL, \`datetime\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`air_quality\``);
  }
}
