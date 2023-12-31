import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import type { Player } from 'src/player/entities/player.entity';
import { Tile } from 'src/tile/entities/tile.entity';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Turn extends EntityHelper {
  @Column({ nullable: false })
  stepValue: number;

  @Column({ nullable: false, default: false })
  isDouble: boolean;

  @ManyToOne('Player', 'turns')
  player: Player;

  @ManyToOne('Tile')
  @JoinColumn()
  from: Tile;

  @ManyToOne('Tile')
  @JoinColumn()
  to: Tile;
}
