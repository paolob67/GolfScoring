import {Entity, model, property} from '@loopback/repository';

@model()
export class Hole extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  HoleId?: number;

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
  HolePar?: number;

  @property({
    type: 'number',
  })
  courseId?: number;

  constructor(data?: Partial<Hole>) {
    super(data);
  }
}

export interface HoleRelations {
  // describe navigational properties here
}

export type HoleWithRelations = Hole & HoleRelations;
