import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import type { Player } from 'src/player/entities/player.entity';
import type { Monopoly } from './monopoly.entity';
import { MonopolyType } from '../monopoly/monopoly-enums.pb';

@Entity()
export class Company extends EntityHelper {
  @Column()
  title: string;

  @Column()
  color: string;

  @Column({
    type: 'enum',
    enum: MonopolyType,
    default: undefined,
    nullable: true,
  })
  monopolyType: MonopolyType;

  @ManyToOne('Player', 'companies')
  owner: Player;

  @ManyToOne('Monopoly', 'companies')
  monopoly: Monopoly;
}
