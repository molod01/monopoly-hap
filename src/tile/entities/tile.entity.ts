import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import type { Player } from 'src/player/entities/player.entity';
import { Company } from 'src/company/entities/company.entity';
import { TileType } from '../tile-enums.pb';

@Entity()
export class Tile extends EntityHelper {
  @Column()
  orderNumber: number;

  @Column({
    type: 'enum',
    enum: TileType,
    default: undefined,
    nullable: true,
  })
  type: TileType;

  @Column({ nullable: false, default: true })
  isLaid: boolean;

  @OneToOne('Company', 'tile')
  @JoinColumn()
  company: Company;

  @OneToMany('Player', 'tile')
  players: Player[];

  // @OneToOne('Upgrade', 'tile')
  // upgrade: Upgrade;
}
