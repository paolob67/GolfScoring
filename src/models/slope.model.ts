import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Slope extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
    default: 18,
  })
  holesCount: number;

  @property({
    type: 'number',
    required: true,
  })
  par: number;

  @property({
    type: 'number',
  })
  neroCR?: number;

  @property({
    type: 'number',
  })
  neroSlope?: number;

  @property({
    type: 'number',
  })
  biancoCR?: number;

  @property({
    type: 'number',
  })
  biancoSlope?: number;

  @property({
    type: 'number',
  })
  gialloCR?: number;

  @property({
    type: 'number',
  })
  gialloSlope?: number;

  @property({
    type: 'number',
  })
  verdeCR?: number;

  @property({
    type: 'number',
  })
  verdeSlope?: number;

  @property({
    type: 'number',
  })
  bluCR?: number;

  @property({
    type: 'number',
  })
  bluSlope?: number;

  @property({
    type: 'number',
  })
  rossoCR?: number;

  @property({
    type: 'number',
  })
  rossoSlope?: number;

  @property({
    type: 'number',
  })
  arancioCR?: number;

  @property({
    type: 'number',
  })
  arancioSlope?: number;

  @property({
    type: 'string',
  })
  courseId?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Slope>) {
    super(data);
  }
}

export interface SlopeRelations {
  // describe navigational properties here
}

export type SlopeWithRelations = Slope & SlopeRelations;
