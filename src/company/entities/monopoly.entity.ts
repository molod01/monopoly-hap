import { Column, Entity, OneToMany } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Company } from './company.entity';
import { MonopolyType } from '../monopoly/monopoly-enums.pb';

@Entity()
export class Monopoly extends EntityHelper {
  @Column()
  isFull: boolean;

  @Column({
    type: 'enum',
    enum: MonopolyType,
    default: undefined,
    nullable: true,
  })
  type: MonopolyType;

  @OneToMany('Company', 'monopoly')
  companies: Company[];
}
