import {Entity, model, property} from '@loopback/repository';

@model()
export class EventRoster extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  EventRosterId?: number;

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

  constructor(data?: Partial<EventRoster>) {
    super(data);
  }
}

export interface EventRosterRelations {
  // describe navigational properties here
}

export type EventRosterWithRelations = EventRoster & EventRosterRelations;
