import {Entity, model, property} from '@loopback/repository';

@model()
export class Roster extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  RosterId?: number;

  @property({
    type: 'date',
    required: true,
  })
  StartTime: string;

  @property({
    type: 'number',
  })
  Day?: number;

  @property({
    type: 'number',
  })
  eventId?: number;

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Roster>) {
    super(data);
  }
}

export interface RosterRelations {
  // describe navigational properties here
}

export type RosterWithRelations = Roster & RosterRelations;
