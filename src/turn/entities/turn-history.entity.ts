import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Player } from 'src/player/entities/player.entity';
import { EntityHelper } from '../../utils/entity-helper';
import { Turn } from './turn.entity';

@Entity()
export class TurnHistory extends EntityHelper {
  @ManyToOne('Player', 'turnHistory')
  @JoinColumn()
  player: Player;

  @OneToOne('Turn')
  @JoinColumn()
  turn: Turn;
}
