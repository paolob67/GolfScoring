import {Entity, model, property} from '@loopback/repository';

@model()
export class Score extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ScoreId?: number;

  @property({
    type: 'number',
    required: true,
    default: 1,
  })
  EventDay: number;

  @property({
    type: 'number',
    required: true,
  })
  Self: number;

  @property({
    type: 'number',
  })
  Marker?: number;

  @property({
    type: 'number',
  })
  Validated?: number;


  constructor(data?: Partial<Score>) {
    super(data);
  }
}

export interface ScoreRelations {
  // describe navigational properties here
}

export type ScoreWithRelations = Score & ScoreRelations;
