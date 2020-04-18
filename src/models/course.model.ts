import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Address} from './address.model';
import {Hole} from './hole.model';
import {Event} from './event.model';

@model()
export class Course extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  CourseId?: number;

  @property({
    type: 'string',
    required: true,
  })
  CourseName: string;

  @property({
    type: 'object',
  })
  CourseAddress: Address;

  @property({
    type: 'number',
    required: true,
    default: 18,
  })
  CourseHolesCount: number;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  CourseHoles: Hole[];

  @hasMany(() => Event)
  events: Event[];

  constructor(data?: Partial<Course>) {
    super(data);
  }
}

export interface CourseRelations {
  // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
