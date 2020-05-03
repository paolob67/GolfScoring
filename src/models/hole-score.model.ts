import {Entity, model, property} from '@loopback/repository';

@model()
export class HoleScore extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  holeNumber: number;

  @property({
    type: 'number',
    required: true,
  })
  self: number;

  @property({
    type: 'number',
  })
  marker?: number;

  @property({
    type: 'string',
  })
  markerId?: string;

  @property({
    type: 'number',
  })
  validated?: number;

  @property({
    type: 'string',
  })
  scoreId?: string;

  @property({
    type: 'number',
  })
  par: number;

  constructor(data?: Partial<HoleScore>) {
    super(data);
  }
}

export interface HoleScoreRelations {
  // describe navigational properties here
}

export type HoleScoreWithRelations = HoleScore & HoleScoreRelations;
