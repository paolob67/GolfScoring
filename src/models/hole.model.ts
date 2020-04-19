import {Model, model, property} from '@loopback/repository';

@model()
export class Hole extends Model {
  @property({
    type: 'number',
    required: true,
  })
  HoleNumber: number;

  @property({
    type: 'number',
  })
  HoleLength?: number;

  @property({
    type: 'number',
  })
  HoleHandicap?: number;

  @property({
    type: 'number',
  })
  HolePar?: number;

  constructor(data?: Partial<Hole>) {
    super(data);
  }
}

export interface HoleRelations {
  // describe navigational properties here
}

export type HoleWithRelations = Hole & HoleRelations;
