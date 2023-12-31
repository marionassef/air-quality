import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AirQuality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ts: string;

  @Column()
  aqius: number;

  @Column()
  mainus: string;

  @Column()
  aqicn: number;

  @Column()
  maincn: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;
}
