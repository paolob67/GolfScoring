import {Entity, model, property} from '@loopback/repository';
import {HoleScore} from "./hole-score.model";

@model()
export class Score extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ScoreId?: number;

  @property({
    type: 'date',
    required: true,
  })
  StartTime: string;

  @property({
    type: 'number',
  })
  PlayingHandicap?: number;

  @property({
    type: 'number',
  })
  StartHole?: number;

  @property({
    type: 'number',
  })
  Round?: number;

  @property({
    type: 'number',
  })
  eventId?: number;

  @property({
    type: 'string',
  })
  userId?: string;

  @property.array(HoleScore)
  HoleScore: HoleScore[];

  constructor(data?: Partial<Score>) {
    super(data);
  }
}

export interface ScoreRelations {
  // describe navigational properties here
}

export type ScoreWithRelations = Score & ScoreRelations;
