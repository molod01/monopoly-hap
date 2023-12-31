import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import type { Tile } from 'src/tile/entities/tile.entity';
import type { TurnHistory } from 'src/turn/entities/turn-history.entity';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Player extends EntityHelper {
  @Column({ nullable: false })
  userId: number;

  @Column('text', { default: undefined, nullable: false })
  username: string;

  @Column('text', { default: undefined, nullable: false })
  color: string;

  @Column({ nullable: false, default: 15_000 })
  balance: number;

  @Column({ nullable: false, default: true })
  isActive: boolean;

  @ManyToOne('Tile', 'players')
  tile: Tile;

  @OneToMany('TurnHistory', 'player')
  @JoinColumn()
  turnHistory: TurnHistory;
}
