import {Model, model, property} from '@loopback/repository';

@model()
export class HoleScore extends Model {
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
    type: 'string',
  })
  MarkerId?: string;

  @property({
    type: 'number',
  })
  Validated?: number;

  constructor(data?: Partial<HoleScore>) {
    super(data);
  }
}

export interface HoleScoreRelations {
  // describe navigational properties here
}

export type HoleScoreWithRelations = HoleScore & HoleScoreRelations;
