import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Course} from './course.model';

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

  @property({
    type: 'number',
  })
  courseId?: number;

  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
