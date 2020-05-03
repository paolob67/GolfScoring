import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Address} from './address.model';
import {Hole} from './hole.model';
import {Event} from './event.model';
import {Leaderboard} from './leaderboard.model';

@model()
export class Course extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
    default: 18,
  })
  holesCount: number;

  @property({
    type: 'number',
    required: true,
    default: 36,
  })
  out: number;

  @property({
    type: 'number',
    required: true,
    default: 36,
  })
  in: number;

  @property({
    type: 'number',
    required: true,
    default: 72,
  })
  stroke: number;

  @hasOne(() => Address)
  address: Address;

  @hasMany(() => Hole)
  holes: Hole[];

  @hasMany(() => Event)
  events: Event[];

  @hasMany(() => Leaderboard)
  leaderboard: Leaderboard[];

  constructor(data?: Partial<Course>) {
    super(data);
  }
}

export interface CourseRelations {
  // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
