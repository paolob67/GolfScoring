import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Course} from './course.model';
import {Score} from './score.model';
import {Leaderboard} from './leaderboard.model';

@model()
export class Event extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  type?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    default: 1,
  })
  numberOfRounds?: number;

  @property({
    type: 'string',
  })
  courseId?: string;

  @hasMany(() => Score)
  scores: Score[];

  @hasMany(() => Leaderboard)
  leaderboard: Leaderboard[];

  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
