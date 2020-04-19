import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Address} from './address.model';
import {Hole} from './hole.model';


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
    name: 'CourseAddress',
  })
  CourseAddress: Address;

  @property({
    type: 'number',
    required: true,
    default: 18,
  })
  CourseHolesCount: number;

  @property.array(Hole)
  CourseHoles: Hole[];

  constructor(data?: Partial<Course>) {
    super(data);
  }
}

export interface CourseRelations {
  // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
