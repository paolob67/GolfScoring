import {Entity, model, property} from '@loopback/repository';

@model()
export class Hole extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  holeNumber: number;

  @property({
    type: 'number',
  })
  holeLength?: number;

  @property({
    type: 'number',
  })
  holeHandicap?: number;

  @property({
    type: 'number',
  })
  holePar?: number;

  @property({
    type: 'string',
  })
  courseId?: string;

  constructor(data?: Partial<Hole>) {
    super(data);
  }
}

export interface HoleRelations {
  // describe navigational properties here
}

export type HoleWithRelations = Hole & HoleRelations;
