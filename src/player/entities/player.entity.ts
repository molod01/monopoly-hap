import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import type { Tile } from 'src/tile/entities/tile.entity';

@Entity()
export class Player extends EntityHelper {
  @Column({ nullable: false })
  userId: number;

  @Column('text', { default: undefined, nullable: false })
  username: string;

  @Column('text', { default: undefined, nullable: false })
  color: string;

  @Column({ nullable: false, default: 15000 })
  balance: number;

  @Column({ nullable: false, default: true })
  isActive: boolean;

  @ManyToOne('Tile', 'players')
  tile: Tile;

  // @OneToMany('TurnHistory', 'player')
  // turnHistory: TurnHistory;

  // @OneToOne('Upgrade', 'tile')
  // upgrade: Upgrade;
}