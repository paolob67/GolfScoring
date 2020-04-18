import {Entity, model, property} from '@loopback/repository';

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
    type: 'number',
    required: true,
    default: 18,
  })
  CourseHolesCount: number;


  constructor(data?: Partial<Course>) {
    super(data);
  }
}

export interface CourseRelations {
  // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
