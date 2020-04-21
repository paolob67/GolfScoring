import {DefaultCrudRepository} from '@loopback/repository';
import {Course, CourseRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.CourseId,
  CourseRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Course, dataSource);
  }
}
