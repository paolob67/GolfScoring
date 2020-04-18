import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Event, EventRelations, Course} from '../models';
import {GolfScoringDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CourseRepository} from './course.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.EventId,
  EventRelations
> {

  public readonly CourseId: HasOneRepositoryFactory<Course, typeof Event.prototype.EventId>;

  constructor(
    @inject('datasources.GolfScoring') dataSource: GolfScoringDataSource, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>,
  ) {
    super(Event, dataSource);
    this.CourseId = this.createHasOneRepositoryFactoryFor('CourseId', courseRepositoryGetter);
    this.registerInclusionResolver('CourseId', this.CourseId.inclusionResolver);
  }
}
