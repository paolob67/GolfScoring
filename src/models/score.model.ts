import {Entity, model, property, hasMany} from '@loopback/repository';
import {HoleScore} from "./hole-score.model";

@model()
export class Score extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  startTime: string;

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
  round?: number;

  @property({
    type: 'string',
  })
  userId?: string;

  @property({
    type: 'number',
  })
  outHoles?: number;

  @property({
    type: 'number',
  })
  inHoles?: number;

  @property({
    type: 'number',
  })
  stroke?: number;

  @property({
    type: 'number',
  })
  thru?: number;

  @property({
    type: 'number',
  })
  total?: number;

  @property({
    type: 'number',
  })
  net?: number;

  @property({
    type: 'number',
  })
  stableford?: number;

  @property({
    type: 'string',
  })
  eventId?: string;

  @property({
    type: 'string',
  })
  leaderboardId?: string;

  @property({
    type: 'string',
  })
  selfCard?: string;

  @property({
    type: 'string',
  })
  markerCard?: string;

  @hasMany(() => HoleScore)
  holeScores: HoleScore[];

  constructor(data?: Partial<Score>) {
    super(data);
  }
}

export interface ScoreRelations {
  // describe navigational properties here
}

export type ScoreWithRelations = Score & ScoreRelations;
