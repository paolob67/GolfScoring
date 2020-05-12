import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Event} from './event.model';
import {Course} from './course.model';
import {User} from './user.model';
import {Score} from './score.model';

@model({settings: {strict: false}})
export class Leaderboard extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'number',
  })
  rounds: number;
  @property({
    type: 'date',
  })
  startTime?: string;
  @property({
    type: 'number',
  })
  playingHandicap?: number;
  @property({
    type: 'number',
  })
  startHole?: number;
  @property({
    type: 'number',
  })
  day1Stroke?: number;
  @property({
    type: 'number',
  })
  day2Stroke?: number;
  @property({
    type: 'number',
  })
  day3Stroke?: number;
  @property({
    type: 'number',
  })
  day4Stroke?: number;

  @property({
    type: 'number',
  })
  today?: number;

  @property({
    type: 'number',
  })
  total?: number;

  @property({
    type: 'number',
  })
  thru?: number;

  @property({
    type: 'number',
  })
  stroke?: number;
  @belongsTo(() => Event)
  eventId: string;

  @belongsTo(() => Course)
  courseId: string;

  @belongsTo(() => User)
  userId: string;

  @hasMany(() => Score)
  scores: Score[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Leaderboard>) {
    super(data);
  }
}

export interface LeaderboardRelations {
  // describe navigational properties here
}

export type LeaderboardWithRelations = Leaderboard & LeaderboardRelations;
