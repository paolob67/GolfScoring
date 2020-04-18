import {Entity, model, property} from '@loopback/repository';

@model()
export class Event extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  EventId?: number;

  @property({
    type: 'string',
  })
  EventName?: string;

  @property({
    type: 'date',
    required: true,
  })
  EventDate: string;

  @property({
    type: 'number',
    default: 1,
  })
  EventDurantion?: number;


  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
